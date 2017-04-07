var http = require('http');
var express = require('express');
var sio = require('socket.io');

var app =  express();   //调用express对象
var server = http.createServer(app);
app.get('/', function(req, res){
	res.sendFile(__dirname+'/index.html');
});
//监听
server.listen(1338);
var io = sio.listen(server);
var names = [];
io.sockets.on('connection', function (socket){
	socket.on('login', function(name) {
		for(var i = 0; i < names.length; i++) {
			if(names[i] == name) {
				//检查名字是否出现重复
				socket.emit('duplicate');
				return;
			}
		}
		names.push(name);
		io.sockets.emit('login', name);
		io.sockets.emit('sendClients', names);
	});
	socket.on('chat', function (data){
		io.sockets.emit('chat', data);
	});
	socket.on('logout', function(name){
		for(var i = 0; i < names.length; i++){
			if(names[i] == name){
				names.splice(i,1);
				break;
			}	
		}
		//进行信息广播
		socket.broadcast.emit('logout', name);
		io.sockets.emit('sendClients', names);		
	});
});