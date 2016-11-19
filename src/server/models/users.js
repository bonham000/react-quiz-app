
import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const User = new Schema({
		id: String,
		displayName: String
});

export default mongoose.model('User', User);