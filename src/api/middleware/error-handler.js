module.exports = () => {
  const errorHandler = (error, req, res, next) => {
    console.log(error);
    return res.status(error.code || 500).json({ error: error.message });
  };

  return errorHandler;
};
