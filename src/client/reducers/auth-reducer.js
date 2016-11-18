import { combineReducers } from 'redux'

import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_SUCCESS } from '../actions/auth'

const defaultState = {
  loginError: '',
  isFetching: false,
  isAuthenticated: false,
  user: '',
  token: ''
}

const auth = (state = defaultState, action) => {

  switch (action.type) {
  
    case LOGIN_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false
      });
  
    case LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: true,
        user: action.user,
        token: action.token
      });
  
    case LOGIN_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
        loginError: action.error
      });
   
    case LOGOUT_SUCCESS:
      return Object.assign({}, state, {
        isAuthenticated: false,
        user: '',
        token: ''
      });
 
    default:
      return state;

  }
}

export default auth;