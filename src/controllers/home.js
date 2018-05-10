exports.get = (req, res) => {
  console.log('sesh', req.session);
  if (Object.keys(req.session).length === 0) {
    res.render('home', { activePage: { home: true }, loggedOut: true });
  } else {
    res.render('home', { activePage: { home: true } });
  }
};
