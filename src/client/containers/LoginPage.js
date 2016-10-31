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
      email: '',
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

    const { email, password } = this.state;

    if (email !== '' && password !== '') {
      const creds = { email: email.trim(), password: password.trim() }
      // dispatch login action 
      this.props.loginActions.loginUser(creds);
    }

  }
  render() {
    const { errorMessage } = this.props
    return (
      <div className = 'loginForm'>

        <h1>Log In Here</h1>

        <div className = 'socialLogin'>
          <a className = "btn btn-block btn-social btn-twitter" href = "/auth/twitter">
            <span className = "fa fa-twitter"></span> Sign in with Twitter
          </a>
           <a className = "btn btn-block btn-social btn-github" href = "/auth/github">
            <span className = "fa fa-github"></span> Sign in with GitHub
          </a>
        </div>

        { errorMessage && <div className = 'errorsBox'>
          <p>{errorMessage}</p></div> }

        <input
          type = 'text'
          name = 'email'
          className = "loginInput"
          placeholder = 'Email Address'
          value = {this.state.email}
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

        <br />

      </div>
    );
  }
};

export default LoginPage;