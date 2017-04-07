var express = require('express');
var router = express.Router();
var indexModel = require('../models/index');
router.get('/', function (req, res, next) {
    indexModel.findProject(req, function () {
        req.session.index_data = indexModel.html;
        res.render('index', {projects: indexModel.html});
    });
});
module.exports = router;