const { validationResult } = require('express-validator')

const validator = (req, res, next) => {
  const result = validationResult(req)

  if (result.isEmpty()) {
    next()
  }

  else {
    res
      .status(422)
      .json({ errors: validationResult(req).array() })
  }
}

module.exports = validator
