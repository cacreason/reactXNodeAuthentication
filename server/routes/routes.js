// JavaScript Document
// React X Node Authentication Template
// Routes file
// 6/25/19

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;
var path = require('path');

function checkAuth(req,res,next){
    if(req.isAuthenticated()){
        //if user is looged in, req.isAuthenticated() will return true
        next();
    } else{
        res.redirect("/login");
    }
}

router.get("/checkauth", checkAuth, function(req, res, next) {
    res.sendStatus(200);
});

router.get('/', checkAuth, function (req, res) {
  res.sendFile(path.join(__dirname, '../../build', 'index.html'));
  //res.sendFile(path.resolve('build/index.html'));
});

router.get('/register', function (req, res) {
  res.sendFile(path.join(__dirname, '../../build', 'index.html'));
});

router.get('/login', function (req, res) {
  res.sendFile(path.join(__dirname, '../../build', 'index.html'));
});

module.exports = router;
