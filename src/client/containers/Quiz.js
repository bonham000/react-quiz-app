import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { submitScore } from '../actions/quiz'

import Study from '../components/Study'

@connect(
	state => ({
		quizzes: state.quiz,
		user: state.auth.user,
		isAuthenticated: state.auth.isAuthenticated
	}),
	dispatch => ({
		submitScore: bindActionCreators(submitScore, dispatch)
	})
)
export default class Quiz extends React.Component {
	constructor() {
		super();
		this.state = {
			session: false,
			selectedQuiz: '',
			selectedQuizTitle: '',
			quiz: [],
			length: null
		}
		this.selectQuiz = this.selectQuiz.bind(this);
		this.startStudy = this.startStudy.bind(this);
		this.endStudy = this.endStudy.bind(this);
	}
	componentDidMount() {
		const { quizzes } = this.props;
		for (let i = 0; i < quizzes.length; i++) {
			if (quizzes[i]['title'] === 'React/Redux Quiz') {
				this.setState({
					selectedQuiz: quizzes[i].id,
					selectedQuizTitle: quizzes[i].title,
					length: quizzes[i].questions.length
				});
			}
		}
	}
	selectQuiz(event) {
		const quizID = event.target.value;
		const { quizzes } = this.props;
		let { length } = this.state;
		let title = '';
		for (let i = 0; i < quizzes.length; i++) {
			if (quizzes[i].id === quizID) {
				length = quizzes[i].questions.length;
				title = quizzes[i].title;
			}
		}
		this.setState({
			selectedQuiz: quizID,
			selectedQuizTitle: title,
			length
		});
	}
	startStudy() {
		const { selectedQuiz } = this.state;
		const quiz = this.props.quizzes.filter( (quiz) => quiz.id === selectedQuiz );
		this.setState({ quiz: quiz[0], session: true });
	}
	endStudy(score) {
		this.setState({ session: false });
		if (this.props.isAuthenticated) {
			const { user } = this.props;
			const scoreData = {
				user,
				score,
				quiz: this.state.selectedQuizTitle,
				id: this.state.selectedQuiz
			}
			this.props.submitScore(scoreData);
		}
	}
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
					<p>All the quizzes uploaded by users are available here:</p>
					<select onChange = {this.selectQuiz.bind(this)} value = {this.state.selectedQuiz}>
						{this.props.quizzes.map( (quiz, idx) => {
							return (
								<option
									value = {quiz.id}
									key = {idx} >
									{quiz.title}
								</option>
							);
						}) }
					</select>
					{this.state.length !== null &&
						<p className = 'quizInfo'>This quiz has a total of {this.state.length} questions</p> }
					<button className = 'studyBtn' onClick = {this.startStudy}>Begin Quiz</button>
				</div>
			);
		}
	}
};