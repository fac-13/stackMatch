const dbConnection = require('../database/db_connection.js');

const allMembersQuery =
`SELECT mem.id, mem.github_id, mem.full_name, mem.github_handle, github_avatar_url, code.code AS fac_cohort, 
(SELECT array_agg(tech.tech ORDER BY stack.order_num) 
     FROM tech_stack tech
     INNER JOIN member_tech_stack stack
     ON stack.stack_id = tech.id
     WHERE stack.member_id = mem.id
) AS tech_stack, job_search_status 
FROM members mem
INNER JOIN fac_code code
ON mem.fac_code_id = code.id`;

const getAllMemberData = () =>
  dbConnection
    .query(allMembersQuery)
    .then((allMemberDetails) => {
      console.log('query result:', allMemberDetails);
      return allMemberDetails;
    })
    .catch(err => console.log(err));

module.exports = getAllMemberData;

