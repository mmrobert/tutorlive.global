var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userSchema = new Schema({
  email: {type: String, required: true, unique: true},
  salt: String,
  password: String,
  token: String,
  username: String,
  fullname: String,
  bio: String,
  location: String,
  avatarURL: String,
  onLine: Boolean
});

module.exports = mongoose.model('user', userSchema);
