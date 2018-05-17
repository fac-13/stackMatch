const remDupsFromArray = (arrayInput) => {
  return arrayInput.reduce((acc, curr) => {
    const lowerCaseAcc = acc.map(function (item) {
      return item.toLowerCase();
    });
    if (!lowerCaseAcc.includes(curr.toLowerCase())) {
      acc.push(curr);
    }
    return acc;
  }, []);
};

module.exports = remDupsFromArray;
