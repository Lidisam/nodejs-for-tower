var mysql = require('mysql');
var databases = require("./common/db");
//使用连接池连接数据库  
var pool = mysql.createPool(databases.config);


/**
 * 获得待处理任务及其他信息
 * @param req
 * @param callback
 */
exports.getWaitTasks = function (req, callback) {
    var promise = new Promise(function (resolve, rej) {
        pool.getConnection(function (err, connection) {
            if (err) {
                console.log('与mysql数据库建立连接失败');
            } else {
                var selectSql = 'SELECT * from project where projectID=?';
                connection.query(selectSql, [req.session.project_id], function (err, result) {
                    if (err) {
                        console.log('查询数据失败');
                    }
                    console.log('查询数据');
                    exports.projectname = result[0].projectName;
                    exports.projectdesc = result[0].projectDesc;
                    //关闭连接池
                    resolve(result);
                });
                selectSql = 'SELECT taskID as total from task where projectID=?';
                connection.query(selectSql, [req.session.project_id], function (err, result) {
                    if (err) {
                        console.log('查询数据失败');
                    }
                    console.log(result.total);
                    exports.totalProjectNum = result;
                    //关闭连接池
                    resolve(result);
                });
                selectSql = 'SELECT * from task where projectID=? AND taskStaus=2';
                connection.query(selectSql, [req.session.project_id], function (err, result) {
                    if (err) {
                        console.log('查询数据失败');
                    }
                    console.log('查询数据');
                    console.log(result);
                    exports.waitTask = result;
                    //当一个连接不需要使用时，将其归还到连接池中
                    exports.tasks = result;
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
/**
 * 确认任务完成
 * @param req
 * @param callback
 */
exports.confirmTask = function (req, callback) {
    var promise = new Promise(function (resolve, rej) {
        pool.getConnection(function (err, connection) {
            if (err) {
                console.log('与mysql数据库建立连接失败');
            } else {
                var selectSql = 'UPDATE task SET taskStaus=3 WHERE taskID=?';
                console.log(req.body.task_id);
                connection.query(selectSql, [req.body.task_id], function (err, result) {
                    if (err) {
                        console.log('查询数据失败');
                        exports.confirmCode = 0;
                    } else {
                        //关闭连接池
                        connection.release();
                        resolve(result);
                        exports.confirmCode = 1;
                    }
                });
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