let mongoose = require('mongoose');
let Schema = mongoose.Schema;

var User = new Schema({
    name: String,
    someID: String
});

module.exports = mongoose.model('users', User);
