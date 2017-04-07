var mysql = require('mysql') ;
var databases = require("./common/db");
//使用数据库连接池
var pool = mysql.createPool(databases.config);

exports.login = function( req,res,next){
    console.log(req.body);  
    var promise = new Promise(function( resolve,rej ){
        pool.getConnection(function(err,connection){  
            if(err){  
                console.log('与mysql数据库建立连接失败');  
            }else{  
                console.log('与mysql数据库建立连接成功');  
                    var selectSql = 'SELECT * from member where memberName=? and password=?' ;
                    connection.query(selectSql,[req.body.username,req.body.password],function(err,result){  
                        if(err){  
                            console.log('查询数据失败');  
                        } 
                        console.log('查询数据');  
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
            req.session.user = result[0].memberID;
            req.session.userName = result[0].memberName;
            res.send(result[0].memberID.toString());
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

