// JavaScript Document
// React X Node Project Structure Template
// Routes file
// 6/24/19

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var path = require('path');


router.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../../build', 'index.html'));
});

module.exports = router;
