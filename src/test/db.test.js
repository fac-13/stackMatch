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

const {
  addMemberTechStack,
  getTechStackID,
  getAllTechStack,
  addTechStack,
  deleteMemberTech,
  getMemberTechStack,
  updateTechOrderNum,
  deleteMemberTechStack,
} = require('../model/queries/queryDb_TechStackTables');

const {
  processMemberTechStack,
  addUniqueTech,
} = require('../model/queries/processMemberTechStack');


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
        tech_stack: ['JavaScript', 'Node.js'],
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
    tech_stack: ['JavaScript', 'Node.js'],
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
    tech_stack: [ 'JavaScript', 'Node.js' ],
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
      id: 3, github_id: 3, full_name: 'Lawrence', github_handle: 'lawRES', github_avatar_url: 'https://uk.linkedin.com/law', fac_cohort: 'FAC0', tech_stack: null, job_search_status: 'red',
    }, {
      id: 1, github_id: 1, full_name: 'Helen', github_handle: 'helenzhou6', github_avatar_url: 'https://uk.linkedin.com/dbsmith', fac_cohort: 'FAC0', tech_stack: ['JavaScript', 'Node.js'], job_search_status: 'red',
    }, {
      id: 2, github_id: 2, full_name: 'Deborah', github_handle: 'dsmith', github_avatar_url: 'https://uk.linkedin.com/dbsmith', fac_cohort: 'FAC1', tech_stack: ['Node.js', 'JavaScript'], job_search_status: 'orange',
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

// getAllTechStack

test('Test getAllTechStack gets all stack', (t) => {
  runDbBuild().then(() => {
    getAllTechStack().then((res) => {
      const expected = ['JavaScript', 'Node.js'];
      t.pass(Array.isArray(res), 'response is an array');
      t.equal(expected.length, res.length, 'response contains appropriate number of entries');
      t.deepEquals(expected, res, 'gets all the values in tech_stach table');
      t.end();
    }).catch((err) => {
      console.log(err.message);
      t.error(err, 'getAllTechStack test error');
      t.end();
    });
  });
});

// addTechStack

test('Test addTechStack saves a new techstack', (t) => {
  runDbBuild().then(() => {
    let oldStack;
    getAllTechStack()
      .then((res) => {
        oldTechStack = JSON.parse(JSON.stringify(res));
      })
      .then(() => addTechStack('PostgreSQL'))
      .then(() => getAllTechStack())
      .then((res) => {
        const expected = ['JavaScript', 'Node.js', 'PostgreSQL'];
        t.pass(Array.isArray(res), 'response is an array');
        t.equals(oldTechStack.length + 1, res.length, 'has added another row to tech_stack table');
        t.deepEqual(expected, res, 'added "PostgreSQL" to the tech_stack table');
        t.end();
      })
      .catch((err) => {
        console.log(err.message);
        t.error(err, 'addTechStack test error');
        t.end();
      });
  });
});

// getTechStackID

test('Test getTechStackID returns the correct ID', (t) => {
  runDbBuild().then(() => {
    getTechStackID('JavaScript')
      .then((res) => {
        t.equals(typeof res, 'object', 'response is an object');
        t.equals(1, res.id, 'has returned the correct ID');
        t.deepEquals({ id: 1 }, res, 'has returned the correct response object');
        t.end();
      }).catch((err) => {
        console.log(err.message);
        t.error(err, 'getTechStackID test error');
        t.end();
      });
  });
});

test('Test getTechStackID returns undefined if not in tech_stack table', (t) => {
  runDbBuild().then(() => {
    getTechStackID('PostgreSQL')
      .then((res) => {
        if (!res) t.pass('has returned undefined');
        t.end();
      }).catch((err) => {
        console.log(err.message);
        t.error(err, 'getTechStackID test error');
        t.end();
      });
  });
});

// getMemberTechStack
test('Test getMemberTechStack returns an object containing an array of the tech stack', (t) => {
  runDbBuild().then(() => {
    getMemberTechStack(1)
      .then((res) => {
        const expected = { tech_stack: ['JavaScript', 'Node.js'] };
        t.equal(typeof res, 'object', 'response is an object');
        t.deepEquals(Object.keys(res), ['tech_stack'], 'response has a key of tech_stack');
        t.pass(Array.isArray(res.tech_stack), 'response contains an array of tech stack');
        t.deepEquals(expected, res, 'response is the correct response');
        t.end();
      }).catch((err) => {
        console.log(err.message);
        t.error(err, 'getMemberTechStack test error');
        t.end();
      });
  });
});

test('Test getMemberTechStack does not cause an error when a user doesn\'t have a tech stack', (t) => {
  runDbBuild().then(() => {
    getMemberTechStack(3)
      .then((res) => {
        if (!res.tech_stack) t.pass('tech stack returns as null');
        t.end();
      }).catch((err) => {
        console.log(err.message);
        t.error(err, 'getMemberTechStack test error');
        t.end();
      });
  });
});

// addMemberTechStack
test('Test addMemberTechStack adds a tech stack', (t) => {
  runDbBuild().then(() => {
    let oldTechStack;
    getMemberTechStack(3)
      .then((res) => {
        oldTechStack = JSON.parse(JSON.stringify(res));
      })
      .then(() => addMemberTechStack(3, 'javascript', 1))
      .then(() => getMemberTechStack(3))
      .then((res) => {
        t.notEquals(oldTechStack, res, 'Tech stack of that member has been changed');
        t.equals(res.tech_stack[res.tech_stack.length - 1], 'JavaScript', 'JavaScript has been added to the member');
        t.end();
      })
      .catch((err) => {
        console.log(err.message);
        t.error(err, 'addMemberTechStack test error');
        t.end();
      });
  });
});

// deleteMemberTech
test('Test deleteMemberTech deletes a tech stack based on the name and github_id', (t) => {
  runDbBuild().then(() => {
    const techName = 'javascript';
    let oldTechStack;
    getMemberTechStack(1)
      .then((res) => {
        oldTechStack = JSON.parse(JSON.stringify(res));
      })
      .then(() => deleteMemberTech(1, techName))
      .then(() => getMemberTechStack(1))
      .then((res) => {
        t.pass(oldTechStack.tech_stack.indexOf(techName) > 0, `Old tech stack includes ${techName}`);
        t.equal(res.tech_stack.indexOf(techName), -1, `${techName} has been deleted`);
        t.equal(oldTechStack.tech_stack.length - 1, res.tech_stack.length, 'a row from members_tech_stack has been deleted');
        t.end();
      })
      .catch((err) => {
        console.log(err.message);
        t.error(err, 'addMemberTechStack test error');
        t.end();
      });
  });
});

// updateTechOrderNum
test('Test updateTechOrderNum to ensure edit order number based on params', (t) => {
  runDbBuild().then(() => {
    const techName = 'javascript';
    let oldTechStack;
    getMemberTechStack(1)
      .then((res) => {
        oldTechStack = JSON.parse(JSON.stringify(res));
      })
      .then(() => updateTechOrderNum(1, techName, 4))
      .then(() => getMemberTechStack(1))
      .then((res) => {
        const expected = { tech_stack: ['Node.js', 'JavaScript'] };
        t.notEqual(oldTechStack.tech_stack.indexOf('JavaScript'), res.tech_stack.indexOf('JavaScript'), `${techName} has changed position`);
        t.deepEqual(expected, res, 'response is as expected');
        t.end();
      })
      .catch((err) => {
        console.log(err.message);
        t.error(err, 'updateTechOrderNum test error');
        t.end();
      });
  });
});

// addUniqueTech

test('Test addUniqueTech to ensure added unique tech, and no duplicate additions', (t) => {
  runDbBuild().then(() => {
    let oldTechStackList;
    const formData = ['javascript', 'Node.js', 'PostgreSQL', 'HTML', 'html'];
    getAllTechStack()
      .then(res => oldTechStackList = JSON.parse(JSON.stringify(res)))
      .then(() => addUniqueTech(formData))
      .then(() => getAllTechStack())
      .then((res) => {
        const expected = ['JavaScript', 'Node.js', 'PostgreSQL', 'HTML'];
        t.equal(oldTechStackList.length + 2, res.length, 'added two new items to tech stack');
        t.deepEqual(expected, res, 'added PostgreSQL and HTML to tech stack');
        t.pass(res.includes('PostgreSQL'), 'PostgreSQL has been added');
        t.pass(res.includes('HTML'), 'HTML has been added');
        t.equal(res.indexOf('HTML'), res.lastIndexOf('HTML'), 'duplicates removed');
        t.end();
      })
      .catch((err) => {
        console.log(err.message);
        t.error(err, 'addUniqueTech test error');
        t.end();
      });
  });
});

// processMemberTechStack

test('Test processMemberTechStack to ensure added new tech', (t) => {
  runDbBuild().then(() => {
    const github_id = 1;
    const formData = ['Node.js', 'javascript', 'PostgreSQL', 'HTML'];
    getMemberTechStack(github_id)
      .then(res => oldTechStackList = JSON.parse(JSON.stringify(res)))
      .then(() => processMemberTechStack(github_id, formData))
      .then(() => getMemberTechStack(github_id))
      .then((res) => {
        const expected = { tech_stack: ['Node.js', 'JavaScript', 'PostgreSQL', 'HTML'] };
        t.notEqual(oldTechStackList.tech_stack.indexOf('Node.js'), res.tech_stack.indexOf('Node.js'), 'order of Node.js has been changed');
        t.pass(oldTechStackList.tech_stack.length < res.tech_stack.length, 'more rows added to member\'s tech stack');
        t.notDeepEqual(oldTechStackList.tech_stack, res.tech_stack, 'member\'s tech stack has been changed');
        t.deepEqual(expected, res, 'expected response (deepEqual)');
        t.end();
      })
      .catch((err) => {
        console.log(err.message);
        t.error(err, 'addUniqueTech test error');
        t.end();
      });
  });
});

test('Test processMemberTechStack to ensure changed order of tech and no duplicates', (t) => {
  runDbBuild().then(() => {
    const github_id = 1;
    const formData = ['node.js', 'javascript', 'JAVASCRIPT'];
    getMemberTechStack(github_id)
      .then(res => oldTechStackList = JSON.parse(JSON.stringify(res)))
      .then(() => processMemberTechStack(github_id, formData))
      .then(() => getMemberTechStack(github_id))
      .then((res) => {
        const expected = { tech_stack: ['Node.js', 'JavaScript'] };
        t.notEqual(oldTechStackList.tech_stack.indexOf('Node.js'), res.tech_stack.indexOf('Node.js'), 'order of Node.js has been changed');
        t.notDeepEqual(oldTechStackList.tech_stack, res.tech_stack, 'member\'s tech stack has been changed');
        t.deepEqual(expected, res, 'expected response (deepEqual)');
        t.end();
      })
      .catch((err) => {
        console.log(err.message);
        t.error(err, 'addUniqueTech test error');
        t.end();
      });
  });
});


test('Test processMemberTechStack to ensure removed tech that has not been included', (t) => {
  runDbBuild().then(() => {
    const github_id = 1;
    const formData = ['node.js'];
    getMemberTechStack(github_id)
      .then(res => oldTechStackList = JSON.parse(JSON.stringify(res)))
      .then(() => processMemberTechStack(github_id, formData))
      .then(() => getMemberTechStack(github_id))
      .then((res) => {
        const expected = { tech_stack: ['Node.js'] };
        t.deepEqual(expected, res, 'expected response (deepEqual)');
        t.end();
      })
      .catch((err) => {
        console.log(err.message);
        t.error(err, 'addUniqueTech test error');
        t.end();
      });
  });
});

test('Test processMemberTechStack to ensure added a tech stack when previously had none', (t) => {
  runDbBuild().then(() => {
    const github_id = 3;
    const formData = ['javascript', 'Node.js', 'PostgreSQL', 'HTML'];
    getMemberTechStack(github_id)
      .then(res => oldTechStackList = JSON.parse(JSON.stringify(res)))
      .then(() => processMemberTechStack(github_id, formData))
      .then(() => getMemberTechStack(github_id))
      .then((res) => {
        const expected = { tech_stack: ['JavaScript', 'Node.js', 'PostgreSQL', 'HTML'] };
        t.notDeepEqual(oldTechStackList.tech_stack, res.tech_stack, 'member\'s tech stack has been changed');
        t.deepEqual(expected, res, 'expected response (deepEqual)');
        t.end();
      })
      .catch((err) => {
        console.log(err.message);
        t.error(err, 'addUniqueTech test error');
        t.end();
      });
  });
});

// deleteMemberTechStack
test('Test deleteMemberTechStack deletes tech stack of member', (t) => {
  runDbBuild().then(() => {
    const github_id = 1;
    getMemberTechStack(github_id)
      .then(res => oldTechStackList = JSON.parse(JSON.stringify(res)))
      .then(() => deleteMemberTechStack(github_id))
      .then(() => getMemberTechStack(github_id))
      .then((res) => {
        t.pass(!res.tech_stack, 'tech stack associated with member deleted');
        t.notDeepEqual(oldTechStackList.tech_stack, res.tech_stack, 'member\'s tech stack has been changed');
        t.end();
      })
      .catch((err) => {
        console.log(err.message);
        t.error(err, 'addUniqueTech test error');
        t.end();
      });
  });
});

test.onFinish(() => {
  dbConnection.$pool.end();
});
