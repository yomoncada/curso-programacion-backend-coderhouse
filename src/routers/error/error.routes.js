const { Router } = require('express');
const {
    loginError,
    registerError
} = require('../../controllers/error.controllers');

const errorRouter = new Router();

errorRouter.get('/login-error', loginError);
errorRouter.get('/register-error', registerError);

module.exports = errorRouter;