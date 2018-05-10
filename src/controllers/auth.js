// const passport = require('passport');

// exports.signup = () => {
//   console.log('reached sign up router');
//   passport.authenticate('github', { scope: ['read:org'] });
// };

// exports.signupCallback = (req, res) => {
//   console.log('reached sign up github');
//   passport.authenticate('github', { failureRedirect: '/login' }), (req, res) => {
//     // Successful authentication, redirect home.
//     console.log('success!!!');
//     console.log(req.user);
//     res.redirect('/');
//   };
// };

// exports.logout = (req, res) => {
//   req.session = null;
//   req.logout();
//   res.redirect('/');
// };

