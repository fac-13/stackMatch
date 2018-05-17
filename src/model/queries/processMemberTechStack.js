const {
  getAllTechStack,
  addTechStack,
  addMemberTechStack,
  deleteMemberTechStack,
} = require('./queryDb_TechStackTables');

const removeArrayDuplicates = require('../../lib/removeArrayDuplicates')
const lowerCaseArray = require('../../lib/lowerCaseArray')


// addUniqueTech function = Takes is as parameter: Array of strings of tech stack (either from initial API on signup or from profile form submission) - this array can include dupes.
// In the process, checks if any tech strings are NOT in the DB tech_stack table and adds them.

const addUniqueTech = (techStackArray) =>
  getAllTechStack()
    .then((allTechStack) => {

      const lowerCaseAllTechStack = lowerCaseArray(allTechStack);

      return removeArrayDuplicates(techStackArray).reduce((acc, curr) => {
        if (!lowerCaseAllTechStack.includes(curr.toLowerCase())) {
          acc.push(curr)
        }
        return acc
      }, [])
    })
    .then((res) => Promise.all(res.map((tech) => addTechStack(tech))))

// processMemberTechStack function = Takes is as parameter: Array of strings of tech stack (either from initial API on signup or from profile form submission) - this array can include dupes.
// Uses addUniqueTech to check if any tech strings are NOT in the DB tech_stack table and adds them.
// Returns - Updates the DB member_tech_stack linking table - adds to it or updates it.

const processMemberTechStack = (github_id, techStackArray) =>
  addUniqueTech(techStackArray)
    .then(() => deleteMemberTechStack(github_id))
    .then(() => {
      return removeArrayDuplicates(techStackArray).reduce((acc, curr, i) => {
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
