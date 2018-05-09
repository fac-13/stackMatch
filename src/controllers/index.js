const express = require('express');

const router = express.Router();

const home = require('./home');
const signup = require('./signup');

router.get('/', home.get);
router.get('/signup', signup.get);

module.exports = router;
