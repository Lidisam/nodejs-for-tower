var express = require('express');
var router = express.Router();
var assignTaskModel = require('../models/assignTask');

//获取该项目对应的成员信息
router.get('/:task_id', function (req, res, next) {
    req.session.task_id = req.params.task_id;  //获取任务id
    assignTaskModel.getMembers(req, function () {
        res.render('assignTask', {members: assignTaskModel.members});
    });
});
//为该任务分配成员完成
router.post('/confirmTask', function (req, res, next) {
    assignTaskModel.confirmTask(req, function () {
        res.render('index', {projects: req.session.index_data});
    });
});
//删除分配好的任务
router.post('/delTask', function (req, res, next) {
    assignTaskModel.delTask(req, function () {
        res.json({"code": assignTaskModel.delCode});
    });
});
////自动加载已完成的任务 5条
//router.post('/getTasked', function (req, res, next) {
//    assignTaskModel.getTasked(req, function () {
//        res.json({"code": assignTaskModel.delCode});
//    });
//});

module.exports = router;