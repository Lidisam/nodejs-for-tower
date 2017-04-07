var express = require('express');
var router = express.Router();
var weeklysRouter = require('../models/weeklys');


/* GET weeklys page. */
router.get('/', function(req, res, next) {
    weeklysRouter.getWeeklys(req, function () {
        res.render('weeklys', {weekDatas: weeklysRouter.weeklyDatas, currentDate: weeklysRouter.currentDate, currentWeek:getWeekNumber(weeklysRouter.currentDate)});
    });
});
router.post('/anotherWeeklys', function(req, res, next) {
    weeklysRouter.getAnotherWeeklys(req, function () {
        res.json(weeklysRouter.anotherWeeklys);
    });
});


/**
 * 判断是否闰年
 * **/
function isLeapYear(year) {
    return (year % 400 == 0) || (year % 4 == 0 && year % 100 != 0);
}
/**
 * 获取某一年份的某一月份的天数
 * */
function getMonthDays(year, month) {
    return [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month] || (isLeapYear(year) ? 29 : 28);
}
/**
 * 获取某年的某天是第几周
 * @param {Number} nowTime
 */
function getWeekNumber(nowTime) {
    var year = nowTime.getFullYear();
    var month = nowTime.getMonth();
    var days = nowTime.getDate();
    //那一天是那一年中的第多少天
    for (var i = 0; i < month; i++) {
        days += getMonthDays(year, i);
    }
    //那一年第一天是星期几
    var yearFirstDay = new Date(year, 0, 1).getDay() || 7;

    var week = null;
    if (yearFirstDay == 1) {
        week = Math.ceil(days / yearFirstDay);
    } else {
        days -= (7 - yearFirstDay + 1);
        week = Math.ceil(days / 7) + 1;
    }
    return week;
}


module.exports = router;