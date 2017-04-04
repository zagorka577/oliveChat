const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
    name: String,
    post: {
        type: Schema.Types.ObjectId,
        ref: 'Post'
    }
});
let PostSchema = new Schema({
    title: String,
    subscriber: {
        type: Schema.Types.ObjectId,
        ref: 'Subscriber'
    }
});

let SubscriberSchema = new Schema({
    name: String
});

let User = mongoose.model('User', UserSchema);
let Post = mongoose.model('Post', PostSchema);
let Subscriber = mongoose.model('Subscriber', SubscriberSchema);

mongoose.connect(`mongodb://localhost:27017/testDB`);

//Add some data that is properly linked.
let s = new Subscriber({name: 'subscriber 1'});
s.save().then(() => {
    let p = new Post({subscriber: s, title: 'post 1'});
    p.save().then(() => {
        let u = new User({post: p, name: 'use 1'});
        u.save().then(() => {
            console.log('all done');
        });
    });
});

