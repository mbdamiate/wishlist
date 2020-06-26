
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
      console.error(error)
      return { ...error }
    })
}

const insert = (email, fullName) => {
  return query('SELECT whishlist_user_insert($1, $2) AS id', [email, fullName])
    .then(({ rows }) => {
      const [result] = rows
      return { result }
    })
    .catch((error) => {
      const { code } = error
      console.error(error.message)
      if (code === '23505')
        throw { ...error, message: 'This email is already in use' }
      else
        throw { ...error }
    })
}

module.exports = {
  find,
  findById,
  insert
}
