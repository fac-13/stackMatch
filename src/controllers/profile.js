const { addUserStatus } = require('./middleware');
const { saveProfileData } = require('../model/queries/');

exports.get = (req, res) => {
  const user = addUserStatus(req);
  res.render('profile', { activePage: { profile: true }, user });
};

exports.postDetails = (req, res, next) => {
  saveProfileData(req.body, req.user.github_id)
    .then(() => res.redirect(`/myprofile/${req.user.github_id}`))
    .catch((err) => {
      console.log(err);
      next(err);
    });
};
