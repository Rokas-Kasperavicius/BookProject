let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
let logger = require('morgan');
const fs = require('fs');

const users = require('./client/src/Data/Users.json');
const books = require('./client/src/Data/BookData.json');
const subjects = require('./client/src/Data/Subjects.json');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//CORS bypass
app.use(function(req, res, next) {
  //must be included these first two
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  next();
});

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.resolve(__dirname, './client/build')));

app.get('*', (request, response) => {
  response.sendFile(path.join(__dirname, './client/build', 'index.html'));
});

app.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

app.get('/api/books', (req, res) => {
  res.json(books);
});

app.get('/api/users', (req, res) => {
  res.json(users);
});

app.get('/api/subjects', (req, res) => {
  res.json(subjects);
});

app.post('/api/books', (req, res) => {
  fs.writeFile('./client/src/Data/BookData.json', JSON.stringify(req.body),'utf-8', (err) => {
    if (err) throw err;
  });

  res.end('Success');
});

app.post('/login', (req, res, next) => {
  fs.readFile('./client/src/Data/Users.json', 'utf-8', (err, data) => {
    if (err) throw err;

    let users = JSON.parse(data);
    let newLogin = req.body;
    let loggedUser = {};
    let errors = '';
    const user = users.filter(user => user.email === newLogin.email);

    if (user.length === 0 || (user.length > 0 && user[0].password !== newLogin.password)) {
      errors = 'Email address or password was invalid';
    } else {
      loggedUser = user[0];
    }
    res.json({ errors, loggedUser });
  });
});

app.post('/register', (req, res) => {
  fs.readFile('./client/src/Data/Users.json', 'utf-8', (err, data) => {
    if (err) throw err;

    let users = JSON.parse(data);
    let newRegister = req.body;

    let errors = [];

    for (let i = 0; i < users.length; i++) { //Check if username is unique
      if (users[i].userName === newRegister.userName) {
        errors.push('User name must be unique!');
      }
      if (users[i].email === newRegister.email) {
        errors.push('Email address must be unique!');
      }
    }

    if (errors.length === 0) {
      newRegister = { id: users.length + 1, ...newRegister };
      users.push(newRegister);

      fs.writeFile('./client/src/Data/Users.json', JSON.stringify(users),'utf-8', (err) => {
        if (err) throw err;
      });
    }

    res.json(errors);
  });
});

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
