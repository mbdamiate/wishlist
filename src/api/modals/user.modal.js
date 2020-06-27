
const { query } = require('../../config/database')

const select = (limit = 100, offset = 0) => {
  return query('SELECT to_json(whishlist_user_select($1, $2))', [limit, offset])
    .then(({ rowCount, rows }) => {
      const result = rows.map((row) => row['to_json'])
      return { rowCount, result }
    })
    .catch((error) => {
      return { ...error }
    })
}

const selectById = (id) => {
  return query('SELECT to_json(whishlist_user_select_by_id($1))', [id])
    .then(({ rows }) => {
      const [result] = rows.map((row) => row['to_json'])
      return { result }
    })
    .catch((error) => {
      return { ...error }
    })
}

const selectByEmail = (email) => {
  return query('SELECT to_json(whishlist_user_select_by_email($1))', [email])
    .then(({ rows }) => {
      const [result] = rows.map((row) => row['to_json'])
      return { result }
    })
    .catch((error) => {
      return { ...error }
    })
}

const insert = (email, fullName) => {
  return query('SELECT to_json(whishlist_user_insert($1, $2))', [email, fullName])
    .then(({ rows }) => {
      const [resultId] = rows.map((row) => row['to_json'])
      return { resultId }
    })
    .catch((error) => {
      throw { ...error }
    })
}

const update = (id, fullName) => {
  return query('SELECT to_json(whishlist_user_update($1, $2))', [id, fullName])
    .then(({ rows }) => {
      const [resultId] = rows.map((row) => row['to_json'])
      return { resultId }
    })
    .catch((error) => {
      throw { ...error }
    })
}

const remove = (id) => {
  return query('SELECT to_json(whishlist_user_delete($1))', [id])
    .then(({ rows }) => {
      const [resultId] = rows.map((row) => row['to_json'])
      return { resultId }
    })
    .catch((error) => {
      throw { ...error }
    })
}

module.exports = {
  select,
  selectById,
  selectByEmail,
  insert,
  update,
  remove
}
