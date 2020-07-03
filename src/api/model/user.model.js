module.exports = ({ pool, errors }) => {
  const create = ({ email, fullName }) => {
    const command = `
      INSERT INTO
          app_user (email, full_name)
      VALUES
          ($1, $2)
      RETURNING
          id, email, full_name`;
    return pool
      .query(command, [email, fullName])
      .then(({ rows }) => ({ rows }))
      .catch((error) => {
        if (error.code === "23505") {
          throw new errors.ConflictError("User already exists");
        } else {
          throw new errors.SQLError(error);
        }
      });
  };

  const update = ({ id, fullName }) => {
    const command = `
      UPDATE
          app_user
      SET
          full_name = $2,
          updated_at = now()
      WHERE
          id = $1
          AND
          deleted_at IS NULL
      RETURNING
          id, email, full_name`;
    return pool
      .query(command, [id, fullName])
      .then(({ rows }) => ({ rows }))
      .catch((error) => {
        throw new errors.SQLError(error);
      });
  };

  const remove = ({ id }) => {
    const command = `
      DELETE FROM
          app_user
      WHERE
          id = $1
      RETURNING
          id`;
    return pool
      .query(command, [id])
      .then(({ rows }) => ({ rows }))
      .catch((error) => {
        throw new errors.SQLError(error);
      });
  };

  const findAll = ({ page = 1 }) => {
    const command = `
      SELECT
          app_user.id,
          app_user.email,
          app_user.full_name
      FROM
          app_user
      WHERE
          app_user.deleted_at IS NULL
      ORDER BY
          app_user.created_at
      OFFSET $1
      FETCH FIRST 100 ROWS ONLY`;
    return pool
      .query(command, [page > 1 ? page * 100 + 1 : 0])
      .then(({ rows }) => ({ rows }))
      .catch((error) => {
        throw new errors.SQLError(error);
      });
  };

  const findByEmail = ({ email }) => {
    const command = `
      SELECT
          app_user.id,
          app_user.email,
          app_user.full_name
      FROM
          app_user
      WHERE
          app_user.email = $1`;
    return pool
      .query(command, [email])
      .then(({ rows }) => ({ rows }))
      .catch((error) => {
        throw new errors.SQLError(error);
      });
  };

  return {
    create,
    update,
    remove,
    findAll,
    findByEmail,
  };
};
