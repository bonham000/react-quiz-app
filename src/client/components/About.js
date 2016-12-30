import React from 'react'
import { connect } from 'react-redux'
import { browserHistory, Link } from 'react-router'

import reactLogo from '../data/react.png'
import reduxLogo from '../data/redux.png'

@connect(
	state => ({
		isAuthenticated: state.auth.isAuthenticated,
		user: state.auth.user
	})
)
class About extends React.Component {
	static propTypes = {
		isAuthenticated: React.PropTypes.bool.isRequired
	}
 	render() {
 		return (
		  <div className = 'aboutWrapper'>

				{ this.props.isAuthenticated ? 
		    <h1>Welcome to <b>Quiz-it</b> {this.props.user}!</h1> :
		    <h1>Welcome to <b>Quiz-it</b></h1> }

		    { !this.props.isAuthenticated && 
					<div className = 'description'>
						<p>You can go ahead and view <Link to = 'quiz'>existing quizzes</Link> or login with GitHub to create your own quizzes. If you want your score to be recorded on the leaderboard, be sure to login before taking the quiz. Enjoy! <i className="em em-smile"></i></p>
					</div> }

				{ this.props.isAuthenticated &&
					<div className = 'description'>
						<p>This app will help you learn React and Redux, awesome new cutting edge web technologies! Feel free to go ahead and <Link to = 'quiz'>take the Quiz</Link> to test your React skills, or you can just use this app to <Link to = 'create'>create your own quizzes</Link> on any topic! Enjoy!</p>
					</div> }

		  </div>
	  );
 	}
}
export default About;
