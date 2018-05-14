module.exports = (jobStatus) => {
  switch (jobStatus) {
    case 'green':
      return 'Currently Looking';
      break;
    case 'orange':
      return 'Open to opportunities';
      break;
    default:
      return 'Not Looking';
  }
}
