const db = require('../database/db_connection');

const getTechStackID = (techName) => {
  return db.query(
    'SELECT id FROM tech_stack WHERE tech = $1',
    [techName],
  ).then(res => res[0]);
};

module.exports = getTechStackID;