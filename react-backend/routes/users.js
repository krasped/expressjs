var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json(Math.floor(Math.random()*100));
});

module.exports = router;
