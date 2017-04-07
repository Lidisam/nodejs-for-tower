var mysql = require('mysql');
var databases = require("./common/db");
//使用连接池连接数据库  
var pool = mysql.createPool(databases.config);

exports.send = function (req, res, next) {
    req.session.project_id = req.body.project_id;
    res.send(req.body.project_id.toString());
};

//添加小任务
exports.addTasks = function (req, callback) {
    var promise = new Promise(function (resolve, rej) {
        pool.getConnection(function (err, connection) {
            if (err) {
                console.log('与mysql数据库建立连接失败');
            } else {
                console.log('与mysql数据库建立连接成功');
                var selectSql = 'INSERT INTO task (taskName,taskDesc,projectID) VALUES (?,?,?)';
                connection.query(selectSql, ['彬总666', req.body.project_content, req.session.project_id],
                    function (err, result) {
                        if (err) {
                            console.log('插入数据失败');
                            exports.statusConde = 0;  //插入成功
                        }
                        console.log('插入数据');
                        //当一个连接不需要使用时，将其归还到连接池中
                        connection.release();
                        //关闭连接池
                        //pool.end();
                        resolve(result);
                        exports.statusConde = result.insertId;  //插入成功
                    });
            }
        });
    });
    promise.then(function () {
        callback();
    });
};
/**
 * @param req
 * @param callback
 */
exports.myProject = function (req, callback) {
    var promise = new Promise(function (resolve, rej) {
        pool.getConnection(function (err, connection) {
            if (err) {
                console.log('与mysql数据库建立连接失败');
            } else {
                console.log('与mysql数据库建立连接成功');
                var selectSql = 'SELECT * from project where projectID=?';
                connection.query(selectSql, [req.session.project_id], function (err, result) {
                    if (err) {
                        console.log('查询数据失败');
                    }
                    console.log('查询数据');
                    exports.projectname = result[0].projectName;
                    exports.projectdesc = result[0].projectDesc;
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

/**
 * 获取等待分配的任务
 * @param req
 * @param callback
 */
exports.waitTasks = function (req, callback) {
    var promise = new Promise(function (resolve, rej) {
        pool.getConnection(function (err, connection) {
            if (err) {
                console.log('与mysql数据库建立连接失败');
            } else {
                console.log('与mysql数据库建立连接成功');
                //将未分配的任务取出
                var selectSql = 'SELECT * from task where projectID=? AND taskStaus=1';

                connection.query(selectSql, [req.session.project_id], function (err, result) {
                    if (err) {
                        console.log('查询数据失败');
                    }
                    console.log('查询数据');
                    console.log(result);
                    exports.waitTask = result;
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

/**
 * 获取已完成任务
 * @param req
 * @param callback
 */
exports.doneTasks = function (req, callback) {
    var promise = new Promise(function (resolve, rej) {
        pool.getConnection(function (err, connection) {
            if (err) {
                console.log('与mysql数据库建立连接失败');
            } else {
                console.log('与mysql数据库建立连接成功');
                //将未分配的任务取出
                var selectSql = 'SELECT task.*,member.memberName from task LEFT JOIN member on(task.memberID=member.memberID)' +
                    ' where projectID=? AND taskStaus=3 ORDER BY deadline desc limit 0,5';

                connection.query(selectSql, [req.session.project_id], function (err, result) {
                    if (err) {
                        console.log('查询数据失败');
                    }
                    console.log('查询数据');
                    console.log(result);
                    exports.doneTask = result;
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
/**
 * 点击加载更多已完成任务
 * @param req
 * @param callback
 */
exports.moreDoneTasks = function (req, callback) {
    var promise = new Promise(function (resolve, rej) {
        pool.getConnection(function (err, connection) {
            if (err) {
                console.log('与mysql数据库建立连接失败');
            } else {
                console.log('与mysql数据库建立连接成功');
                //将已分配的任务取出
                var selectSql = 'SELECT task.*,member.memberName from task LEFT JOIN member on(task.memberID=member.memberID)' +
                    ' where projectID=? AND taskStaus=3 ORDER BY deadline desc limit ?,5';

                connection.query(selectSql, [req.session.project_id,req.body.page_num * 5], function (err, result) {
                    if (err) {
                        console.log('查询数据失败');
                    }
                    console.log('查询数据');
                    console.log(result);
                    exports.moreDoneTask = result;
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

