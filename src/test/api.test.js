const test = require('tape');
const { checkOrgMembership, getGitHubRepoLanguages } = require('../lib/githubApiCalls');
require('dotenv').config();


test('GITHUB API TESTS', (t) => {
  t.ok(true, 'tape is working');
  t.end();
});

// GITHUB API UNIT TESTS
test('Test getGitHubRepos', (t) => {
  getGitHubRepoLanguages(process.env.APIKEY, 'octocat').then((actual) => {
    t.ok(Array.isArray(actual), 'returns an array');
    t.pass(actual.every(language => typeof language === 'string'), 'returns an array of strings');
    t.equal(actual.indexOf('JavaScript'), actual.lastIndexOf('JavaScript'), 'no duplicates');
    t.end();
  }).catch(err => console.log(err.message));
});
