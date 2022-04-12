const { Router } = require('express');
const { isLoggedIn } = require('../../middlewares/auth');

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

authRouter.get('/logout', (req, res) => {
    const name = req.session?.name;

    if (name) {
        req.session.destroy(err => {
            if (!err) {
                res.render('pages/logout.ejs', { name })
            } else {
                res.redirect('/app/auth/')
            }
        })
    } else {
        res.redirect('/app/auth/')
    }
})

authRouter.get('/unathorized', (req, res) => {
    res.render('pages/unathorized.ejs')
})

authRouter.post('/login', (req, res) => {
    req.session.name = req.body.name
    res.redirect('/app/web/home')
})

module.exports = authRouter