import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { updateQuiz } from '../actions/quiz'

import EditQuiz from './EditQuiz'

@connect(
	state => ({
		user: state.auth.user,
		quizzes: state.quiz
	}),
	dispatch => ({
		updateQuiz: bindActionCreators(updateQuiz, dispatch)
	})
)
export default class MyQuizzes extends React.Component {
	static propTypes = {
		user: React.PropTypes.string.isRequired,
		quizzes: React.PropTypes.array.isRequired,
		updateQuiz: React.PropTypes.func.isRequired
	}
	constructor(props) {
		super(props);
		this.state = {
			edit: false,
			quiz: []
		}
		this.editQuiz = this.editQuiz.bind(this);
	}
	editQuiz(id) {
		const { quizzes } = this.props;
		const editQuiz = quizzes.filter(quiz => quiz.id === id);
		this.setState({
			edit: true,
			quiz: editQuiz
		});
	}
	render() {
		const { quizzes, user } = this.props;
		return (
			<div>

				{

					this.state.edit ? <EditQuiz quiz = {this.state.quiz} /> : 
				
					<div>
						<h1>Here are the quizzes you've created:</h1>
						<p>Click on one to edit it:</p>
						{quizzes.filter(quiz => quiz.author === user).map( (quiz, idx) => {
							return (
								<div key = {idx} onClick = {this.editQuiz.bind(this, quiz.id)}>
									<h1>{quiz.title}</h1>
								</div>
							);
						}) }
					</div>

				}

			</div>
		);
	}
};