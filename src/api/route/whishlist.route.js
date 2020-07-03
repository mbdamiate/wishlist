module.exports = ({
  route,
  controller
}) => {

  route.post('/', controller.create)

  route.delete('/', controller.remove)

  route.get('/', controller.findAll)

  return route

}
