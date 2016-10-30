import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

import { logoutUser } from '../actions/logout'

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

            { !isAuthenticated &&
                <button>
                  <Link to = 'login' className = 'authLink'>Login</Link>
                </button> }

            { !isAuthenticated &&
              <button>
                <Link to = 'signup' className = 'authLink'>Sign Up</Link>
              </button> }

            { isAuthenticated &&
                <Link to = 'counter' className = 'navLink' activeClassName = 'activeRoute'>Counter</Link> }

            { isAuthenticated &&
              <button onClick={ () => dispatch(logoutUser()) }>
                Logout
              </button> }

          </div>
        </div>
    )
  }
}

export default Navbar;