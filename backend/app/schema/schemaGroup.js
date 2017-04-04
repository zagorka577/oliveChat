const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var schemaGroup = new Schema({
    author: {
        type: Schema.Types.ObjectId,
      //  required: true,
        ref:'User'
    },
    groupUsers:[
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    groupMessages:[
        {
            type: Schema.Types.ObjectId,
            ref: 'Message'
        }
    ],
    meta:{
        groupName:{
           type:String,
        },
        maxUsers:{
            type:Number,
            default:2
        },
        description:{
            type:String,
        },
        groupTag:{
            type:String,
            required:true,
            unique: false
        },
        created_at:{
            type: Date,
            default: Date.now
        },
        updated_at:{
            type: Date,
            default: Date.now
        }
    }
});

module.exports = schemaGroup;