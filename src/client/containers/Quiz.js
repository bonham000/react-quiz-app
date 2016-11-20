import React from 'react'
import { connect } from 'react-redux'

import Study from '../components/Study'

@connect(
	state => ({
		quizzes: state.quiz
	}),
	null
)
export default class Quiz extends React.Component {
	constructor() {
		super();
		this.state = {
			session: false,
			selectedQuiz: 'Math Quiz',
			quiz: []
		}
		this.selectQuiz = this.selectQuiz.bind(this);
		this.startStudy = this.startStudy.bind(this);
		this.endStudy = this.endStudy.bind(this);
	}
	selectQuiz(event) {
		console.log(event.target.value)
		this.setState({
			selectedQuiz: event.target.value
		})
	}
	startStudy() {
		const { selectedQuiz } = this.state;
		const quiz = this.props.quizzes.filter( (quiz) => quiz.title === selectedQuiz );
		this.setState({ quiz: quiz[0], session: true });
	}
	endStudy() { this.setState({ session: false }) }
	render() {
		if (this.state.session) {
			return (
				<Study
					endStudy = {this.endStudy}
					quiz = {this.state.quiz} />
			)
		} else {
			return (
				<div className = 'studyComponent'>
					<h1>Select a Quiz to Study</h1>
					<select onChange = {this.selectQuiz.bind(this)}>
						{this.props.quizzes.map( (quiz, idx) => {
							return (
								<option
									value = {quiz.title}
									key = {idx} >
									{quiz.title}
								</option>
							);
						}) }
					</select>
					<button className = 'studyBtn' onClick = {this.startStudy}>Begin Quiz</button>
				</div>
			);
		}
	}
};