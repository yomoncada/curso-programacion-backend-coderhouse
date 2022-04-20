const register = async (req, res, next) => res.redirect('/app/web/home');

const login = async (req, res, next) => res.redirect('/app/web/home');

module.exports = {
  login,
  register,
}