const db = require('../database/db_connection');

const saveJobDetails = (formData, githubId) => {
  const parsedYears = JSON.parse(formData.years_experience.replace(/'/g, '"'));

  const objCopy = JSON.parse(JSON.stringify(formData));
  objCopy.min_years_exp = parsedYears.min_years_exp;
  objCopy.max_years_exp = parsedYears.max_years_exp;
  delete objCopy.years_experience;
  const values = Object.values(objCopy);
  values.push(githubId);

  return db.query(
    'UPDATE members SET job_view_pref = $1, job_search_status = $2, github_cv_url = $3, cv_url = $4, min_years_exp = $5, max_years_exp = $6 WHERE github_id = $7',
    values,
  ).then(() => console.log(`${githubId} member job info posted to DB`))
    .catch((error) => {
      throw new Error(error.message);
    });
};

module.exports = saveJobDetails;
