// MIDDLEWARE to ensure user is authenticated
exports.ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
};

// Updates user object to include user session
exports.updateUserSession = (req) => {
  // Deep copy of req.user
  let userInfo = JSON.parse(JSON.stringify((req.user)));
  if (req.session.registeredProfile) {
    userInfo.session = {
      login: true,
      signup: false,
    };
  } else {
    userInfo.session = {
      login: false,
      signup: true,
    };
  }
  return userInfo;
};