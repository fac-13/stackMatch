const test = require('tape');
// const request = require('supertest');
const { getGitHubRepos, getGitHubStack } = require('../lib/getGitHubStack');
require('dotenv').config();


test('GITHUB API TESTS', (t) => {
  t.ok(true, 'tape is working');
  t.end();
});


// GITHUB API UNIT TESTS
test('Test getGitHubRepos', (t) => {
  getGitHubRepos(process.env.APIKEY, 'vlbee').then((actual) => {
    console.log(typeof actual);
    t.ok(Array.isArray(actual), 'returns an array');
    t.end();
  }).catch(err => console.log(err.message));

  // argument passed in - accessToken and github_id
  // return an array of languages used in github Repos
});
