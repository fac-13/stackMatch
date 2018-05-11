const router = require('express').Router();
const passport = require('passport');

// import routes
const home = require('./home');
const profileDetails = require('./profileDetails');
const saveProfileDetails = require('./saveProfileDetails');
const error = require('./error');
const { ensureAuthenticated } = require('./middleware');

// UNPROTECTED ROUTES //
router.get('/', home.get);
router.get('/notmember', (req, res) => {
  res.send('You are not a member of the Founders and Coders Github organization. You must be a member in order to sign up and use StackMatch');
});

// PROTECTED ROUTES //
router.get('/myprofile', ensureAuthenticated, (req, res) => {
  res.send('profile');
});
router.get('/myprofile/mydetails/edit', ensureAuthenticated, profileDetails.get);

router.post('/saveDetails', saveProfileDetails.post);

// AUTHENTICATION ROUTES //
router.get(
  '/auth/github/signup',
  passport.authenticate('github', { scope: ['read:org'] }),
);

router.get(
  '/auth/github/callback',
  // passport.authenticate custom callback - see passport documentation
  (req, res, next) => {
    /* eslint consistent-return: off */
    passport.authenticate('github', (authErr, user, info) => {
      if (authErr) { return next(authErr); }
      if (!user) { return res.redirect('/'); }
      req.logIn(user, (err) => {
        if (err) { return next(err); }
        if (info.message === 'Not FAC member') {
          return res.redirect('/notmember');
        } else if (info.message === 'Login successful') {
          return res.redirect('/myprofile');
        } else if (info.message === 'Signup successful') {
          return res.redirect('/myprofile/mydetails/edit');
        }
      });
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
