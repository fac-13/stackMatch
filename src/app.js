const express = require('express');
const path = require('path');
// const exphbs = require('express-handlebars');
// const controllers = require('./controllers/');


const app = express();

app.use(express.static(path.join(__dirname, '..', 'public')));


module.exports = app;
