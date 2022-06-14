const { Router } = require('express');
const randomControllers = require('../../controllers/random.controllers');

const router = new Router();

class randomRoutes {
    constructor() {
      this.controller = new randomControllers();
    }

    initialize(prefix = "") {
        router.get(`${prefix}/`, this.controller.getRandoms);

        return router;
    }
}

module.exports = new randomRoutes();