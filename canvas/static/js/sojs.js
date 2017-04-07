        var roomid, userName;
        var socket = io.connect("/"); //加入默认区域。这个区域用于测试
        socket.on("connect", function() {
            //roomid = getQS("roomID");
            //userName=getQS("userName");
            roomid = 1;
            userName="system";
            var data = {
                roomID :roomid, userName : userName
            };
            socket.emit("joinRoom", data); //将会议房间号和自己的用户名发送给服务器
        });

        socket.on("dwing", function(data) {
            // console.log(data);
           lc.saveShape(LC.JSONToShape(data),false);//保存服务器发过来的图形 并且不再触发saveshape事件
          
        });
        socket.on('disconnect', function() {
            console.log("服务器断开连接");
        });
        socket.on('reconnect', function(data) {
            if (data) {
                lc.loadSnapshotJSON(data);
            }
            console.log("服务器已连接");
        });
        socket.on('connect', function(data) {
            if (data) {
                lc.loadSnapshotJSON(data);
            }
            console.log("服务器连接成功");
        });
        /**
        **事件类型：type:
        **1:缩放，2:前进redo，3:后退undo，4:清空
        **/
        socket.on('event', function(event) {
            switch(event.type)
            {
                case 1:
               // lc.zoom(event.data)
                break;
                case 2:
                lc.redo(true);//不触发redo事件
                break;
                case 3:
                lc.undo(true);//不触发undo事件
                break;
                case 4:
                lc.clear(true);//不触发clear事件
                break;
            }
        });
/*
        lc.on("zoom",function(oldScale, newScale){
            var event={type:1,data:newScale-oldScale};
            socket.emit("event",event);
        });
         lc.on("undo",function(){
            var event={type:3,data:null};
            socket.emit("event",event);
        });
        lc.on("redo",function(){
            var event={type:2,data:null};
            socket.emit("event",event);
        });
        lc.on("clear",function(){
            var event={type:4,data:null};
            socket.emit("event",event);
        });
        lc.on("shapeSave",function(shape){
            socket.emit("dwing",LC.shapeToJSON(shape.shape));
        });

*/