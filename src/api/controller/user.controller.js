
const modal = require('../modals/user.modal')

const searchAll = (req, res) => {
  const { limit, offset } = req.query

  return modal.select(limit, offset)
    .then(({ rowCount, result }) => {
      if (rowCount > 0) {
        return res
          .status(200)
          .send(result)
      }

      else {
        res
          .status(404)
          .send()
      }
    })
    .catch((error) => {
      return res
        .status(500)
        .send(error)
    })
}

const searchById = (req, res) => {
  const { id } = req.params

  return modal.selectById(id)
    .then(({ result }) => {
      if (result) {
        return res
          .status(200)
          .send(result)
      }

      else {
        return res
          .status(404)
          .send()
      }
    })
    .catch((error) => {
      return res
        .status(500)
        .send(error)
    })
}

const searchByEmail = (req, res) => {
  const { email } = req.params

  return modal.selectByEmail(email)
    .then(({ result }) => {
      if (result) {
        return res
          .status(200)
          .send(result)
      }

      else {
        return res
          .status(404)
          .send()
      }
    })
    .catch((error) => {
      return res
        .status(500)
        .send(error)
    })
}

const create = (req, res) => {
  const { email, fullName } = req.body

  return modal.insert(email, fullName)
    .then(({ resultId }) => {
      if (resultId === '00000000-0000-0000-0000-000000000000') {
        return res
          .status(409)
          .send()
      }

      else {
        return res
          .status(201)
          .send()
      }
    })
    .catch((error) => {
      return res
        .status(500)
        .send(error)
    })
}

const update = (req, res) => {
  const { id } = req.params
  const { fullName } = req.body

  return modal.update(id, fullName)
    .then(({ resultId }) => {
      if (resultId === id) {
        return res
          .status(304)
          .send()
      }

      else {
        return res
          .status(201)
          .send({ id: resultId })
      }
    })
    .catch((error) => {
      return res
        .status(500)
        .send(error)
    })
}

const remove = (req, res) => {
  const { id } = req.params

  return modal.remove(id)
    .then(({ resultId }) => {
      if (resultId === '00000000-0000-0000-0000-000000000000') {
        return res
          .status(404)
          .send()
      }

      else {
        return res
          .status(200)
          .send()
      }
    })
    .catch((error) => {
      return res
        .status(500)
        .send(error)
    })
}

module.exports = {
  searchAll,
  searchById,
  searchByEmail,
  create,
  update,
  remove
}
