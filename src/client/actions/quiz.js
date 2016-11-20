
import axios from 'axios'

import { ADD_QUIZ, SAVE_QUIZZES } from '../constants/quiz'

const addQuizLocal = (quiz) => {
	return {
		type: ADD_QUIZ,
		quiz
	}
}

export const saveNewQuiz = (data) => {
	return dispatch => {
		axios.post('/save-quiz', data).then( (response) => {
			dispatch(addQuizLocal(data.quiz));
		}).catch(err => console.log(err));
	}
}

const saveQuizzes = (data) => {
	return {
		type: SAVE_QUIZZES,
		data
	}
}

export const getQuizzes = () => {
	return dispatch => {
		axios.get('/get-quizzes').then( (response) => {
			const data = response.data;
			dispatch(saveQuizzes(data));
		});
	}
}