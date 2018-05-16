const test = require('tape');

const runDbBuild = require('../model/database/db_build_test');
const dbConnection = require('../model/database/db_connection');
const {
  postMemberInfo,
  getMemberData,
  getAllFacCohorts,
  addFacCohortReturnID,
  getFacCohortID,
  updateMemberDetails,
  getAllMemberData,
  saveProfileData,
  saveJobDetails,
} = require('../model/queries/');


const selectAllMembers = 'SELECT * FROM members';


test('DATABASE & QUERY TESTS', (t) => {
  t.ok(true, 'tape is working');
  t.end();
});

test('Test runDBBuild is working', (t) => {
  runDbBuild().then((build) => {
    t.ok(build, 'runDbBuild is working');
    t.end();
  }).catch((err) => {
    console.log(err);
    t.error(err, 'build error');
    t.end();
  });
});

test('Test database has content', (t) => {
  runDbBuild().then(() => dbConnection.query(selectAllMembers)).then((res) => {
    t.ok(res.length > 0, 'Content received from test database');
    t.end();
  }).catch((err) => {
    console.log(err);
    t.error(err, 'build error');
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
    .catch((err) => {
      console.log(err.message);
      t.error(err, 'build error');
    });
});

test('Test getMemberData query to ensure correct data received', (t) => {
  runDbBuild()
    .then(() => getMemberData(1))
    .then((res) => {
      const correctResult = {
        github_id: 1,
        full_name: 'Helen',
        github_handle: 'helenzhou6',
        github_avatar_url: 'https://uk.linkedin.com/dbsmith',
        fac_campus: 'london',
        fac_cohort: 'FAC0',
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
    .catch((err) => {
      console.log(err.message);
      t.error(err, 'build error');
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
      }).catch((err) => {
        console.log(err.message);
        t.error(err, 'postMemberInfo test error');
        t.end();
      });
  });
});

// ADD FACCODE
test('Add fac cohort to fac_cohort table and return id', (t) => {
  const facCohort = 'FAC13';
  let original;
  runDbBuild()
    .then(getAllFacCohorts)
    .then((res) => {
      original = res;
    })
    .then(() => addFacCohortReturnID(facCohort))
    .then((res) => {
      t.equal(typeof res, 'object', 'db response is an object');
      t.deepEqual(Object.keys(res), ['id'], 'res is an object containing an id');
      t.end();
    })
    .then(getAllFacCohorts)
    .then((res) => {
      t.equal(res.length, original.length + 1, 'added one row to fac codes table');
      t.deepEqual(res[res.length - 1].cohort, facCohort, 'added FAC13');
    })
    .catch((err) => {
      console.log(err.message);
      t.error(err, 'no db error');
      t.end();
    });
});

// getAllFacCohorts
test('Test get all FAC codes', (t) => {
  runDbBuild()
    .then(() => getAllFacCohorts())
    .then((res) => {
      t.ok(Array.isArray(res), 'db response is an array');
      t.end();
    })
    .catch((err) => {
      console.log(err.message);
      t.error(err, 'no db error');
      t.end();
    });
});

// getFacCohortID
test('Test get fac code id', (t) => {
  const facCode = 'FAC0';
  runDbBuild()
    .then(() => getFacCohortID(facCode))
    .then((res) => {
      t.equal(typeof res, 'object', 'db response is an object');
      t.deepEqual(Object.keys(res), ['id'], 'res is an object containing an id');
      t.end();
    })
    .catch((err) => {
      console.log(err.message);
      t.error(err, 'no db error');
      t.end();
    });
});

// updateMemberDetails
test('Test update members table', (t) => {
  const githubID = 1;
  let before;
  const expected = {
    github_id: 1,
    full_name: 'Helen',
    github_handle: 'helenzhou6',
    github_avatar_url: 'https://uk.linkedin.com/dbsmith',
    fac_campus: 'London',
    fac_cohort: 'FAC0',
    linkedin_url: 'knowwhere.com',
    twitter_handle: 'helenTweetz',
    member_type: 'admin',
    job_view_pref: 'private',
    job_search_status: 'red',
    years_experience: 1,
    github_cv_url: 'https://github.com/helenzhou6/CV',
    cv_url: 'https://github.com/helenzhou6/CV',
  };
  runDbBuild()
    .then(() => getMemberData(githubID))
    .then((res) => {
      before = res;
    })
    .then(() => {
      const formDataObj = {
        full_name: 'Helen',
        github_handle: 'helenzhou6',
        fac_campus: 'London',
        fac_number: '0',
        linkedin_url: 'knowwhere.com',
        twitter_handle: 'helenTweetz',
      };
      // form obj
      return Promise.resolve([formDataObj, 1, githubID]);
    })
    .then(array => updateMemberDetails(...array))
    .then(() => getMemberData(githubID))
    .then((res) => {
      t.ok(res, 'we have db response');
      t.notDeepEqual(before, res, 'members table has been changed');
      t.deepEqual(res, expected, 'update was successful');
      t.end();
    })
    .catch((err) => {
      console.log(err.message);
      t.error(err, 'no db error');
      t.end();
    });
});

// saveProfileData
test('Test saveProfileData', (t) => {
  const githubID = 1;
  let before;
  const expected = {
    github_id: 1,
    full_name: 'Helen',
    github_handle: 'helenzhou6',
    github_avatar_url: 'https://uk.linkedin.com/dbsmith',
    fac_campus: 'London',
    fac_cohort: 'FAC123',
    linkedin_url: 'knowwhere.com',
    twitter_handle: 'helenTweetz',
    member_type: 'admin',
    job_view_pref: 'private',
    job_search_status: 'red',
    years_experience: 1,
    github_cv_url: 'https://github.com/helenzhou6/CV',
    cv_url: 'https://github.com/helenzhou6/CV',
  };
  runDbBuild()
    .then(() => getMemberData(githubID))
    .then((res) => {
      before = res;
    })
    .then(() => {
      const formDataObj = {
        full_name: 'Helen',
        github_handle: 'helenzhou6',
        fac_campus: 'London',
        fac_number: 123,
        linkedin_url: 'knowwhere.com',
        twitter_handle: 'helenTweetz',
      };
      // form obj
      return Promise.resolve([formDataObj, githubID]);
    })
    .then(array => saveProfileData(...array))
    .then(() => Promise.all([getMemberData(githubID), getFacCohortID('FAC123')]))
    .then((resArr) => {
      const [filteredRes, idRes] = resArr;
      t.ok(idRes, 'has added new FAC code');
      t.ok(filteredRes, 'we have db response');
      t.notDeepEqual(before, filteredRes, 'members table has been changed');
      t.deepEqual(filteredRes, expected, 'update was successful');
      t.end();
    })
    .catch((err) => {
      console.log(err.message);
      t.error(err, 'no db error');
      t.end();
    });
});

// getAllMemberData
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
            if (Array.isArray(res2)) {
              t.pass('getAllMemberData returns an array of objects');
            }
            const newQuantity = res2.length;
            t.equal(testQuantity, newQuantity, 'getAllMemberData returns expected number of rows');
            t.deepEqual(res2, correctResult, 'deepEquals of all member info');
            t.end();
          });
      }).catch((err) => {
        console.log(err.message);
        t.error(err, 'getAllMemberData test error');
        t.end();
      });
  });
});

// SAVE JOB DETAILS TEST

test('Test saveJobDetails saves job details', (t) => {
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
        const dbJobData = (({
          job_view_pref, job_search_status, years_experience, github_cv_url, cv_url,
        }) => ({
          job_view_pref, job_search_status, years_experience, github_cv_url, cv_url,
        }))(res);
        t.deepEqual(dbJobData, jobData, 'saveJobDetails added correct data to database');
        t.end();
      });
    }).catch((err) => {
      console.log(err.message);
      t.error(err, 'saveJobDetails test error');
      t.end();
    });
  });
});

test.onFinish(() => {
  dbConnection.$pool.end();
});
