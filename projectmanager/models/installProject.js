var mysql = require('mysql');
var databases = require("./common/db");
//使用连接池连接数据库  
var pool = mysql.createPool(databases.config);
/**
 * 获得全部成员信息
 * @param req
 * @param callback
 */
exports.getMemebers = function (req,callback) {
    var promise = new Promise(function (resolve, rej) {
        pool.getConnection(function (err, connection) {
            if (err) {
                console.log('与mysql数据库建立连接失败');
            } else {
                console.log('与mysql数据库建立连接成功');
                var selectSql = 'SELECT memberID,memberName FROM member';
                connection.query(selectSql, [], function (err, result) {
                    if (err) {
                        console.log('插入数据失败');
                    }
                    console.log(result);
                    exports.allMembers = result;
                    connection.release();
                    //关闭连接池  
                    resolve(result);
                })
            }
        });
    });
    promise.then(function (result) {
        callback();
    })
};
/**
 * 添加项目
 * @param req
 * @param callback
 */
exports.addProject = function (req,callback) {
    var promise = new Promise(function (resolve, rej) {
        pool.getConnection(function (err, connection) {
            if (err) throw('与mysql数据库建立连接失败');
            var lastInsertId;
            connection.beginTransaction(function (err) {
                if (err) throw err;   //事务执行失败，报错
                var sql = 'INSERT INTO project (`projectName`,`projectDesc`,`managerID`)' +
                    'VALUES (?, ?, ?)';  //第一条sql语句
                connection.query(sql, [req.body.project_name, req.body.project_desc, req.session.user], function (err, result) {
                    if (err) {
                        connection.rollback(function () {
                            exports.addCode = 0;
                        });
                        return;   //回滚完后需要return终止该过程
                    }
                    lastInsertId = result.insertId;
                    var str = '';   //拼装批量插入字符串
                    var map = req.body.project_members;
                    str += '('+ parseInt(req.session.user) +',' + lastInsertId + ')';
                    for (i in map) {
                            str += ',('+ parseInt(map[i]) +',' + lastInsertId + ')';
                    }
                    connection.query('insert into projectmember (`memberID`,projectID) VALUE' + str, function(err, result) {  //第二次插入操作
                        if(err) {
                            connection.rollback(function() {
                                exports.addCode = 0;
                            });
                            return;
                        }
                        connection.commit(function(err) {  //调教事务
                            if(err) {
                                connection.rollback(function() {
                                    exports.addCode = 0;
                                });
                                return;
                            }
                        });
                        resolve(result);
                    });
                    exports.addCode = 1;
                    connection.release();
                    //关闭连接池
                    resolve(result);
                });
            });
        });
    });
    promise.then(function (result) {
        callback();
    })
};


//处理数据库服务器连接中断时的操作
pool.on('error', function (err) {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
        console.log('与mysql数据库之间的连接丢失');
        //3秒后重新尝试连接数据库
        setTimeout(function () {
            connect();
        }, 3000);
    } else {
        throw err;
    }
});