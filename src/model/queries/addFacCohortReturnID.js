const dbConnection = require('../database/db_connection');

const addFacCohortReturnID = cohortName => dbConnection.query(
  'INSERT INTO fac_cohort (cohort) VALUES ($1) RETURNING id',
  [cohortName],
).then(res => res[0]);

module.exports = addFacCohortReturnID;
