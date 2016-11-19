
import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const Quiz = new Schema({
	author: String,
	id: String,
	title: String,
	questions: Array
});

export default mongoose.model('Quiz', Quiz);