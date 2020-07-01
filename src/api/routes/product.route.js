
module.exports = (route, controller, validator, validation) => {

  route.get('/',
    validation.queryValidPage,
    validator,
    controller.find)

  route.get('/:id',
    validation.paramValidId,
    validator,
    controller.findById)

  return route

}
