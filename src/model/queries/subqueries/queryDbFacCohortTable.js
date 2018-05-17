const db = require('../../database/db_connection');

const getAllFacCohorts = () => db.query('SELECT * FROM fac_cohort');

const getFacCohortID = cohortName => db.query('SELECT id FROM fac_cohort WHERE cohort = $1', [cohortName])
  .then(res => res[0]);

const addFacCohortReturnID = cohortName => db.query(
  'INSERT INTO fac_cohort (cohort) VALUES ($1) RETURNING id',
  [cohortName],
).then(res => res[0]);

module.exports = {
  getAllFacCohorts,
  getFacCohortID,
  addFacCohortReturnID,
};
