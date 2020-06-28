/**
 * @module validators/user
 */

const validator = require('express-validator')

/**
 * Validation of the id passed by the params
 */
const paramValidId = validator.param('id')
  .exists().withMessage('must be exists')
  .isUUID().withMessage('must be UUID')

/**
 * Validation of the email passed by the params
 */
const paramValidEmail = validator.param('email')
  .exists().withMessage('must be exists')
  .isEmail().withMessage('must be a valid email')

/**
 * Validation of the email passed by the body
 */
const bodyValidEmail = validator.body('email')
  .exists().withMessage('must be exists')
  .isEmail().withMessage('must be a valid email')

/**
 * Validation of the full name passed by the body
 */
const bodyValidFullName = validator.body('fullName')
  .exists().withMessage('must be exists')
  .isLength({ min: 5 }).withMessage('must be a valid name')

/**
 * Validation of the email passed by the query
 */
const queryValidEmail = validator.query('email')
  .if(validator.query('email').exists())
  .isEmail().withMessage('must be a valid email')

module.exports = {
  paramValidId,
  paramValidEmail,
  bodyValidEmail,
  bodyValidFullName,
  queryValidEmail
}
