
const validator = require('express-validator')

const paramValidId = validator.param('id')
  .exists().withMessage('must be exists')
  .isUUID().withMessage('must be UUID')

const bodyValidEmail = validator.body('email')
  .exists().withMessage('must be exists')
  .isEmail().withMessage('must be a valid email')

const bodyValidFullName = validator.body('fullName')
  .exists().withMessage('must be exists')
  .isLength({ min: 5 }).withMessage('must be a valid name')

module.exports = {
  paramValidId,
  bodyValidEmail,
  bodyValidFullName
}
