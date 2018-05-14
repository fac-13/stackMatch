const { addUserStatus } = require('./middleware');
exports.get = (req, res) => {
  let user;
  if (req.session.isPopulated) {
    user = addUserStatus(req);
  }
  res.render('home', { activePage: { home: true }, user });
};
