const express = require('express');
const path = require('path');

const router = express.Router();

const home = require('./home');

router.get('/', home.get);

module.exports = router;
