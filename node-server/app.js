const express = require('express'),
	  logger = require('morgan'),
	  bodyParser = require('body-parser');

const statusRoutes = require('./routes/statusRoutes');

let app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', statusRoutes);

module.exports = app;