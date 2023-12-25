var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var brandRouter = require('./routes/admin/brand');
var figureRouter = require('./routes/admin/figure');
var adminRouter = require('./routes/admin/admin');
var colorRouter = require('./routes/admin/color');




var app = express();

var mongoose = require("mongoose");
//var uri = "mongodb+srv://cuongtranmongo:fHRny7q9u4wN9iAE@toystore.cqorbge.mongodb.net/ToyStore";
var uri = "mongodb://localhost:27017/ToyStore";
mongoose.set('strictQuery', true); 

mongoose.connect(uri)
.then(() => console.log ("Connect to DB succeed !"))
.catch((err) => console.log (err));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/brand', brandRouter);
app.use('/figure', figureRouter);
app.use('/admin', adminRouter);
app.use('/color', colorRouter);


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

app.listen(process.env.PORT || 3001);
module.exports = app;
