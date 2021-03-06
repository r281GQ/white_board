const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const config = require('./../config')();

const User = mongoose.model('User');

passport.serializeUser(({ id }, done) => done(null, id));

passport.deserializeUser((id, done) =>
  User.findById(id)
    .then(user => done(null, user))
    .catch(error => console.log(error))
);

const mapToDbProps = profile => ({
  name: profile.displayName,
  email: profile.emails[0].value,
  sex: profile.gender,
  googleAuthId: profile.id,
  picture: profile.photos[0].value
});

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password'
    },
    (email, password, done) =>
      User.findOne({ email })
        .then(
          user =>
            !user
              ? done(null, false)
              : bcrypt.compare(
                  password,
                  user.password,
                  (err, result) =>
                    result ? done(null, user) : done(null, false)
                )
        )
        .catch(error => console.log(error))
  )
);

passport.use(
  new GoogleStrategy(
    {
      clientID: config.google.client_id,
      clientSecret: config.google.client_secret,
      callbackURL: '/api/auth/google/callback'
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleAuthId: profile.id })
        .then(
          user =>
            user ? done(null, user) : new User(mapToDbProps(profile)).save()
        )
        .then(user => done(null, user))
        .catch(error => console.log(error));
    }
  )
);
