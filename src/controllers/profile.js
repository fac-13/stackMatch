const { addUserStatus } = require('./middleware');
const getMemberData = require('../model/queries/getMemberData');

exports.get = (req, res) => {
  getMemberData(req.user.github_id).then((user) => {
    res.render('profile', { activePage: { profile: true }, user });
  });
};
