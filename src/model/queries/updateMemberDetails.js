const dbConnection = require('../database/db_connection');

const updateMemberDetails = (formDataObj, facCodeID, githubID) => dbConnection.query(`
    UPDATE members
    SET full_name = $/full_name/,
        github_handle = $/github_handle/,
        fac_campus = $/fac_campus/,
        fac_code_id = $/facCodeID/,
        linkedin_url = $/linkedin_url/,
        twitter_handle = $/twitter_handle/
    WHERE github_id = $/githubID/
    `, { ...formDataObj, facCodeID, githubID });

module.exports = updateMemberDetails;