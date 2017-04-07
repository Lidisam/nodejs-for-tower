var mysql = require('mysql');
var databases = require("./common/db");
//使用连接池连接数据库  
var pool = mysql.createPool(databases.config);
/**
 * 添加周报
 * @param req
 * @param res
 * @param next
 */
exports.addWeekly = function (req, res, next) {
    var promise = new Promise(function (resolve, rej) {
        pool.getConnection(function (err, connection) {
            if (err) {
                console.log('与mysql数据库建立连接失败');
            } else {
                console.log('与mysql数据库建立连接成功');
                var selectSql = 'insert into weekly set ?';
                console.log("当前用户id:"+req.session.user);
                connection.query(selectSql, {
                    lastweek: req.body.lastweek,
                    nextweek: req.body.nextweek,
                    memberID: req.session.user   //当前用户的id
                },
                function (err, result) {
                    if (err) {
                        console.log('插入数据失败');
                    }
                    else {
                        console.log('插入数据成功');
                    }
                    //  function() 
                    connection.release();
                    //关闭连接池  
                    resolve(result);
                })
            }
        });
    });
    promise.then(function (result) {
        if (result.length != 0) {
            res.send(result.insertId.toString());
        } else {
            res.send("err");
        }
    })
};
/**
 * 获取该用户未完成(待处理)的任务
 * @param req
 * @param callback
 */
exports.getTasks = function (req, callback) {
    var promise = new Promise(function (resolve, rej) {
        pool.getConnection(function (err, connection) {
            if (err) {
                console.log('与mysql数据库建立连接失败');
            } else {
                console.log('与mysql数据库建立连接成功');
                var selectSql = "SELECT task.*,project.projectName FROM task LEFT JOIN project on (task.projectID=" +
                    "project.projectID) WHERE taskStaus=2 AND memberID=?";
                connection.query(selectSql, [req.session.user], function (err, result) {
                    if (err) {
                        console.log('查询数据成功');
                    }
                    else {
                        console.log('查询数据成功');
                    }
                    console.log(result);
                    exports.taskMsgs = result;
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