module.exports = ({
  models
}) => {

  const { user } = models

  const update = (req, res, next) => {
    const id = res.locals.user
    const { fullName } = req.body
    return user.update({ id, fullName })
      .then((result) => {
        return res
          .status(200)
          .json(result)
      })
      .catch(next)
  }

  const remove = (_, res, next) => {
    const id = res.locals.user
    return user.remove({ id })
      .then(({ rows }) => {
        const [first] = rows
        return res
          .status(200)
          .json({ id: first.id })
      })
      .catch(next)
  }

  const findAll = (req, res, next) => {
    const { page } = req.query
    return user.findAll({ page })
      .then(({ rows }) => {
        return res
          .status(200)
          .json({ meta: { page: page || 1 }, users: rows })
      })
      .catch(next)
  }

  return {
    update,
    remove,
    findAll
  }

}
