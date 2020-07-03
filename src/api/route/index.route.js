module.exports = ({
  route,
  controller
}) => {

  route.get('/health',
    controller.health)

  return route

}
