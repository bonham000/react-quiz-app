import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import validateUser from '../middleware/validateUser'
import { registerUser } from '../actions/login'

@connect (
	state => ({
		errorMessage: state.auth.registrationError
	}),
	dispatch => ({
		registerUser: bindActionCreators(registerUser, dispatch)
	}),
)
class SignupPage extends React.Component {
	static propTypes = {
		errorMessage: React.PropTypes.string.isRequired,
		registerUser: React.PropTypes.func.isRequired
	}
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: '',
			confirmPassword: '',
			email: '',
			errors: {}
		}
		this.handleInput = this.handleInput.bind(this);
		this.submitUser = this.submitUser.bind(this);
	}
	submitUser() {

		this.setState({ errors: {} });

		let { username, password, confirmPassword, email } = this.state;

		let newUser = {
			username: username,
			password: password,
			confirmPassword: confirmPassword,
			email: email
		}

		const validation = validateUser(newUser);

		// if user entries are valid fire off action
		if (validation.isValid) { this.props.registerUser(newUser) }
		// otherwise publish errors to client
		else {
			console.log(validation.errors);
			this.setState({
				errors: validation.error
			});
		}

	}
	handleInput(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
	}
	render() {
		const { errors } = this.state;
		return (
			<div className = 'signupForm'>

				<h1>Sign Up Here</h1>

				{this.props.errorMessage && <div className = "errorsBox">{this.props.errorMessage}</div>}

				{errors.username && <div className = "errorsBox">{errors.username}</div>}

				<input
					type = "text" 
					name = "username"
					placeholder = "Username"
					value = {this.state.username}
					onChange = {this.handleInput} />

				{errors.password && <div className = "errorsBox">{errors.password}</div>}

				<input
					type = "password" 
					name = "password"
					placeholder = "Password"
					value = {this.state.password}
					onChange = {this.handleInput} />

				{errors.confirmPassword && <div className = "errorsBox">{errors.confirmPassword}</div>}

				<input
					type = "password" 
					name = "confirmPassword"
					placeholder = "Password Confirmation"
					value = {this.state.confirmPassword}
					onChange = {this.handleInput} />

				{errors.email && <div className = "errorsBox">{errors.email}</div>}

				<input
					type = "email" 
					name = "email"
					placeholder = "Email Address"
					value = {this.state.email}
					onChange = {this.handleInput} /><br />

				<button onClick = {this.submitUser}>Sign Up</button>
				
			</div>
		);
	}
};

export default SignupPage;