var express = require('express');
var router = express.Router();
var waitDealTaskModel = require('../models/waitDealTask');


/* GET myTasks page. */
router.get('/', function(req, res, next) {
    var project_id = req.session.project_id;
    waitDealTaskModel.getWaitTasks(req, function () {
        res.render('waitDealTask',
            {
                projectname:waitDealTaskModel.projectname,
                projectdesc:waitDealTaskModel.projectdesc,
                tasks:waitDealTaskModel.tasks,
                totalProjectNum:waitDealTaskModel.totalProjectNum.length
            });
    });
});
/**
 * 确认任务完成
 */
router.route('/confirmTask').post(function (req, res) {
    waitDealTaskModel.confirmTask(req, function () {
        res.json(waitDealTaskModel.confirmCode);
    });
});



module.exports = router;