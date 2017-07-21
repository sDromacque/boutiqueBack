const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const bodyParser = require('body-parser');
const colors = require('colors');
const app = express();
const mongoose = require('mongoose');
const config = require('config');
const cors = require('cors');
const morgan = require('morgan');

const user     = require('./app/routes/user');
const boutique = require('./app/routes/boutique');
const auth     = require('./app/routes/auth');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(morgan("common"));

app.use(cors());

app.use('/user', user);
app.use('/boutique', boutique);
app.use('/auth', auth);

app.use('/', express.static(__dirname + '/public/apidoc'));
app.use('/coverage', express.static(__dirname + '/coverage/lcov-report'));

console.log(colors.rainbow("Running in :"  + process.env.NODE_ENV));

mongoose.connect(config.DBHost);
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

app.use((err, req, res, next) => {
  if (! err) {
    return next();
  }

  res.status(500);
  res.send('500: Internal server error');
});

module.exports = app;
