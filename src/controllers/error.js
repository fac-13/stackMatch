// handle client and server errors

exports.client = (req, res) => {
  res
    .status(404)
    .send('404.html');
};

exports.server = (err, req, res, next) => {
  console.log(err.message);
  res
    .status(500)
    .send('500.html');
};
