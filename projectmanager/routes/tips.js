var express = require('express');
var router = express.Router();


/* GET tips page. */
router.get('/', function(req, res, next) {  
    res.render('tips'); 
});
module.exports = router;