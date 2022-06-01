const renderLogin = (req, res, next) => res.render('pages/login.ejs');

const renderRegister = (req, res, next) => res.render('pages/register.ejs');

const redirectToHome = (req, res, next) => res.redirect('/');

const logout = (req, res, next) => {
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
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = {
    renderLogin,
    renderRegister,
    redirectToHome,
    logout
}