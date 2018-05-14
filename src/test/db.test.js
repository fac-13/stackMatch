const test = require('tape');

const runDbBuild = require('../model/database/db_build_test');
const dbConnection = require('../model/database/db_connection');
const postMemberInfo = require('../model/queries/postMemberInfo.js');
const getMemberData = require('../model/queries/getMemberData.js');
const getAllFacCodes = require('../model/queries/getAllFacCodes.js');
const addFacCodeReturnID = require('../model/queries/addFacCodeReturnID');
const getFacCodeID = require('../model/queries/getFacCodeID');

const selectAllMembers = 'SELECT * FROM members';

test('DATABASE & QUERY TESTS', (t) => {
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
  runDbBuild().then(() => dbConnection.query(selectAllMembers)).then((res) => {
    t.ok(res.length > 0, 'Content received from test database');
    t.end();
  }).catch((error) => {
    console.log(error);
    t.error(error, 'build error');
    t.end();
  });
});

// QUERY TESTS

// GET MEMBER DATA TEST

test('Test getMemberData query and returns the correct format', (t) => {
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

test('Test getMemberData query to ensure correct data received', (t) => {
  runDbBuild()
    .then(() => getMemberData(1))
    .then((res) => {
      const correctResult = {
        id: 1,
        github_id: 1,
        full_name: 'Helen',
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
      t.equal(Object.keys(res).length, 16, 'correct array length');
      t.deepEqual(res, correctResult, 'deepEquals of first test member');
      t.end();
    })
    .catch((error) => {
      console.log(error.message);
      t.error(error, 'build error');
    });
});

// POST MEMBER DATA TEST

test('Test postMemberInfo adds a row', (t) => {
  const memberProfile = {
    github_id: 43948924,
    github_handle: 'john_profile',
    full_name: 'John',
    github_avatar_url: 'https://avatars3.githubusercontent.com/u/32312712?v=4',
  };
  runDbBuild().then(() => {
    dbConnection.query(selectAllMembers)
      .then((res1) => {
        const quantity = res1.length;
        postMemberInfo(memberProfile)
          .then(() => dbConnection.query(selectAllMembers)
            .then((res2) => {
              const newQuantity = res2.length;
              t.equal(newQuantity, quantity + 1, 'postMemberInfo added one row to database');
              t.end();
            }));
      }).catch((error) => {
        console.log(error);
        t.error(error, 'postMemberInfo test error');
        t.end();
      });
  });
});

// ADD FACCODE
test('Add fac code to fac_code table and return id', (t) => {
  const facCode = 'FAC13';
  let original;
  runDbBuild()
    .then(getAllFacCodes)
    .then((res) => {
      original = res;
    })
    .then(() => addFacCodeReturnID(facCode))
    .then((res) => {
      t.equal(typeof res, 'object', 'db response is an object');
      t.deepEqual(Object.keys(res), ['id'], 'res is an object containing an id');
      t.end();
    })
    .then(getAllFacCodes)
    .then((res) => {
      t.equal(res.length, original.length + 1, 'added one row to fac codes table');
      t.deepEqual(res[res.length - 1].code, facCode, 'added FAC13');
    })
    .catch((error) => {
      t.error(error, 'no db error');
      t.end();
    });
});

// getAllFacCodes
test('Test get all FAC codes', (t) => {
  runDbBuild()
    .then(() => getAllFacCodes())
    .then((res) => {
      t.ok(Array.isArray(res), 'db response is an array');
      t.end();
    })
    .catch((error) => {
      t.error(error, 'no db error');
      t.end();
    });
});

// getFacCodeID
test('Test get fac code id', (t) => {
  const facCode = 'FAC0';
  runDbBuild()
    .then(() => getFacCodeID(facCode))
    .then((res) => {
      t.equal(typeof res, 'object', 'db response is an object');
      t.deepEqual(Object.keys(res), ['id'], 'res is an object containing an id');
      t.end();
    });
});

test.onFinish(() => {
  dbConnection.$pool.end();
});
