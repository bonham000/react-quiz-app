
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Navbar from '../components/Navbar'

class App extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string
  }
  render() {
    const { dispatch, isAuthenticated, errorMessage } = this.props
    return (
      <div>
        <Navbar

          isAuthenticated = {isAuthenticated}
          errorMessage = {errorMessage}
          dispatch = {dispatch} />

        {this.props.children}

      </div>
    )
  }
}

//These props come from the application's state when it is started
function mapStateToProps(state) {

  const isAuthenticated = state.auth.isAuthenticated;
  const errorMessage = state.auth.errorMessage;

  return {
    isAuthenticated,
    errorMessage
  }
}

export default connect(mapStateToProps)(App)
