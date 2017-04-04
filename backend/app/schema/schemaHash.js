const bcrypt = require("bcrypt");
const config = require("../config/config");
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var schemaHash = new Schema({
    hashVal: {
            type:String,
            required:true
        },
    updated_at:{
        type: Date,
        default: Date.now
    }
});
/*
 Mongoose middleware is not invoked on update() operations, so we should use a save() method
 instead of update()
 */
schemaHash.pre('save', function(next){
    let model = this;
  //  if(!model.isModified(model.hashVal)) return next();
    bcrypt.genSalt(config.security.Bcrypt_Level, (err, salt)=> {
        if (err) return next(err);
        bcrypt.hash(model.hashVal, salt, (err, hash) =>{
            if (err) return next(err);
            model.hashVal = hash;
            next();
        });
    });
});

schemaHash.methods.validateHash = function(newHash, callback) {
    bcrypt.compare(newHash, this.hashVal, function(err, validationResult) {
        if (err) return callback(err);
        callback(null, validationResult);
    });
};

module.exports = schemaHash;