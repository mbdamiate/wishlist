/**
 * @module repositories/user
 */

module.exports = ({ query }) => {

  /**
   * Find users (limited to 100 itens)
   * @param {number} page Requested page
   * @returns {Promise.<Array.<{id: string, email: string, fullName: string}>>|Error} Promised users list
   */
  const find = (page = 1) => {
    let limit = 100
    let offset = 0

    if (page >= 2) {
      limit = limit * page
      offset = ((limit * page) + 1) - limit
    }

    return query('SELECT to_json(whishlist_user_select($1, $2))', [limit, offset])
      .then(({ rows }) => {
        const result = rows.map((row) => row['to_json'])
        return { result }
      })
      .catch((error) => {
        return { ...error }
      })
  }

  /**
   * Find user by id
   * @param {string} id UUID
   * @returns {Promise.<{id: string, email: string, fullName: string}>|Error} Promised user
   */
  const findById = (id) => {
    return query('SELECT to_json(whishlist_user_select_by_id($1))', [id])
      .then(({ rows }) => {
        const [result] = rows.map((row) => row['to_json'])
        return { result }
      })
      .catch((error) => {
        return { ...error }
      })
  }

  /**
   * Find user by email
   * @param {string} email Email
   * @returns {Promise<{id: string, email: string, fullName: string}>|Error} Promised user found
   */
  const findByEmail = (email) => {
    return query('SELECT to_json(whishlist_user_select_by_email($1))', [email])
      .then(({ rows }) => {
        const [result] = rows.map((row) => row['to_json'])
        return { result }
      })
      .catch((error) => {
        return { ...error }
      })
  }

  /**
   * Create user
   * @param {string} email User email (Must be unique)
   * @param {string} fullName User full name
   * @returns {Promise<{resultId: number}>|Error} Created user id
   */
  const create = (email, fullName) => {
    return query('SELECT to_json(whishlist_user_insert($1, $2))', [email, fullName])
      .then(({ rows }) => {
        const [resultId] = rows.map((row) => row['to_json'])
        return { resultId }
      })
      .catch((error) => {
        console.error(error)
        throw { ...error }
      })
  }

  /**
   * Updated user
   * @param {string} id User id
   * @param {string} fullName User full name
   * @returns {Promise<{resultId: number}>|Error} Updated user id
   */
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

  /**
   * Remove user
   * @param {string} id User id
   * @returns {Promise<{resultId: number}>|Error} Removed user id
   */
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

  return {
    create,
    update,
    remove,
    find,
    findById,
    findByEmail
  }

}
