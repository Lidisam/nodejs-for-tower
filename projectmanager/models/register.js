var mysql = require('mysql') ;
var databases = require("./common/db");
//使用连接池连接数据库  
var pool = mysql.createPool(databases.config);

exports.register = function( req,res,next){
   // $username = req.body.username;
    var promise = new Promise(function( resolve,rej ){
        pool.getConnection(function(err,connection){  
            if(err){  
                console.log('与mysql数据库建立连接失败');  
            }else{  
                console.log('与mysql数据库建立连接成功');
                //console.log('与mysq'+username);
                var selectSql = 'insert into member set ?';
                    //(memberName,password,lastTime) values ("111","111",CURRENT_TIMESTAMP)' ;
                    connection.query(selectSql,{
                        memberName: req.body.username,
                        password: req.body.password
                      //  lastTime:CURRENT_TIMESTAMP
                    },

                    function(err,result){  
                        if(err){  
                            console.log('插入数据失败');  
                        }
                        else
                        {
                            console.log('插入数据成功');
                        }
                        //  function() 
                        //当一个连接不需要使用时，将其归还到连接池中  
                        connection.release();  
                        //关闭连接池  
                        //pool.end();  
                        resolve(result);
                    })
            }  
        });
    });
    promise.then(function(result){
        if(result.length!=0){
            res.send(result.insertId.toString());
        }else{
            res.send("err");
        }
    }) 
    //处理数据库服务器连接中断时的操作  
    pool.on('error',function(err){  
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){  
            console.log('与mysql数据库之间的连接丢失');  
            //3秒后重新尝试连接数据库  
            setTimeout(function(){  
                connect();  
            },3000);  
        }else{  
            throw err;  
        }  
    })  
}  

