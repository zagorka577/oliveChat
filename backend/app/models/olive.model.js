const mongoose = require('mongoose');

// TODO: provide schema when it will be ready
const fakeOliveSchema = new mongoose.Schema({
    name: String,
    msg: String
});

exports.fakeOliveModel = mongoose.model('users_message', fakeOliveSchema);