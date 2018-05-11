exports.get = (req, res) => {
  res.render('profileDetails', { activePage: { profile: true }, loggedIn: true });
};