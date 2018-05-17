const lowerCaseArray = require('./lowerCaseArray');

const removeArrayDuplicates = (arrayInput) => {
  return arrayInput.reduce((acc, curr) => {
    const lowerCaseAcc = lowerCaseArray(acc);

    if (!lowerCaseAcc.includes(curr.toLowerCase())) {
      acc.push(curr);
    }
    return acc;
  }, []);
};

module.exports = removeArrayDuplicates;
