import React from 'react'
import { connect } from 'react-redux'

@connect(
	state => ({
		leaders: state.leaderboard
	}),
	null
)
export default class Leaderboard extends React.Component {
	render() {
		const { leaders } = this.props
		const mapLeaders = leaders.map( (board, index) => {
			return (
				<div key = {index} className = 'quizWrapper'>
					<h3>{board.quiz}</h3>
					{board.leaders.sort( (a,b) => b.score - a.score ).map( (leader, idx) => {
						return (
							<div key = {idx} className = 'leadersWrapper'>
								<p>{leader.user}<span>{leader.score}%</span></p>
							</div>
						)
					}) }
				</div>
			);
		})
		return (
			<div className = 'leaderboardComponent'>
				<h1 className = 'title'>Leaderboard</h1>
				<p className = 'note'>Note: Only the score from your first attempt on a quiz will be recorded here.</p>
				{mapLeaders}
			</div>
		);
	}
};