const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const { UsersDao } = require('../model/daos/index');

const User = new UsersDao();

const salt = () => bcrypt.genSaltSync(10);
const createHash = (password) => bcrypt.hashSync(password, salt());
const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password);

passport.use('login', new LocalStrategy(async (req, username, password, done) => {
  try {
    const user = await User.getByEmail(username);

    if (!isValidPassword(user, password)) {
      return done(null, false);
    }

    return done(null, user);
  } catch (error) {
    return done(error);
  }
}));

passport.use('register', new LocalStrategy({
    passReqToCallback: true
  }, async (username, password, done) => {
    try {
      const newUser = {
        email: username,
        password: createHash(password)
      };

      const user = await User.create(newUser);

      return done(null, user);
    } catch (error) {
      return done(error);
    }
}));

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.get(id);
  done(null, user);
})

module.exports = passport;
