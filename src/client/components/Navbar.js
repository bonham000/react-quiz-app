import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

import { logoutUser } from '../actions/auth'

class Navbar extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string
  }
  render() {
    const { dispatch, isAuthenticated, errorMessage } = this.props
    return (
        <div className = "navigationWrapper">
          <div className = "linksWrapper">

            <Link to = '/' className = 'navLink' activeClassName = 'activeRoute'>Home</Link>                             

            { isAuthenticated &&
              <Link to = '#' className = 'navLink' onClick = { () => dispatch(logoutUser()) }>Logout</Link> }

            { !isAuthenticated &&
                <a className = "btn btn-block btn-social btn-github navLink" href = "/auth/github">
                  <span className = "fa fa-github"></span> Sign in with GitHub
                </a> }

          </div>
        </div>
    )
  }
}

export default Navbar;