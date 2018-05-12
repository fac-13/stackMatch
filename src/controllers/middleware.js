// MIDDLEWARE to ensure user is authenticated
exports.ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
};

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
  return next();
};