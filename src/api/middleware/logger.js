module.exports = ({ winston, expressWinston }) => {
  const logger = expressWinston.logger({
    transports: [
      new winston.transports.File({
        filename: 'logs/combined.log',
        level: 'info'
      }),
      new winston.transports.File({
        filename: 'logs/error.log',
        level: 'error'
      })
    ],
    format: winston.format.json(),
    meta: false,
    msg:
      'HTTP {{req.method}} {{res.statusCode}} {{req.url}} {{res.responseTime}}ms',
    colorize: false
  });

  return logger;
};
