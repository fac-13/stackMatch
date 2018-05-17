const dbConnection = require('../database/db_connection');

const deleteMemberFromMembers = iD => dbConnection.query('DELETE FROM member WHERE member_id = $1', [iD]);

module.exports = deleteMemberFromMembers;
