var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var InitiateMongoServer = require("./config/db");   //mongo
var bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var peliculasRouter = require('./routes/peliculas'); //
var usuariosRouter = require('./routes/usuarios'); //
var comentariosRouter = require('./routes/comentarios'); //

var app = express();

//Inicializa base de datos a Mongo
InitiateMongoServer();  //mongo
app.use(bodyParser.json()); //mongo

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use('/peliculas', peliculasRouter); //
app.use('/usuarios', usuariosRouter); //
app.use('/comentarios', comentariosRouter); //

//recibir datos desde formularios o formato json
//app.use(express.urlencoded({extended: false}));
//app.use(express.json());

//static files
//app.use(express.static(path.join(__dirname, 'public')));

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

