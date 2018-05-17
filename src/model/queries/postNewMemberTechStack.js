const {
  addMemberTechStack,
  getTechStackID,
  getAllTechStack,
  addTechStack,
  deleteMemberTech,
  getMemberTechStack,
} = require('./query_tech-stack');


const postNewMemberTechStack = (memberRepoStack) => {
  getAllTechStack().then((allTech1) => {
    const techNames = [];
    allTech1.forEach(tech => techNames.push(tech.tech));
    memberRepoStack.forEach(tech => (techNames.includes(tech) ? null : addTechStack(tech)));
    getAllTechStack().then((allTech2) => {
    });
  });
};


module.exports = postNewMemberTechStack;
