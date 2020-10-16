var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var myClassroomsSchema = new Schema({
    email: {type: String, required: true, unique: true},
    roomsList: [String]  // room name list
});

module.exports = mongoose.model('myclassroom', myClassroomsSchema);
