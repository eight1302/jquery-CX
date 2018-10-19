//获取url参数
function GetQueryString(name) {
  var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if(r!=null)return  unescape(r[2]); return null;
}
//日期格式化
Date.prototype.Format = function (fmt) { //author: meizz
  var o = {
      "M+": this.getMonth() + 1, //月份
      "d+": this.getDate(), //日
      "h+": this.getHours(), //小时
      "m+": this.getMinutes(), //分
      "s+": this.getSeconds(), //秒
      "q+": Math.floor((this.getMonth() + 3) / 3), //季度
      "S": this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
      if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
};
// 给Date对象添加getYMD方法，获取字符串形式的年月日
Date.prototype.getYMD = function(){
  var retDate = this.getFullYear() + "-";  // 获取年份。
  retDate += fz(this.getMonth() + 1) + "-";    // 获取月份。
  retDate += fz(this.getDate());               // 获取日。
  return retDate;                          // 返回日期。
};
// 给String对象添加getDate方法，使字符串形式的日期返回为Date型的日期
String.prototype.getDate = function(){
  var strArr = this.split('-');
  return new Date(strArr[0], strArr[1] - 1, strArr[2]);
};
//补零
function fz(num) {return num<10?"0" + num:num;}
// 获取间隔天数
function getDays(day1, day2) {
  // 获取入参字符串形式日期的Date型日期
  var d1 = day1.getDate();
  var d2 = day2.getDate();
  // 定义一天的毫秒数
  var dayMilliSeconds  = 1000*60*60*24;
  // 获取输入日期的毫秒数
  var d1Ms = d1.getTime();
  var d2Ms = d2.getTime();
  // 定义返回值
  var ret;
  // 对日期毫秒数进行循环比较，直到d1Ms 大于等于 d2Ms 时退出循环
  // 每次循环结束，给d1Ms 增加一天
  for (d1Ms; d1Ms <= d2Ms; d1Ms += dayMilliSeconds) {
      // 如果ret为空，则无需添加","作为分隔符
      if (!ret) {
          // 将给的毫秒数转换为Date日期
          var day = new Date(d1Ms);
          // 获取其年月日形式的字符串
          ret = day.getYMD();
      } else {
          // 否则，给ret的每个字符日期间添加","作为分隔符
          var day = new Date(d1Ms);
          ret = ret + ',' + day.getYMD();
      }
  }
  return ret;
}
//获取月份间隔
function getMonth(a,b){
  var arr=[],ayear=a.split('-')[0],byear=b.split('-')[0],amonth=a.split('-')[1],bmonth=b.split('-')[1],n=0;
  if(byear-ayear==0){
      for(var i=amonth;i<=bmonth;i++){
          arr.push(byear+'-'+fM(i));
      }
  }else{
      n=byear-ayear;
      n=n*12;
      for(var j=amonth;j<n*bmonth;j++){
          if(j>12){
              ayear++;
              j=j-12;
          }
          if(ayear==byear&&j>bmonth){
              break;
          }
          arr.push(ayear+'-'+fM(j));
      }
  }
  return arr;

}
//获取前n天
function GetDay(n){
  n=n||1;
  var today=new Date();
  var yesterday_milliseconds=today.getTime()-1000*60*60*24;
  var yesterday_milliseconds1=today.getTime()-1000*60*60*24*n;
  var yesterday=new Date(yesterday_milliseconds),yesterday1=new Date(yesterday_milliseconds1);
  var strYear=yesterday.getFullYear(),strYear1=yesterday1.getFullYear();
  var strDay=yesterday.getDate(),strDay1=yesterday1.getDate();
  var strMonth=yesterday.getMonth()+ 1,strMonth1=yesterday1.getMonth()+1;
  if(strMonth<10)strMonth="0"+strMonth;
  if(strMonth1<10)strMonth1="0"+strMonth1;
  if(strDay<10)strDay='0'+strDay;
  if(strDay1<10)strDay1='0'+strDay1;
  return {
      "a":strYear+strMonth+strDay,
      "b":strYear+'-'+strMonth+'-'+strDay,
      "a1":strYear1+strMonth1+strDay1,
      "b1":strYear1+'-'+strMonth1+'-'+strDay1
  };
}
//得到第n的月份
function getNMonth(n){
  function fM(num){
      return num.toString().length<=1?'0'+num:num;
  }
  var date=new Date(),n1= 1,nyear=date.getFullYear(),nmonth='',
      prevMonth='',cc='';
  if(date.getDate()==1){n1=0;}
  nmonth=date.getMonth()+n1;
  if(n/12>=1){
      cc=nmonth+Math.floor(n/12)*12;
      nyear=nyear-Math.floor(n/12);
      prevMonth=cc-n;
  }
  return {
      prevMonth:nyear+'-'+fM(prevMonth),
      nextMonth:date.getFullYear()+'-'+fM(nmonth)
  }
}
function fM(num){return num.toString().length<=1?'0'+num:num;}

//月份格式
$('input.datePicker').datetimepicker({
  language:'zh-CN',
  format:"yyyy-mm",
  minView:'4',
  startView:'3',
  autoclose:true,
  pickerPosition:'right',
  keyboardNavigation:false
});
//日期格式
$('input.dateFormat').datetimepicker({
  language:'zh-CN',
  format:"yyyy-mm-dd",
  minView: "month",	//选择到日期
  autoclose:true,
  pickerPosition:'right',
  keyboardNavigation:false
});

