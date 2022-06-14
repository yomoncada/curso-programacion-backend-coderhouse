class WebControllers {
    constructor(service) {
        this.service = service;
        this.renderHome = this.renderHome.bind(this);
    }
  
    renderHome(req, res, next) {
        res.render('pages/home.ejs', { user: req.user });
    }
}

module.exports = WebControllers;