var express = require('express');
var router = express.Router();
var ResetPassword = require('../../models/resetPasswordModel');

router.post('/', function(req, res, next) {
    var emailH = req.body.email;
  //    console.log('second 505050!' + token);
    var nick = new ResetPassword({email: emailH});
    nick.save(function(err) {
      if (err) {
        res.json({success: false, message: 'Error in reseting password!'});
      } else {
        res.json({success: true, message: 'Thank you!'});
      }
    });
});

module.exports = router;
