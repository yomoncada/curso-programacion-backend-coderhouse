const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const userService = require('../services/user.services');

const salt = () => bcrypt.genSaltSync(10);
const createHash = (password) => bcrypt.hashSync(password, salt());
const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password);

passport.use('login', new LocalStrategy(
    {usernameField: 'email', passwordField: 'password'},
        async (email, password, done) => {
        try {
            const user = await userService.getByEmail(email);

            if (!isValidPassword(user, password)) {
                return done(null, false);
            }

            return done(null, user);
        } catch (error) {
            return done(error);
        }
    })
);

passport.use('register', new LocalStrategy(
  {usernameField: 'email', passwordField: 'password', passReqToCallback: true},
  async (req, email, password, done) => {
    try {
      const newUser = {
        email: email,
        password: createHash(password)
      };

      const user = await userService.create(newUser);

      return done(null, user);
    } catch (error) {
      return done(error);
    }
}));

passport.serializeUser((user, done) => done(null, user._id));

passport.deserializeUser(async (id, done) => {
    try {
        const user = await userService.get(id);
        done(null, user);
    } catch (error) {
        return done(error);
    }
})

module.exports = passport;
