const { Router } = require('express');
const {
    renderLogin,
    renderRegister,
    redirectToHome,
    logout
} = require('../../controllers/auth.controllers');
const auth = require('../../middlewares/auth');
const passport = require('../../middlewares/passport');

const authRouter = new Router()

authRouter.route('/login')
    .get(renderLogin)
    .post(
        passport.authenticate('login', { failureRedirect: '/login-error' }), 
        redirectToHome
    );

authRouter.route('/register')
    .get(renderRegister)
    .post(
        passport.authenticate('register', { failureRedirect: '/register-error' }), 
        redirectToHome
    );

authRouter.get('/logout', auth.isLoggedIn, logout)

module.exports = authRouter