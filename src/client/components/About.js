import React from 'react'
import { connect } from 'react-redux'
import { browserHistory, Link } from 'react-router'

@connect(
	state => ({
		isAuthenticated: state.auth.isAuthenticated
	})
)
class About extends React.Component {
	 constructor(props) {
    super(props);
  }
 	render() {
 		return (
		  <div className = 'aboutWrapper'>
		    <h1>Welcome to the Free Code Camp Nightlife Coordination App</h1>

		    { !this.props.isAuthenticated && <div>
		    	<h3>Please <Link to = '/login'>login</Link> or <Link to = '/signup'>sign up</Link> to view local bars in your area and mark that you are attending.</h3>
		    </div> }

				{ this.props.isAuthenticated && <div>
					<h2>Welcome {localStorage.getItem('user')}</h2>
					<p>This voting app allows you to create polls and share them with your friends.
							You can add and delete polls, and add new options to polls if you want.
							Anyone can vote, but you must create an account to add new polls. Have fun! <i className = "em em-smile"></i>
					</p>
					<h3 className = 'credits'><a target = "_blank" href = "https://github.com/bonham000/voting-app">View the source on GitHub</a></h3>
					<h3 className = 'credits'>This app was created with React and Redux and is a <a target = "_blank" href = "https://www.freecodecamp.com/challenges/build-a-voting-app">project for Free Code Camp</a>.</h3>
					</div> }

		  </div>
	  );
 	}
}
export default About;
