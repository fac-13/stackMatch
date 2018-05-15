const router = require('express').Router();
const passport = require('passport');

// import routes
const home = require('./home');
const profile = require('./profile');
const allMembers = require('./allMembers');
const error = require('./error');
const { ensureAuthenticated } = require('./middleware');
const saveJobDetails = require('../model/queries/saveJobDetails');

// UNPROTECTED ROUTES //
router.get('/', home.get);
router.get('/notmember', (req, res) => {
  res.send('You are not a member of the Founders and Coders Github organization. You must be a member in order to sign up and use StackMatch');
});

// PROTECTED ROUTES //
router.get('/allmembers', ensureAuthenticated, allMembers.get);
router.get('/myprofile/:github_id', ensureAuthenticated, profile.get);
router.post('/savePersonalDetails', ensureAuthenticated, (req, res) => {
  // post user data (req.body) to database
  res.redirect('/myprofile/:github_id');
});
router.post('/saveJobDetails', ensureAuthenticated, (req, res) => {
  saveJobDetails(req.body, req.user.github_id).then(() => {
    res.redirect('/myprofile/:github_id');
  })
    .catch(err => console.log('Error saving job details: ', err));
});

// AUTHENTICATION ROUTES //
router.get(
  '/auth/github/signup',
  passport.authenticate('github', { scope: ['read:org'] }),
);

router.get(
  '/auth/github/callback',
  // passport.authenticate custom callback - see passport documentation
  (req, res, next) => {
    passport.authenticate('github', (err, user, info) => {
      if (err) { return next(err); }
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
