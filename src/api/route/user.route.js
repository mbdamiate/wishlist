module.exports = ({ route, controller, middlewares }) => {
  route.get("/", controller.findAll);

  route.patch(
    "/",
    middlewares.validator.fullName,
    middlewares.validator.end,
    controller.update
  );

  route.delete("/", controller.remove);

  return route;
};
