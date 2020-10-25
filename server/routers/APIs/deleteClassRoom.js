var express = require('express');
var router = express.Router();
var Classroom = require('../../models/classroomModel');
var MyClassrooms = require('../../models/myClassroomsModel');

router.use(function(req, res, next) {
    MyClassrooms.findOne({email: req.body.hostEmail}, function (err, rms) {
        if(rms) {
            req.rmslist = rms.roomsList;
            next();
        } else {
            req.rmslist = [];
            next();
        }
    });
});
 
router.post('/', function(req, res, next) {
    //   console.log('second 303030!' + emailH);
    Classroom.findOneAndRemove({room: req.body.room}, function(err, rm) {
        if (err) {
            res.json({success: false, message: 'Error in deleting class room, try again!'});
        } else {
            var arr = req.rmslist;
            let arrLen = arr.length;
            if (arrLen > 0) {
                for (var i = 0; i < arrLen; i++) {
                    if (arr[i] === req.body.room) {
                        arr.splice(i, 1);
                    }
                }
                MyClassrooms.findOneAndUpdate({email: req.body.hostEmail}, 
                    {$set:{roomsList: arr}}, 
                    function(err, croom) {
                        res.json({success: true, message: 'Classroom deleted!'});
                });
            } else {
                res.json({success: true, message: 'Classroom deleted!'});
            }
        }
    });
});

module.exports = router;
