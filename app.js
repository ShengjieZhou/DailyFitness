'use strict';
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//do not delete these comments below
//!start node-couch-routers
var dailyFitness = require('./routes/dailyFitness')
var test = require('./routes/test')
var receipt = require('./routes/receipt')
//!end node-couch-routers


var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//custom middlewares
app.use(function (req, res, next) {
    //write your middlewear here
    next();
});

app.use(express.static('public/stylesheets'));

app.use(function(req, res, next) {
  res.publish = function (success, message, data) {
      this.send({
          success: success,
          message: message || '',
          data: data || {}
      });
  };
  next();
});





//url mappings with controller

//don't these comments below

//!start node-couch-url-mappings
app.use('/', dailyFitness);
app.use('/test', test);
app.use('/receipt', receipt);
//!end node-couch-url-mappings

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// error handlers

// development error handler
// will print stacktrace
// if (app.get('env') === 'development') {
//   app.use(function(err, req, res, next) {
//     res.status(err.status || 500);
//     res.render('error', {
//       message: err.message,
//       error: err
//     });
//   });
// }

// production error handler
// no stacktraces leaked to user
// app.use(function(err, req, res, next) {
//   res.status(err.status || 500);
//   res.render('error', {
//     message: err.message,
//     error: {}
//   });
// });


app.use(function(err, req, res, next) {
  // 设置 HTTP 响应状态码为 500
  res.status(err.status || 500);
  // 在控制台打印错误信息
  console.error(err.stack);
  console.log(err);
  // 返回错误信息给客户端
  res.send('Internal Server Error');
});


module.exports = app;
