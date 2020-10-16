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

router.use(function(req, res, next) {
   User.findOne({email: req.body.email}, function (err, user) {
    if(user) {
       res.json({success: false, message: 'The email has been used!'});
    } else {
  //     console.log('No User 909090!' + req.body.email);
       next();
    }
  });
});
/* register */
router.post('/', function(req, res, next) {
  var emailH = req.body.email;
  var pwH = req.body.password;
  var usernameH = '';
  var fullnameH = '';
  var bioH = '';
  var locH = '';
  var avatarURLH = '';
  var saltH = genRandomStr(16);
  var pwData = sha512(pwH, saltH);
//  var objForToken = {email: emailH, password: pwH};
//  var tokenH = jwt.sign(objForToken, config.secret, {expiresIn: 999999999999999});
  var tokenH = genRandomStr(38);
//    console.log('second 505050!' + token);
  var nick = new User({
      email: emailH,
      salt: pwData.salt,
      password: pwData.passwordHash,
      token: tokenH,
      username: usernameH,
      fullname: fullnameH,
      bio: bioH,
      location: locH,
      avatarURL: avatarURLH,
      onLine: true});
  nick.save(function(err) {
    if (err) {
      res.json({success: false, message: 'Error in saving user!'});
    } else {
      res.json({success: true, message: 'User saved!', token: tokenH});
    }
  });
});

module.exports = router;
