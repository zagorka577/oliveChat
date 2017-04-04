/**
 *  Dev dependencies
 */

var sessionConfig = require('./app/config/dev/session/session');
var SwaggerExpress = require('swagger-express-mw');
var session = require('express-session');
var passport = require('passport');
var mongoose = require('mongoose');
const socket = require('./app/sockets/socket');
const userModel = require('./app/models/modelUser');
const hashModel = require('./app/models/modelHash');
const jwt = require('./app/guard/JWTGuard');
const bcrypt = require("bcrypt");
/**
 *  Auth itself
 * */
var passportGithub = require('./app/bootstrap/auth/authGITHUB');
var passportFaceBook = require('./app/bootstrap/auth/authFaceBook');
var passportVK = require('./app/bootstrap/auth/authVk');

/**
 *  App itself
 * */
var app = require('express')();
const bodyParser = require('body-parser');
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const head = require('./app/midleware/headers.config');

socket(io);
// Headers config
app.use(head.headerConfig);

/**
 *  Router for public request
 */
app.use(bodyParser.json());
var PublicRouter = require('express').Router();

/**
 *  Mongoose connection
 */
mongoose.connect('mongodb://localhost/olivka-social-auth');

/**
 *  Fake login page
 */
PublicRouter.get('/login',(req, resp) => {
    console.log(req);
});

app.post('/login',(req, resp) => {
    let userName = req.body.name;
    let userPassword = req.body.password;
    let passwordMatch;

    let responseObject = {};
    
    userModel.findOne({name: userName})
             .populate('hash')
             .exec()
             .then(userData => {
                 if(!userData) {
                    responseObject.wrongUser = true;
                    resp.send(responseObject);
                  }
                  passwordMatch = bcrypt.compareSync(userPassword, userData.hash.hashVal);
                  if(!passwordMatch) {
                      responseObject.wrongPassword = true;
                      resp.send(responseObject);
                  }
                  const token = jwt.generateToken(userData._id);
                  responseObject.user = userData;
                  responseObject.token = token;              
                  resp.send(responseObject);
             });
});

/**
 *  Logout page
 */
PublicRouter.get('/logout',(req, resp) => {
    req.logout();
    resp.send('Logged out!');
});

/**
 *  Passport.js GitHub Auth
 */
PublicRouter.get('/auth/github', passportGithub.authenticate('github', { scope: [ 'user:email' ] }));
PublicRouter.get('/auth/github/callback',
    passportGithub.authenticate('github',
        { failureRedirect: '/login' }), (req, res) => { res.json(req.user); });

/**
 *  Passport.js Facebook Auth
 */

PublicRouter.get('/auth/facebook', passportFaceBook.authenticate('facebook', { scope: 'email' }));
PublicRouter.get('/auth/facebook/callback',
    passportFaceBook.authenticate('facebook',
        { failureRedirect: '/login' }),(req, res)=> {res.json(req.user);});

/**
 *  Passport.js VK Auth
 */
PublicRouter.get('/auth/vk', passportVK.authenticate('vkontakte', { scope: 'email' }));
PublicRouter.get('/auth/vk/callback',
    passportVK.authenticate('vkontakte',
        { failureRedirect: '/login' }),(req, res)=> {res.json(req.user);});

app.use(session(sessionConfig));
app.use(passport.initialize());
app.use(passport.session());
app.use(PublicRouter);

var config = {
  appRoot: __dirname // required config
};

SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) { throw err; }

  // install middleware
  swaggerExpress.register(app);

  var port = process.env.PORT || 10010;
  app.listen(port);

  if (swaggerExpress.runner.swagger.paths['/hello']) {
    console.log('try this:\ncurl http://127.0.0.1:' + port + '/hello?name=Scott');
  }
});
