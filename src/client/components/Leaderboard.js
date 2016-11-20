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
				<div key = {index}>
					<h1>Quiz: {board.quiz}</h1>
					{board.leaders.sort( (a,b) => b.score - a.score ).map( (leader, idx) => {
						return (
							<div key = {idx}>
								<h1>User: {leader.user} | Score: {leader.score}</h1>
							</div>
						)
					}) }
				</div>
			);
		})
		return (
			<div>
				<h1>Leaderboard</h1>
				{mapLeaders}
			</div>
		);
	}
};