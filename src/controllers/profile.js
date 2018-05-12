const { updateUserSession } = require('./middleware');
exports.get = (req, res) => {
  let user = updateUserSession(req);
  res.render('profile', { activePage: { profile: true }, user });
};
