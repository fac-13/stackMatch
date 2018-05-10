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
    .then(() => getMemberData(1))
    .then((res) => {
      t.ok(res, 'database responds with data');
      t.equals(typeof res, 'object', 'type of res should be an object');
      t.end();
    })
    .catch((error) => {
      console.log(error.message);
      t.error(error, 'build error');
    });
});

test('Test member data to ensure correct data received', (t) => {
  runDbBuild()
    .then(() => getMemberData(1))
    .then((res) => {
      const correctResult = {
        id: 1,
        github_id: 1,
        first_name: 'Helen',
        last_name: 'Zhou',
        github_handle: 'helenzhou6',
        github_avatar_url: 'https://uk.linkedin.com/dbsmith',
        fac_campus: 'london',
        fac_code_id: 1,
        linkedin_url: 'https://uk.linkedin.com/',
        twitter_handle: 'hel_zhou',
        member_type: 'admin',
        job_search_status: 'red',
        min_years_exp: 0,
        max_years_exp: 1,
        github_cv_url: 'https://github.com/helenzhou6/CV',
        cv_url: 'https://github.com/helenzhou6/CV',
        job_view_pref: 'private',
      };
      t.equal(Object.keys(res).length, 17, 'correct array length');
      t.deepEqual(res, correctResult, 'deepEquals of first test member');
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
