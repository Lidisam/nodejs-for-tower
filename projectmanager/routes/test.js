var testModel = require('../models/tests');  
  
/*test测试例子*/  
exports.me = function (req, res) {  
    testModel.findMess(function () {  
        // res.send('hello,test');
        console.log("123");
        res.render('test', {test: 'Hello World View!', html:testModel.html});  
    });  
};  
  
