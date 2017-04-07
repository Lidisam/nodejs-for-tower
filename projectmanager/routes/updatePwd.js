var express = require('express');
var router = express.Router();
var updatePwdModel = require('../models/updatePwd');
/* GET login page. */
// router.get('/', function(req, res, next) {  
//     res.render('updatePwd'); 
// });
router.route('/')
    .get(function(req,res){
        var user_name = req.session.userName;
         res.render('updatePwd',{userName: user_name});
    })
    .post(function(req,res,next){
        updatePwdModel.updatePwd(req,res,next);
        
    });
module.exports = router;
