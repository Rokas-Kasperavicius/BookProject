let express = require('express');
let router = express.Router();
let path = require('path');

const users = require('../client/src/Data/Users.json');
const books = require('../client/src/Data/BookData.json');
const subjects = require('../client/src/Data/Subjects.json');

const fs = require('fs');


router.get('/books', (req, res) => {
  res.json(books);
});

router.get('/users', (req, res) => {
  res.json(users);
});

router.get('/subjects', (req, res) => {
  res.json(subjects);
});

router.post('/books', (req, res) => {
  fs.writeFile('./client/src/Data/BookData.json', JSON.stringify(req.body),'utf-8', (err) => {
    if (err) throw err;
  });

  res.end('Success');
});

module.exports = router;
