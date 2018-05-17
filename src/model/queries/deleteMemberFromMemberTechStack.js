const dbConnection = require('../database/db_connection');

const deleteMemberFromMemberTechStack = memberId => dbConnection.query(
  'DELETE FROM member_tech_stack WHERE member_id = $1',
  [memberId],
);

module.exports = deleteMemberFromMemberTechStack;
