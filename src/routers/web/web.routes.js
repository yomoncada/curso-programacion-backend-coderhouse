const { Router } = require('express');
const auth = require('../../middlewares/auth');

const webRouter = new Router()

webRouter.get('/home', auth.canBeHere, (req, res) => {
    const user = req.user;

    res.render('pages/home.ejs', { username: user.email })
})

module.exports = webRouter