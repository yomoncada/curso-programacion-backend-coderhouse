const renderHome = (req, res, next) => res.render('pages/home.ejs', { user: req.user });

module.exports = {
  renderHome
};