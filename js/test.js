/**
 * 初始化路由
 */
$(function(){
//设置路由配置
var routerOptions = {
    //配置路由的格式
    "/page/:pageName": {
        //路由配置成功后调用的方法
        on: mainRouter
    }
};
//声明一个routeInstance 对象
var routeInstance = new Router(routerOptions).configure({
    //触发on方法之前执行的方法
    before: function (param = undefined) {
        console.log('before - ' + param);
    },
    after: function (param = undefined) {
        console.log('after - ' + param);
    }
});
//调用init()进行初始化
routeInstance.init();

bindEvent()
//window.location.hash是只得不到完整的连接，会在前面加一个#
var hash = window.location.hash;
if(hash === '' || hash === '#/') {
    window.location.hash = '#/page/demo1';
}
})

/**
 * 配置路由调用的回调函数
 */
function mainRouter(pageName){
    console.log(pageName)
    //url是路由的格式
    var url = 'pages/'+pageName+".html";
    //将页面属性pageName是指页面名
    var curMenuItem = $('[data-href="'+pageName+'"]');
    //增加样式属性，使用sibings（）方法返回到被选的所有同级元素
    curMenuItem.addClass("active").siblings().removeClass("active");
    //调用加载页面方法
    loadRouter(url)
}
/**
 * 绑定页面单击事件
 */
function bindEvent() {
    //根据页面属性menu-wray li 绑定事件
    $(".menu-wrap li").off("click").on("click", function() {
        // 找到当前的href路径
        var href = $(this).data("href");
        window.location.hash = '#/page/'+href;
         
    })

}
/**
 * 全局变量
 */
var globalV = {
    routerSelector: $("#content")
}
/**
 * 使用ajax加载html到某个元素中，url是指需要加载的页面地址，theContainer是显示在哪个dom对象里
 */
function loadRouter(url,theContainer){
    theContainer  = theContainer || globalV.routerSelector;
    //将theContainer移除
    theContainer.empty();
    $.ajax({
        type: "GET",
        url: url,
        dataType: "html",
        cache:false,
        beforeSend: function() {
            theContainer.html(
              '<h3><i class="iconfont icon-loading loading"></i> 正在加载，请稍后...</h3>'
            );
            if (theContainer) {
              //设置匹配元素的滚动条的垂直位置
              $(window).scrollTop(0);
              //显示透明
              theContainer.css({ opacity: 0 });
            }
          },
        success: function (data) {
            //加载一个动画
            theContainer.html(data).animate(
                {
                  opacity: 1
                },
                500,
                "swing"
              );
              theContainer = null;
        },
        error: function(xhr, ajaxOptions, thrownError) {
            theContainer
              .html(
                '<h4 style="padding:70px 40px 0 40px; display:block; text-align:left"><i class="iconfont icon-alarm"></i> 出错啦 404！ 没有发现指定的页面。</h4>'
              )
              .animate(
                {
                  opacity: 1
                },
                500,
                "swing"
              );
            theContainer = null;
          },
          async: false
    });
}