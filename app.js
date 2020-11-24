const express = require('express');
const session = require('express-session');
const path = require('path');
var createError = require('http-errors')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
var cors = require('cors')
const app = express();

var indexRouter = require('./routes/pages')
var apiRouter = require('./routes/api');

app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')

app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

// Serve static files. CSS, Images, JS files ... etc
app.use(express.static(path.join(__dirname, 'public')));

// session
app.use(session({
    secret:'NinopanbovFOIHgadsfA9F79TAgaoi9FD72HQA&q@Ho',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60 * 1000 * 30
    }
}));



// Routers
app.use('/', indexRouter);
app.use('/api', apiRouter);

app.use(function(req, res, next) {
  next(createError(404))
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error', {error : err.status, layout : false})
})

module.exports = app;
