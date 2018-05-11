exports.post = (req, res) => {
  console.log('trying to save');
  // const formData = req.body;
  // saves form data

  /*
  {
    "full_name": "aaaa",
    "github_handle": "bbbbbb",
    "fac_campus": "London",
    "fac_number": "0",
    "tech_stack": "JavaScript",
    "linkedin_url": "a",
    "twitter_handle": "a"
    }
  */
  res.redirect('/myprofile/mydetails/edit');
};
