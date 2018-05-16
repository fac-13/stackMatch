const db = require('../database/db_connection');

const addMemberTechStack = (github_id, techName, orderNum) => db.query(
  `INSERT INTO member_tech_stack VALUES
  ((SELECT id FROM members WHERE github_id = $1),
  (SELECT id FROM tech_stack WHERE tech = $2), $3)`,
  [github_id, techName, orderNum],
)

module.exports = addMemberTechStack;
