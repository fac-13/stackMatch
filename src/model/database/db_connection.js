const pgp = require('pg-promise')();
const url = require('url');
require('dotenv').config();


let options = {};

if (process.env.TRAVIS === 'true') {
  options = {
    database: 'stackmatch_ci_test',
    user: 'postgres',
  };
} else {
  let { DB_URL } = process.env;

  if (process.env.NODE_ENV === 'test') {
    DB_URL = process.env.TEST_DB_URL;
  }

  if (!DB_URL) throw new Error('Environment variable DB_URL must be set');

  const params = url.parse(DB_URL);
  const [username, password] = params.auth.split(':');

  options = {
    host: params.hostname,
    port: params.port,
    database: params.pathname.split('/')[1],
    max: process.env.DB_MAX_CONNECTIONS || 2,
    user: username,
    password,
    ssl: params.hostname !== 'localhost',
  };
}

module.exports = pgp(options);
