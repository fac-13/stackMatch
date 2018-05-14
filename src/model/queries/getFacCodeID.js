const dbConnection = require('../database/db_connection');

const getFacCodeID = codeName => dbConnection.query('SELECT id FROM fac_code WHERE code = $1', [codeName])
  .then(res => res[0]);

module.exports = getFacCodeID;
