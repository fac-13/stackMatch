const test = require('tape');

const runDbBuild = require('../model/database/db_build_test');
const dbConnection = require('../model/database/db_connection');
const {
  postMemberInfo,
  getMemberData,
  getAllFacCodes,
  addFacCodeReturnID,
  getFacCodeID,
  updateMemberDetails,
  saveProfileData,
  getAllMemberData,
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

// updateMemberDetails
test('Test update members table', (t) => {
  const githubID = 1;
  let before;
  const expected = {
    id: 1,
    github_id: 1,
    full_name: 'Helen',
    github_handle: 'helenzhou6',
    github_avatar_url: 'https://uk.linkedin.com/dbsmith',
    fac_campus: 'London',
    fac_code_id: 1,
    linkedin_url: 'knowwhere.com',
    twitter_handle: 'helenTweetz',
    member_type: 'admin',
    job_search_status: 'red',
    min_years_exp: 0,
    max_years_exp: 1,
    github_cv_url: 'https://github.com/helenzhou6/CV',
    cv_url: 'https://github.com/helenzhou6/CV',
    job_view_pref: 'private',
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
    .catch((error) => {
      t.error(error, 'no db error');
      t.end();
    });
});


test('Test saveProfileData', (t) => {
  const githubID = 1;
  let before;
  const expected = {
    id: 1,
    github_id: 1,
    full_name: 'Helen',
    github_handle: 'helenzhou6',
    github_avatar_url: 'https://uk.linkedin.com/dbsmith',
    fac_campus: 'London',
    fac_code_id: 3,
    linkedin_url: 'knowwhere.com',
    twitter_handle: 'helenTweetz',
    member_type: 'admin',
    job_search_status: 'red',
    min_years_exp: 0,
    max_years_exp: 1,
    github_cv_url: 'https://github.com/helenzhou6/CV',
    cv_url: 'https://github.com/helenzhou6/CV',
    job_view_pref: 'private',
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
    .then(() => Promise.all([getMemberData(githubID), getFacCodeID('FAC123')]))
    // .then(() => getMemberData(githubID))
    .then((resArr) => {
      const [filteredRes, idRes] = resArr;
      t.equal(filteredRes.fac_code_id, idRes.id, 'has added new FAC code');
      t.ok(filteredRes, 'we have db response');
      t.notDeepEqual(before, filteredRes, 'members table has been changed');
      t.deepEqual(filteredRes, expected, 'update was successful');
      t.end();
    })
    .catch((error) => {
      t.error(error, 'no db error');
      t.end();
    });
});

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


test.onFinish(() => {
  dbConnection.$pool.end();
});
