const { Router } = require('express');
const compression = require('compression');
const generalControllers = require('../../controllers/general.controllers');

const router = new Router();

class generalRoutes {
    constructor() {
      this.controller = new generalControllers();
    }

    initialize(prefix = "") {
        router.get(`${prefix}/info`, this.controller.renderInfo);
        router.get(`${prefix}/info-compression`, compression(), this.controller.renderInfo)   

        return router;
    }
}

module.exports = new generalRoutes();