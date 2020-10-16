var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var classroomSchema = new Schema({
    room: {type: String, required: true, unique: true},
    title: String,
    host: String,
    hostAvatarURL: String,
    introduction: String,
    posterURL: String,
    doorPass: String,
    hostEmail: String,
    created: Date
});

module.exports = mongoose.model('classroom', classroomSchema);
