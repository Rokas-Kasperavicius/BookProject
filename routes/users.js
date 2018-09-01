let express = require('express');
let router = express.Router();

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
    const user = users.filter(user => user.email === newLogin.email);

    if (user.length === 0 || (user.length > 0 && user[0].password !== newLogin.password)) {
      errors = 'Email address or password was invalid';
    } else {
      loggedUser = user[0];
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


module.exports = router;
