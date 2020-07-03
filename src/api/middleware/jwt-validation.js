module.exports = ({
  jsonwebtoken,
  secret
}) => {

  const verifyJWT = (req, res, next) => {
    const { authorization } = req.headers

    if (!authorization) {
      return res
        .status(401)
        .json({ message: 'No token provided' })
    }
    else {
      const [_, token] = authorization.split(' ')
      jsonwebtoken.verify(token, secret, (error, decoded) => {
        if (error) {
          return res
            .status(401)
            .json({ message: 'Unauthorized' })
        }
        else {
          res.locals.user = decoded.user
          next()
        }
      })
    }
  }

  return verifyJWT

}
