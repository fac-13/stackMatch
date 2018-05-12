module.exports = (jobViewPref) => {
  switch (jobViewPref) {
    case 'public':
      return true;
      break;
    default:
      return false;
  }
}