require('dotenv').config()
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var dataRouter = require('./routes/data');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'build')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/data', dataRouter);




module.exports = app;
