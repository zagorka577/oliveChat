const mongoose = require("mongoose");
const schemaSettings  = require("../schema/schemaSettings");
const Settings = mongoose.model('Settings', schemaSettings);

module.exports = Settings;
