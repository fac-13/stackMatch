const router = require('express').Router();
const passport = require('passport');

const home = require('./home');
const profileDetails = require('./profileDetails');
// const auth = require('./auth');

router.get('/', home.get);

// MIDDLEWARE to ensure used is authenticated
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    // req.user is available for use here
    return next();
  }
  // denied - should redirect to login
  res.redirect('/');
}

// auth routes
router.get(
  '/auth/github/signup',
  passport.authenticate('github', { scope: ['read:org'] })
);

router.get(
  '/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  (req, res) => {
    // Successful authentication, redirect home.
    console.log('success!!!');
    console.log(req.url);
    res.redirect('/');
  },
);

// TODO check session management is working
router.get('/auth/github/logout', (req, res) => {
  console.log('logout!!!');
  req.session = null;
  req.logout();
  res.redirect('/');
});

router.get(
  '/myprofile/mydetails/edit', ensureAuthenticated, profileDetails.get
);


// router.get('/auth/github/signup', auth.signup);
// router.get('/auth/github/callback', auth.signupCallback);
// router.get('/auth/github/logout', auth.logout);


module.exports = router;
