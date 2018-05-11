/* eslint-disable */
const passport = require('passport');
const Strategy = require('passport-github2').Strategy;
const request = require('axios'); // alternative to request module
const postMemberInfo = require('./model/queries/postMemberInfo.js');
const getMemberData = require('./model/queries/getMemberData.js');

//ensures member of F&C github org to allow sign up 
function checkOrgMembership(accessToken) {
  return request.get(`https://api.github.com/user/orgs?access_token=${accessToken}`).then((res) => {
      if(res.data.some((org) => org.login === 'foundersandcoders')) {
        return true
      } else {
        return false
      }
    })
  .catch(error => { throw new Error(error.message) });
}

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
          if(!userDataObj){
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
    .catch(error => { throw new Error(error.message) });
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
  .catch((error) => {
    next(error);
  })
});

