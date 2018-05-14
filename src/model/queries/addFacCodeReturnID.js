const dbConnection = require('../database/db_connection');

const addFacCodeReturnID = codeName => dbConnection.query(
  'INSERT INTO fac_code (code) VALUES ($1) RETURNING id',
  [codeName],
).then(res => res[0]);

module.exports = addFacCodeReturnID;
