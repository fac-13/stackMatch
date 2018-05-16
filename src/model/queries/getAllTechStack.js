const dbConnection = require('../database/db_connection');

const getAllTechStack = () => dbConnection.query(
  'SELECT * FROM tech_stack'
);

module.exports = getAllTechStack;
