const util = require("util");

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.connect(`mongodb://localhost:27017/testDB`);
mongoose.set('debug', true);

var UserSchema = new Schema({
    name:String,
    post: {
        type: Schema.Types.ObjectId,
        ref: 'Post'
    }
});
var PostSchema =  new Schema({
    title:String,
    subscriber:{
        type:Schema.Types.ObjectId,
        ref:'Subscriber'
    }
});

var SubscriberSchema = new Schema({
    name:String
});

var User =  mongoose.model("User", UserSchema);
var Post = mongoose.model('Post',PostSchema);
var Subscriber = mongoose.model('Subscriber',SubscriberSchema);

// User
//     .findOne()
//     .populate([{
//         path:'post',
//         model:'Post',
//         populate:{
//             model:'Subscriber',
//             path:'subscriber'
//         }
//     }])
//     .exec()
//     .then(function(data){
//         console.log(data);
//         mongoose.disconnect();
//     });


// User
//     .find()
//     .populate('post')
//     .populate({
//         path: 'post',
//         populate: {
//             path: 'subscriber',
//             model: 'Subscriber'
//         }
//     })
//     .exec()
//     .then(function (data) {
//         console.log(data);
//         mongoose.disconnect();
//     });

User
    .find()
    .populate('post')
    .populate({
        path: 'post',
        populate: {
            path: 'subscriber',
            model: 'Subscriber'
        }
    })
    .exec()
    .then(function (data) {
        console.log(util.inspect(data[0].post.subscriber));
        mongoose.disconnect();
    });