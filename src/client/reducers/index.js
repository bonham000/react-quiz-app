import { combineReducers } from 'redux'
import counting from './counting'
import auth from './auth-reducer'

export default combineReducers({
  counting,
  auth
});
