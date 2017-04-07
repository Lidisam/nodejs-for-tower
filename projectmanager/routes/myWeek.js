var express = require('express');
var router = express.Router();
var weeklyRouter = require('../models/myWeek');

router.route('/')
    .get(function (req, res, next) {
        var nextWeek = weeklyRouter.weekDatas2;
        var lastWeek = weeklyRouter.weekDatas;
        var user_name = req.session.userName;
        weeklyRouter.getWeeks(req, function () {
            res.render('myWeek', {weekDatas: lastWeek, weekDatas2:nextWeek, userName:user_name});
        });
    })
    .post(function (req, res, next) {
        weeklyRouter.addWeekly(req, res, next);
    });

module.exports = router;