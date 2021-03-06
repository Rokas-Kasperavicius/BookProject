let express = require('express');
let router = express.Router();
let path = require('path');
let randomstring = require("randomstring");

const fs = require('fs');

router.get('*', (request, response) => {
  response.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

router.post('/login', (req, res) => {
  fs.readFile('./client/src/Data/Users.json', 'utf-8', (err, data) => {
    if (err) throw err;

    let users = JSON.parse(data);
    let newLogin = req.body;
    let loggedUser = {};
    let errors = '';
    let token = randomstring.generate(30);

    const user = users.filter(user => user.email === newLogin.email);

    if (user.length === 0 || (user.length > 0 && user[0].password !== newLogin.password)) {
      errors = 'Email address or password was invalid';
    } else {
      loggedUser = {...user[0], token: token};
    }
    res.json({ errors, loggedUser });
  });
});

router.post('/register', (req, res) => {
  fs.readFile('./client/src/Data/Users.json', 'utf-8', (err, data) => {
    if (err) throw err;

    let users = JSON.parse(data);
    let newRegister = req.body;
    let errors = [];

    for (let i = 0; i < users.length; i++) { // Check if username and email are unique
      if (users[i].userName === newRegister.userName) {
        errors.push('User name must be unique!');
      }
      if (users[i].email === newRegister.email) {
        errors.push('Email address must be unique!');
      }
    }

    if (errors.length !== 0) {
      res.json(errors);
      return;
    }

    users.push({
      id: users[0],
      token: '',
      ...newRegister
    });

    fs.readFile('./client/src/Data/Data.json', 'utf-8', (err, data) => {
      let usersData = JSON.parse(data);

      usersData.push({
        id: users[0],
        books: [],
        subjects: []
      });

      users[0]++;

      fs.writeFile('./client/src/Data/Users.json', JSON.stringify(users), 'utf-8', (err) => {
        if (err) throw err; //TODO: Maybe put different tiers in the functions?!?

        fs.writeFile('./client/src/Data/Data.json', JSON.stringify(usersData),'utf-8', (err) => {
          if (err) throw err;

          res.json([]);
        });
      });
    });

  });
});

module.exports = router;
