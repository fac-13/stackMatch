const request = require('axios');


const getGitHubRepoLanguages = (accessToken, github_handle) => request.get(`https://api.github.com/users/${github_handle}/repos?type=all&sort=updated&direction=desc&access_token=${accessToken}`)
    .then((result) => {
      const repos = result.data;
      const languages = [];
      repos.forEach((repo) => {
        languages.push(repo.language);
      });
      console.log(languages);
      return languages;
    });
// argument passed in - accessToken and github_id
// return an array of objects, apil calls for Repos

module.exports = {
  getGitHubRepoLanguages,
};

