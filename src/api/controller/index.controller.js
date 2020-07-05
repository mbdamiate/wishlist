class IndexController {
  constructor() {}

  health(_, res) {
    return res.status(200).json({ uptime: process.uptime() });
  }
}

module.exports = IndexController;
