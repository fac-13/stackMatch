const addFacCohortReturnID = require('./addFacCohortReturnID');
const getFacCohortID = require('./getFacCohortID');
const updateMemberDetails = require('./updateMemberDetails');
const makeFacCohortName = require('../../lib/makeFacCohortName');

const saveProfileData = (dataObj, githubID) => {
  const objClone = JSON.parse(JSON.stringify(dataObj));
  const cohortName = makeFacCohortName(objClone.fac_campus, objClone.fac_number);
  return getFacCohortID(cohortName)
    .then((resObj) => {
      if (!resObj) {
        return addFacCohortReturnID(cohortName);
      }
      return resObj;
    })
    .then(facCohortID => updateMemberDetails(objClone, facCohortID.id, githubID));
};

module.exports = saveProfileData;

