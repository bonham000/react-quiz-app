import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as loginActions from '../actions/login'

@connect(
  state => ({
    errorMessage: state.auth.loginError
  }),
  dispatch => ({
    loginActions: bindActionCreators(loginActions, dispatch)
  })
)
class LoginPage extends React.Component {
  static propTypes = {
    loginActions: PropTypes.object.isRequired,
    errorMessage: PropTypes.string
  }
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }
    this.handleInput = this.handleInput.bind(this);
    this.submitLogin = this.submitLogin.bind(this);
  }
  handleInput(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  submitLogin() {

    const username = this.state.username;
    const password = this.state.password;

    if (username !== '' && password !== '') {
      const creds = { username: username.trim(), password: password.trim() }
      // dispatch login action 
      this.props.loginActions.loginUser(creds);
    }

  }
  render() {
    const { errorMessage } = this.props
    return (
      <div className = 'loginForm'>

        <h1>Log In Here</h1>

        { errorMessage && <div className = 'errorsBox'>
          <p>{errorMessage}</p></div> }

        <input
          type = 'text'
          name = 'username'
          className = "loginInput"
          placeholder = 'Username'
          value = {this.state.username}
          onChange = {this.handleInput} />

        <input
          type = 'password'
          name = 'password'
          className = "loginInput"
          placeholder = 'Password'
          value = {this.state.password}
          onChange = {this.handleInput} />

        <button onClick = {this.submitLogin}>
          Login
        </button>

      </div>
    );
  }
};

export default LoginPage;