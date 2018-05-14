const { addUserStatus } = require('./middleware');
const getMemberData = require('../model/queries/getMemberData');

exports.get = (req, res) => {
  // const user = addUserStatus(req);
  // console.log('user: ', user);
  getMemberData(req.user.github_id).then((user) => {
    console.log(user);
    res.render('profile', { activePage: { profile: true }, user });
  });
};
