/**
 * @module middlewares/validator
 */

const { validationResult } = require('express-validator')

/**
 * Retrieves validation errors
 * @param {Request} req 
 * @param {Reques} res 
 * @param {NextFunction} next 
 */
const validator = (req, res, next) => {
  const result = validationResult(req)
  if (result.isEmpty()) {
    return next()
  }
  else {
    return res
      .status(422)
      .json({ errors: validationResult(req).array() })
  }
}

module.exports = validator
