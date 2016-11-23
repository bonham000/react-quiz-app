
import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const Leaderboard = new Schema({
	id: String,
	quiz: String,
	leaders: Array
});

export default mongoose.model('Leaderboard', Leaderboard);