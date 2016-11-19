import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import { logoutUser } from '../actions/auth'

@connect(
  state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
  }),
  dispatch => ({
    logoutUser: bindActionCreators(logoutUser, dispatch)
  })
)
export default class Navbar extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    logoutUser: PropTypes.func.isRequired
  }
  render() {
    const { logoutUser, isAuthenticated, user } = this.props
    return (
      <div className = "navigationWrapper">
        <div className = "linksWrapper">

            <Link to = '/' className = 'navLink' activeClassName = 'activeRoute'>Home</Link>
            <Link to = 'quiz' className = 'navLink' activeClassName = 'activeRoute'>Quiz</Link>

          { !isAuthenticated &&
            <a className = "btn btn-block btn-social btn-github" id = 'githubAuth' href = "/auth/github">
              <span className = "fa fa-github"></span> Sign in with GitHub
            </a> }

          { isAuthenticated &&
            <Link to = 'create' className = 'navLink' activeClassName = 'activeRoute'>Create</Link> }

          { isAuthenticated &&
            <Link to = '#' className = 'navLink' onClick = { () => this.props.logoutUser() }>Logout</Link> }             

        </div>
      </div>
    );
  }
};