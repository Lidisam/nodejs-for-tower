var mysql = require('mysql');
var databases = require("./common/db");
//使用连接池连接数据库  
var pool = mysql.createPool(databases.config);
/**
 * 分配小任务显示界面
 * @param req
 * @param callback
 */
exports.getMembers = function (req, callback) {
    var promise = new Promise(function (resolve, rej) {
        pool.getConnection(function (err, connection) {
            if (err) {
                console.log('与mysql数据库建立连接失败');
            } else {
                console.log('与mysql数据库建立连接成功');
                var selectSql = 'SELECT a.memberID,a.memberName FROM member a,projectmember b WHERE ' +
                    'a.memberID=b.memberID AND projectID=?';
                connection.query(selectSql, [req.session.project_id], function (err, result) {
                    if (err) {
                        console.log('查询数据失败');
                    }
                    console.log(result);
                    exports.members = result;
                    //当一个连接不需要使用时，将其归还到连接池中
                    connection.release();
                    //关闭连接池
                    //pool.end();
                    resolve(result);
                })
            }
        });
    });
    promise.then(function () {
        callback();
    })
};


exports.delTask = function (req, callback) {
    var promise = new Promise(function (resolve, rej) {
        pool.getConnection(function (err, connection) {
            if (err) {
                console.log('与mysql数据库建立连接失败');
                exports.delCode = 0;
            } else {
                console.log('与mysql数据库建立连接成功');
                var selectSql = 'DELETE FROM task WHERE taskID=?';
                connection.query(selectSql, [req.body.task_id], function (err, result) {
                    if (err) {
                        console.log('删除数据失败');
                    }
                    console.log(result);
                    exports.delCode = 1;
                    connection.release();
                    resolve(result);
                })
            }
        });
    });
    promise.then(function () {
        callback();
    })
};

exports.confirmTask = function (req, callback) {
    var promise = new Promise(function (resolve, rej) {
        pool.getConnection(function (err, connection) {
            if (err) {
                console.log('与mysql数据库建立连接失败');
            } else {
                connection.beginTransaction(function (err) {
                    if (err) {
                        throw err;
                    }
                    var sql = 'UPDATE task SET taskStaus=2,deadline=?,memberID=? WHERE taskID=?';
                    connection.query(sql, [req.body.date, req.body.user_id, req.session.task_id], function (err, result) {
                        if (err) {
                            connection.rollback(function () {
                                console.log('first insert into user');
                                throw err;
                            });
                            return;
                        }
                        connection.commit(function (err) {
                            console.log('enter the commit');
                            if (err) {
                                connection.rollback(function () {
                                    throw err;
                                });
                                return;
                            }
                            console.log('success');
                        });
                        connection.release();
                        //关闭连接池
                        //pool.end();
                        resolve(result);
                    });
                });
            }
        });
    });
    promise.then(function () {
        callback();
    })
};

/**
 * 在我自己的任务中确定任务
 */
exports.confirmTask2 = function (req, callback) {
    var promise = new Promise(function (resolve, rej) {
        pool.getConnection(function (err, connection) {
            if (err) {
                //console.log('与mysql数据库建立连接失败');
            } else {
                //console.log('与mysql数据库建立连接成功');
                var selectSql = "UPDATE task SET taskStaus=3 WHERE taskID=?";
                connection.query(selectSql, [req.body.task_id], function (err, result) {
                    if (err) {
                        //console.log('查询数据成功');
                        exports.confirmCode = 0;
                    }
                    else {
                        //console.log('查询数据成功');
                    }
                    //console.log(result);
                    exports.confirmCode = 1;
                    //  function()
                    connection.release();
                    //关闭连接池
                    resolve(result);
                })
            }
        });
    });
    promise.then(function () {
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

