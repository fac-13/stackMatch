exports.get = (req, res) => {
  const { user } = req;
  res.render('profile', { activePage: { profile: true }, user });
};
