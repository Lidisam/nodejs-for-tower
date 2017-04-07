var express = require('express');
var router = express.Router();
var registerModel = require('../models/register');

/* GET register page. */
// router.get('/', function(req, res, next) {  
//     res.render('register'); 
// });
router.route('/')
    .get(function(req,res){
         res.render('register');
    })
    .post(function(req,res,next){
        registerModel.register(req,res,next);
    });
module.exports = router;
