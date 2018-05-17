const router = require('express').Router();
const passport = require('passport');

// import routes
const home = require('./home');
const profile = require('./profile');
const allMembers = require('./allMembers');
const error = require('./error');
const { ensureAuthenticated } = require('./middleware');

// UNPROTECTED ROUTES //
router.get('/', home.get);
router.get('/notmember', (req, res) => {
  res.render('notmember');
});
router.get('/goodbye', (req, res) => {
  req.session = null;
  req.logout();
  res.render('goodbye');
});


// PROTECTED ROUTES //
router.get('/allmembers', ensureAuthenticated, allMembers.get);
router.get('/myprofile/:github_id', ensureAuthenticated, profile.get);
router.post('/savePersonalDetails', ensureAuthenticated, profile.postDetails);
router.post('/saveJobDetails', ensureAuthenticated, profile.postJobDetails);
router.post('/saveStackDetails', ensureAuthenticated, profile.postStackDetails);
router.delete('/deleteAccount', ensureAuthenticated, profile.delete);
// middleware to take user to goodbye page after deletion

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
          req.session.registeredProfile = true;
          return res.redirect(`/myprofile/${req.user.github_id}`);
        } else if (info.message === 'Signup successful') {
          req.session.registeredProfile = false;
          return res.redirect(`/myprofile/${req.user.github_id}`);
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
