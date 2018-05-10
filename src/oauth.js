/* eslint-disable */
const passport = require('passport');
const Strategy = require('passport-github2').Strategy;

// this is the database!!
// const User = require('../models/user');


(function config() {
  passport.use(new Strategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: `${process.env.BASE_URL}/auth/github/callback`,
    },
    ((accessToken, refreshToken, profile, done) => {
      console.log('strategy success!! ');
      console.log(profile._json);
      return done(null, profile);
    }),
  ));
  // profile ID info needs to go into the database or check against what is in the DB
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    // need to get the user id from the dtb
  // User.findById(id, (err, user) => {
  //   done(err, user);
  // });
  });
})();
