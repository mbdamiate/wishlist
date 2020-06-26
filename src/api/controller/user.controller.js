
const modal = require('../modals/user.modal')

const find = (req, res) => {
  const { limit, offset } = req.query
  const { email } = req.query

  if (email) {
    return modal.findByEmail(email)
      .then(({ result }) => {
        if (result.length > 0) {
          return res
            .status(200)
            .send(result)
        }

        else {
          return res
            .status(404)
            .send({ error: 404, message: 'Not found' })
        }
      })
      .catch((error) => {
        return res
          .status(500)
          .send(error)
      })
  }

  else {
    return modal.find(limit, offset)
      .then(({ result }) => {
        if (result.length > 0) {
          return res
            .status(200)
            .send(result)
        }

        else {
          res
            .status(404)
            .send({ error: 404, message: 'Not found' })
        }
      })
      .catch((error) => {
        return res
          .status(500)
          .send(error)
      })
  }
}

const findById = (req, res) => {
  const { id } = req.params

  return modal.findById(id)
    .then(({ result }) => {
      const [first] = result

      if (result.length > 0) {
        return res
          .status(200)
          .send(first)
      }

      else {
        return res
          .status(404)
          .send({ error: 404, message: 'Not found' })
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

  return modal.findByEmail(email)
    .then(({ result }) => {
      const [first] = result

      return { first }
    })
    .then(({ first }) => {
      if (first) {
        return res
          .status(409)
          .send({ message: 'Email already used!' })
      }

      else {
        return modal.insert(email, fullName)
          .then(({ resultId }) => {
            const [id] = resultId
            return res
              .status(201)
              .send({ id })
          })
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

  return modal.findById(id)
    .then(({ result }) => {
      const [first] = result

      if (result.length > 0) {
        return modal.update(id, first.email, fullName)
          .then(({ resultId }) => {
            const [id] = resultId

            return res
              .status(201)
              .send({ id })
          })
      }

      else {
        return res
          .status(404)
          .send({ error: 404, message: 'Not found' })
      }
    })
    .catch((error) => {
      return res
        .status(500)
        .send(error)
    })
}

module.exports = {
  find,
  findById,
  create,
  update
}
