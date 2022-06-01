const { Router } = require('express');
const {
    getRandoms
} = require('../../controllers/randoms.controllers');

const randomRouter = new Router();

randomRouter.get('/', getRandoms);

module.exports = randomRouter;