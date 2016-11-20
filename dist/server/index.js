'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _expressHistoryApiFallback = require('express-history-api-fallback');

var _expressHistoryApiFallback2 = _interopRequireDefault(_expressHistoryApiFallback);

var _dev = require('./config/setup/dev');

var _dev2 = _interopRequireDefault(_dev);

var _prod = require('./config/setup/prod');

var _prod2 = _interopRequireDefault(_prod);

var _env = require('./config/env');

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _expressSession = require('express-session');

var _expressSession2 = _interopRequireDefault(_expressSession);

var _cookieParser = require('cookie-parser');

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _apiRoutes = require('./routes/api-routes');

var _apiRoutes2 = _interopRequireDefault(_apiRoutes);

var _passport3 = require('./routes/passport');

var _passport4 = _interopRequireDefault(_passport3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config({ silent: true });

var url = process.env.MONGO_HOST;
var secretString = process.env.SECRET_STRING;

var app = (0, _express2.default)();

if (_env.NODE_ENV === 'development') {
  (0, _dev2.default)(app);
} else {
  (0, _prod2.default)(app);
}

app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use(_bodyParser2.default.json());

// test connection to database
_mongoose2.default.Promise = global.Promise;
_mongoose2.default.connect(url, function () {
  console.log('connected through mongoose');
});

app.use(_express2.default.static('dist/client'));

app.use((0, _cookieParser2.default)(secretString));
app.use((0, _expressSession2.default)({
  secret: secretString,
  resave: true,
  secure: false,
  saveUninitialized: true
}));

// setup passport
app.use(_passport2.default.initialize());
app.use(_passport2.default.session());

_passport2.default.serializeUser(function (user, done) {
  done(null, user);
});
_passport2.default.deserializeUser(function (user, done) {
  done(null, user);
});

// connect authentication and api routes
app.use(_passport4.default);
app.use(_apiRoutes2.default);

app.use((0, _expressHistoryApiFallback2.default)(_path2.default.join(__dirname, '../../dist/client/index.html')));

app.listen(_env.PORT, function (err) {
  if (err) throw err;
  console.log('The Express Server is Listening at port ' + _env.PORT + ' in ' + _env.NODE_ENV + ' mode');
});

exports.default = app;