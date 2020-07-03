module.exports = ({
  route,
  controller,
  middlewares
}) => {

  route.get('/health',
    controller.health)

  route.post('/register',
    middlewares.validator.email,
    middlewares.validator.fullName,
    middlewares.validator.end,
    controller.register)

  return route

}
