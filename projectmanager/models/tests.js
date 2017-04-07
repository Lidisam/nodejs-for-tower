var mysql = require('mysql') ;                                                                                      
  //connection config
  var connection = mysql.createConnection({
    host : 'localhost' ,
    user : 'root' ,
    password : 'root' ,
    database : 'test'
 });
connection.connect(function(err){
    if(err) console.log('连接失败');
    // else{
    //     console.log('连接成功1');
    // }
});
exports.findMess = function(callback){
   var selectSql = 'SELECT * FROM user  ' ;
   connection.query(selectSql,function(err,res){
   if(err){
        console.log('findMess err:' + err) ;
         return ;
         
   }
      console.log("数据库查询结果");
      console.log(res); 
      exports.html = "查询到的数据为：" + JSON.stringify(res);     
      console.log(exports.html); 
   }) ;
   callback() ;
 } ;



