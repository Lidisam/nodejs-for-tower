var express = require('express');
var router = express.Router();

/* GET menu page. */
router.get('/', function(req, res, next) {  
        delete req.session.user;
        res.render('index_menu'); 
});

module.exports = router;
