const mongoose = require('mongoose');

// TODO: provide schema when it will be ready
const userSchema = new mongoose.Schema({
    id: Number,
	email: String,
	username: String,
	name: String,
});

exports.UserModel = mongoose.model('Users', userSchema);