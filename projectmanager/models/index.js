var mysql = require('mysql') ;
var databases = require("./common/db");

var connection = mysql.createConnection(databases.config);
connection.connect(function(err){
    if(err) console.log('连接失败!');
    // else{
    //     console.log('连接成功');
    // }
});
exports.findProject = function(req,callback){
    // console.log("数据库查询结果");
    var promise = new Promise(function( resolve,rej ){
        var selectSql = 'SELECT * FROM project, projectmember  where  projectmember.memberID= ? and projectmember.projectID=project.projectID  ';
        connection.query(selectSql,[req.session.user],function(err,res){
            if(err){
                    console.log('findProject err:' + err) ;
                    return ;       
            }
            // console.log("数据库查询结果1");
            //   console.log(res); 
            exports.html = res;
            //connection.release();
            resolve(res);
        });
    });      
    promise.then(function(){
        callback();
    })

    


 };



