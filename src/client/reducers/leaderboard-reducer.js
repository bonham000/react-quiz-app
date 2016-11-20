
import { CREATE_LEADERBOARD } from '../constants/quiz'

const leaderboard = (state = [], action) => {

	switch(action.type) {

		case CREATE_LEADERBOARD:
		console.log(action.data);
			return [...action.data];

		default:
			return state;

	}

}

export default leaderboard;