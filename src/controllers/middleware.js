// MIDDLEWARE to ensure user is authenticated
exports.updateUserSession = (req, res, next) => {
  let userInfo;
  if (req.isAuthenticated()) {
    userInfo = req.user;
    if (req.session.registeredProfile) {
      userInfo.session = {
        login: true,
        signup: false,
      };
      return next(null, userInfo);
    }
    userInfo.session = {
      login: false,
      signup: true,
    };
    return next(null, userInfo);
  }

  userInfo = {
    session: {
      login: false,
      signup: false,
    },
  };
  req.user = userInfo;
  return next();
};
// denied - should redirect to login;

exports.protectedRoute = (req, res, next) => {
  if (!req.user.session.login && !req.user.session.signup) {
    return res.redirect('/');
  }
  return next(null, req.user);
};
