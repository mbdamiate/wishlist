/**
 * @module controllers/user
 */

const repository = require('../repositories/user.repository')

/**
 * Find users
 * @param {Request} req Client request
 * @param {Response} res Server response
 * @return {Response} Returns the response with status 200 if the query is successful, 404 if nothing is found and 500 for other reasons
 */
const find = (req, res) => {
  const { page } = req.query
  return repository.find(page)
    .then(({ result }) => {
      if (result.length > 0) {
        return res
          .status(200)
          .send({ users: result })
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

/**
 * Find user by id
 * @param {Request} req Client request
 * @param {Response} res Server response
 * @return {Response} Returns the response with status 200 if the query is successful, 404 if not found and 500 for other reasons
 */
const findById = (req, res) => {
  const { id } = req.params
  return repository.findById(id)
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

/**
 * Find user by email
 * @param {Request} req Client request
 * @param {Response} res Server response
 * @return {Response} Returns the response with status 200 if the query is successful, 404 if not found and 500 for other reasons
 */
const findByEmail = (req, res) => {
  const { email } = req.params
  return repository.findByEmail(email)
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

/**
 * Create user
 * @param {Request} req Client request
 * @param {Response} res Server response
 * @return {Response} Returns the answer with status 201 if the creation is successful, 409 if it already exists and 500 for other reasons
 */
const create = (req, res) => {
  const { email, fullName } = req.body
  return repository.create(email, fullName)
    .then(({ resultId }) => {
      if (resultId === '00000000-0000-0000-0000-000000000000') {
        return res
          .status(409)
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

/**
 * Update user
 * @param {Request} req Client request
 * @param {Response} res Server response
 * @return {Response} Returns response with status 201 if update is successful, 304 if not found and 500 for other reasons
 */
const update = (req, res) => {
  const { id } = req.params
  const { fullName } = req.body
  return repository.update(id, fullName)
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

/**
 * Remove user
 * @param {Request} req Client request
 * @param {Response} res Server response
 * @return {Response} Returns response with status 200 if removal is successful, 404 if not found and 500 for other reasons
 */
const remove = (req, res) => {
  const { id } = req.params
  return repository.remove(id)
    .then(({ resultId }) => {
      if (resultId === '00000000-0000-0000-0000-000000000000') {
        return res
          .status(404)
          .send()
      }
      else {
        return res
          .status(200)
          .send({ id: resultId })
      }
    })
    .catch((error) => {
      return res
        .status(500)
        .send(error)
    })
}

module.exports = {
  create,
  update,
  remove,
  find,
  findById,
  findByEmail
}
