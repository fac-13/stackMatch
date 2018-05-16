const request = require('axios');


const getGitHubRepos = (accessToken, github_handle) => {
  console.log(github_handle);
  console.log(accessToken);
  return request.get(`https://api.github.com/users/${github_handle}/repos?type=all&sort=updated&direction=desc&access_token=${accessToken}`)
    .then((repos) => {
      const result = JSON.parse(JSON.stringify(repos));
      console.log(result);
      return result;
    });
};
// argument passed in - accessToken and github_id
// return an array of objects, apil calls for Repos


const getGitHubStack = (accessToken, github_handle, repos) => {
  // argument passed in - accessToken and array with repo language urls
  // return an array of string languages used in github Repos
};

module.exports = {
  getGitHubRepos,
  getGitHubStack,
};

