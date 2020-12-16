var createError = require('http-errors');

var path = require('path');
var fs = require('fs');
const formData = require("express-form-data");
var express = require('express');
var session =require('express-session');
var flash = require('connect-flash');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var favicon = require('serve-favicon');
var flash = require('connect-flash');
var os = require('os');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');


var sequelize = require('./models/index').sequelize;

var app = express();
sequelize.sync();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));
app.use(session({
  key:'key',
  secret: 'secret',
  resave: false,
  saveUninitialized: true
}));

const options = {
  uploadDir: os.tmpdir(),
  autoClean: true
};
 
// parse data with connect-multiparty. 
app.use(formData.parse(options));
// delete from the request all empty files (size == 0)
app.use(formData.format());
// change the file objects to fs.ReadStream 
app.use(formData.stream());
// union the body and the files
app.use(formData.union());


app.use(flash());

app.use('/', indexRouter);
app.use('/users', usersRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
