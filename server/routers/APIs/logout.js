var express = require('express');
var router = express.Router();
var User = require('../../models/userModel');

router.post('/', function(req, res, next) {
    //console.log('99--99BB' + req.body.token);
    User.findOneAndUpdate({token: req.body.token}, 
        {$set:{onLine: false}}, 
        function(err, user) {
           if (err) {
             res.json({success: false, message: 'Could not be logouted, try again!'});
           } else {
             res.json({success: true, message: 'You are logouted!'});
           }
    });
});

module.exports = router;
