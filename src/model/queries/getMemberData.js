const dbConnection = require('../database/db_connection.js');

const getMemberData = githubID =>
  dbConnection
    .query('SELECT * FROM members WHERE github_id = $1', [githubID])
    .then(res => res[0]);

module.exports = getMemberData;
