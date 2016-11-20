'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _compression = require('compression');

var _compression2 = _interopRequireDefault(_compression);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (app) {
  app.use((0, _compression2.default)());
};