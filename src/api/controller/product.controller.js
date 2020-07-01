/**
 * @module controllers/product
 */

module.exports = (repository) => {

  const find = (req, res) => {
    const { page } = req.query
    return repository
      .find(page)
      .then(({ data, status }) => {
        const { products } = data
        return res
          .status(status)
          .json(products)
      })
      .catch((error) => {
        return res
          .status(500)
          .json(error)
      })
  }

  const findById = (req, res) => {
    const { id } = req.params
    return repository
      .findById(id)
      .then(({ data, status }) => {
        return res
          .status(status)
          .json(data)
      })
      .catch((error) => {
        return res
          .status(500)
          .json(error)
      })
  }

  return {
    find,
    findById
  }

}
