// JavaScript Document
// React X Node Project Structure Template Entry point
// Server file
// 6/24/19

var express = require('express');
var routes = require(__dirname + '/server/routes/routes');
require('dotenv').config();
var router = express.Router();
var bodyParser = require('body-parser');
var path = require('path');
var flash = require('connect-flash');

// Init App
var app = express();
// Connect Flash
app.use(flash());

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', routes);
//  Start static file server
app.use(express.static(path.join(__dirname, 'build')));

app.listen(process.env.SERVER_PORT, process.env.SERVER_IP, function(){
	console.log("Web Server running at " + process.env.SERVER_IP + ":" + process.env.SERVER_PORT);
});
