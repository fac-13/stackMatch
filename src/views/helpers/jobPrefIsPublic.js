module.exports = (jobViewPref) => {
  if (jobViewPref === 'public') {
    return 'eye icon';
  }
  return 'lock icon';
};

