const mongoose = require("mongoose");
const schemaMessage  = require("../schema/schemaMessage");
const modelMessage = mongoose.model('Message', schemaMessage);

module.exports = modelMessage;