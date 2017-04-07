var express = require('express');
var router = express.Router();
var myProjectModel = require('../models/myProject');

router.route('/')
    .post(function (req, res, next) {
        myProjectModel.send(req, res, next);
    });

//显示当前项目
router.get('/', function (req, res) {
    console.log(req.params.project_id);
    myProjectModel.myProject(req, function () {
        res.render('myProject', {projectname: myProjectModel.projectname, projectdesc: myProjectModel.projectdesc});
    });
});

//添加小任务
router.route('/add').post(function (req, res) {
    //console.log(req.body.project_id);
    //console.log(req.body.project_content);
    myProjectModel.addTasks(req, function () {
        res.json({"code": myProjectModel.statusConde});
    });
});

//获取未分配的任务
router.route('/waitTasks').post(function (req, res) {
    myProjectModel.waitTasks(req, function () {
        res.json({"tasks": myProjectModel.waitTask});
    });
});

//获取当前已完成任务
router.route('/doneTasks').post(function(req,res) {
    myProjectModel.doneTasks(req, function () {
        res.json({"tasks": myProjectModel.doneTask});
    });
});
//点击加载更多已完成任务
router.route('/moreDoneTasks').post(function(req,res) {
    console.log(req.body.page_num);
    myProjectModel.moreDoneTasks(req, function () {
        res.json({"tasks": myProjectModel.moreDoneTask});
    });
});


module.exports = router;
