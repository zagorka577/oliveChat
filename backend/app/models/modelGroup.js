const mongoose = require("mongoose");
const schemaGroup  = require("../schema/schemaGroup");
const Group = mongoose.model('Group', schemaGroup);

module.exports = Group;