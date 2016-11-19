import React from 'react'
import { connect } from 'react-redux'
import { browserHistory, Link } from 'react-router'

@connect(
	state => ({
		isAuthenticated: state.auth.isAuthenticated,
		user: state.auth.user
	})
)
class About extends React.Component {
	static propTypes = {
		isAuthenticated: React.PropTypes.bool.isRequired,
		user: React.PropTypes.string.isRequired
	}
 	render() {
 		return (
		  <div className = 'aboutWrapper'>

				{ this.props.isAuthenticated ? 
		    <h1>Welcome to the React Quiz App {this.props.user}!</h1> :
		    <h1>Welcome to the React Quiz App!</h1> }

				{ this.props.isAuthenticated &&
					<div>
						<p>This app will help you learn React and Redux, awesome new cutting edge web technologies! <Link to = 'quiz'>Visit the Quiz</Link> to get started, but you can also use this app to <Link to = 'create'>create your own quizzes</Link> on any topic!</p>
					</div> }

		  </div>
	  );
 	}
}
export default About;
