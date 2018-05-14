module.exports = (jobStatus) => {
  switch (jobStatus) {
    case 'green':
      return 'Currently Looking';
    case 'orange':
      return 'Open to opportunities';
    default:
      return 'Not Looking';
  }
};
