const
  express      = require('express'),
  logger       = require('morgan'),
  bodyParser   = require('body-parser'),
  colors       = require('colors'),
  app          = express(),
  mongoose     = require('mongoose'),
  config       = require('config'),
  cors         = require('cors'),
  morgan       = require('morgan'),
  passport     = require('passport'),
  requireAuth  = passport.authenticate('jwt', {session: false})
;

//===================================
// routes ===========================
//===================================
const user     = require('./app/routes/user');
const boutique = require('./app/routes/boutique');
const auth     = require('./app/routes/auth');
const file     = require('./app/routes/file');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(morgan("common"));


app.use(cors());

app.use('/user', user);
app.use('/boutique', boutique);
app.use('/auth', auth);
app.use('/file',requireAuth, file);

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
