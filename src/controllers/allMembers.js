const { addUserStatus } = require('./middleware');

// placeholder until index.js is merged from PR request
const { ...allMembers } = [{
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


exports.get = (req, res) => {
  const user = addUserStatus(req);
  console.log(user);
  // add all members information to req.
  res.render('allmembers', { activePage: { allmembers: true }, user, allMembers });
};
