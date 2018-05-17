const request = require('axios');

// ensures member of F&C github org to allow sign up
const checkOrgMembership = accessToken => request.get(`https://api.github.com/user/orgs?access_token=${accessToken}`).then(orgMembership => (orgMembership.data.some(org => org.login === 'foundersandcoders')));


// calls GH API to retrun an array of strings of the languages used in user's repos
const getGitHubRepoLanguages = (accessToken, github_handle) => request.get(`https://api.github.com/users/${github_handle}/repos?type=all&sort=updated&direction=desc&access_token=${accessToken}`)
  .then((result) => {
    const repos = result.data;
    const languages = [];
    const seen = [];
    repos.forEach((repo) => {
      if (repo.language === null) {
        seen.push(repo.language);
      } else if (!seen.includes(repo.language)) {
        seen.push(repo.language);
        languages.push(repo.language);
      }
    });
    return languages;
  });

module.exports = {
  checkOrgMembership,
  getGitHubRepoLanguages,
};
