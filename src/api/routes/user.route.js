
const { Router } = require('express')
const route = Router()

const validator = require('../middlewares/validator.middleware')

const controller = require('../controller/user.controller')
const validation = require('../validators/user.validators')

route.get('/',
  validation.queryValidEmail,
  validator,
  controller.list
)

route.post('/',
  validation.bodyValidEmail,
  validation.bodyValidFullName,
  validator,
  controller.create
)

route.get('/:id',
  validation.paramValidId,
  validator,
  controller.searchById
)

route.get('/:email',
  validation.paramValidEmail,
  validator,
  controller.searchByEmail
)

route.put('/:id',
  validation.paramValidId,
  validator,
  controller.update
)

route.delete('/:id',
  validation.paramValidId,
  validator,
  controller.remove
)

module.exports = route
