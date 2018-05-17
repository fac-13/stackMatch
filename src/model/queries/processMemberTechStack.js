const {
  getAllTechStack,
  addTechStack,
  addMemberTechStack,
  deleteMemberTechStack,
} = require('./queryTechStack');

const addUniqueTech = (techStackArray) =>
  getAllTechStack()
    .then((allTechStack) => {
      const lowerCaseAllTechStack = allTechStack.map(function (item) {
        return item.toLowerCase();
      });
      return techStackArray.reduce((acc, curr) => {
        if (!lowerCaseAllTechStack.includes(curr.toLowerCase())) {
          acc.push(curr)
        }
        return acc
      }, [])
    })
    .then((res) => Promise.all(res.map((tech) => addTechStack(tech))))

const processMemberTechStack = (github_id, techStackArray) =>
  addUniqueTech(techStackArray)
    .then(() => deleteMemberTechStack(github_id))
    .then(() => {
      return techStackArray.reduce((acc, curr, i) => {
        acc.push({
          techName: curr,
          order_num: i,
        })
        return acc
      }, [])
    })
    .then((res) => Promise.all(
      res.map((tech) => addMemberTechStack(github_id, tech.techName, tech.order_num))
    ))

module.exports = { addUniqueTech, processMemberTechStack };
