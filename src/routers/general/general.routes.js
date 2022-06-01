const { Router } = require('express');
const {
    renderInfo
} = require('../../controllers/general.controllers');
const compression = require('compression');

const generalRouter = new Router();

generalRouter.get('/info', renderInfo);
generalRouter.get('/info-compression', compression(), renderInfo);

module.exports = generalRouter;