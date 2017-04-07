var mysql = require('mysql');
var databases = require("./common/db");
//使用连接池连接数据库
var pool = mysql.createPool(databases.config);

/**
 * 获取本周的数据
 * @param req
 * @param callback
 */
exports.getWeeklys = function (req, callback) {
    var promise = new Promise(function (resolve, rej) {
        pool.getConnection(function (err, connection) {
            if (err) {
                console.log('与mysql数据库建立连接失败');
            } else {
                console.log('与mysql数据库建立连接成功');
                var selectSql = "SELECT weekly.*,member.memberName FROM weekly LEFT JOIN member on(weekly.memberID=" +
                    "member.memberID) WHERE (YEARWEEK(date_format(created_at,'%Y-%m-%d')) = YEARWEEK(now()))" +
                    " ORDER BY created_at asc";
                connection.query(selectSql, [req.session.user], function (err, result) {
                    if (err) {
                        console.log('插入数据失败');
                    }
                    console.log(result);
                    exports.weeklyDatas = result;
                    exports.currentDate = new Date();
                    //关闭连接池
                    connection.release();
                    resolve(result);
                });
            }
        });
    });
    promise.then(function () {
        callback();
    })
};

/**
 * 获取其他周数据
 * @param req
 * @param callback
 */
exports.getAnotherWeeklys = function (req, callback) {
    var promise = new Promise(function (resolve, rej) {
        pool.getConnection(function (err, connection) {
            if (err) {
                console.log('与mysql数据库建立连接失败');
            } else {
                console.log('与mysql数据库建立连接成功');
                var currentNum = req.body.current>=0?("+"+req.body.current):(""+req.body.current);
                console.log(currentNum);
                var selectSql = "SELECT weekly.*,member.memberName FROM weekly LEFT JOIN member on(weekly.memberID=" +
                    "member.memberID) WHERE (YEARWEEK(date_format(created_at,'%Y-%m-%d')) = YEARWEEK(now())"
                    + currentNum + ") ORDER BY created_at asc";
                console.log(selectSql);
                connection.query(selectSql, [req.session.user], function (err, result) {
                    if (err) {
                        console.log('插入数据失败');
                    }
                    console.log(result);
                    if(req.body.current > 0) {  //防止查询过程中超过本周导致全部数据出来
                        exports.anotherWeeklys = [];
                    }else{
                        exports.anotherWeeklys = result;
                    }
                    //关闭连接池
                    connection.release();
                    resolve(result);
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