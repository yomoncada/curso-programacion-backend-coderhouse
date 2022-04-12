const { Router } = require('express');
const { canBeHere } = require('../../middlewares/auth');

const webRouter = new Router()

webRouter.get('/home', canBeHere, (req, res) => {
    res.render('pages/home.ejs', { name: req.session.name })
})

module.exports = webRouter