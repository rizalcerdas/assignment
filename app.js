var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose'); // added
 
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var assignmentRouter = require('./routes/assignmentRouter'); // added
 
var Assignment = require('./models/assignment'); // added
 
var app = express();
var url = 'mongodb://localhost:27017/assignment'; // added
var connect = mongoose.connect(url); // added
connect.then((db) => { // added
  console.log('Berhasil connect Mongo DB');
}, (err) => {
  console.log('Error DB:' + err);
});
 
function auth(req, res, next) {
  console.log(req.headers);
  var authHeader= req.headers.authorization;
  if (!authHeader) {
    var err = new Error('You are not authenticated!');
    res.setHeader('WWW-Authenticate', 'Basic');
    err.status = 401;
    next(err);
    return;
  }
  var auth = new Buffer.from(authHeader.split(' ')[1], 'base64').toString
    ().split(':');
  var user = auth[0];
  var pass = auth[1];
  if (user == 'admin' && pass == 'password') {
    next(); //authorized
  } else {
    var err = new Error('You are not authenticated!');
    res.setHeader('WWW-Authenticate', 'Basic');
    err.status = 401;
    next(err);
  }
}

app.use(auth);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
 
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
 
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/assignment', assignmentRouter);
 
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});
 
// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
 
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
 
module.exports = app;