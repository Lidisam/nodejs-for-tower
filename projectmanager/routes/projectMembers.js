var express = require('express');
var router = express.Router();
var projectMembersModel = require('../models/projectMembers');

router.get('/', function (req,res,next){
        projectMembersModel.getMembersMsgs(req, function () {
                res.render('projectMembers',{
                        members: projectMembersModel.memberMsgs,
                        projectname: projectMembersModel.projectname,
                        projectdesc: projectMembersModel.projectdesc
                });
        });
});
module.exports = router;