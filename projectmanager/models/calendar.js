var mysql = require('mysql') ;
var databases = require("./common/db");
  var connection = mysql.createConnection(databases.config);
connection.connect(function(err){
    if(err) console.log('连接失败');
    // else{
    //     console.log('连接成功');
    // }
});
exports.getMsgs = function(req,callback){
    var promise = new Promise(function( resolve,rej ){
        var selectSql = 'SELECT * FROM task left join project on task.projectID=project.projectID WHERE memberID=?';
        connection.query(selectSql,[req.session.user],function(err,res){
            if(err){
                    console.log('findProject err:' + err) ;
                    return ;       
            }
             console.log("数据库查询结果1"+req.session.user);
               console.log(res);
            exports.html = res;
            resolve();
        }); 
    });      
    promise.then(function(){
        callback();
    })

    


 };



