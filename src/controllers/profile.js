const { addUserStatus } = require('./middleware');

exports.get = (req, res) => {
  const user = addUserStatus(req);
  res.render('profile', { activePage: { profile: true }, user });
};
