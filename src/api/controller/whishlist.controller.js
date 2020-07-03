module.exports = ({
  models
}) => {

  const { whishlist } = models
  const { product } = models

  const create = (req, res, next) => {
    const userId = res.locals.user
    const { id } = req.body.product
    return product.findById({ id })
      .then(({ id }) => {
        return whishlist.findProductByUser({ userId, productId: id })
      })
      .then(({ rows }) => {
        if (rows.length > 0) {
          throw new Error('Product already exists in the whishlist')
        }
        else {
          return whishlist.create({ userId, productId: id })
        }
      })
      .then(({ rows }) => {
        const [first] = rows
        return res
          .status(201)
          .json({ id: first.id })
      })
      .catch(next)
  }

  const remove = (req, res, next) => {
    const userId = res.locals.user
    const { productId } = req.body
    return whishlist.remove({ userId, productId })
      .then(({ rows }) => {
        if (rows.length > 0) {
          const [first] = rows
          return res
            .status(200)
            .json({ id: first.id })
        }
        else {
          return res
            .status(404)
            .json({ message: 'Product not found' })
        }
      })
      .catch(next)
  }

  const findAll = (req, res, next) => {
    const { page } = req.query
    const userId = res.locals.user
    return whishlist.findAllByUser({ userId, page })
      .then(async ({ rows }) => {
        if (rows.length > 0) {
          const productsId = rows.map((item) => item.product_id)
          const products = await product.findManyById({ productsId })
          return res
            .status(200)
            .json({ meta: { page: page || 1 }, products })
        }
        else {
          return res
            .status(404)
            .json({ message: 'No products found in your wishlist' })
        }
      })
      .catch(next)
  }

  return {
    create,
    remove,
    findAll
  }

}
