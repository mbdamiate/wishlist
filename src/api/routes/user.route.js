
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
  (req, res) => {
    const result = validationResult(req)
    if (result.isEmpty()) {
      controller.find(req, res)
    }

    else {
      res
        .status(422)
        .json({ errors: result.array() })
    }
  }
)

route.post('/',
  [bodyValidEmail, bodyValidFullName],
  (req, res) => {
    const result = validationResult(req)
    if (result.isEmpty()) {
      controller.create(req, res)
    }

    else {
      res
        .status(422)
        .json({ errors: validationResult(req).array() })
    }
  }
)

route.get('/:id',
  [paramValidId],
  (req, res) => {
    const result = validationResult(req)
    if (result.isEmpty()) {
      controller.findById(req, res)
    }

    else {
      res
        .status(422)
        .json({ errors: validationResult(req).array() })
    }
  }
)

route.put('/:id',
  [paramValidId],
  (req, res) => {
    const result = validationResult(req)
    if (result.isEmpty()) {
      controller.update(req, res)
    }

    else {
      res
        .status(422)
        .json({ errors: validationResult(req).array() })
    }
  }
)

module.exports = route
