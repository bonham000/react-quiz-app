'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = validateUser;

var _validator = require('validator');

var _validator2 = _interopRequireDefault(_validator);

var _isEmpty = require('lodash/isEmpty');

var _isEmpty2 = _interopRequireDefault(_isEmpty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function validateUser(data) {

  var errors = {};

  if (_validator2.default.isEmpty(data.username)) {
    errors.username = 'This field is required';
  }
  if (_validator2.default.isEmpty(data.password)) {
    errors.password = 'This field is required';
  }
  if (_validator2.default.isEmpty(data.confirmPassword)) {
    errors.confirmPassword = 'This field is required';
  }
  if (!_validator2.default.equals(data.password, data.confirmPassword)) {
    errors.confirmPassword = 'The passwords must match';
  }
  if (_validator2.default.isEmpty(data.email)) {
    errors.email = 'This field is required';
  }
  if (!_validator2.default.isEmail(data.email)) {
    errors.email = 'The email is invalid';
  }

  return {
    errors: errors,
    isValid: (0, _isEmpty2.default)(errors)
  };
}