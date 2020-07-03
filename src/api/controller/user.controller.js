module.exports = ({ models }) => {
  const { user } = models;

  const update = (req, res, next) => {
    const id = res.locals.user;
    const { fullName } = req.body;
    return user
      .update({ id, fullName })
      .then(({ rows }) => {
        if (rows.length > 0) {
          const [first] = rows;
          return res.status(200).json({ id: first.id });
        } else {
          return res.status(404).json({ message: "User not found" });
        }
      })
      .catch(next);
  };

  const remove = (_, res, next) => {
    const id = res.locals.user;
    return user
      .remove({ id })
      .then(({ rows }) => {
        const [first] = rows;
        return res.status(200).json({ id: first.id });
      })
      .catch(next);
  };

  const findAll = (req, res, next) => {
    const { page } = req.query;
    return user
      .findAll({ page })
      .then(({ rows }) => {
        if (rows.length > 0) {
          return res
            .status(200)
            .json({ meta: { page: page || 1 }, users: rows });
        } else {
          return res.status(404).json({ message: "Users not found" });
        }
      })
      .catch(next);
  };

  return {
    update,
    remove,
    findAll,
  };
};
