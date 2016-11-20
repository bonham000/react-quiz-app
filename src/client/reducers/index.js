import { combineReducers } from 'redux'

import auth from './auth-reducer'
import quiz from './quiz-reducer'

export default combineReducers({
  auth,
  quiz
});
