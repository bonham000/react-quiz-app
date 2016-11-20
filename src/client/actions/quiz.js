
import axios from 'axios'

import { ADD_QUIZ, SAVE_QUIZZES, UPDATE_LEADERBOARD } from '../constants/quiz'

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

export const submitScore = (data) => {
	return dispatch => {
		axios.post('/submit-score', data).then( (response) => {
		dispatch(getLeaders());
		}).catch(err => console.log(err));
	}
}

const updateLeaderboard = (data) => {
	return {
		type: UPDATE_LEADERBOARD,
		data
	}
}

export const getLeaders = () => {
	return dispatch => {
		axios.get('/get-leaders').then( (response) => {
			const data = response.data;
			dispatch(updateLeaderboard(data));
		}).catch(err => console.log(err));
	}
}

export const updateQuiz = (data) => {
	return dispatch => {
		axios.post('/update-quiz', data).then( (response) => {
			console.log(response);
		}).catch(err => console.log(err));
	}
}



