
const { query } = require('../../config/database')

const find = (limit = 100, offset = 0) => {
  return query('SELECT to_json(whishlist_user_find($1, $2))', [limit, offset])
    .then(({ rows }) => {
      const result = rows.map((row) => row['to_json'])

      return { result }
    })
    .catch((error) => {
      return { ...error }
    })
}

const findById = (id) => {
  return query('SELECT to_json(whishlist_user_find_by_id($1))', [id])
    .then(({ rows }) => {
      const result = rows.map((row) => row['to_json'])

      return { result }
    })
    .catch((error) => {

      return { ...error }
    })
}

const findByEmail = (email) => {
  return query('SELECT to_json(whishlist_user_find_by_email($1))', [email])
    .then(({ rows }) => {
      const result = rows.map((row) => row['to_json'])

      return { result }
    })
    .catch((error) => {
      return { ...error }
    })
}

const insert = (email, fullName) => {
  return query('SELECT to_json(whishlist_user_insert($1, $2))', [email, fullName])
    .then(({ rows }) => {
      const resultId = rows.map((row) => row['to_json'])

      return { resultId }
    })
    .catch((error) => {
      throw { ...error }
    })
}

const update = (id, email, fullName) => {
  return query('SELECT to_json(whishlist_user_update($1, $2, $3))', [id, email, fullName])
    .then(({ rows }) => {
      const resultId = rows.map((row) => row['to_json'])

      return { resultId }
    })
    .catch((error) => {
      throw { ...error }
    })
}

module.exports = {
  find,
  findById,
  findByEmail,
  insert,
  update
}
