// MIDDLEWARE to ensure user is authenticated
exports.ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
};

// Updates user object to include user session
exports.addUserStatus = (req) => {
  // Deep copy of req.user
  const userInfo = JSON.parse(JSON.stringify((req.user)));
  if (req.session.registeredProfile) {
    userInfo.status = {
      login: true,
      signup: false,
    };
  } else {
    userInfo.status = {
      login: false,
      signup: true,
    };
  }
  return userInfo;
};
