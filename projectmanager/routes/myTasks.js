var express = require('express');
var router = express.Router();
var myTaskModel = require('../models/myTasks');


/* GET myTasks page. */
router.get('/', function(req, res, next) {
    var user_name = req.session.userName;
    myTaskModel.getTasks(req, function () {
        res.render('myTasks', {userName:user_name,taskMsgs:myTaskModel.taskMsgs});
    });
});
router.post('/confirmTask2', function (req, res, next) {
    myTaskModel.confirmTask2(req, function () {
        res.json({"code" : myTaskModel.confirmCode});
    });
});


module.exports = router;