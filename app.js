var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var minify = require('express-minify');
var compression = require('compression')
var logger = require('morgan');
var expressValidator= require('express-validator');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bodyParser = require('body-parser');
var multer  = require('multer');
var flash = require('connect-flash');
var toastr = require('express-toastr');
var mongo = require('mongodb');
var mongoose = require('mongoose');
var db = mongoose.connection;
var fs = require('fs');
var paypal_api = require('paypal-rest-sdk');


// var uri = 'mongodb://natigiat:nati1234@ds055574.mongolab.com:55574/heroku_53mk0lzm';
// mongoose.connect(uri);

mongoose.connect('mongodb://localhost/tryme');
 
var uniqueValidator = require('mongoose-unique-validator');
var db = mongoose.connection;


var config_opts = {
    'host': 'api.sandbox.paypal.com',
    'port': '',
    'client_id': 'AV6LAPq0B6_O3BIAkdgaKqOHMFQb7gEQn1QcXAaRWvcgioJCDdIy8yCPJyiePekDl8vWYd_RC-99L8OG',
    'client_secret': 'EMuAAtFjLJguOmDnuEpCFl5bElzcbLnkgxPXcHq48oz6S6Wm_l3chAoRh7Xy47jH2ya2Y7qZrhsLZl-5'
};


var routes = require('./routes/index');
var users = require('./routes/users');
var account = require('./routes/account');
var prices = require('./routes/prices');
var examples = require('./routes/examples');
var support = require('./routes/support');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


// uncomment after placing your favicon in /public
app.use(compression());
app.use(minify());

app.use(favicon(path.join(__dirname, 'public/images', 'favicon.png')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



//Express sessions
app.use(session({
  secret:'secret',
  saveUninitialized: true,
  resave:true
}));

//Passport
app.use(passport.initialize());
app.use(passport.session());



//Validetor
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));



app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//config messages
app.use(flash());
app.use(toastr({
    closeButton: true
}));



app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

app.use(function(req, res, next) {
  res.locals.user = req.user;
  next();
});

app.use('*' ,function (req, res, next)
{
    
    res.locals.toasts = req.toastr.render()
    next()
});

app.use('/', routes);
app.use('/users', users);
app.use('/account' , account); 
app.use('/examples' , examples);
app.use('/prices' , prices);
app.use('/support' , support);


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
