module.exports = (jobViewPref) => {
  if (jobViewPref === 'public') {
    return 'public';
  }
  return 'private';
};

