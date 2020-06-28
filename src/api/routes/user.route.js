
const { Router } = require('express')
const route = Router()

const validator = require('../middlewares/validator.middleware')
const validation = require('../validators/user.validators')
const controller = require('../controller/user.controller')

route.get('/',
  validation.queryValidEmail,
  validator,
  controller.find
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
  controller.findById
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
