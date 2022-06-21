const { Router } = require('express');
const WebControllers = require('../../controllers/web.controllers');
const authMiddleware = require('../../middlewares/auth.middleware');
const loggerUtil = require('../../utils/logger.utils');

const router = new Router();
class WebRoutes {
    constructor() {
      this.controller = new WebControllers();
    }

    initialize(prefix = "") {
        router.get(`${prefix}/`, authMiddleware.isLoggedIn, this.controller.renderHome);
        router.all('*', (req, res) => {
            loggerUtil.write('warn', `La ruta [${req.method}] ${req.protocol + '://' + req.get('host') + req.originalUrl} es inexistente en el servidor.`);
            res.json({status: false});
        });

        return router;
    }
}

module.exports = new WebRoutes();