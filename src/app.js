// Import modules
const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');

const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');

require('dotenv').config();

// Import Passport and strategy
const passport = require('passport');
const Strategy = require('passport-github2').Strategy;

// Import Constrollers
const controllers = require('./controllers/');

// Passport oAuth Strategy set up
passport.use(
  new Strategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.BASE_URL + '/auth/github/callback'
    },
    function (accessToken, refreshToken, profile, done) {
      console.log('strategy success!! ')
      console.log(profile._json);
      return done(null, profile);
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

// Config express app
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine(
  'hbs',
  exphbs({
    extname: 'hbs',
    layoutsDir: path.join(__dirname, 'views', 'layouts'),
    partialsDir: path.join(__dirname, 'views', 'partials'),
    defaultLayout: 'main',
  }),
);

app.use(bodyParser.json());
// app.use(bodyParser.urlencoded());

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY]
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(controllers);


module.exports = app;
