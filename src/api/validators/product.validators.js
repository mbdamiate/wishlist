/**
 * @module validators/user
 */

const validator = require('express-validator')

const queryValidPage = validator.query('page')
  .not().isEmpty().withMessage('must exists')
  .isDecimal().withMessage('must be a number')
  .custom((value, { req }) => {
    if (value > 0) {
      return true
    }
    else {
      return false
    }
  })
  .withMessage('must be greater than or equal to one')

const paramValidId = validator.param('id')
  .exists().withMessage('must be exists')
  .isUUID().withMessage('must be UUID')

module.exports = {
  queryValidPage,
  paramValidId,
}
