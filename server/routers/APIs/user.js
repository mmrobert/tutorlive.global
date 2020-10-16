const express = require('express');
var router = express.Router();
var User = require('../../models/userModel');

/* Find a user. */
router.get('/', function(req, res, next) {
  //res.json({success: true, message: 'cheng in reading users!'});
  User.find({}, function (err, users) {
    if(users) {
       res.json(users);
    } else {
       res.json({success: false, message: 'Error in reading users!'});
    }
  });
});

module.exports = router;
