const path = require('path');
const { QueryFile } = require('pg-promise');
const db = require('./db_connection');

const sql = file => QueryFile(path.join(__dirname, file), { minify: true });

const testBuild = sql('./db_build_test.sql');

const runDbBuild = () => db.query(testBuild);

module.exports = runDbBuild;
