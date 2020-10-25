var express = require('express');
var router = express.Router();
const path = require('path');
const multer = require('multer');
var User = require('../../models/userModel');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'server/public/uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + 
        path.basename(file.originalname, path.extname(file.originalname)) + 
        '-' + Date.now() + path.extname(file.originalname));
    }
});

function checkFileType(file, cb) {
    const fileTypes = /jpeg|jpg|png|gif/;
    const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);
    if (extName && mimetype) {
        return cb(null, true);
    } else {
        cb('Error: only image file!');
    }
}

const upload = multer({
    storage: storage,
    fileFilter: function(req, file, cb) {
        checkFileType(file, cb);
    }
}).single('image');

router.post('/', function(req, res, next) {
    upload(req, res, function (err) {
        if (err) {
            // console.log(err);
            User.findOneAndUpdate({token: req.body.token}, 
                {$set:{username: req.body.username,
                fullname: req.body.fullname,
                bio: req.body.bio,
                location: req.body.location}}, 
                function(err, user) {
                   if (err) {
                     res.json({success: false, message: 'Profile could not be updated, try again!'});
                   } else {
                     res.json({success: true, 
                               message: 'Your profile updated!',
                               imgfile: ''});
                   }
            });
        } else {
            if (req.file == undefined) {
                User.findOneAndUpdate({token: req.body.token}, 
                    {$set:{username: req.body.username,
                    fullname: req.body.fullname,
                    bio: req.body.bio,
                    location: req.body.location}}, 
                    function(err, user) {
                       if (err) {
                         res.json({success: false, message: 'Profile could not be updated, try again!'});
                       } else {
                         res.json({success: true, 
                                   message: 'Your profile updated!',
                                   imgfile: ''});
                       }
                });
            } else {
                if (req.file.filename.length < 5) {
                    User.findOneAndUpdate({token: req.body.token}, 
                        {$set:{username: req.body.username,
                        fullname: req.body.fullname,
                        bio: req.body.bio,
                        location: req.body.location}}, 
                        function(err, user) {
                           if (err) {
                             res.json({success: false, message: 'Profile could not be updated, try again!'});
                           } else {
                             res.json({success: true, 
                                       message: 'Your profile updated!',
                                       imgfile: ''});
                           }
                    });
                } else {
                    console.log('922-229' + req.body.serverbaseurl);
                    User.findOneAndUpdate({token: req.body.token}, 
                        {$set:{username: req.body.username,
                        fullname: req.body.fullname,
                        bio: req.body.bio,
                        location: req.body.location,
                        avatarURL: `${req.body.serverbaseurl}uploads/${req.file.filename}`}}, 
                        function(err, user) {
                           if (err) {
                             res.json({success: false, message: 'Profile could not be updated, try again!'});
                           } else {
                             res.json({success: true, 
                                       message: 'Your profile updated!',
                                       imgfile: `${req.body.serverbaseurl}uploads/${req.file.filename}`});
                           }
                    });
                }
            }
        }
    });
});

module.exports = router;
