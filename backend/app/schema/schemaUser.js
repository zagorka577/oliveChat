const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var schemaUser = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    email:{
        type:String,
        required: true,
        unique: true,
        match: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    },
    meta: {
        gender: {
            type: String,
            enum: ["Male","Female"]
        },
        title: String,
        age: {
            type:Number,
            min:16
        },
        avatar:{
            type:String,
            default:"images/nemo.gif"
        },
        firstName: String,
        lastName: String,
        role: String,
        phoneNumber: String,
        skype: String
    },
    created_at: {
        type:Date,
        default: Date.now
    },
    updated_at:{
        type:Date,
        default: Date.now
    },
    settings:{
        type: Schema.Types.ObjectId,
        required: true,
        ref:'Settings'
    },
    hash:{
        type: Schema.Types.ObjectId,
        required: true,
        ref:'Hash'
    },
    acl:
        {
            type: Schema.Types.ObjectId,
            ref: 'ACL'
        }
});

module.exports = schemaUser;