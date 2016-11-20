
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { getQuizzes } from '../actions/quiz'

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

@connect( 
	null,
	dispatch => ({
		getQuizzes: bindActionCreators(getQuizzes, dispatch)
	})
)
export default class App extends React.Component {
  render() {
    return (
      <div>
        <Navbar />
        {this.props.children}
        <Footer />
      </div>
    )
  }
  componentDidMount() { this.props.getQuizzes() }
}