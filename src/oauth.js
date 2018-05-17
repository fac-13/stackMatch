/* eslint-disable */
const passport = require('passport');
const Strategy = require('passport-github2').Strategy;
const request = require('axios'); // alternative to request module
const postMemberInfo = require('./model/queries/postMemberInfo.js');
const getMemberData = require('./model/queries/getMemberData.js');
const { checkOrgMembership, getGitHubRepoLanguages } = require('./lib/githubApiCalls');


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

    checkOrgMembership(accessToken).then((res) => {
      if (res === false) {
        return next(null, false, { message: 'Not FAC member' });
      } else {
        return getMemberData(memberProfile.github_id)
          .then((userDataObj) => {
            if (!userDataObj) {
              postMemberInfo(memberProfile)
                .then(() => {
                  getMemberData(memberProfile.github_id)
                    .then((newUserDataObj) => {
                      return next(null, newUserDataObj, { message: 'Signup successful' })
                    })
                })
            } else {
              return next(null, userDataObj, { message: 'Login successful' })
            }
          })
      }
    })
      .catch(err => {
        console.log(err.message);
        next(err)
      });
  }),
));

passport.serializeUser((userDataObj, next) => {
  next(null, userDataObj.github_id);
});

passport.deserializeUser((id, next) => {
  getMemberData(id)
    .then((user) => {
      next(null, user);
    })
    .catch((err) => {
      console.log(err.message)
      next(err);
    })
});

