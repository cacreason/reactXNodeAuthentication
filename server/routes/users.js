// JavaScript Document
// React X Node Authentication Template
// User Routes file
// 6/25/19

var express = require('express');
const { check, validationResult } = require('express-validator');
var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;
var router = express.Router();
var User = require('../models/user');

passport.use(new LocalStrategy(
  function(username, password, done) {
   User.getUserByUsername(username, function(err, user){
   	if(err) {return done(err); }
   	if(!user) {
      console.log('invalid user');
   		return  done(null, false);
   	}
   	User.comparePassword(password, user.password, function(err, isMatch){
   		if(err) throw err;
   		if(isMatch){
   			return done(null, user);
   		}
      else {
        console.log('Invalid Password');
   			return done(null, false, {message: 'Invalid password'});
   		}
   	});
   });
  }));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});


router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err); }
    if (!user) {
      res.status(401);
      return res.send({message: "Invalid Username or Password"});
    }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      console.log("routes/users.js:54 User " + user.fName + " - " + user.username + " authenticated" );
      res.redirect('/login');
    });
  })(req, res, next);
});

router.post('/register', function(req, res){
  var fName = req.body.fName;
  var lName = req.body.lName;
  var email = req.body.email;
  var username = req.body.email;
	var password = req.body.password;
	var repassword = req.body.repassword;

	// Validation
	check('fName', 'First Name is required').not().isEmpty();
	check('lName', 'Last Name is required').not().isEmpty();
	check('email', 'Email is required').not().isEmpty();
	check('email', 'Email is not valid').isEmail();
  check('username', 'Username is required').not().isEmpty();
	check('password', 'Password is required').not().isEmpty();
	check('repassword', 'Passwords do not match').equals(req.body.password);

  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log("users.js Validation Errors: \n" + errors);
    res.status(422).json({ errors: errors.array() })
    res.send();
  }
  else {
		var newUser = new User({
    	fName: fName,
    	lName: lName,
      username: username,
      email: email,
      password: password
		});
		User.getUserByUsername(username, function(err, user){
			if(err) throw err;
			if(!user){
				User.createUser(newUser, function(err, user){
					if(err) throw err;
					console.log(user);
					res.send({express: "User account created - Log In!"});
				});
			}
			else{
				res.status(400);
				res.send({express: "Username/email already exists"});
				console.log(newUser.email + ' email already taken');
			}
		});

	}
});

router.get('/logout', function(req, res){
  console.log(req.user.email + " Logged Out.");
  req.logout();
  res.redirect('/login');
});
module.exports = router;
