exports.get = (req, res) => {
  const { user } = req;
  res.render('profileDetails', { activePage: { profile: true }, user });
};
