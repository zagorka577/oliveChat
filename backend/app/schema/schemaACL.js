const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var schemaACL = new Schema({
    permissions:  [
        {
            entity: {
                type: Schema.Types.ObjectId,
                required: true,
                ref:'Group'
            },
            assignedFrom:{
                type: Schema.Types.ObjectId,
            },
            actions: []
        }
    ],
    created_at:{
        type: Date,
        default: Date.now
    },
    updated_at:{
        type: Date,
        default: Date.now
    }
});

module.exports = schemaACL;