'use strict';

Object.defineProperty(exports, "__esModule", {
		value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var User = new Schema({
		id: String,
		username: String
});

exports.default = _mongoose2.default.model('User', User);