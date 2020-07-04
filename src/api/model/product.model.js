module.exports = ({ request, errors }) => {
  const urlBase = 'http://challenge-api.luizalabs.com/api/product';

  const findById = ({ id }) => {
    return request
      .get(`${urlBase}/${id}`)
      .then(({ data }) => {
        return data;
      })
      .catch((error) => {
        throw new errors.RequestError(error.message);
      });
  };

  const findManyById = async ({ productsId }) => {
    const products = [];
    for (let id of productsId) {
      const product = await findById({ id });
      products.push(product);
    }
    return products;
  };

  return {
    findById,
    findManyById,
  };
};
