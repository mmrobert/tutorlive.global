var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var feedbackSchema = new Schema({
    email: String,
    username: String,
    fullname: String,
    feedtitle: String,
    feedbody: String
});

module.exports = mongoose.model('feedback', feedbackSchema);
