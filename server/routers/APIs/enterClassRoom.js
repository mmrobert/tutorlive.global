var express = require('express');
var router = express.Router();
var Classroom = require('../../models/classroomModel');

router.post('/', function(req, res, next) {
    var roomN = req.body.roomName;
    var doorP = req.body.doorPass;
    Classroom.findOne({room: roomN}, function (err, rm) {
        if(err) {
            res.json({success: false, message: 'Class room name is NOT right!'});
        } else {
            if(rm.doorPass != doorP) {
                res.json({success: false, message: 'Door pass is NOT right!'});
            } else {
                res.json({success: true, 
                          message: 'Class room returned!',
                          room: rm});
            }
        }
    });
});

module.exports = router;
