/* eslint-disable */
const passport = require('passport');
const Strategy = require('passport-github2').Strategy;

const postMemberInfo = require('./model/queries/postMemberInfo.js');
const getMemberData = require('./model/queries/getMemberData.js');


(function config() {
  passport.use(new Strategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: `${process.env.BASE_URL}/auth/github/callback`,
    },
    ((accessToken, refreshToken, profile, next) => {

      let memberProfile = {
        github_id: profile._json.id,
        github_handle: profile._json.login,        
        full_name: profile._json.name,
        github_avatar_url: profile._json.avatar_url,
      }

      return getMemberData(memberProfile.github_id)
      .then((userDataObj) => {
        if(!userDataObj){
          postMemberInfo(memberProfile)
          .then(() => {
            getMemberData(memberProfile.github_id)
            .then((newUserDataObj) => {
              return next(null, newUserDataObj, { message: 'Signed up successfully' })
            })
          })
        } else {
          return next(null, userDataObj, { message: 'Logged in successfully' })
        }
      })
      .catch(error => { throw new Error(error.message) });
    }),
  ));

  passport.serializeUser((userDataObj, next) => {
    next(null, userDataObj.github_id);
  });

  passport.deserializeUser((github_id, next) => {
    getMemberData(github_id)
    .then((user) => {
      next(null, user);
    })
    .catch((error) => {
      next(error);
    })

  });
})();
