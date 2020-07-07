module.exports = ({ route, controller, middlewares }) => {
  route.post(
    '/',
    middlewares.validator.uuid,
    middlewares.validator.end,
    controller.create
  );

  route.delete(
    '/',
    middlewares.validator.uuid,
    middlewares.validator.end,
    controller.remove
  );

  route.get('/', controller.findAll);

  return route;
};
