const { Router } = require('express');
const RandomControllers = require('../../controllers/random.controllers');

const router = new Router();

class RandomRoutes {
    constructor() {
      this.controller = new RandomControllers();
    }

    initialize(prefix = "") {
        router.get(`${prefix}/`, this.controller.getRandoms);

        return router;
    }
}

module.exports = new RandomRoutes();