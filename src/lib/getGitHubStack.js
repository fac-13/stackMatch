const request = require('axios');

// argument passed in - accessToken and github_id
// return an array of strings of the languages used in user's repos
const getGitHubRepoLanguages = (accessToken, github_handle) => request.get(`https://api.github.com/users/${github_handle}/repos?type=all&sort=updated&direction=desc&access_token=${accessToken}`)
  .then((result) => {
    const repos = result.data;
    const languages = [];
    const seen = [];
    repos.forEach((repo) => {
      if (!seen.includes(repo.language)) {
        seen.push(repo.language);
        languages.push(repo.language);
      }
    });
    return languages;
  });

module.exports = {
  getGitHubRepoLanguages,
};
