const { Router } = require('express');
const ErrorControllers = require('../../controllers/error.controllers');

const router = new Router();

class ErrorRoutes {
    constructor() {
      this.controller = new ErrorControllers();
    }

    initialize(prefix = "") {
        router.get(`${prefix}/login-error`, this.controller.loginError);
        router.get(`${prefix}/register-error`, this.controller.registerError);

        return router;
    }
}

module.exports = new ErrorRoutes();