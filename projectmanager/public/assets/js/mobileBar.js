/**
 * Created by 迪山 on 2016/11/6.
 * 处理手机适配问题
 */
window.onload = function() {
    var clientWidth =document.documentElement.clientWidth;
    if(clientWidth < 995) {
        $("header").attr("class", "navbar navbar-default navbar-fixed-top text-left");
        //$("header li").css("margin-left","20px");
        $("header").css("padding-left","20px");
        $("header").css("padding-top", "10px");
        $(".fadeInDown").prepend("<div class='col-md-12' style='height: 47px;'>&nbsp;</div>");
    }
};
