const dbConnection = require('../database/db_connection');

const getFacCohortID = cohortName => dbConnection.query('SELECT id FROM fac_cohort WHERE cohort = $1', [cohortName])
  .then(res => res[0]);

module.exports = getFacCohortID;
