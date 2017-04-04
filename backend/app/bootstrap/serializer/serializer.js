const passport = require('passport');
const User = require('../../models/_modelUser');

const serializer = function() {
    passport.serializeUser((user, done)=> {
        done(null, user.id);
    });

    passport.deserializeUser((id, done)=> {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });
};

module.exports = serializer;