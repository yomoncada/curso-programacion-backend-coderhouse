const loginError = (req, res, next) => res.render('pages/error.ejs', {error: 'Hubo un problema al intentar iniciar sesión.', href: '/login'});

const registerError = (req, res, next) => res.render('pages/error.ejs', {error: 'Hubo un problema al intentar registrarse.', href: '/register'});

module.exports = {
    loginError,
    registerError
};