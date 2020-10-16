var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var resetPasswordSchema = new Schema({
    email: String
});

module.exports = mongoose.model('resetpassword', resetPasswordSchema);
