let express = require('express');
let router = express.Router();

const users = require('../client/src/Data/Users.json');
const books = require('../client/src/Data/Data.json');

const fs = require('fs');


router.post('/dataGet', (req, res) => {
  fs.readFile('./client/src/Data/Data.json', 'utf-8', (err, data) => {
    let users = JSON.parse(data);
    let id = req.body.id;

    const userData = users.filter(data => data.id === id);

    res.json(userData[0]);
  });
});

router.get('/users', (req, res) => {
  res.json(users);
});

router.post('/dataAddBook', (req, res) => {
  fs.readFile('./client/src/Data/Data.json', 'utf-8', (err, data) => {
    let users = JSON.parse(data);
    let id = req.body.id;
    let book = req.body.book;

    let userData = users.filter(data => data.id === id);

    let newBook = {
      id: userData[0].books.length + 1,
      ...book
    };

    userData[0].books.push(newBook);

    for (let i = 0; i < users.length; i++) {
      if (users[i].id === userData[0].id) {
        users[i] = userData[0];
        break;
      }
    }

    fs.writeFile('./client/src/Data/Data.json', JSON.stringify(users),'utf-8', (err) => {
        if (err) throw err;

        res.json(userData[0].books)
    });
  })
});

router.post('/books', (req, res) => {
  fs.readFile('./client/src/Data/Data.json', 'utf-8', (err, data) => {
    let books = JSON.parse(data);
    let book = req.body.book;
    let id = req.body.id;

    for (let i = 0; i < books.length; i++) { //TODO: Wrong!!! books[id] wont work !!!
      if (books[id].books[i].id === book.id) {
        books[id].books[i] = book;
        break;
      }
    }

    fs.writeFile('./client/src/Data/Data.json', JSON.stringify(books),'utf-8', (err) => {
      if (err) throw err;

      res.json(books[id].books);
    });
  });
});

module.exports = router;
