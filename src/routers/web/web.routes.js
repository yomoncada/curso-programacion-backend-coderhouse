const { Router } = require('express');
const {
    renderHome
} = require('../../controllers/web.controllers');
const authMiddleware = require('../../middlewares/auth');
const loggerUtil = require('../../utils/logger.utils');

const webRouter = new Router();

webRouter.get('/', authMiddleware.isLoggedIn, renderHome);
webRouter.all('*', (req, res) => {
    loggerUtil.write('warn', `La ruta [${req.method}] ${req.protocol + '://' + req.get('host') + req.originalUrl} es inexistente en el servidor.`);
    res.json({status: false});
});

module.exports = webRouter;