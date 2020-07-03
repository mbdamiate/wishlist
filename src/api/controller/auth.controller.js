module.exports = ({
  models,
  utils
}) => {

  const { user } = models
  const { jsonwebtoken } = utils

  const signIn = (req, res, next) => {
    const { email } = req.body
    return user.findByEmail({ email })
      .then(({ rows }) => {
        if (rows.length > 0) {
          const [user] = rows
          const token = jsonwebtoken
            .sign({ user: user.id }, process.env.SECRET, { expiresIn: '24h' })
          return res
            .status(200)
            .json({ token })
        }
        else {
          return res
            .status(404)
            .json({ message: 'Users not found' })
        }
      })
      .catch(next)
  }

  const register = (req, res, next) => {
    const { email, fullName } = req.body
    return user.create({ email, fullName })
      .then(({ rows }) => {
        const [first] = rows
        return res
          .status(201)
          .json({ id: first.id })
      })
      .catch(next)
  }

  return {
    signIn,
    register
  }

}
