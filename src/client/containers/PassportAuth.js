import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { checkAuth } from '../actions/auth'

// this component dispatches and action to verify passport
// 3rd party authentication after redirect from the server

@connect(
	null,
	dispatch => ({
		checkAuth: bindActionCreators(checkAuth, dispatch)
	})
)
export default class PassportAuth extends React.Component {
	componentWillMount() { this.props.checkAuth() }
	render() {
		return (
			<div />
		);
	}
}