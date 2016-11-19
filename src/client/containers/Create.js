import React from 'react'

// quiz title
// add questions w/ answer choices
// review quiz
// submit quiz (saves to database w/ author and title information)
	// all saved quizzes then get loaded into the quiz component for study

export default class Create extends React.Component {
	constructor() {
		super();
		this.state = {
			quiz: {
				author: '',
				title: '',
				questions: []
			},
			title: false,
			quizTitle: '',
			questionTitle: '',
			answers: ['']
		}
		this.handleKeyPress = this.handleKeyPress.bind(this);
		this.setQuizTitle = this.setQuizTitle.bind(this);
		this.handleInput = this.handleInput.bind(this);
		this.addAnswerOption = this.addAnswerOption.bind(this);
		this.removeOption = this.removeOption.bind(this);
		this.submitAndContinue = this.submitAndContinue.bind(this);
		this.submitAndReview = this.submitAndReview.bind(this);
	}
	handleKeyPress(key) {
		if (key.keyCode === 9) {
			const { answers } = this.state;
			if (answers[answers.length - 1] !== '') {
				this.addAnswerOption();
			}
		}
	}
	setQuizTitle() {
		const { quiz, quizTitle } = this.state;
		if (quizTitle !== '') {
			quiz.title = quizTitle;
			this.setState({
				title: true,
				quiz
			});
		}
	}
	handleInput(event) {
		this.setState({
			[event.target.name]: event.target.value
		});
	}
	handleOption(idx, event) {
		const { answers } = this.state;
		answers[idx] = event.target.value;
		this.setState({ answers });
	}
	addAnswerOption() {
		const { answers } = this.state;
		answers.push('')
		this.setState({ answers });
	}
	removeOption(idx) {
		const { answers } = this.state;
		if (answers.length > 1) {
			answers.splice(idx, 1);
			this.setState({ answers });
		}
	}
	submitAndContinue() {
		const { quiz, answers, questionTitle } = this.state;
		const question = {
			questionTitle,
			answers
		}
		quiz.questions.push(question);
		this.setState({
			quiz,
			questionTitle: '',
			answers: ['']
		});
	}
	submitAndReview() {

	}
	render() {
		const renderAnswers = this.state.answers.map( (ans, idx) => {
			const { answers } = this.state;
			return (
				<div className = 'answerContainer' key = {idx}>
					<input
						type = 'text'
						name = {'answer_', {ans}}
						placeholder = 'Enter an Answer and Press Tab to Add Another' 
						value = {answers[idx]}
						onChange = {this.handleOption.bind(this, idx)}
						className = 'answerInput' />
					<i
						onClick = {this.removeOption.bind(this, idx)}
						className = "fa fa-times"
						aria-hidden = "true"></i>
				</div>
			);
		})
		return (
			<div className = 'createComponent'>
				
				{ !this.state.title ? 

					<div>
						<h1>Create a Quiz</h1>
						<p className = 'subtitle'>You can create a new quiz here. Add as many options as you want, you can always edit them later!</p>
						<p className = 'inputTitles'>Enter a Title for Your Quiz:</p>
						<input
							type = 'text'
							name = 'quizTitle'
							placeholder = 'Enter a Title' 
							value = {this.state.quizTitle}
							onChange = {this.handleInput}
							className = 'questionTitle' />
							<button
								className = 'addOption'
								onClick = {this.setQuizTitle}>
								Submit Title and Add Questions
							</button>
					</div>

					:

					<div className = 'createQuizContainer'>
						<h1>Add Questions for {this.state.quizTitle}:</h1>
						<p className = 'inputTitles'>Question:</p>
						<input
							type = 'text'
							name = 'questionTitle'
							placeholder = 'Enter a Question' 
							value = {this.state.questionTitle}
							onChange = {this.handleInput}
							className = 'questionTitle' />
						<p className = 'inputTitles'>Answers:</p>
						{renderAnswers}
						<button
							className = 'addOption'
							onClick = {this.addAnswerOption}>
							Add Another Option
						</button>
						<div className = 'proceedWrapper'>
							<button
								className = 'proceedBtn'
								onClick = {this.submitAndContinue}>
								Submit and Add Another
							</button>
							<button
								className = 'proceedBtn'
								onClick = {this.submitAndReview}>
								Submit and Review
							</button>
						</div>
					</div> }

			</div>
		);
	}
	componentDidMount() {
		window.addEventListener('keydown', this.handleKeyPress);
	}
};