const dbConnection = require('../database/db_connection');

const toResObj = res => res[0];

const addFacCode = codeName => dbConnection.query(
  'INSERT INTO fac_code (code) VALUES ($1) RETURNING id',
  [codeName],
).then(toResObj);

const makeFacCodeName = (facCampus, facNumber) => {
  const prefix = {
    london: 'FAC',
    nazareth: 'FACN',
    gaza: 'FACG',
  }[facCampus.toLowerCase()];
  return `${prefix}${facNumber}`;
};

const getFacCodeID = (facCampus, facNumber) => {
  const codeName = makeFacCodeName(facCampus, facNumber);
  return dbConnection.query('SELECT id FROM fac_code WHERE code = $1', [codeName])
    .then(res => res[0] || addFacCode(codeName))
    .then(o => o.id);
};

const updateMemberGetID = (obj, facCodeID, githubID) => dbConnection.query(`
    UPDATE members
    SET full_name = $/full_name/,
        github_handle = $/github_handle/,
        fac_campus = $/fac_campus/,
        fac_code_id = $/facCodeID/,
        linkedin_url = $/linkedin_url/,
        twitter_handle = $/twitter_handle/
    WHERE github_id = $/githubID/ RETURNING id
    `, { ...obj, facCodeID, githubID })
  .then(toResObj)
  .then((res) => {
    const o = {};
    o.member_id = res.id;
    return o;
  });

const addTechStack = name => dbConnection.query(
  'INSERT INTO tech_stack (tech) VALUES ($1) RETURNING id',
  [name],
).then(toResObj);

const getTechStackID = tech => dbConnection.query(
  'SELECT id FROM tech_stack WHERE tech = $1',
  [tech],
)
  .then(res => res[0] || addTechStack(tech))
  .then((res) => {
    const o = {};
    o.stack_id = res.id;
    return o;
  });

const promiseAllResultToObj = arr => arr.reduce((acc, curr) => Object.assign(acc, curr), {});

const addMemberTechStack = idObj => dbConnection.query(
  'INSERT INTO member_tech_stack ($/this:name/) VALUES ($/this:csv/) RETURNING *',
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
