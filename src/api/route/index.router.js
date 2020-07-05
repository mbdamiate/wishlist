const { Router } = require('express');

class IndexRouter extends Router {
  constructor(controller) {
    super();

    this.get('/health', controller.health);
  }
}

module.exports = IndexRouter;
