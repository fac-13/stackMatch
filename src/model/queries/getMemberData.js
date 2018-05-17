const dbConnection = require('../database/db_connection.js');

const getMemberData = githubID =>
  dbConnection
    .query(`SELECT github_id, full_name, github_handle, github_avatar_url, fac_campus, fac_cohort.cohort AS fac_cohort, (SELECT array_agg(tech.tech ORDER BY stack.order_num) 
    FROM tech_stack tech
    LEFT JOIN member_tech_stack stack
    ON stack.stack_id = tech.id
    WHERE stack.member_id = members.id
) AS tech_stack, linkedin_url, twitter_handle, member_type, job_view_pref, job_search_status, years_experience, github_cv_url, cv_url 
    FROM members
    LEFT JOIN fac_cohort 
    ON fac_cohort.id = members.fac_cohort_id 
    WHERE github_id = $1`, [githubID])
    .then(res => res[0]);

module.exports = getMemberData;
