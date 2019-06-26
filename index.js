// JavaScript Document
// React X Node Authentication Template Entry point
// Server file
// 6/24/19

var express = require('express');
var routes = require(__dirname + '/server/routes/routes');
var users = require(__dirname + '/server/routes/users');
require('dotenv').config();
var router = express.Router();
var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressValidator = require('express-validator');
var session = require('express-session');//Need to replace with mongo-session in production!
var path = require('path');
var flash = require('connect-flash');
var mongoose = require('mongoose');

//Initialize mongoDB connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:' + process.env.DB_HOST + '/reactXNodeAuthentication', {useNewUrlParser: true}).catch(err=>{console.log(err)});
var db = mongoose.connection;;

// Init App
var app = express();
// Connect Flash
app.use(flash());

//Cookie Parser Middleware
app.use(cookieParser());

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Express Session *** Replace with mongo session in production to allow session management for multiple users.
app.use(session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    resave: false
}));

//Initialize passport for user Authorization
app.use(passport.initialize());
app.use(passport.session());

// Import routes from routes and users file
app.use('/', routes);
app.use('/', users);

//  Start static file server
app.use(express.static(path.join(__dirname, 'build')));

app.listen(process.env.SERVER_PORT, process.env.SERVER_IP, function(){
	console.log("Web Server running at " + process.env.SERVER_IP + ":" + process.env.SERVER_PORT);
});
