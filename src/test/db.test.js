const test = require('tape');
const runDbBuild = require('./../model/database/db_build_test');
const dbConnection = require('./../model/database/db_connection');

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


test.onFinish(() => {
  dbConnection.$pool.end();
});
