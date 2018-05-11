const router = require('express').Router();
const passport = require('passport');

// import routes
const home = require('./home');
const error = require('./error');


// UNPROTECTED ROUTES //
router.get('/', home.get);
router.get('/notmember', (req, res) => {
  res.send('You are not a member of the Founders and Coders Github organization. You must be a member in order to sign up and use StackMatch');
});

// PROTECTED ROUTES //
router.get('/profile', (req, res) => {
  res.send('profile');
});


// AUTHENTICATION ROUTES //
router.get(
  '/auth/github/signup',
  passport.authenticate('github', { scope: ['read:org'] }),
);

router.get(
  '/auth/github/callback',
  // passport.authenticate must be wrapped in a function
  (req, res, next) => {
    passport.authenticate('github', (err, user, info) => {
      if (info.message === 'Not FAC member') {
        res.redirect('/notmember');
      } else if (info.message === 'Login successful') {
        res.redirect('/profile');
      } else if (info.message === 'Signup successful') {
        res.redirect('/profile');
      }
    // and then invoked by its own arguments to function as proper middleware
    })(req, res, next);
  },
);

router.get('/auth/github/logout', (req, res) => {
  req.session = null;
  req.logout();
  res.redirect('/');
});

// ERROR ROUTES //
router.use(error.client);
router.use(error.server);

module.exports = router;
