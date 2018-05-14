const dbConnection = require('../database/db_connection');

// const formData = {
//   full_name: 'Helen',
//   github_handle: 'helenzhou6',
//   fac_campus: 'London',
//   fac_number: '0',
//   tech_stack: 'Java',
//   linkedin_url: 'knowwhere.com',
//   twitter_handle: 'helenTweetz',
// };

/*
 * There are a number of steps required to save from data into the database.
 *
 * The form uses fac_number but the members table requires fac_code_id
 * so a query is needed to get the id
 * and INSERT INTO the table if what we are looking for does not exist
 *
 * With the fac_code_id and github_id (provided by router) we can update the
 * the members table with the values needed and return the
 * member id for member_tech_stack_table
 *
 * The form also provides tech_stack and there is a member_tech_stack table
 * which requires a stack_id, member_id and optional order (I thick this should default to 1)
 *
 * A query is required to get the stack_id
 * and INSERT INTO the table if what we are looking for does not exist
 *
 * To insert into memeber_tech_stack we need member_id and stack_id at the same time.
 * Using Promise.all(), query updateMemberGetID and getTechStack
 * use the response values to query and insert into member_tech_stack
*/

const toResObj = res => res[0];

// add a fac code and return id
const addFacCode = codeName => dbConnection.query(
  'INSERT INTO fac_code (code) VALUES ($1) RETURNING id',
  [codeName],
).then(toResObj);

// use form data to create fac code neame needed for fac_code table
const makeFacCodeName = (facCampus, facNumber) => {
  const prefix = {
    london: 'FAC',
    nazareth: 'FACN',
    gaza: 'FACG',
  }[facCampus.toLowerCase()];
  return `${prefix}${facNumber}`;
};

// query to get fac code id for memeber table
const getFacCodeID = (facCampus, facNumber) => {
  const codeName = makeFacCodeName(facCampus, facNumber);
  return dbConnection.query('SELECT id FROM fac_code WHERE code = $1', [codeName])
    .then(res => res[0] || addFacCode(codeName))
    .then(o => o.id);
};

// this query must be an update because a member is created during authentication
// the id returned is used to insert into member_tech_Stack
const updateMemberGetID = (formDataObj, facCodeID, githubID) => dbConnection.query(`
    UPDATE members
    SET full_name = $/full_name/,
        github_handle = $/github_handle/,
        fac_campus = $/fac_campus/,
        fac_code_id = $/facCodeID/,
        linkedin_url = $/linkedin_url/,
        twitter_handle = $/twitter_handle/
    WHERE github_id = $/githubID/ RETURNING id
    `, { ...formDataObj, facCodeID, githubID })
  .then(toResObj)
  .then(res => ({ member_id: res.id }));

const addTechStack = name => dbConnection.query(
  'INSERT INTO tech_stack (tech) VALUES ($1) RETURNING id',
  [name],
).then(toResObj);

const getTechStackID = tech => dbConnection.query(
  'SELECT id FROM tech_stack WHERE tech = $1',
  [tech],
)
  .then(res => res[0] || addTechStack(tech))
  .then(res => ({ stack_id: res.id }));

const promiseAllResultToObj = arr => arr.reduce((acc, curr) => Object.assign(acc, curr), {});

// need to handle error for when query tries to insert a stack that someone already has
const addMemberTechStack = idObj => dbConnection.query(
  'INSERT INTO member_tech_stack ($/this:name/) VALUES ($/this:list/) RETURNING *',
  idObj,
)
  .then(toResObj);


// module.exports = saveProfileData;
module.exports = (dataObj, githubID) => {
  const objClone = JSON.parse(JSON.stringify(dataObj));
  return getFacCodeID(objClone.fac_campus, objClone.fac_number)
    .then(facCodeID => Promise.all([
      updateMemberGetID(objClone, facCodeID, githubID),
      getTechStackID(objClone.tech_stack),
    ]))
    .then(promiseAllResultToObj)
    .then(addMemberTechStack);
};
