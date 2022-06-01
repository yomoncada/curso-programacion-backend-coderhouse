const { Router } = require('express');
const {
    renderHome
} = require('../../controllers/web.controllers');
const auth = require('../../middlewares/auth');
const logger = require('../../utils/logger.utils');

const webRouter = new Router();

webRouter.get('/', auth.isLoggedIn, renderHome);
webRouter.all('*', (req, res) => {
    logger.write('warn', `La ruta [${req.method}] ${req.protocol + '://' + req.get('host') + req.originalUrl} es inexistente en el servidor.`);
    res.json({status: false});
});

module.exports = webRouter;