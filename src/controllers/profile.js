const { addUserStatus } = require('./middleware');
const { saveProfileData, saveJobDetails } = require('../model/queries/');

exports.get = (req, res) => {
  const user = addUserStatus(req);
  res.render('profile', { activePage: { profile: true }, user });
};

exports.postDetails = (req, res, next) => {
  saveProfileData(req.body, req.user.github_id)
    .then(() => res.redirect(`/myprofile/${req.user.github_id}`))
    .catch((err) => {
      console.log('Error saving user details: ', err.message);
      next(err);
    });
};

exports.postJobDetails = (req, res, next) => {
  saveJobDetails(req.body, req.user.github_id)
    .then(() => res.redirect(`/myprofile/${req.user.github_id}`))
    .catch((err) => {
      console.log('Error saving job details: ', err.message);
      next(err);
    });
};
