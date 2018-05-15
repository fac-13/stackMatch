const db = require('../database/db_connection');

const postMemberInfo = (githubJson) => {
  const values = Object.values(githubJson);
  return db.query(
    'INSERT INTO members (github_id, github_handle, full_name, github_avatar_url) VALUES ($1, $2, $3, $4)',
    values,
  )
    .catch((error) => {
      throw new Error(error.message);
    });
};

module.exports = postMemberInfo;
