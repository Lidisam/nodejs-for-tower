var express = require('express');
var router = express.Router();
var calendarModel = require('../models/calendar');

/* GET calendar page. */
router.get('/', function(req, res, next) {
    calendarModel.getMsgs(req,function() {
        res.render('calendar', {calendars: calendarModel.html});
    });
});

module.exports = router;
