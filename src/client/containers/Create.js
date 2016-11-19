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
				title: '',
				questions: []
			},
			title: '',
			answers: ['']
		}
		this.handleKeyPress = this.handleKeyPress.bind(this);
		this.handleInput = this.handleInput.bind(this);
		this.addAnswerOption = this.addAnswerOption.bind(this);
		this.removeOption = this.removeOption.bind(this);
	}
	handleKeyPress(key) {
		if (key.keyCode === 9) {
			const { answers } = this.state;
			if (answers[answers.length - 1] !== '') {
				this.addAnswerOption();
			}
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
				<h1>Create a Quiz</h1>
				<p className = 'subtitle'>You can create a new quiz here. Add as many options as you want, you can always edit them later!</p>
				<div className = 'createQuizContainer'>
					<p className = 'inputTitles'>Title:</p>
					<input
						type = 'text'
						name = 'title'
						placeholder = 'Enter a Title' 
						value = {this.state.title}
						onChange = {this.handleInput}
						className = 'answerTitle' />
					<p className = 'inputTitles'>Answer Options</p>
					{renderAnswers}
					<button
						className = 'addOption'
						onClick = {this.addAnswerOption}>
						Add Another Option
					</button>
					<div className = 'proceedWrapper'>
						<button
							className = 'proceedBtn'
							onClick = {this.addAnswerOption}>
							Submit and Add Another
						</button>
						<button
							className = 'proceedBtn'
							onClick = {this.addAnswerOption}>
							Submit and Review
						</button>
					</div>
				</div>
			</div>
		);
	}
	componentDidMount() {
		window.addEventListener('keydown', this.handleKeyPress);
	}
};