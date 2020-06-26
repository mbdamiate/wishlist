const { Router } = require('express')
const route = Router()

const controller = require('../controller/user.controller')

route.get('/', controller.find)

module.exports = route
