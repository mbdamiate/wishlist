module.exports = ({ models, utils }) => {
  const { user } = models;
  const { jsonwebtoken } = utils;

  const register = (req, res, next) => {
    const { email, fullName } = req.body;
    return user
      .create({ email, fullName })
      .then(({ rows }) => {
        const [first] = rows;
        res.status(201);
        res.json({ id: first.id });
      })
      .catch(next);
  };

  const signIn = (req, res, next) => {
    const { email } = req.body;
    return user
      .findByEmail({ email })
      .then(({ rows }) => {
        if (rows.length > 0) {
          const [user] = rows;
          const token = jsonwebtoken.sign(
            { user: user.id },
            process.env.SECRET,
            { expiresIn: '24h' }
          );
          res.status(200);
          res.json({ token });
        } else {
          res.status(404);
          res.json({ message: 'Users not found' });
        }
      })
      .catch(next);
  };

  return {
    register,
    signIn
  };
};
