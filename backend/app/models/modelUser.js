const mongoose = require("mongoose");
const schemaUser  = require("../schema/schemaUser");
const User = mongoose.model('User', schemaUser);

module.exports = User;

