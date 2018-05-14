const db = require('../database/db_connection');

const saveJobDetails = (formData, githubId) => {
  const objCopy = JSON.parse(JSON.stringify(formData));
  console.log('objCopy: ', objCopy);
  const values = Object.values(objCopy);
  values.push(githubId);

  return db.query(
    'UPDATE members SET job_view_pref = $1, job_search_status = $2, years_experience = $3, github_cv_url = $4, cv_url = $5 WHERE github_id = $6',
    values,
  ).then(() => console.log(`${githubId} member job info posted to DB`))
    .catch((error) => {
      throw new Error(error.message);
    });
};

module.exports = saveJobDetails;
