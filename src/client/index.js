import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Router, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import routes from './routes'
import thunkMiddleware from 'redux-thunk'
import configureStore from './store/configureStore'

import './theme/bootstrap-social.css'
import './theme/index.scss'

export const store = configureStore();

render(
  <Provider store = {store}>
    <Router history = {browserHistory} routes = {routes} />
  </Provider>,
  document.getElementById('app')
);
