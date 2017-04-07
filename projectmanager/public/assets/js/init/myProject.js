/**
 * Created by lisam on 2016/11/23.
 */
    //渲染完自加载
window.onload = function () {
    /**
     * ①自动加载 未分配任务
     */
    $.ajax({   //自加载未完成任务
        type: "POST",  //提交方式
        url: "/myProject/waitTasks",//路径
        data: {},//数据，这里使用的是Json格式进行传输
        success: function (result) {//返回数据根据结果进行相应的处理
            console.log("下面是////");
            console.log(result);
            var data = result.tasks;
            if (result.tasks.length > 0) {     //*******注：这里需要自己定义！！！！！
                for (i in data) {
                    $(".assign-still").append('<div class="col-md-12 assign-task_' + i + '" style="margin-top: 10px"> ' +
                        '<div class="col-md-9"><textarea type="text" name="" class="form-control project-task-none"' +
                        ' style="background-color: #fff"' +
                        'placeholder="新的任务" readonly>' + data[i]['taskDesc'] + '</textarea> ' +
                        '</div><div class="col-md-3">' +
                        '<div class="col-md-6"><a href="/assignTask/' + data[i]['taskID'] + '"><button class="btn btn-success">分配任务</button></a></div> ' +
                        '<div class="col-md-6"><button class="btn btn-danger" onclick="delAssignTask('
                        + data[i]['taskID'] + ',' + i + ')">删除</button></div></div>' +
                        '</div>');
                }
            } else {
                $(".assign-still").append('' +
                    '<div class="col-md-12  project-lists" style="margin-top: 30px;margin-left: 10px">' +
                    '<span style="color: #ccc;">暂无未分配任务</span>' +
                    '</div>');
            }
        },
        error: function (err) {
            console.log(err);
        }
    });
    /**
     * 自动5条加载更多已完成任务
     */
    var page = 0;  //默认数据分页数为0
    $.ajax({   //自加载未完成任务
        type: "POST",  //提交方式
        url: "/myProject/doneTasks",//路径
        data: {
            page: page   //当前分页数
        },//数据，这里使用的是Json格式进行传输
        success: function (result) {//返回数据根据结果进行相应的处理
            console.log(result);
            var data = result.tasks;
            if (result.tasks.length > 0) {     //*******注：这里需要自己定义！！！！！
                for (i in data) {
                    var date = new Date(data[i].deadline);
                    var month_and_day = date.getMonth()+"/"+date.getDate();
                    var week = getCurrentWeek(date.getDay());
                    $(".project-tasks").append('<div class="col-md-12"> ' +
                        '<div class="col-md-2 text-left">' +
                        '<span class="project-date">' + month_and_day + '<span class="project-date2">' + week + '</span></span></div> ' +
                        '<div class="col-md-10"><div class="col-md-10 text-left project-task-name">' +
                        '' + data[i].taskDesc + '</div>' +
                        '<div class="col-md-2 project-task-worker">--- ' + data[i].memberName + '</div></div>' +
                        '<div class="col-md-12"><hr /></div></div>');
                }
            } else {
                $(".project-tasks").append('' +
                    '<div class="col-md-12  project-isntalling" style="margin-top: 30px;margin-left: 10px">' +
                    '<span style="color: #ccc;">暂无已完成任务</span>' +
                    '</div>');
            }
        },
        error: function (err) {
            console.log(err);
        }
    });
    /**
     * 转换星期数
     * @param num
     * @returns {*}
     */
    function getCurrentWeek(num) {
        switch (num) {
            case 0:
                return "周日";
            case 1:
                return "周一";
            case 2:
                return "周二";
            case 3:
                return "周三";
            case 4:
                return "周四";
            case 5:
                return "周五";
            case 6:
                return "周六";
            default:
                return "未知";
        }
    }
};
