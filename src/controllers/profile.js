const { addUserStatus } = require('./middleware');
const {
  saveProfileData, saveJobDetails, getMemberData, deleteMemberFromDB,
} = require('../model/queries/');

exports.get = (req, res) => {
  // this checks if the :github_id in req.params matches (and it's your profile)
  if (+req.params.github_id === +req.user.github_id) {
    const user = addUserStatus(req);
    const profileUser = user;
    profileUser.myProfile = true;
    return res.render('profile', { activePage: { profile: true }, user, profileUser });
  }
  // this renders someone else's profile
  getMemberData(req.params.github_id).then((profileUser) => {
    const user = addUserStatus(req);
    res.render('profile', { activePage: { profile: true }, user, profileUser });
  });
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

exports.delete = (req, res, next) => {
  const { github_id } = req.user;
  deleteMemberFromDB(github_id)
    .then(() => {
      res.status(200);
    })
    .catch((err) => {
      next(err);
    });
};
