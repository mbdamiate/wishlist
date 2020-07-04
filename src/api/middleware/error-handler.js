module.exports = () => {
  const errorHandler = (error, req, res, next) => {
    return res.status(error.code || 500).json({ error: error.message });
  };

  return errorHandler;
};
