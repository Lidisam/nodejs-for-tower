var express = require('express'),
    app = new express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server);

server.listen(80);
app.use(express.static(__dirname + "/static"));

var nowDrw = null;
var onlineUser=new Array();
io.sockets.on('connection', function(socket) {
	var roomid;

    socket.on('joinRoom', function(data) {
    	roomid="first";//保存房间号,url解码
    	socket.nowUser=data.userName;//解码后将当前会话的用户存储在socket上。
        socket.join(roomid); //加入客户端发来的房间
        console.log(1111);
    });

    if (!nowDrw) {//如果已经有人画了东西就发给他
        socket.to(roomid).emit('dStart', nowDrw);
    }

    socket.on('dwing', function(data) {
        socket.broadcast.to(roomid).emit("dwing", data);
    });
    socket.on('event', function(event) {
        /**
        **事件类型：type:
        **1:缩放，2:前进redo，3:后退undo，4:清空
        **data:缩放级别
        **/
        socket.broadcast.to(roomid).emit("event",event);
        console.log("client send some event type:"+event.type);
    });
});
