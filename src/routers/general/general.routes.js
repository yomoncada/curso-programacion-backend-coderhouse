const { Router } = require('express');
const compression = require('compression');
const GeneralControllers = require('../../controllers/general.controllers');

const router = new Router();

class GeneralRoutes {
    constructor() {
      this.controller = new GeneralControllers();
    }

    initialize(prefix = "") {
        router.get(`${prefix}/info`, this.controller.renderInfo);
        router.get(`${prefix}/info-compression`, compression(), this.controller.renderInfo)   

        return router;
    }
}

module.exports = new GeneralRoutes();