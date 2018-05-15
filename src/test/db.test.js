const test = require('tape');

const runDbBuild = require('../model/database/db_build_test');
const dbConnection = require('../model/database/db_connection');
const postMemberInfo = require('../model/queries/postMemberInfo.js');
const getMemberData = require('../model/queries/getMemberData.js');
const getAllMemberData = require('../model/queries/getAllMemberData.js');
const saveJobDetails = require('../model/queries/saveJobDetails.js');

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
        years_experience: 1,
        github_cv_url: 'https://github.com/helenzhou6/CV',
        cv_url: 'https://github.com/helenzhou6/CV',
        job_view_pref: 'private',
      };
      t.equal(Object.keys(res).length, Object.keys(correctResult).length, 'correct array length');
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

// GET ALL USERS MEMBER DATA TEST
test('Test getAllMemberData query returns the correct format and number of rows', (t) => {
  const correctResult =
  [{
    id: 1,
    github_id: 1,
    full_name: 'Helen',
    github_handle: 'helenzhou6',
    github_avatar_url: 'https://uk.linkedin.com/dbsmith',
    fac_cohort: 'FAC0',
    tech_stack: ['JavaScript', 'Node.js'],
    job_search_status: 'red',
  },
  {
    id: 2,
    github_id: 2,
    full_name: 'Deborah',
    github_handle: 'dsmith',
    github_avatar_url: 'https://uk.linkedin.com/dbsmith',
    fac_cohort: 'FAC1',
    tech_stack: ['Node.js', 'JavaScript'],
    job_search_status: 'orange',
  }];


  runDbBuild().then(() => {
    dbConnection.query(selectAllMembers)
      .then((res1) => {
        const testQuantity = res1.length;
        getAllMemberData()
          .then((res2) => {
            if (typeof res2 === 'object') {
              t.pass('getAllMemberData returns an object');
            }
            const newQuantity = res2.length;
            t.equal(testQuantity, newQuantity, 'getAllMemberData returns expected number of rows');
            t.deepEqual(res2, correctResult, 'deepEquals of all member info');
            t.end();
          });
      }).catch((error) => {
        console.log(error);
        t.error(error, 'getAllMemberData test error');
        t.end();
      });
  });
});

// SAVE JOB DETAILS TEST

test('Test saveJobDetails', (t) => {
  runDbBuild().then(() => {
    const jobData = {
      job_view_pref: 'public',
      job_search_status: 'orange',
      years_experience: 2,
      github_cv_url: 'https://github.com/helenzhou6/newCV',
      cv_url: 'https://github.com/helenzhou6/newCV2',
    };
    saveJobDetails(jobData, 1).then(() => {
      getMemberData(1).then((res) => {
        console.log('this is res: ', res);
        const dbJobData = (({
          job_view_pref, job_search_status, years_experience, github_cv_url, cv_url,
        }) => ({
          job_view_pref, job_search_status, years_experience, github_cv_url, cv_url,
        }))(res);
        t.deepEqual(dbJobData, jobData, 'saveJobDetails added correct data to database');
        t.end();
      });
    }).catch((error) => {
      console.log(error);
      t.error(error, 'postMemberInfo test error');
      t.end();
    });
  });
});

test.onFinish(() => {
  dbConnection.$pool.end();
});
