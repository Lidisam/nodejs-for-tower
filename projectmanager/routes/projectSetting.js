var express = require('express');
var router = express.Router();
var projectSettingModel = require('../models/projectSetting');


/* GET myTasks page. */
router.get('/', function(req, res, next) {
    projectSettingModel.getProjectMsgs(req, function () {
        res.render('projectSetting', {
            projectMsgs:projectSettingModel.projectMsgs,
            projectname: projectSettingModel.projectname,
            projectdesc: projectSettingModel.projectdesc
        });
    });
});


module.exports = router;