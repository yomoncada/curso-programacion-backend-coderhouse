const { Router } = require('express');
const authControllers = require('../../controllers/auth.controllers');
const auth = require('../../middlewares/auth');
const passport = require('../../middlewares/passport');

const authRouter = new Router()

authRouter.get('/', (req, res) => {
    res.redirect('/app/web/home')
})

authRouter.get('/login', (req, res) => {
    const name = req.session?.name

    if (name) {
        res.redirect('/app/auth/')
    } else {
        res.render('pages/login.ejs')
    }
})

authRouter.get('/register', (req, res) => {
    const name = req.session?.name

    if (name) {
        res.redirect('/app/auth/')
    } else {
        res.render('pages/register.ejs')
    }
})

authRouter.get('/logout', auth.isLoggedIn, (req, res) => {
    const user = req.user;

    req.logOut();

    req.session.destroy(error => {
        res.clearCookie('some-session');

        if (error) {
            res.redirect('/app/auth/')
        } else {
            res.render('pages/logout.ejs', { username: user.email })
        }
    });
})

authRouter.post('/login', 
    passport.authenticate('login', { failureRedirect: '/app/auth/login-error' }),
    authControllers.login
)

authRouter.post('/register',
    passport.authenticate('register', { failureRedirect: '/app/auth/register-error' }), 
    authControllers.register
)

authRouter.get('/login-error', (req, res) => {
    res.render('pages/error.ejs', { error: 'Hubo un problema al intentar iniciar sesión.', href: '/app/auth/login' })
})

authRouter.get('/register-error', (req, res) => {
    res.render('pages/error.ejs', { error: 'Hubo un problema al intentar registrarse.', href: '/app/auth/register' })
})

module.exports = authRouter