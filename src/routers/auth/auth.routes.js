const { Router } = require('express');
const {
    renderLogin,
    renderRegister,
    redirectToHome,
    logout
} = require('../../controllers/auth.controllers');
const authMiddleware = require('../../middlewares/auth');
const passportMiddleware = require('../../middlewares/passport');

const authRouter = new Router()

authRouter.route('/login')
    .get(renderLogin)
    .post(
        passportMiddleware.authenticate('login', { failureRedirect: '/login-error' }), 
        redirectToHome
    );

authRouter.route('/register')
    .get(renderRegister)
    .post(
        passportMiddleware.authenticate('register', { failureRedirect: '/register-error' }), 
        redirectToHome
    );

authRouter.get('/logout', authMiddleware.isLoggedIn, logout)

module.exports = authRouter