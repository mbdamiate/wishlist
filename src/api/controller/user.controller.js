
const { query } = require('../../config/database')

const find = (req, res) => {
  const { limit } = req.query
  query(`SELECT whishlist_user_find(${limit || 100})`)
    .then(({ rows, rowCount }) => {
      if (rowCount > 0)
        res.status(200).send(rows)
      else
        res.status(404).send({ error: 404, message: 'Not found' })
    })
    .catch((error) => {
      res.status(500).send(error)
    })
}

module.exports = {
  find
}
