const makeFacCodeName = (facCampus, facNumber) => {
  const prefix = {
    london: 'FAC',
    nazareth: 'FACN',
    gaza: 'FACG',
  }[facCampus.toLowerCase()];
  return `${prefix}${facNumber}`;
};

module.exports = makeFacCodeName;
