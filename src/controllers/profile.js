const { addUserStatus } = require('./middleware');
const { saveProfileData } = require('../model/queries/');

exports.get = (req, res) => {
  const user = addUserStatus(req);
  console.log(user);
  res.render('profile', { activePage: { profile: true }, user });
};

exports.postDetails = (req, res) => {
  // post user data (req.body) to database
  console.log('form data: ', req.body);
  saveProfileData(req.body, req.user.github_id)
    .then(() => res.redirect(`/myprofile/${req.user.github_id}`))
    .catch(err => console.log(err));
};
