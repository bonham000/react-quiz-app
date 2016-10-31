import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { checkAuth } from '../actions/login'

// this component dispatches and action to verify passport 3rd party authentication after redirect from the server
@connect(
	null,
	dispatch => ({
		passport: bindActionCreators(checkAuth, dispatch)
	})
)
class PassportAuth extends React.Component {
	componentWillMount() { this.props.passport() }
	render() {
		return (
			<div></div>
		);
	}
}

export default PassportAuth;