module.exports = ({ app, middlewares, resources }) => {
  app.use(middlewares.logger);
  app.use(middlewares.methodOverride());
  app.use(middlewares.cors());
  app.use(middlewares.compression());
  app.use(middlewares.bodyParser.json());
  app.use(middlewares.bodyParser.urlencoded({ extended: false }));
  app.use(middlewares.helmet());

  app.use('/api/auth', resources.auth);

  app.use('/api/users', middlewares.jwtValidation, resources.user);

  app.use('/api/wishlist', middlewares.jwtValidation, resources.wishlist);

  app.use('/api', resources.index);

  app.use(middlewares.errorHandler);

  return app;
};
