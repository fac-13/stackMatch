const dbConnection = require('../database/db_connection.js');

const getMemberData = github_id => dbConnection
  .query('SELECT * FROM members WHERE github_id = $1', [github_id]);

module.exports = getMemberData;
