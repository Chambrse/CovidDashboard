require('dotenv').config()
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bigquery = require('./bigquery/bigquery');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var bqRouter = require('./routes/bq');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'build')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/bq', bqRouter);

module.exports = app;
