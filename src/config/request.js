
const axios = require('axios')

const requestInstance = axios.create({
  timeout: 5000,
})

module.exports = requestInstance
