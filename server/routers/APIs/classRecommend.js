var express = require('express');
var router = express.Router();
var Classroom = require('../../models/classroomModel');

router.post('/', function(req, res, next) {
    var limitN = req.body.limitNumber;
    Classroom.find({})
             .sort({created: -1})
             .limit(limitN)
             .exec(function(err, rms) {
               if (err) {
                 // res.json({success: false, message: 'Error, try again!'});
                 console.log(err);
               } else {
                 res.json({success: true, 
                           message: 'Classroom recommendation!',
                           roomsList: rms});
               }
             });
});

module.exports = router;
