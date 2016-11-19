import React from 'react'

// quiz title
// add questions w/ answer choices
// review quiz
// submit quiz (saves to database w/ author and title information)
	// all saved quizzes then get loaded into the quiz component for study


// need to connect with redux for user and dispatch
export default class Create extends React.Component {
	constructor() {
		super();
		this.state = {
			quiz: {
				author: '',
				title: '',
				questions: []
			},
			review: false,
			reviewRequest: false,
			editQuizTitleState: false,
			editQuizTitle: '',
			editReview: new Map(),
			title: false,
			quizTitle: '',
			questionTitle: '',
			answers: [''],
			correctAnswer: null
		}
		this.handleKeyPress = this.handleKeyPress.bind(this);
		this.setQuizTitle = this.setQuizTitle.bind(this);
		this.handleInput = this.handleInput.bind(this);
		this.addAnswerOption = this.addAnswerOption.bind(this);
		this.removeOption = this.removeOption.bind(this);
		this.submitAndContinue = this.submitAndContinue.bind(this);
		this.submitAndReview = this.submitAndReview.bind(this);
		this.editQuestion = this.editQuestion.bind(this);
		this.handleEditQuizTitle = this.handleEditQuizTitle.bind(this);
		this.submitTitleEdit = this.submitTitleEdit.bind(this);
		this.cancelTitleEdit = this.cancelTitleEdit.bind(this);
		this.submitQuestionEdit = this.submitQuestionEdit.bind(this);
		this.cancelQuestionEdit = this.cancelQuestionEdit.bind(this);
		this.setCorrectAnswerEdit = this.setCorrectAnswerEdit.bind(this);
		this.handleOptionEdit = this.handleOptionEdit.bind(this);
		this.removeOptionEdit = this.removeOptionEdit.bind(this);
		this.addEditOption = this.addEditOption.bind(this);
		this.saveQuiz = this.saveQuiz.bind(this);
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
	setCorrectAnswer(idx) {
		this.setState({
			correctAnswer: idx
		});
	}
	submitAndContinue() {
		const { quiz, answers, correctAnswer, questionTitle } = this.state;
		const filteredAnswers = answers.filter( (answer) => answer !== '' );
		if (correctAnswer !== null && questionTitle !== '' && filteredAnswers.length > 1) {
			const question = {
				questionTitle,
				correctAnswer,
				answers: filteredAnswers
			}
			quiz.questions.push(question);
			this.setState({
				quiz,
				questionTitle: '',
				answers: [''],
				correctAnswer: null,
				message: 'Question Added!'
			});
			setTimeout( () => { this.setState({ message: '' }) }, 3000);
		}
	}
	submitAndReview() {
		const { quiz, answers, correctAnswer, questionTitle } = this.state;
		const filteredAnswers = answers.filter( (answer) => answer !== '' );
		if (correctAnswer !== null && questionTitle !== '' && filteredAnswers.length > 1) {
			const question = {
				questionTitle,
				correctAnswer,
				answers: filteredAnswers
			}
			quiz.questions.push(question);
			this.setState({
				quiz,
				questionTitle: '',
				answers: [''],
				correctAnswer: null,
				review: true
			});
		}
	}
	handleEditQuizTitle() {
		this.setState({
			editQuizTitleState: true,
			editQuizTitle: this.state.quizTitle
		});
	}
	submitTitleEdit() {
		this.setState({
			editQuizTitleState: false,
			quizTitle: this.state.editQuizTitle,
			editQuizTitle: ''
		})
	}
	cancelTitleEdit() {
		this.setState({
			editQuizTitleState: false,
			editQuizTitle: ''
		});
	}
	editQuestion(idx) {
		const { editReview, quiz } = this.state;
		editReview.set(idx, null);
		const question = quiz.questions[idx];
		const questionID = 'editQuestion' + idx;
		const editQuestionTitleID = 'editQuestionTitle' + idx;
		this.setState({
			[questionID]: question,
			editReview,
			[editQuestionTitleID]: question.questionTitle
		});
	}
	setCorrectAnswerEdit(questionIdx, answerIdx) {
		const editQuestionID = 'editQuestion' + questionIdx;
		const editQuestion = this.state[editQuestionID];
		editQuestion.correctAnswer = answerIdx;
		this.setState({
			[editQuestionID]: editQuestion
		});
	}
	removeOptionEdit(questionIdx, answerIdx) {
		const editQuestionID = 'editQuestion' + questionIdx;
		const editQuestion = this.state[editQuestionID];
		if (editQuestion.answers.length > 1) {
			editQuestion.answers.splice(answerIdx, 1);
			this.setState({
				[editQuestionID]: editQuestion
			});
		}
	}
	handleOptionEdit(questionIdx, answerIdx, event) {
		const editQuestionID = 'editQuestion' + questionIdx;
		const editQuestion = this.state[editQuestionID];
		editQuestion.answers[answerIdx] = event.target.value;
		this.setState({
			[editQuestionID]: editQuestion
		});
	}
	addEditOption(idx) {
		const editQuestionID = 'editQuestion' + idx;
		const editQuestion = this.state[editQuestionID];
		editQuestion.answers.push('');
		console.log(editQuestion)
		this.setState({
			[editQuestionID]: editQuestion
		});
	}
	submitQuestionEdit() {

	}
	cancelQuestionEdit(idx) {
		const { editReview } = this.state;
		editReview.delete(idx);
		this.setState({ editReview });
	}
	saveQuiz() {
		console.log('dispatching quiz saving action here');
	}
	render() {
		const { correctAnswer, answers } = this.state;
		const renderAnswers = answers.map( (ans, idx) => {
			const { answers } = this.state;
			return (
				<div className = 'answerContainer' key = {idx}>

					{ correctAnswer === idx ?
					
						<i className = "fa fa-check-box fa-check-square-o" aria-hidden = "true"></i>

					:

						<i
							id = 'checkBox'
							className = "fa fa-check-box fa-square-o"
							aria-hidden = "true"
							onClick = {this.setCorrectAnswer.bind(this, idx)}></i> }

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
				
				{ !this.state.title && !this.state.review &&

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
					</div> }

					{ this.state.title && !this.state.review &&

					<div className = 'createQuizContainer'>
						<h1>Add Questions for Your Quiz:</h1>
						<p className = 'subtitle'>Be sure to add at least two answers and check the box next to correct one!</p>
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

					{ !this.state.review && <p className = 'message'>{this.state.message}</p> }

					{ this.state.review &&

						<div>
							<h1 className = 'review'>Review Your Quiz</h1>
							
							{ !this.state.editQuizTitleState ? 

								<h2 className = 'quizTitleReview'>
									<i
										onClick = {this.handleEditQuizTitle}
										className = "fa fa-pencil-square-o fa-editQuestion"
										aria-hidden = "true"></i>
									Quiz Title: {this.state.quizTitle}
								</h2>

								:

								<div>
									<h2>Edit Quiz Title:</h2>
									<input
									type = 'text'
									name = 'editQuizTitle'
									value = {this.state.editQuizTitle}
									onChange = {this.handleInput} /> 
									<button onClick = {this.submitTitleEdit}className = 'editBtn'>Submit Title Edit</button>
									<button onClick = {this.cancelTitleEdit}className = 'editBtn'>Cancel Edit</button>
								</div> }

							{this.state.quiz.questions.map( (question, idx) => {
								const { editReview } = this.state;
								const { correctAnswer } = question;
								if (editReview.has(idx)) {
									return (
										<div key = {idx}>
											<h2>Editing {question.questionTitle}</h2>
											<p className = 'inputTitles'>Edit Question Title:</p>
											<input
												type = 'text'
												name = {'editQuestionTitle' + idx}
												value = {this.state['editQuestionTitle' + idx]}
												onChange = {this.handleInput} />
											<p className = 'inputTitles'>Edit Question Answers:</p>
											{ question.answers.map( (answer, index) => {
												const questionID = 'editQuestion' + idx;
												return (
													<div className = 'answerContainer' key = {index}>

														{ this.state[questionID].correctAnswer === index ?
														
															<i className = "fa fa-check-box fa-check-square-o" aria-hidden = "true"></i>

														:

															<i
																id = 'checkBox'
																className = "fa fa-check-box fa-square-o"
																aria-hidden = "true"
																onClick = {this.setCorrectAnswerEdit.bind(this, idx, index)}></i> }

														<input
															type = 'text'
															value = {this.state[questionID].answers[index]}
															onChange = {this.handleOptionEdit.bind(this, idx, index)}
															className = 'answerInput' />
														<i
															onClick = {this.removeOptionEdit.bind(this, idx, index)}
															className = "fa fa-times"
															aria-hidden = "true"></i>
													</div>
												);
											})}
											<button onClick = {this.addEditOption.bind(this, idx)} className = 'editBtn'>Add Another Option</button>
											<button onClick = {this.submitQuestionEdit.bind(this, idx)} className = 'editBtn'>Submit Edit</button>
											<button onClick = {this.cancelQuestionEdit.bind(this, idx)} className = 'editBtn'>Cancel Edit</button>
										</div>
										)
								} else {
									return (
										<div key = {idx}>
											<p className = 'inputTitles'>Question {idx + 1}:</p>
											<h2 className = 'questionTitleReview'>
												<i
													onClick = {this.editQuestion.bind(this, idx)}
													className = "fa fa-pencil-square-o fa-editQuestion"
													aria-hidden = "true">
												</i>
												{question.questionTitle}
											</h2>
											<p className = 'inputTitles'>Answers:</p>
											{question.answers.map( (answer, index) => {
												let style = {
													background: 'rgba(225,225,225,0.5)'
												}
												if (correctAnswer === index) {
													style = {
														background: '#06C1FF'
													}
												}
												return (
													<div className = 'answerReview' key = {index} style = {style}>
														<p>{answer}</p>
													</div>
												);
											}) }
										</div>
									);
								}
							}) }
							<button className = 'saveBtn' onClick = {this.saveQuiz}>Save and Submit Your Quiz</button>
						</div>

					}

			</div>
		);
	}
	componentDidMount() {
		window.addEventListener('keydown', this.handleKeyPress);
	}
};