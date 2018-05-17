const dbConnection = require('../database/db_connection');

const getAllFacCohorts = () => dbConnection.query('SELECT * FROM fac_cohort');

module.exports = getAllFacCohorts;
