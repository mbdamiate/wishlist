
module.exports = (request) => {

  const find = (page = 1) => {
    return request
      .get(`http://challenge-api.luizalabs.com/api/product/?page=${page}`)
  }
  
  const findById = (id) => {
    return request
      .get(`http://challenge-api.luizalabs.com/api/product/${id}`)
  }

  return {
    find,
    findById
  }

}
