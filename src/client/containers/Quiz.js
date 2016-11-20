import React from 'react'
import { connect } from 'react-redux'

@connect(
	state => ({
		quizzes: state.quiz
	}),
	null
)
export default class Quiz extends React.Component {
	render() {
		return (
			<div className = 'studyComponent'>
				<h1>Select a Quiz to Study</h1>
				<select>
					{this.props.quizzes.map( (quiz, idx) => {
						return (
							<option value = {quiz.title} key = {idx}>{quiz.title}</option>
						);
					}) }
				</select>
				<button className = 'studyBtn'>Begin Quiz</button>
			</div>
		);
	}
};