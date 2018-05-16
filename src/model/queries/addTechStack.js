const dbConnection = require('../database/db_connection');

const addTechStack = (techName) => dbConnection.query(
  'INSERT INTO tech_stack (tech) VALUES ($1)',
  [techName],
);

module.exports = addTechStack;
