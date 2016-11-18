import React from 'react'
import { Route } from 'react-router'
import App from './containers/App'
import About from './components/About'
import PassportAuth from './containers/PassportAuth'

export default (
  <Route name = 'home' component = {App}>
  	<Route path = '/' name = 'about' component = {About} />
  	<Route path = 'account' name = 'account' component = {PassportAuth} />
  </Route>
);
