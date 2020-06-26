const { Router } = require('express')
const route = Router()
const { validationResult } = require('express-validator')

const controller = require('../controller/user.controller')
const {
  paramValidId,
  bodyValidEmail,
  bodyValidFullName,
  queryValidEmail
} = require('../validators/user.validators')

route.get('/',
  [queryValidEmail],
  (req, res) => validationResult(req).isEmpty()
    ? controller.find(req, res)
    : res
      .status(422)
      .json({ errors: validationResult(req).array() })
)

route.get('/:id',
  [paramValidId],
  (req, res) => validationResult(req).isEmpty()
    ? controller.findById(req, res)
    : res
      .status(422)
      .json({ errors: validationResult(req).array() })
)

route.post('/',
  [bodyValidEmail, bodyValidFullName],
  (req, res) => validationResult(req).isEmpty()
    ? controller.create(req, res)
    : res
      .status(422)
      .json({ errors: validationResult(req).array() })
)

module.exports = route
