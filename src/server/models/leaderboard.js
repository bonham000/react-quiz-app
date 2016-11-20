
import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const Leaderboard = new Schema({
	quiz: String,
	leaders: Array
});

export default mongoose.model('Leaderboard', Leaderboard);