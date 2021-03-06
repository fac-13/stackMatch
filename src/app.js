// import modules
const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const passport = require('passport');
const cookieSession = require('cookie-session');
require('dotenv').config();

// import route controllers & helpers
const controllers = require('./controllers/index');
const helpers = require('./views/helpers/index');

// github oauth 2.0 passport setup
require('./oauth');

// express app
const app = express();

// security
app.disable('x-powered-by');
app.use(helmet());

// config view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine(
  'hbs',
  exphbs({
    extname: 'hbs',
    layoutsDir: path.join(__dirname, 'views', 'layouts'),
    partialsDir: path.join(__dirname, 'views', 'partials'),
    defaultLayout: 'main',
    helpers,
  }),
);

// config middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieSession({
  name: 'sessionstack',
  // secure: true,
  // httpOnly: true,
  maxAge: 24 * 60 * 60 * 1000,
  keys: [process.env.COOKIE_KEY],
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, '..', 'public')));

// config route controller
app.use(controllers);

module.exports = app;
