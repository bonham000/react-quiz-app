
import axios from 'axios'

export const saveNewQuiz = (data) => {
	return dispatch => {
		axios.post('/save-quiz', data).then( (response) => {
			console.log(response);
		}).catch(err => console.log(err));
	}
}