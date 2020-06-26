const { Router } = require('express')
const route = Router()
const { validationResult } = require('express-validator')

const { paramValidId, bodyValidEmail, bodyValidFullName } = require('../validators/user.validators')
const controller = require('../controller/user.controller')

route.get('/',
  [],
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
