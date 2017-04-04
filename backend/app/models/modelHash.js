const mongoose = require("mongoose");
const schemaHash  = require("../schema/schemaHash");
const Hash = mongoose.model('Hash', schemaHash);

module.exports = Hash;