let express = require('express');
let router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET random number generator value. */
router.get('/rand', function(req, res, next) {
  let r = {value:0};
  r.value = Math.random();
  res.json(r)
});

module.exports = router;
