const { addUserStatus } = require('./middleware');
exports.get = (req, res) => {
  let user = addUserStatus(req);
  res.render('profile', { activePage: { profile: true }, user });
};
