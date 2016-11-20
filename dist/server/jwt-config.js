'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _uuidV = require('uuid-v4');

var _uuidV2 = _interopRequireDefault(_uuidV);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var secret = (0, _uuidV2.default)();

exports.default = secret;