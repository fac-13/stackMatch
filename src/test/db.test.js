const test = require('tape');
const runDbBuild = require('./../model/database/db_build_test');
const dbConnection = require('./../model/database/db_connection');
const getMemberData = require('../model/queries/getMemberData');

test('Test if tape is working', (t) => {
  t.ok(true, 'tape is working');
  t.end();
});

test('Test runDBBuild is working', (t) => {
  runDbBuild().then((build) => {
    t.ok(build, 'runDbBuild is working');
    t.end();
  }).catch((error) => {
    console.log(error);
    t.error(error, 'build error');
    t.end();
  });
});

test('Test database has content', (t) => {
  runDbBuild().then((build) => {
    const query = 'SELECT * FROM members';
    return dbConnection.query(query);
  }).then((res) => {
    t.ok(res.length > 0, 'Content received from test database');
    t.end();
  }).catch((error) => {
    console.log(error);
    t.error(error, 'build error');
    t.end();
  });
});

// GET MEMBER DATA TEST
test('Test get member data and is the correct format', (t) => {
  runDbBuild()
    .then(() => getMemberData())
    .then((res) => {
      t.ok(res, 'database responds with data');
      t.ok(Array.isArray(res), 'response from database is an array');
      t.equals(typeof res[0], 'object', 'type of res should be an array of objects');
      t.end();
    })
    .catch((error) => {
      console.log(error.message);
      t.error(error, 'build error');
    });
});

test.onFinish(() => {
  dbConnection.$pool.end();
});
