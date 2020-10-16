var express = require('express');
var router = express.Router();
var User = require('../../models/userModel');

router.post('/', function(req, res, next) {
    User.findOneAndUpdate({token: req.body.token}, 
        {$set:{username: req.body.username}}, 
        function(err, user) {
           if (err) {
             res.json({success: false, message: 'Username could not be updated, try again!'});
           } else {
             res.json({success: true, message: 'Username updated!'});
           }
    });
});

module.exports = router;
