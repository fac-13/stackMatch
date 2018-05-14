module.exports = (jobStatus) => {
  switch (jobStatus) {
    case 'green':
      return 'Currently Looking';
    case 'yellow':
      return 'Open to opportunities';
    default:
      return 'Not Looking';
  }
};
