
import { ADD_QUIZ, SAVE_QUIZZES } from '../constants/quiz'

const quiz = (state = [], action) => {

	switch(action.type) {

		case ADD_QUIZ:
			return state.concat(action.quiz);

		case SAVE_QUIZZES:
			return [...action.data];

		default:
			return state;

	}

}

export default quiz;