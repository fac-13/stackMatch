const path = require('path');
const { QueryFile } = require('pg-promise');
const db = require('./db_connection');

const sql = file => QueryFile(path.join(__dirname, file), { minify: true });

const dbBuild = sql('./db_build.sql');

db
  .query(dbBuild)
  .then((res) => {})
  .catch(err => console.error('error', err));
