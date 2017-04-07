var express = require('express');
var router = express.Router();

/* GET dynamic page. */
router.get('/', function(req, res, next) {
  res.render('dynamic');
});

module.exports = router;
