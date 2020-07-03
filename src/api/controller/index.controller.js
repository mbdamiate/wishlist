module.exports = ({
  models
}) => {

  const { user } = models

  const health = (_, res) => {
    return res
      .status(200)
      .json({ uptime: process.uptime() })
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
    health,
    register
  }

}
