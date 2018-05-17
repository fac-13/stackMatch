const {
  getAllTechStack,
  addTechStack,
  updateTechOrderNum,
  addMemberTechStack,
  getMemberTechStack,
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

// const processMemberTechStack = (github_id, techStackArray) =>
//   addUniqueTech(techStackArray)
//     .then(() => getMemberTechStack(github_id))
//     .then((memTechStack) => {
//       console.log('old', memTechStack)
//       if (memTechStack.tech_stack) {
//         const lowerCaseMemTechStack = memTechStack.tech_stack.map(function (item) {
//           return item.toLowerCase();
//         });
//         return techStackArray.reduce((acc, curr, i) => {
//           if (!lowerCaseMemTechStack.includes(curr.toLowerCase())) {
//             acc.addTech.push({
//               tech: curr,
//               order_num: i,
//             })
//           }
//           // if in member tech stack but not current tec stack array - delete
//           acc.updateOrder.push({
//             tech: curr,
//             order_num: i,
//           })
//           return acc
//         }, {
//             updateOrder: [],
//             addTech: [],
//           })
//       } else {
//         return techStackArray.reduce((acc, curr, i) => {
//           acc.addTech.push({
//             tech: curr,
//             order_num: i,
//           })
//           return acc
//         }, {
//             addTech: [],
//           })
//       }

//     })
//     .then((res) => Promise.all(
//       res.addTech.map((obj) => addMemberTechStack(github_id, obj.tech, obj.order_num))
//         .concat(res.updateOrder ? res.updateOrder.map((obj) => updateTechOrderNum(github_id, obj.tech, obj.order_num)) : null)
//     ))

module.exports = { addUniqueTech, processMemberTechStack };
