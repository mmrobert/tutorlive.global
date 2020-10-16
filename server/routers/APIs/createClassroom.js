var express = require('express');
var router = express.Router();
var Classroom = require('../../models/classroomModel');
var MyClassrooms = require('../../models/myClassroomsModel');

router.use(function(req, res, next) {
    Classroom.findOne({room: req.body.room}, function (err, croom) {
     if(croom) {
        res.json({success: false, message: 'Room name has been used, please choose again!'});
     } else {
        next();
     }
   });
 });

router.post('/', function(req, res, next) {
    var roomH = req.body.room;
    var titleH = req.body.title;
    var hostH = req.body.host;
    var hostAvatarURLH = req.body.hostAvatarURL;
    var introductionH = req.body.introduction;
    var posterURLH = req.body.posterURL;
    var doorPassH = req.body.doorPass;
    var hostEmailH = req.body.hostEmail;
    var createdH = req.body.created;
  //    console.log('second 505050!' + token);
    var nick = new Classroom({
        room: roomH,
        title: titleH,
        host: hostH,
        hostAvatarURL: hostAvatarURLH,
        introduction: introductionH,
        posterURL: posterURLH,
        doorPass: doorPassH,
        hostEmail: hostEmailH,
        created: createdH});
    nick.save(function(err) {
      if (err) {
        res.json({success: false, message: 'Error in creating classroom!'});
      } else {
        MyClassrooms.findOne({email: hostEmailH}, function (err, croom) {
          if(croom) {
            next();
          } else {
            var myRoom = new MyClassrooms({email: hostEmailH, roomsList: [roomH]});
            myRoom.save(function(err) {
              console.log(err);
            })
            res.json({success: true, message: 'Classroom created!'});
          }
        });
      }
    });
});

router.use(function(req, res, next) {
    MyClassrooms.findOneAndUpdate({email: req.body.hostEmail}, 
        {$push: {roomsList: req.body.room}}, 
        function(err, croom) {
            res.json({success: true, message: 'Classroom created!'});
    });
});

module.exports = router;
