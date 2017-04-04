const mongoose = require("mongoose");
const schemaACL  = require("../schema/schemaACL");
const ACL = mongoose.model('ACL', schemaACL);

module.exports = ACL;