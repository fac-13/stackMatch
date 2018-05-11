exports.ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    // req.user is available for use here
    return next();
  }
  res.redirect('/');
}
