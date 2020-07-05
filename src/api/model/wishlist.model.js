module.exports = ({ pool, errors }) => {
  const create = ({ userId, productId }) => {
    const command = `
      INSERT INTO
          app_wishlist (user_id, product_id)
      VALUES
          ($1, $2)
      RETURNING id`;
    return pool
      .query(command, [userId, productId])
      .then(({ rows }) => {
        if (rows.length > 0) {
          return { rows };
        } else {
          throw new errors.NotFoundError('Users not found');
        }
      })
      .catch((error) => {
        throw new errors.SQLError(error);
      });
  };

  const remove = ({ userId, productId }) => {
    const command = `
      DELETE FROM
          app_wishlist
      WHERE
          user_id = $1
          AND
          product_id = $2
      RETURNING id`;
    return pool
      .query(command, [userId, productId])
      .then(({ rows }) => {
        if (rows.length > 0) {
          return { rows };
        } else {
          throw new errors.NotFoundError('Users not found');
        }
      })
      .catch((error) => {
        throw new errors.SQLError(error);
      });
  };

  const findAllByUser = ({ userId, page = 1 }) => {
    const command = `
      SELECT
          id,
          user_id,
          product_id
      FROM
          app_wishlist
      WHERE
          user_id = $1
      ORDER BY
          created_at
      OFFSET $2
      FETCH FIRST 100 ROWS ONLY`;
    return pool
      .query(command, [userId, page > 1 ? page * 100 + 1 : 0])
      .then(({ rows }) => {
        if (rows.length > 0) {
          return { rows };
        } else {
          throw new errors.NotFoundError('Products not found');
        }
      })
      .catch((error) => {
        throw new errors.SQLError(error);
      });
  };

  const findProductByIdAndUserId = ({ userId, productId }) => {
    const command = `
      SELECT
          id,
          user_id,
          product_id
      FROM
          app_wishlist
      WHERE
          user_id = $1
          AND
          product_id = $2`;
    return pool
      .query(command, [userId, productId])
      .then(({ rows }) => ({ rows }))
      .catch((error) => {
        throw new errors.SQLError(error);
      });
  };

  return {
    create,
    remove,
    findAllByUser,
    findProductByIdAndUserId,
  };
};
