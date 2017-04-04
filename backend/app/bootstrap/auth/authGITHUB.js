let passport = require('passport');
let GitHubStrategy = require('passport-github').Strategy;

let User = require('../../models/_modelUser');
let config = require('../../config/dev/social/github');
let modelSerializer = require('../serializer/serializer');
let mode = require('./options');


passport.use(new GitHubStrategy(
    config, (accessToken, refreshToken, profile, done) =>{

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
