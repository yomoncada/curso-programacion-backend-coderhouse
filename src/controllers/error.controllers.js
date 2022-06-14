class ErrorControllers {
    constructor(service) {
        this.service = service;
        this.loginError = this.loginError.bind(this);
        this.registerError = this.registerError.bind(this);
    }
    
    loginError(req, res, next) {
        try {
            res.render('pages/error.ejs', {error: 'Hubo un problema al intentar iniciar sesión.', href: '/login'});
        } catch(error) {
            next(error);
        }
    }

    
    registerError(req, res, next) {
        try {
            res.render('pages/error.ejs', {error: 'Hubo un problema al intentar registrarse.', href: '/register'});
        } catch(error) {
            next(error);
        }
    }
}

module.exports = ErrorControllers;