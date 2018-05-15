const dbConnection = require('../database/db_connection');

const getAllFacCodes = () => dbConnection.query('SELECT * FROM fac_code');

module.exports = getAllFacCodes;
