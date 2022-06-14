const { Router } = require('express');
const AuthControllers = require('../../controllers/auth.controllers');
const authMiddleware = require('../../middlewares/auth.middleware');
const passportMiddleware = require('../../middlewares/passport.middleware');

const router = new Router()

class AuthRoutes {
    constructor() {
      this.controller = new AuthControllers();
    }

    initialize(prefix = "") {
        router.route(`${prefix}/login`)
            .get(this.controller.renderLogin)
            .post(
                passportMiddleware.authenticate('login', { failureRedirect: '/login-error' }), 
                this.controller.redirectToHome
            );

        router.route(`${prefix}/register`)
            .get(this.controller.renderRegister)
            .post(
                passportMiddleware.authenticate('register', { failureRedirect: '/register-error' }), 
                this.controller.redirectToHome
            );

        router.get(`${prefix}/logout`, authMiddleware.isLoggedIn, this.controller.logout);

        return router;
    }
}

module.exports = new AuthRoutes();