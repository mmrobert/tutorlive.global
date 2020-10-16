var express = require('express');
var router = express.Router();
var User = require('../../models/userModel');

router.post('/', function(req, res, next) {
    User.findOneAndUpdate({token: req.body.token}, 
        {$set:{username: req.body.username,
        fullname: req.body.fullname,
        bio: req.body.bio,
        location: req.body.location,
        avatarURL: req.body.avatarURL}}, 
        function(err, user) {
           if (err) {
             res.json({success: false, message: 'Profile could not be updated, try again!'});
           } else {
             res.json({success: true, message: 'Your profile updated!'});
           }
    });
});

module.exports = router;
