const dbConnection = require('../database/db_connection.js');

const getAllMemberData = () =>
  dbConnection
    .query('SELECT * FROM members')
    .then(allMemberDetails => allMemberDetails);

module.exports = getAllMemberData;
