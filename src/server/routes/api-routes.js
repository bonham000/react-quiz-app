import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import jwt from 'jsonwebtoken'
import secret from '../jwt-config'
import dotenv from 'dotenv'
dotenv.config();

import Quiz from '../models/quiz'

const app = module.exports = express.Router();

// retrieve all quizzes from database and return to client upon request
app.get('/get-quizzes', (req, res) => {
	Quiz.find({}, (err, data) => {
		res.status(201).send(data);
	});
});

// post a new quiz from client to database
app.post('/save-quiz', (req, res) => {
	const { quiz: quizData, user, token } = req.body;
	jwt.verify(token, secret, (err, decoded) => {
		if (err) {
			res.status(401).send('Only authorized users can create quizzes.');
		} else {
			// submit quiz to database
			const quiz = new Quiz({
				author: user,
				title: quizData.title,
				questions: quizData.questions
			});
			quiz.save( (err) => {
				if (err) throw err;
				res.status(201).send('submission success!');
			});	
		}
	});
});