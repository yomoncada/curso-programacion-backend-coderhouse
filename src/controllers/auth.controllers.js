class AuthControllers {
    constructor(service) {
        this.service = service;
        this.renderLogin = this.renderLogin.bind(this);
        this.renderRegister = this.renderRegister.bind(this);
        this.redirectToHome = this.redirectToHome.bind(this);
        this.logout = this.logout.bind(this);
    }

    renderLogin(req, res, next) {
        try {
            res.render('pages/login.ejs');
        } catch(error) {
            next(error);
        }
    };

    renderRegister(req, res, next) {
        try {
            res.render('pages/register.ejs');
        } catch(error) {
            next(error);
        }
    };

    redirectToHome(req, res, next) {
        try {
            res.redirect('/');
        } catch(error) {
            next(error);
        }
    };

    logout(req, res, next) {
        try {
            const user = req.user;

            req.logOut();

            req.session.destroy(error => {
                res.clearCookie('some-session');

                if (error) {
                    res.redirect('/')
                } else {
                    res.render('pages/logout.ejs', { username: user.email })
                }
            });
        } catch(error) {
            next(error);
        }
    };   
}

module.exports = AuthControllers;