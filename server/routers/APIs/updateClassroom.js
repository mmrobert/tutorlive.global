var express = require('express');
var router = express.Router();
var Classroom = require('../../models/classroomModel');

router.post('/', function(req, res, next) {
    Classroom.findOneAndUpdate({room: req.body.room}, 
        {$set:{title: req.body.title,
            host: req.body.host,
            hostAvatarURL: req.body.hostAvatarURL,
            introduction: req.body.introduction,
            posterURL: req.body.posterURL,
            doorPass: req.body.doorPass,
            hostEmail: req.body.hostEmail,
            created: req.body.created}}, 
        function(err, user) {
           if (err) {
             res.json({success: false, message: 'Error in updating this classroom, try again!'});
           } else {
             res.json({success: true, message: 'Classroom updated!'});
           }
    });
});

module.exports = router;
