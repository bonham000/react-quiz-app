import express from 'express'
import bodyParser from 'body-parser'
import jwt from 'jsonwebtoken'
import secret from '../jwt-config'
import dotenv from 'dotenv'
dotenv.config();

const app = module.exports = express.Router();

app.get('/get-quizzes', (req, res) => {

	// connect to database, retrieve all quizzes, and return array to client

});

app.post('/create-quiz', (req, res) => {

	const { quiz, user, token } = req.body;
	
	jwt.verify(token, secret, (err, decoded) => {
	
		if (err) {
			res.status(401).send('Only authorized users can create quizzes.');
		} else {
			// submit quiz to database
		}

	});

});