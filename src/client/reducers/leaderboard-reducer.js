
import { UPDATE_LEADERBOARD } from '../constants/quiz'

const leaderboard = (state = [], action) => {

	switch(action.type) {

		case UPDATE_LEADERBOARD:
			return [...state, ...action.data];

		default:
			return state;

	}

}

export default leaderboard;