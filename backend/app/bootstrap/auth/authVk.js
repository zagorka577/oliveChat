let passport = require('passport');
let VKStrategy = require('passport-vkontakte').Strategy;

let User = require('../../models/_modelUser');
let config = require('../../config/dev/social/vk');
let modelSerializer = require('../serializer/serializer');
let mode = require('./options');


passport.use(new VKStrategy({
        clientID: "5915370",
        clientSecret: "OLjE9CogMZmdUUrXjBuH",
        callbackURL:  "http://localhost:10010/auth/vk/callback"
}, (accessToken, refreshToken, profile, done) =>{
        let searchQuery = {name: profile.displayName};

        let updates = {
            name: profile.displayName,
            someID: profile.id
        };

        User.findOneAndUpdate(searchQuery, updates, mode)
            .then(function (user) { done(null, user); })
            .catch(done);
    }
));

modelSerializer();
module.exports = passport;


