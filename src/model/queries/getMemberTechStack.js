const db = require('../database/db_connection');

const getMemberTechStack = (github_id) => db.query(
  `SELECT 
  (SELECT array_agg(tech.tech ORDER BY stack.order_num) 
       FROM tech_stack tech
       LEFT JOIN member_tech_stack stack
       ON stack.stack_id = tech.id
       WHERE stack.member_id = mem.id
  ) AS tech_stack
  FROM members mem
  WHERE mem.github_id = $1`,
  [github_id],
)
  .then((res) => res[0]);

module.exports = getMemberTechStack;
