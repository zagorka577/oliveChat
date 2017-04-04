const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var schemaMessage = new Schema({
    authorId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref:'User'
    },
    author: {
        type: String,
        required: true
    },
    messageTime: {
        type: Date,
        default: Date(),
    },
    messageBody:{
        type:String,
        required:true,
    },
    groupId:{
        type: Schema.Types.ObjectId,
        required: true, 
        ref: 'Group'
    }
});

module.exports = schemaMessage;