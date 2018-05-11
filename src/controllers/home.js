exports.get = (req, res) => {
  if (req.session.isPopulated) {
    res.render('home', { activePage: { home: true }, loggedIn: true });
  } else {
    res.render('home', { activePage: { home: true } });
  }
};
