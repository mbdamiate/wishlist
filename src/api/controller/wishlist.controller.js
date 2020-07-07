module.exports = ({ models }) => {
  const { wishlist } = models;
  const { product } = models;

  const create = (req, res, next) => {
    const userId = res.locals.user;
    const { id } = req.body.product;
    return product
      .findById({ id })
      .then(({ id }) => {
        return wishlist.findProductByIdAndUserId({
          userId,
          productId: id
        });
      })
      .then(({ rows }) => {
        if (rows.length > 0) {
          res.status(409);
          res.json({ message: 'Product already exists' });
        } else {
          return wishlist.create({ userId, productId: id }).then(({ rows }) => {
            const [first] = rows;
            res.status(201);
            res.json({ id: first.id });
          });
        }
      })
      .catch(next);
  };

  const remove = (req, res, next) => {
    const userId = res.locals.user;
    const { product } = req.body;
    return wishlist
      .remove({ userId, productId: product.id })
      .then(({ rows }) => {
        if (rows.length > 0) {
          const [first] = rows;
          res.status(200);
          res.json({ id: first.id });
        } else {
          res.status(404);
          res.json({ message: 'Product not found' });
        }
      })
      .catch(next);
  };

  const findAll = (req, res, next) => {
    let page = 1;
    if (req.query.page) {
      page = req.query;
    }
    const userId = res.locals.user;
    return wishlist
      .findAllByUser({ userId, page })
      .then(async ({ rows }) => {
        if (rows.length > 0) {
          const productsId = rows.map((item) => item.product_id);
          const products = await product.findManyById({
            productsId
          });
          res.status(200);
          res.json({ meta: { page: page || 1 }, products });
        } else {
          res.status(404);
          res.json({
            message: 'No products found in your wishlist'
          });
        }
      })
      .catch(next);
  };

  return {
    create,
    remove,
    findAll
  };
};
