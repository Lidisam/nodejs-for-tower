var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require("express-session");

var index_menu = require('./routes/index_menu');
var register = require('./routes/register');
var login = require('./routes/login');
var index = require('./routes/index');
var myProject = require('./routes/myProject');
var waitDealTask = require('./routes/waitDealTask');
var projectMembers = require('./routes/projectMembers');
var projectSetting = require('./routes/projectSetting');
var installProject = require('./routes/installProject');
var dynamic = require('./routes/dynamic');
var calendar = require('./routes/calendar');
var weeklys = require('./routes/weeklys');
var users = require('./routes/users');
var team = require('./routes/team');
var myTasks = require('./routes/myTasks');
var myWeek = require('./routes/myWeek');
var updatePwd = require('./routes/updatePwd');
var tips = require('./routes/tips');
var assignTask = require('./routes/assignTask');

var testModel  =require('./models/tests'); 
var indexModel  =require('./models/index');
var weeklysModel = require('./models/weeklys');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');

// app.get('/',function(req,res){
//   res.send('hello,wyb');
// });
// app.get('/test',test.me);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// 配置session
app.use(session({
    secret: "!@#$",
    resave: false,
    saveUninitialized: true,
    cookie:{}
}));


app.use('/',index_menu);
app.use('/register',register);
app.use('/login',login);
app.use('/index', index);
app.use('/myProject', myProject);
app.use('/waitDealTask', waitDealTask);
app.use('/projectMembers', projectMembers);
app.use('/projectSetting', projectSetting);
app.use('/installProject', installProject);
app.use('/dynamic', dynamic);
app.use('/calendar',calendar);
app.use('/weeklys',weeklys);
app.use('/team',team);
app.use('/myTasks',myTasks);
app.use('/myWeek',myWeek);
app.use('/updatePwd',updatePwd);
app.use('/tips',tips);
app.use('/users', users);
app.use('/assignTask', assignTask);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
