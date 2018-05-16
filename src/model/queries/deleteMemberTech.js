const db = require('../database/db_connection');

const deleteMemberTech = (github_id, techName) => db.query(
  `DELETE FROM member_tech_stack
  WHERE member_id = (SELECT id FROM members WHERE github_id = $1) AND
  stack_id = (SELECT id FROM tech_stack WHERE LOWER(tech) = LOWER($2))`,
  [github_id, techName],
)

module.exports = deleteMemberTech;
