const dbConnection = require('../database/db_connection');
// you cat 't delete a foreign key if it still references another table. First delete the reference
// https://stackoverflow.com/questions/14182079/delete-rows-with-foreign-key-in-postgresql
const deleteMemberFromDB = githubId => dbConnection.query('DELETE FROM members WHERE github_id = $1', [githubId]);

module.exports = deleteMemberFromDB;
