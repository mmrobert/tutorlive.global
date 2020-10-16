var express = require('express');
var crypto = require('crypto');
var router = express.Router();
var User = require('../../models/userModel');
var Classroom = require('../../models/classroomModel');
var MyClassrooms = require('../../models/myClassroomsModel');

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
    MyClassrooms.findOne({email: req.body.email}, function (err, myRooms) {
     if(myRooms) {
        var roomsNumber = myRooms.roomsList.length;
        if(roomsNumber > 0) {
            Classroom.find({room: {$in: myRooms.roomsList}}, function (err, rms) {
              req.myClassRoomsList = rms;
              next();
            });
        } else {
          req.myClassRoomsList = [];
          next();
        }
     } else {
        req.myClassRoomsList = [];
        next();
     }
   });
 });

router.post('/', function(req, res, next) {
  // console.log('99699BB' + req.body.email);
  User.findOne({email: req.body.email}, function (err, user) {
    if(!user) {
       res.json({success: false, message: 'Wrong Email!'});
    } else {
       var saltH = user.salt;
       var pwH = req.body.password;
       var pwData = sha512(pwH, saltH);
   //    console.log('999999' + req.body.email);
       if (user.password != pwData.passwordHash) {
         res.json({success: false, message: 'Wrong Password!'});
       } else {
   //      var objForToken = {email: req.body.email, password: req.body.password};
   //      var tokenH = jwt.sign(objForToken, config.secret, {expiresIn: 999999999999999});
         var tokenH = genRandomStr(38);
         var rmsList = req.myClassRoomsList;
    //     var dActiveChangeDateH = new Date();
         User.findOneAndUpdate({email: req.body.email}, 
              {$set:{token: tokenH, onLine: true}}, 
              function(errI, userI) {
           if (errI) {
             res.json({success: false, message: 'Error in saving login token!'});
           } else {
             var userInfos = {token: tokenH,
                              username: userI.username,
                              fullname: userI.fullname,
                              bio: userI.bio,
                              location: userI.location,
                              avatarURL: userI.avatarURL};             
             res.json({success: true, message: 'Welcome!',
                       userprofile: userInfos,
                       myClassRoomsList: rmsList});
           }
         });
       }
     }
   });
//  res.send('respond with a resource');
});

module.exports = router;
