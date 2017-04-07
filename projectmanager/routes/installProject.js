var express = require('express');
var router = express.Router();
var installProjectModel = require('../models/installProject');

/* GET installProject page. */
router.get('/', function(req, res, next) {
    installProjectModel.getMemebers(req, function () {
        res.render('installProject', {members: installProjectModel.allMembers,userId:req.session.user});
    });
});

router.post('/add', function(req, res, next) {
    installProjectModel.addProject(req, function () {
         res.json(installProjectModel.addCode);
    });
});

module.exports = router;
