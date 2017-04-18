const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const bodyParser = require('body-parser');
const index = require('./app/routes/index');
const user = require('./app/routes/user');
const colors = require('colors');
const app = express();
const mongoose = require('mongoose');
const config = require('config');

const options = {
  server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
  replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } }
};

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', index);
app.use('/user', user);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

console.log(colors.rainbow("Running in :"  + process.env.NODE_ENV));

mongoose.connect(config.DBHost, options);
let database = mongoose.connection;

mongoose.connection.on('connected',  () => {
  console.log(colors.green('Mongoose default connection open to ' + database.host));
});

mongoose.connection.on('error', err => {
  console.log(colors.red('Mongoose default connection error: ' + err));
});

mongoose.connection.on('disconnected', () => {
  console.log(colors.red('Mongoose default connection disconnected'));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
