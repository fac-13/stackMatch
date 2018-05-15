const { addUserStatus } = require('./middleware');
const { getAllMemberData } = require('../model/queries/');

exports.get = (req, res) => {
  const user = addUserStatus(req);
  getAllMemberData()
    .then((allMembersData) => {
      res.render('allmembers', { activePage: { allmembers: true }, user, allMembersData });
    })
    .catch(err => console.log(err));
};
