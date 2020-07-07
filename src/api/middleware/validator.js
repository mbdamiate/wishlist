module.exports = ({ expressValidator }) => {
  const email = expressValidator
    .check('email')
    .exists()
    .isEmail()
    .withMessage('must be a valid email');

  const uuid = expressValidator
    .check('product.id')
    .exists()
    .isUUID()
    .withMessage('must be a valid UUID');

  const fullName = expressValidator
    .check('fullName')
    .exists()
    .isString()
    .withMessage('must be a valid full name');

  const end = (req, res, next) => {
    const result = expressValidator.validationResult(req);
    if (result.isEmpty()) {
      return next();
    } else {
      return res.status(422).json({
        errors: expressValidator.validationResult(req).array()
      });
    }
  };

  return {
    end,
    email,
    uuid,
    fullName
  };
};
