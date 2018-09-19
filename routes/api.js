let express = require('express');
let router = express.Router();

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
  fs.readFile('./client/src/Data/BookData.json', 'utf-8', (err, data) => {
    let books = JSON.parse(data);
    let book = req.body;

    for (let i = 0; i < books.length; i++) {
      if (books[i].id === book.id) {
        books[i] = book;
        break;
      }
    }

    fs.writeFile('./client/src/Data/BookData.json', JSON.stringify(books),'utf-8', (err) => {
      if (err) throw err;

      res.json(books);
    });
  });
});

module.exports = router;
