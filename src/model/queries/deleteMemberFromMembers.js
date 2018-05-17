const dbConnection = require('../database/db_connection');

const deleteMemberFromMembers = iD => dbConnection.query('DELETE FROM members WHERE id = $1', [iD]);

module.exports = deleteMemberFromMembers;
