var express = require('express');
var router = express.Router();
var Feedback = require('../../models/feedbackModel');

router.post('/', function(req, res, next) {
    var emailH = req.body.email;
    var usernameH = req.body.username;
    var fullnameH = req.body.fullname;
    var ftH = req.body.feedtitle;
    var fdH = req.body.feedbody;
  //    console.log('second 505050!' + token);
    var nick = new Feedback({
        email: emailH,
        username: usernameH,
        fullname: fullnameH,
        feedtitle: ftH,
        feedbody: fdH});
    nick.save(function(err) {
      if (err) {
        res.json({success: false, message: 'Error in saving feedback!'});
      } else {
        res.json({success: true, message: 'Feedback saved!'});
      }
    });
});

module.exports = router;
