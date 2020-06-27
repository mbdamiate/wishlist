
const validator = require('express-validator')

const paramValidId = validator.param('id')
  .exists().withMessage('must be exists')
  .isUUID().withMessage('must be UUID')

const paramValidEmail = validator.param('email')
  .exists().withMessage('must be exists')
  .isEmail().withMessage('must be a valid email')

const bodyValidEmail = validator.body('email')
  .exists().withMessage('must be exists')
  .isEmail().withMessage('must be a valid email')

const bodyValidFullName = validator.body('fullName')
  .exists().withMessage('must be exists')
  .isLength({ min: 5 }).withMessage('must be a valid name')

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
