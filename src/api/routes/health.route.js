
const { Router } = require('express')
const route = Router()

const process = require('process')

route.get('/', (_, res) => {
  res.json({
    uptime: process.uptime()
  })
})

module.exports = route
