var express = require('express');
var router = express.Router();
var loginModel = require('../models/login');

/* GET login page. */
// router.get('/', function(req, res, next) {  
//     res.render('login'); 
// });
router.route('/')
    .get(function(req,res){
         res.render('login');
    })
    .post(function(req,res,next){
        loginModel.login(req,res,next);
        
    });
    
module.exports = router;
