module.exports = () => {
  const health = (_, res) => {
    return res.status(200).json({ uptime: process.uptime() });
  };

  return {
    health,
  };
};
