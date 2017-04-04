const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var schemaSettings = new Schema({
    meta: {
        timeZone:{
            type:String,
            enum:['EST','Greenwich'],
            default:"EST"
        },
        notifications:{
            allowsEmails:{
                type:Boolean,
                default:0
            },
            EmailPeriod:{
                type:Number,
                default:24
            },
            allowsPush:{
                type:Boolean,
                default:0
            }
        }
    },
    updated_at:{
        type: Date,
        default: Date.now
    }
});

module.exports = schemaSettings;