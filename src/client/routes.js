import React from 'react'
import { Route } from 'react-router'

import App from './containers/App'
import About from './components/About'
import Quiz from './containers/Quiz'
import Create from './containers/Create'
import PassportAuth from './containers/PassportAuth'

export default (
  <Route name = 'home' component = {App}>
  	<Route path = '/' name = 'about' component = {About} />
  	<Route path = 'quiz' name = 'quiz' component = {Quiz} />
  	<Route path = 'create' name = 'create' component = {Create} />
  	<Route path = 'account' name = 'account' component = {PassportAuth} />
  </Route>
);
