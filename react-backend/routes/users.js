var express = require('express');
var create = require('../controllers/create.js');
var update = require('../controllers/update.js');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json(Math.floor(Math.random()*100));
});

router.post('/', create.user);
router.get('/update', update.user);
router.get('/book', create.book);
router.post('/book',update.book);

module.exports = router;
