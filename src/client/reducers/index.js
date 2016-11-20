import { combineReducers } from 'redux'

import auth from './auth-reducer'
import quiz from './quiz-reducer'
import leaderboard from './leaderboard-reducer'

export default combineReducers({
  auth,
  quiz,
  leaderboard
});
