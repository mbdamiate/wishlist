
const { query } = require('../../config/database')
const modal = require('../modals/user.modal')

const find = (req, res) => {
  const { limit, offset } = req.query
  const { email } = req.query

  if (email)
    modal.findByEmail(email)
      .then(({ result }) => {
        if (result.length > 0)
          res
            .status(200)
            .send(result)

        else
          res
            .status(404)
            .send({ error: 404, message: 'Not found' })
      })
      .catch((error) => {
        res
          .status(500)
          .send(error)
      })

  else
    modal.find(limit, offset)
      .then(({ result }) => {
        if (result.length > 0)
          res
            .status(200)
            .send(result)

        else
          res
            .status(404)
            .send({ error: 404, message: 'Not found' })
      })
      .catch((error) => {
        res
          .status(500)
          .send(error)
      })
}

const findById = (req, res) => {
  const { id } = req.params
  modal.findById(id)
    .then(({ result }) => {
      const [first] = result
      if (result.length > 0)
        res
          .status(200)
          .send(first)

      else
        res
          .status(404)
          .send({ error: 404, message: 'Not found' })
    })
    .catch((error) => {
      res
        .status(500)
        .send(error)
    })
}

const create = (req, res) => {
  const { email, fullName } = req.body
  modal.insert(email, fullName)
    .then(({ result }) => {
      res
        .status(201)
        .send(result)
    })
    .catch((error) => {
      if (error.message)
        res
          .status(409)
          .send(error.message)

      else
        res
          .status(500)
          .send(error.detail)
    })
}

module.exports = {
  find,
  findById,
  create
}
