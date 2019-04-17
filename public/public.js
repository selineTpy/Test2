//获取格式化日期
Date.prototype.Format = function(fmt) {
    var week = ['日', '一', '二', '三', '四', '五', '六'];
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "w+": "星期" + week[this.getDay()], //星期
        "z+": "周" + week[this.getDay()], //星期
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
  };
/**
 * 正则格式替换
 */
  template.helper("format", function(jsonStr, value) {
    console.log(jsonStr,value)
    var obj = JSON.parse(jsonStr);
  
    if (obj.type == "format_week") {
      return new Date(value).Format("z");
    } else if (obj.type == "timestring") {
      return new Date(value).Format(obj.format);
    } /*else if (obj.type == "enum") {
      for (var i in obj.list) {
        if (i == value) {
          return obj.list[i];
        }
      }
    }*/
     else if (obj.type == "timestamp") {
      obj.format = obj.format ? obj.format : "yyyy/MM/dd hh:mm:ss";
      return value ? new Date(parseInt(value) * 1000).Format(obj.format) : "";
    } else if (obj.type === "duration") {
      var nowTime = parseInt(new Date().getTime() / 1000);
      return formatterAeduration(value, nowTime);
    }
  });