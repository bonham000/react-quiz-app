import React from 'react'

export default class EditQuiz extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			editQuizTitleState: false,
			editReview: new Map(),
			title: false,
			quizTitle: '',
			editQuizTitle: '',
			quiz: [],
			loaded: false
		}
		this.handleInput = this.handleInput.bind(this);
		this.handleOptionTitleEdit = this.handleOptionTitleEdit.bind(this);
		this.setCorrectAnswerEdit = this.setCorrectAnswerEdit.bind(this);
		this.removeOptionEdit = this.removeOptionEdit.bind(this);
		this.handleEditQuizTitle = this.handleEditQuizTitle.bind(this);
		this.handleOptionEdit = this.handleOptionEdit.bind(this);
		this.addEditOption = this.addEditOption.bind(this);
		this.editQuestion = this.editQuestion.bind(this);
		this.submitQuestionEdit = this.submitQuestionEdit.bind(this);
		this.cancelQuestionEdit = this.cancelQuestionEdit.bind(this);
		this.removeQuestion = this.removeQuestion.bind(this);
		this.reviewAddQuestion = this.reviewAddQuestion.bind(this);
		this.saveQuiz = this.saveQuiz.bind(this);
	}
	componentDidMount() {
		const { quiz } = this.props;
		this.setState({
			quiz: quiz[0],
			loaded: true
		});
	}
	handleInput(event) {
		this.setState({
			[event.target.name]: event.target.value
		});
	}
	handleEditQuizTitle() {
		this.setState({
			editQuizTitleState: true,
			editQuizTitle: this.state.quizTitle
		});
	}
	handleOptionTitleEdit(questionIdx, event) {
		const editQuestionID = 'editQuestion' + questionIdx;
		const editQuestion = this.state[editQuestionID];
		editQuestion.questionTitle = event.target.value
		this.setState({
			[editQuestionID]: editQuestion
		});
	}
	editQuestion(idx) {
		const { editReview, quiz } = this.state;
		editReview.set(idx, null);
		const question = quiz.questions[idx];
		const questionID = 'editQuestion' + idx;
		this.setState({
			[questionID]: question,
			editReview,
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
			if (editQuestion.correctAnswer !== answerIdx) {
				editQuestion.correctAnswer -= 1;
			} else {
				editQuestion.correctAnswer = null;
			}
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
		this.setState({
			[editQuestionID]: editQuestion
		});
	}
	submitQuestionEdit(idx) {
		const editQuestionID = 'editQuestion' + idx;
		const editedQuestion = this.state[editQuestionID];
		const { quiz, editReview } = this.state;
		if (editedQuestion.correctAnswer !== null && editedQuestion.answers.length > 1) {
			quiz.questions[idx] = editedQuestion;
			editReview.delete(idx);
			this.setState({
				quiz,
				editReview
			});
		}
	}
	cancelQuestionEdit(idx) {
		const { editReview } = this.state;
		editReview.delete(idx);
		this.setState({ editReview });
	}
	removeQuestion(idx) {
		const { quiz } = this.state;
		quiz.questions.splice(idx, 1);
		this.setState({ quiz });
	}
	reviewAddQuestion() {
		const { quiz, editReview } = this.state;
		quiz.questions.push({
			answers: [''],
			correctAnswer: null,
			questionTitle: ''
		});
		this.setState({ quiz });
		this.editQuestion(quiz.questions.length - 1);
	}
	saveQuiz() {
		const { quiz } = this.state;
		if (quiz.questions.length > 0) {
			quiz.author = this.props.user;
			const payload = {
				user: this.props.user,
				token: this.props.token,
				quiz
			}
			this.props.saveNewQuiz(payload);
			this.setState({
				review: false,
				submission: true
			});
		}
	}
	render() {
		return (
			<div className = 'createComponent'>

				<h1 className = 'review'>Edit Your Quiz</h1>
			
				{ !this.state.editQuizTitleState ? 

				<h2 className = 'quizTitleReview'>
					<i
						onClick = {this.handleEditQuizTitle}
						className = "fa fa-pencil-square-o fa-editQuestion"
						aria-hidden = "true"></i>
					Quiz Title: {this.state.quiz.title}
				</h2>

				:

				<div>
					<h2>Edit Quiz Title:</h2>
					<input
					type = 'text'
					name = 'editQuizTitle'
					value = {this.state.editQuizTitle}
					onChange = {this.handleInput} />
					<div className = 'editTitleWrapper'>
						<button onClick = {this.cancelTitleEdit}className = 'editBtn addOptionEdit'>Cancel Edit</button>
						<button onClick = {this.submitTitleEdit}className = 'editBtn submitEdit'>Submit Title Edit</button>
					</div>
				</div> }

			{ this.state.loaded && this.state.quiz.questions.map( (question, idx) => {
				const { editReview } = this.state;
				const { correctAnswer } = question;
				if (editReview.has(idx)) {
					const questionID = 'editQuestion' + idx;
					return (
						<div key = {idx}>
							<h2>Editing Question {idx + 1}:</h2>
							<p className = 'inputTitles'>Edit Question Title:</p>
							<input
								type = 'text'
								value = {this.state[questionID].questionTitle}
								onChange = {this.handleOptionTitleEdit.bind(this, idx)} />
							<p className = 'inputTitles'>Edit Question Answers:</p>
							{ question.answers.map( (answer, index) => {
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
							<div className = 'editButtonsWrapper'>
								<button onClick = {this.addEditOption.bind(this, idx)} className = 'editBtn addOptionEdit'>Add Another Option</button>
								<button onClick = {this.cancelQuestionEdit.bind(this, idx)} className = 'editBtn'>Cancel Edit</button>
								<button onClick = {this.submitQuestionEdit.bind(this, idx)} className = 'editBtn submitEdit'>Submit Edit</button>
							</div>
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
								<i
									onClick = {this.removeQuestion.bind(this, idx)}
									className = "fa fa-trash fa-editQuestion"
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

			{ this.state.loaded && this.state.quiz.questions.length === 0 && <h2>You have to enter some questions to submit a new quiz!</h2> }

			<div className = 'reviewBtnControl'>
				<button className = 'reviewAddBtn' onClick = {this.reviewAddQuestion}>Add Another Question</button>
				<button className = 'saveBtn' onClick = {this.saveQuiz}>Save and Update Your Quiz</button>
			</div>

		</div>
		);
	}
};