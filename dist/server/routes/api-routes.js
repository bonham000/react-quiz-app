'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _jwtConfig = require('../jwt-config');

var _jwtConfig2 = _interopRequireDefault(_jwtConfig);

var _uuidV = require('uuid-v4');

var _uuidV2 = _interopRequireDefault(_uuidV);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _quiz = require('../models/quiz');

var _quiz2 = _interopRequireDefault(_quiz);

var _leaderboard = require('../models/leaderboard');

var _leaderboard2 = _interopRequireDefault(_leaderboard);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();

var app = module.exports = _express2.default.Router();

// retrieve all quizzes from database and return to client upon request
app.get('/get-quizzes', function (req, res) {
	_quiz2.default.find({}, function (err, data) {
		res.status(201).send(data);
	});
});

// post a new quiz from client to database
app.post('/save-quiz', function (req, res) {
	var _req$body = req.body,
	    quizData = _req$body.quiz,
	    user = _req$body.user,
	    token = _req$body.token;

	_jsonwebtoken2.default.verify(token, _jwtConfig2.default, function (err, decoded) {
		if (err) {
			res.status(401).send('Only authorized users can create quizzes.');
		} else {
			// submit quiz to database
			var quiz = new _quiz2.default({
				author: user,
				title: quizData.title,
				id: (0, _uuidV2.default)(),
				questions: quizData.questions
			});
			quiz.save(function (err) {
				if (err) throw err;
				res.status(201).send('submission success!');
			});
		}
	});
});

app.post('/submit-score', function (req, res) {
	var _req$body2 = req.body,
	    user = _req$body2.user,
	    score = _req$body2.score,
	    id = _req$body2.id,
	    quiz = _req$body2.quiz;

	_leaderboard2.default.findOne({ id: id }, function (err, leaderboard) {
		if (err) throw err;
		if (!leaderboard) {
			leaderboard = new _leaderboard2.default({
				id: id,
				quiz: quiz,
				leaders: [{
					user: user,
					score: score
				}]
			});
			leaderboard.save(function (err) {
				if (err) throw err;
				res.status(201).send('score saved!');
			});
		} else {
			// if board exists, verify that user has not already submitted a score
			var checkLeaders = leaderboard.leaders.filter(function (leader) {
				return leader.user === user;
			});
			if (checkLeaders.length === 0) {
				leaderboard.leaders.push({
					user: user,
					score: score
				});
				leaderboard.save(function (err) {
					if (err) throw err;
					res.status(201).send('score saved!');
				});
			} else {
				res.status(401).send('Only your first score counts for the leaderboard!');
			}
		}
	});
});

app.get('/get-leaders', function (req, res) {
	_leaderboard2.default.find({}, function (err, data) {
		if (err) throw err;
		res.status(201).send(data);
	});
});