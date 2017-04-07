var mysql = require('mysql');
var databases = require("./common/db");
//使用连接池连接数据库  
var pool = mysql.createPool(databases.config);

/**
 * 获取该用户未完成(待处理)的任务
 * @param req
 * @param callback
 */
exports.getProjectMsgs = function (req, callback) {
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
                    //关闭连接池
                    resolve(result);
                });
                selectSql = "SELECT projectID,projectName,projectDesc FROM project WHERE projectID=?";
                connection.query(selectSql, [req.session.project_id], function (err, result) {
                    if (err) {
                        console.log('查询数据成功');
                    }
                    else {
                        console.log('查询数据成功');
                    }
                    console.log(result);
                    exports.projectMsgs = result;
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