const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors')
// var jwt = require('jsonwebtoken');
const chat = require('./socket_server');
const config = require('./config');

var mongoose = require('mongoose');
// mongoose.Promise = global.Promise;
mongoose.Promise = require('bluebird');

//   *******************************************************
var register = require('./routers/APIs/register');
var login = require('./routers/APIs/login');
var updateUsername = require('./routers/APIs/updateUsername');
var changePassword = require('./routers/APIs/changePassword');
var resetPassword = require('./routers/APIs/resetPassword');
var updateProfile = require('./routers/APIs/updateProfile');
var createClassroom = require('./routers/APIs/createClassroom');
var updateClassroom = require('./routers/APIs/updateClassroom');
var classRecommend = require('./routers/APIs/classRecommend');
var enterClassRoom = require('./routers/APIs/enterClassRoom');
var feedback = require('./routers/APIs/feedback');
var logout = require('./routers/APIs/logout');
// only for test
var user = require('./routers/APIs/user');
//   *******************************************************

const app = express();
const io = app.io = require('socket.io')();
// Chat socket
chat.onConnection(io.sockets);

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// middleware
app.use(cors());
app.use(bodyParser.json({limit: '100mb'}));
app.use(bodyParser.urlencoded({limit: '100mb', extended: true }));

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
// res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization');
  next();
});

mongoose.connect(config.databaseMDB.databaseURL, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  useCreateIndex: true
});

// routers
//    **************************************************
app.use('/apis/register', register);
app.use('/apis/login', login);
app.use('/apis/updateusername', updateUsername);
app.use('/apis/changepassword', changePassword);
app.use('/apis/resetpassword', resetPassword);
app.use('/apis/updateprofile', updateProfile);
app.use('/apis/createclassroom', createClassroom);
app.use('/apis/updateclassroom', updateClassroom);
app.use('/apis/classrecommend', classRecommend);
app.use('/apis/enterclassroom', enterClassRoom);
app.use('/apis/feedback', feedback);
app.use('/apis/logout', logout);
// only for test
app.use('/apis/user', user);
//    **************************************************

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
