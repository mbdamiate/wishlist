module.exports = ({
  route,
  controller
}) => {

  route.post('/signin',
    controller.signIn)

  return route

}
