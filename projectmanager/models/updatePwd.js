var mysql = require('mysql') ;
var databases = require("./common/db");
//使用连接池连接数据库  
var pool = mysql.createPool(databases.config);

exports.updatePwd = function( req,res,next){
    console.log(req.body);  
    var promise = new Promise(function( resolve,rej ) {
        pool.getConnection(function (err, connection) {
            if (err) {
                console.log('与mysql数据库建立连接失败');
            } else {
                console.log('与mysql数据库建立连接成功');
                connection.beginTransaction(function (err) {
                    if (err) throw err;
                    var findSql = "SELECT * FROM member WHERE memberID= ? AND password = ?";
                    var selectSql = 'UPDATE  member SET password=? WHERE memberID=? ';
                    connection.query(findSql, [req.body.user_id, req.body.prepassword], function (err, result) {
                        if (err) {
                            connection.rollback(function () {
                                throw err;

                            });
                            resolve(result);
                            return;
                        }
                        connection.query(selectSql, [req.body.password, req.body.user_id], function (err, result) {
                            if(err) {
                                connection.rollback(function() {
                                    throw err;
                                });
                                return;
                            }
                            connection.commit(function(err) {  //调教事务
                                if(err) {
                                    connection.rollback(function() {
                                        throw err;
                                    });
                                    connection.release();
                                    //关闭连接池
                                    resolve(result);
                                    return;
                                }
                            });
                        })
                    });
                })
            }
        })
    })
    promise.then(function(result){
        if(result.length!=0){
            delete req.session.user;
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

