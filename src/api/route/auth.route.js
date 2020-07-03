module.exports = ({ route, controller, middlewares }) => {
  route.post(
    "/register",
    middlewares.validator.email,
    middlewares.validator.fullName,
    middlewares.validator.end,
    controller.register
  );

  route.post(
    "/signin",
    middlewares.validator.email,
    middlewares.validator.end,
    controller.signIn
  );

  return route;
};
