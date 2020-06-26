const { Router } = require('express')
const route = Router()

const controller = require('../controller/home.controller')

route.get('/', controller.welcome)

module.exports = route
