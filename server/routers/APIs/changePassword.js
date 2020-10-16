var express = require('express');
var crypto = require('crypto');
var router = express.Router();
var User = require('../../models/userModel');

var genRandomStr = function(length) {
    return crypto.randomBytes(Math.ceil(length/2))
        .toString('hex')
        .slice(0, length);
};
 
var sha512 = function(password, salt) {
    var hash = crypto.createHmac('sha512', salt);
    hash.update(password);
    var value = hash.digest('hex');
    return {
        salt: salt,
        passwordHash: value
    };
};

router.post('/', function(req, res, next) {
    console.log('922-229' + req.body.token);
    var pwH = req.body.password;
    var saltH = genRandomStr(16);
    var pwData = sha512(pwH, saltH);
    User.findOneAndUpdate({token: req.body.token}, 
        {$set:{salt: pwData.salt, password: pwData.passwordHash}}, 
        function(errI, userI) {
            if (errI) {
                res.json({success: false, message: 'Error in changing password!'});
            } else {
                res.json({success: true, message: 'Password changed!'});
            }
        });
});

module.exports = router;
