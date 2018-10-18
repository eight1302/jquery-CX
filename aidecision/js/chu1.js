/**
 * Created by chushitong on 2017/11/2.
 */
var brandWrap = {};
(function(){
    var arr = [{"id":"8a9b78ee5fc81949015fc936ff7a0003","level":"1","name":"美容护理","account":"可人美化妆品专营店","pid":null,"cids":"0","cid":"1","rcid":"2011010113"},{"id":"8a9b78ee5fc81949015fc93b00da0004","level":"2","name":"美容护肤/美体/精油","account":"可人美化妆品专营店","pid":"1","cids":"0","cid":"1801","rcid":"2011010113"},{"id":"8a9b78ee5fc81949015fc93b54860005","level":"2","name":"美发护发/假发","account":"可人美化妆品专营店","pid":"1","cids":"0","cid":"50023282","rcid":"2011010113"},{"id":"8a9b78ee5fc81949015fc93d76380006","level":"3","name":"洁面","account":"可人美化妆品专营店","pid":"1801","cids":"0","cid":"50011977","rcid":"2011010113"},{"id":"8a9b78ee5fc81949015fc93da2590007","level":"3","name":"化妆水/爽肤水","account":"可人美化妆品专营店","pid":"1801","cids":"0","cid":"50011978","rcid":"2011010113"},{"id":"8a9b78ee5fc81949015fc93dd0030008","level":"3","name":"乳液/面霜","account":"可人美化妆品专营店","pid":"1801","cids":"0","cid":"50011980","rcid":"2011010113"},{"id":"8a9b78ee5fc81949015fd85d2ecd000a","level":"3","name":"面部精华","account":"可人美化妆品专营店","pid":"1801","cids":"0","cid":"50011979","rcid":"2011010113"},{"id":"8a9b78ee5fc81949015fd85d5d6c000b","level":"3","name":"防晒","account":"可人美化妆品专营店","pid":"1801","cids":"0","cid":"50011982","rcid":"2011010113"},{"id":"8a9b78ee5fc81949015fd85d87d1000c","level":"3","name":"卸妆","account":"可人美化妆品专营店","pid":"1801","cids":"0","cid":"50011990","rcid":"2011010113"},{"id":"8a9b78ee5fc81949015fd85daa2a000d","level":"3","name":"其他保养","account":"可人美化妆品专营店","pid":"1801","cids":"0","cid":"50011991","rcid":"2011010113"},{"id":"8a9b78ee5fc81949015fe38427650010","level":"3","name":"精油芳疗","account":"可人美化妆品专营店","pid":"1801","cids":"0","cid":"50011992","rcid":"2011010113"},{"id":"8a9b78ee5fc81949015fe384578e0011","level":"3","name":"面部护理套装","account":"可人美化妆品专营店","pid":"1801","cids":"0","cid":"50011993","rcid":"2011010113"},{"id":"8a9b78ee5fc81949015fe38484630012","level":"3","name":"面部按摩霜","account":"可人美化妆品专营店","pid":"1801","cids":"0","cid":"50011996","rcid":"2011010113"},{"id":"8a9b78ee5fc81949015fe384b3a60013","level":"3","name":"面部磨砂/去角质","account":"可人美化妆品专营店","pid":"1801","cids":"0","cid":"50011997","rcid":"2011010113"},{"id":"8a9b78ee5fc81949015fe384dc5c0014","level":"3","name":"胸部护理（新）","account":"可人美化妆品专营店","pid":"1801","cids":"0","cid":"121366011","rcid":"2011010113"},{"id":"8a9b78ee5fc81949015fe38505410015","level":"3","name":"男士护理（新）","account":"可人美化妆品专营店","pid":"1801","cids":"0","cid":"121368010","rcid":"2011010113"},{"id":"8a9b78ee5fc81949015fe3852e420016","level":"3","name":"面膜（新）","account":"可人美化妆品专营店","pid":"1801","cids":"0","cid":"121390006","rcid":"2011010113"},{"id":"8a9b78ee5fc81949015fe38557780017","level":"3","name":"手部保养（新）","account":"可人美化妆品专营店","pid":"1801","cids":"0","cid":"121390007","rcid":"2011010113"},{"id":"8a9b78ee5fc81949015fe3857a3e0018","level":"3","name":"T区护理（新）","account":"可人美化妆品专营店","pid":"1801","cids":"0","cid":"121408009","rcid":"2011010113"},{"id":"8a9b78ee5fc81949015fe3859ff10019","level":"3","name":"唇部护理（新）","account":"可人美化妆品专营店","pid":"1801","cids":"0","cid":"121448009","rcid":"2011010113"},{"id":"8a9b78ee5fc81949015fe385c16b001a","level":"3","name":"眼部护理（新）","account":"可人美化妆品专营店","pid":"1801","cids":"0","cid":"121454013","rcid":"2011010113"},{"id":"8a9b78ee5fc81949015fe385e3b2001b","level":"3","name":"身体护理（新）","account":"可人美化妆品专营店","pid":"1801","cids":"0","cid":"121466009","rcid":"2011010113"},{"id":"8a9b78ee5fc81949015fe3860723001c","level":"3","name":"足部护理","account":"可人美化妆品专营店","pid":"1801","cids":"0","cid":"122430002","rcid":"2011010113"},{"id":"8a9b78ee5fc81949015fe3863669001d","level":"3","name":"旅行装/体验装","account":"可人美化妆品专营店","pid":"1801","cids":"0","cid":"125178006","rcid":"2011010113"},{"id":"8a9b78ee5fc81949015fe38668e7001e","level":"3","name":"假发","account":"可人美化妆品专营店","pid":"50023282","cids":"0","cid":"50023283","rcid":"2011010113"},{"id":"8a9b78ee5fc81949015fe38686d0001f","level":"3","name":"头发造型","account":"可人美化妆品专营店","pid":"50023282","cids":"0","cid":"50023293","rcid":"2011010113"},{"id":"8a9b78ee5fc81949015fe386a3af0020","level":"3","name":"染发烫发","account":"可人美化妆品专营店","pid":"50023282","cids":"0","cid":"50023294","rcid":"2011010113"},{"id":"8a9b78ee5fc81949015fe386c8070021","level":"3","name":"洗发水","account":"可人美化妆品专营店","pid":"50023282","cids":"0","cid":"121396029","rcid":"2011010113"},{"id":"8a9b78ee5fc81949015fe386e63e0022","level":"3","name":"护发","account":"可人美化妆品专营店","pid":"50023282","cids":"0","cid":"121410029","rcid":"2011010113"},{"id":"8a9b78ee5fc81949015fe38705900023","level":"3","name":"洗护套装","account":"可人美化妆品专营店","pid":"50023282","cids":"0","cid":"121476023","rcid":"2011010113"},{"id":"8a9b78ee5fc81949015fe387241c0024","level":"3","name":"假发配件","account":"可人美化妆品专营店","pid":"50023282","cids":"0","cid":"122438002","rcid":"2011010113"},{"id":"8a9b78ee612c019e0161e49eeb5c003a","level":"1","name":"家居用品","account":"北京润合美","pid":null,"cids":"0","cid":"1","rcid":"2011010115"},{"id":"8a9b78ee612c019e0161e49eeb9f003b","level":"2","name":"洗护清洁剂/卫生巾/纸/香薰","account":"北京润合美","pid":"1","cids":"0","cid":"50025705","rcid":"2011010115"},{"id":"8a9b78ee612c019e0161e49eebbf003c","level":"3","name":"家居用品","account":"北京润合美","pid":"2","cids":"0","cid":"2165","rcid":"2011010115"},{"id":"8a9b78ee612c019e0161e49eebe0003d","level":"3","name":"驱虫用品","account":"北京润合美","pid":"2","cids":"0","cid":"210207","rcid":"2011010115"},{"id":"8a9b78ee612c019e0161e49eebff003e","level":"3","name":"纸品/湿巾","account":"北京润合美","pid":"2","cids":"0","cid":"50012473","rcid":"2011010115"},{"id":"8a9b78ee612c019e0161e49eec1e003f","level":"3","name":"家庭环境清洁剂","account":"北京润合美","pid":"2","cids":"0","cid":"50012487","rcid":"2011010115"},{"id":"8a9b78ee612c019e0161e49eec3e0040","level":"3","name":"卫生巾/护垫/成人尿裤","account":"北京润合美","pid":"2","cids":"0","cid":"50016889","rcid":"2011010115"},{"id":"8a9b78ee612c019e0161e49eec5b0041","level":"3","name":"室内除臭/芳香用品","account":"北京润合美","pid":"2","cids":"0","cid":"50018960","rcid":"2011010115"},{"id":"8a9b78ee612c019e0161e49eec7a0042","level":"3","name":"家私/皮具护理品","account":"北京润合美","pid":"2","cids":"0","cid":"50018971","rcid":"2011010115"},{"id":"8a9b78ee612c019e0161e49eec980043","level":"3","name":"衣物清洁剂/护理剂","account":"北京润合美","pid":"2","cids":"0","cid":"50018975","rcid":"2011010115"},{"id":"8a9b78ee612c019e0161e49eecb70044","level":"3","name":"面膜/眼膜","account":"北京润合美","pid":"2","cids":"0","cid":"50022679","rcid":"2011010115"},{"id":"8a9b78ee612c019e0161e49eecd60045","level":"3","name":"口腔护理","account":"北京润合美","pid":"2","cids":"0","cid":"50448024","rcid":"2011010115"},{"id":"8a9b78ee612c019e0161e49eecf50046","level":"3","name":"面部清洁/护理","account":"北京润合美","pid":"2","cids":"0","cid":"50448025","rcid":"2011010115"},{"id":"8a9b78ee612c019e0161e49eed130047","level":"3","name":"身体护理","account":"北京润合美","pid":"2","cids":"0","cid":"50456019","rcid":"2011010115"},{"id":"8a9b78ee612c019e0161e49eed340048","level":"3","name":"身体清洁","account":"北京润合美","pid":"2","cids":"0","cid":"50458018","rcid":"2011010115"},{"id":"8a9b78ee612c019e0161e49eed530049","level":"3","name":"其他","account":"北京润合美","pid":"2","cids":"0","cid":"50460022","rcid":"2011010115"},{"id":"8a9b78ee612c019e0161e49eed72004a","level":"3","name":"头发清洁/护理/造型","account":"北京润合美","pid":"2","cids":"0","cid":"50464015","rcid":"2011010115"}];
    for(var i =0;i<arr.length;i++){
        brandWrap[arr[i].cid]={
            "level":arr[i].level,
            "name":arr[i].name,
            "cid":arr[i].cid,
            "pid":arr[i].pid
        }
    }
})();
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

(function(){
    //用来判断是否切换 表格 折线图
    //用来判断是否是展示图表
    var chuFlag='table',allChuFlag='table',allFlag=true,
    //用来在图表是选了几次多选，目前是只能多选两项 日期也只能选择一天/月
        chuNum= 0,
        dataChach={},//缓存得到的条件数据;
         //用来存储首次加载渲染到页面的元素
        dataS={
            supplier_code:[],
            ditch_code:[],
            brand_code:[],
            shop_code:[]
        },
        //用来存储点击搜索条件后添加到页面的元素
        dataS1={
            supplier_code:[],
            ditch_code:[],
            brand_code:[],
            shop_code:[]
        },
        //点击搜索条件 发送给后台的参数
        queryDataCommon={
            "conditions": [
                {"name": "brand_code", "condition": "!=", "values": ["all"]},
                {"name": "supplier_code", "condition": "!=", "values": ["all"]},
                {"name": "shop_code", "condition": "!=", "values": ["all"]},
                {"name": "ditch_code", "condition": "!=", "values": ["all"]}
            ]
        },
        //表格中表头和id参数
    tableData={
        "supplier_code":{
            "dataFlag":"supplier_code",
            "value":'公司',
            "dataNum":1,
            "flag":0,
            "data":[]
        },
        "ditch_code":{
            "dataFlag":"ditch_code",
            "value":'渠道',
            "dataNum":1,
            "flag":0,
            "data":[]
        },
        "brand_code":{
            "dataFlag":"brand_code",
            "value":'品牌',
            "dataNum":1,
            "flag":0,
            "data":[]
        },
        "shop_code":{
            "dataFlag":"shop_code",
            "value":'仓库/店铺',
            "dataNum":1,
            "flag":0,
            "data":[]
        },
        "goodsId":{
            "dataFlag":"goodsId",
            "value":'单品',
            "goodsIdVal":'',
            "dataNum":1,
            "flag":0,
            "data":[]
        },
        "data_date":{
            "dataFlag":"data_date",
            "value":"时间",
            "dataNum":2,
            "start":0,
            "end":0,
            "flag":0,
            "num":0,
            "data":[]
        },
        "dateDemosion":{
            "start":0,
            "end":0,
            "num":0,
            "dataNum":2,
            "flag":0,
            "data":[]
        },
        "customer_code":{
            "dataFlag":"customer_code",
            "value":"区域/类目",
            "dataNum":1,
            "flag":0,
            "data":[]
        },
        "flow":{
            "dataFlag":"flow",
            "value":"查询数据",
            "dataNum":0,
            "flag":0,
            "data":[]
        }
    };
    var dimensionData={
        "公司":"supplier_code",
        "渠道":"ditch_code",
        "品牌":"brand_code",
        "仓库/店铺":"shop_code",
        "区域/类目":"customer_code",
        "年度":"data_date",
        "月份":"data_date",
        "日期":"data_date"
    };
    //查询时的查询参数
    var queryData={
        "fields":[],
        "conditions":[
            {"name":"supplier_code","condition":"=","values":["all"]},
            {"name":"brand_code","condition":"=","values":["all"]},
            {"name":"shop_code","condition":"=","values":["all"]},
            {"name":"ditch_code","condition":"=","values":["all"]},
            {"name":"customer_code","condition":"=","values":["all"]},
            {"name":"data_date","condition":"BETWEEN","values":["all"]}
        ],
        "dimensions":[],
        "sorts":[],
        "type":1
    };
    //用来存储查询参数 type 类型
    var fieldsData=[],fieldscheck=[],
        flowcheckboxheader=[],flowcheckboxheader1=[],
        flowcheckboxheaderName=[],flowcheckboxheaderName1=[],
        flowType=[],flowType1=[];
    var searchFilter=$('#search-filter'),navBar=$('#navBar'),searchData=$('#search-data'),
        dimension=$('#Dimension'),timeSelect=$('#timeSelect'),goodsId=$('#goodsId'),
        clickQuery=$('#clickQuery'),
        exgoods=$('#exgoods');//爆款按钮;
    ///用于显示非时间的维度
    var arrList={
        supplier_code:[],
        ditch_code:[],
        brand_code:[],
        shop_code:[]
    };
    var prevBrandData=[];
    SearchData();
//接受后台的传来的搜索条件，筛选
    function SearchData(){
        $.ajax({
            url:'/maochao/aidecision/rest/getDictionaryRelation.json',
            contentType: "application/json;charset=utf-8",
            type:"POST",
            dataType: 'json',
            async:false,
            success:function(data){
                dataChach=data.data;
                var insideData={};
                $.extend(true,insideData,dataChach);
                supplier_codeF(insideData);
            }
        });
    }
//公司下面的
    function supplier_codeF(data){
        dataS.supplier_code.length=0;
        dataS.ditch_code.length=0;
        dataS.brand_code.length=0;
        dataS.shop_code.length=0;
        var flag=true;
        var supplier_code=data.companys;
        for(var i=0;i<supplier_code.length;i++){
            if(supplier_code[i]!=null){
                if(dataS.supplier_code.length==0){
                    dataS.supplier_code.push({"name":supplier_code[i].name,"value":supplier_code[i].value});
                }else{
                    for(var j=0;j<dataS.supplier_code.length;j++){
                        if(dataS.supplier_code[j]['name']==supplier_code[i]['name']){
                            flag=false;
                        }
                    }
                    if(flag){
                        dataS.supplier_code.push({"name":supplier_code[i].name,"value":supplier_code[i].value});
                    }
                }
                ditchF(supplier_code[i].ditchs);
            }
        }
        queryReload(dataS);
    }
//渠道下面的
    function ditchF(data){
        var ditchs=data;
        for(var i1=0;i1<ditchs.length;i1++){
            if(ditchs[i1]!=null){
                var flag=true;
                if(dataS.ditch_code.length==0){
                    dataS.ditch_code.push({"name":ditchs[i1].name,"value":ditchs[i1].value});
                }else{
                    for(var a1=0;a1<dataS.ditch_code.length;a1++){
                        if(dataS.ditch_code[a1].name==ditchs[i1]['name']){
                            flag=false;
                        }
                    }
                    if(flag){
                        dataS.ditch_code.push({"name":ditchs[i1].name,"value":ditchs[i1].value});
                    }
                }
                brand_codeF(ditchs[i1].brands);
            }
        }
    }
//品牌下面的
    function brand_codeF(data){
        var brand_code=data;
        for(var i2=0;i2<brand_code.length;i2++){
            if(brand_code[i2]!=null){
                var flag1=true;
                if(dataS.brand_code.length==0){
                    dataS.brand_code.push({"name":brand_code[i2].name,"value":brand_code[i2].value});
                }else{
                    for(var a2=0;a2<dataS.brand_code.length;a2++){
                        if(dataS.brand_code[a2]['name']==brand_code[i2]['name']){
                            flag1=false;
                        }
                    }
                    if(flag1){
                        dataS.brand_code.push({"name":brand_code[i2].name,"value":brand_code[i2].value});
                    }
                }
                wareHousesF(brand_code[i2].warehouses);
            }
        }
    }
//仓库的
    function wareHousesF(data){
        var warehouses=data;
        for(var i3=0;i3<warehouses.length;i3++){
            if(warehouses[i3]!=null){
                var flag2=true;
                if(dataS.shop_code.length==0){
                    dataS.shop_code.push({"name":warehouses[i3].name,"value":warehouses[i3].value});
                }else{
                    for(var a3=0;a3<dataS.shop_code.length;a3++){
                        if(dataS.shop_code[a3]['name']==warehouses[i3]['name']){
                            flag2=false;
                        }
                    }
                    if(flag2){
                        dataS.shop_code.push({"name":warehouses[i3].name,"value":warehouses[i3].value});
                    }
                }
            }
        }
    }
    //点击搜索条件筛选相应数据
    function commonData(key,data,categary,headerName){
        var con=queryDataCommon.conditions;
        for(var i=0;i<con.length;i++){
            if(con[i]['name']==key){
                con[i].values.length=0;
                if(!data){
                    con[i].condition='!=';
                    con[i].values.push('all');
                }else if(typeof data=='string'){
                    con[i].condition='=';
                    con[i].values.push(data);
                }else{
                    con[i].condition='IN';
                    for(var j=0;j<data.length;j++){
                        con[i].values.push(data[j]);
                    }
                }
            }
        }
        $.ajax({
            "url":"/maochao/aidecision/rest/dimensionalityRelation.json",
            "type":"POST",
            dataType: 'json',
            async:false,
            contentType: "application/json;charset=utf-8",
            data:JSON.stringify(queryDataCommon),
            success:function(data){
                dataS1={
                    supplier_code:[],
                    ditch_code:[],
                    brand_code:[],
                    shop_code:[]
                };
                for(var key in dataS){
                    var key1=data[key+'Set'];
                    for(var i=0;i<key1.length;i++){
                        for(var j=0;j<dataS[key].length;j++){
                            if(key1[i]==dataS[key][j]['name']){
                                dataS1[key].push(dataS[key][j]);
                            }
                        }
                    }
                }
                queryReload(dataS1,categary,headerName);
            },
            error:function(){}
        });
    }
//用来控制那个搜索条件刷新
    function queryReload(data,categary,headerName){
        arrList={
            supplier_code:[],
            ditch_code:[],
            brand_code:[],
            shop_code:[]
        };
        var searchData=$('#search-data');
        function supplierF(){
            var str='';
            var supplier_code=searchData.find('div.supplierId');
            var supplier_codehtml=data.supplier_code;
            for(var i=0;i<supplier_codehtml.length;i++){
                str+='<a href="javascript:;" class="c-item" data-header="'+ supplier_codehtml[i].value +'" data-header-name="'+ supplier_codehtml[i].name +'" data-flag="supplier_code"><input type="checkbox" data-flag="true" class="hide checkbox1"/><span>'+ supplier_codehtml[i].value +'</span></a>';
                arrList.supplier_code.push({name:supplier_codehtml[i].name,value:supplier_codehtml[i].value});
            }
            str+='<p class="remind hide1"><a href="javascript:;" class="assured">确定</a><a href="javascript:;" class="cancel">取消</a> </p>';
            supplier_code.html(str);
        }
        function ditchF(){
            var str='';
            var ditch_code=searchData.find('div.ditchId');
            var brand_codehtml=data.ditch_code;
            for(var i=0;i<brand_codehtml.length;i++){
                str+='<a href="javascript:;" class="c-item" data-header="'+ brand_codehtml[i].value +'" data-header-name="'+ brand_codehtml[i].name +'" data-flag="ditch_code"><input type="checkbox" data-flag="true" class="hide checkbox1"/><span>'+ brand_codehtml[i].value +'</span></a>';
                arrList.ditch_code.push({name:brand_codehtml[i].name,value:brand_codehtml[i].value});
            }
            str+='<p class="remind hide1"><a href="javascript:;" class="assured">确定</a><a href="javascript:;" class="cancel">取消</a> </p>';
            ditch_code.html(str);
        }
        function storeF(){
            var str='';
            var shop_code=searchData.find('div.store_warehouse');
            var storewarehousehtml=data.shop_code;
            for(var i=0;i<storewarehousehtml.length;i++){
                str+='<a href="javascript:;" class="c-item" data-header="'+ storewarehousehtml[i].value +'" data-header-name="'+ storewarehousehtml[i].name +'" data-flag="shop_code"><input type="checkbox" data-flag="true" class="hide checkbox1"/><span>'+ storewarehousehtml[i].value +'</span></a>';
                arrList.shop_code.push({name:storewarehousehtml[i].name,value:storewarehousehtml[i].value});
            }
            str+='<p class="remind hide1"><a href="javascript:;" class="checkAll">全选</a> <a href="javascript:;" class="assured">确定</a><a href="javascript:;" class="cancel">取消</a> </p>';
            shop_code.html(str);
        }
        function brandF(){
            var level0='',
                level1='<span class="list" style="vertical-align:top;display:inline-block;height:36px;line-height:36px;">一级：</span>',
                level2='<br/><span class="list" style="vertical-align:top;display:inline-block;height:36px;line-height:36px;">二级：</span>',
                level3='<br/><span class="list" style="vertical-align:top;display:inline-block;height:36px;line-height:36px;">三级：</span>';
            var str='',name='',str1='',flag=false;
            var brand_code=searchData.find('div.brand_code');
            var brand_codehtml='';
            if(categary){
                brand_codehtml = prevBrandData;
                if(categary==='2'){
                    flag = true;
                }
            }else{
                brand_codehtml = prevBrandData = data.brand_code;
            }
            for(var i=0;i<brand_codehtml.length;i++){
                name = brand_codehtml[i].name;
                //类目
                if(brandWrap[name]){
                    if(brandWrap[name].level==='1'){
                        level1+='<a href="javascript:;" data-categary="1" class="c-item" data-header="'+ brand_codehtml[i].value +'" data-header-name="'+ brand_codehtml[i].name +'" data-flag="brand_code"><input type="checkbox" data-flag="true" class="hide checkbox1"/><span>'+ brand_codehtml[i].value +'</span></a>';
                    }else if(brandWrap[name].level==='2'){
                        level2+='<a href="javascript:;" data-categary="2" class="c-item" data-header="'+ brand_codehtml[i].value +'" data-header-name="'+ brand_codehtml[i].name +'" data-flag="brand_code"><input type="checkbox" data-flag="true" class="hide checkbox1"/><span>'+ brand_codehtml[i].value +'</span></a>';
                    }else if(brandWrap[name].level==='3'){
                        if(flag){
                            if(brandWrap[name].pid===headerName){
                                level3+='<a href="javascript:;" data-categary="3" class="c-item" data-header="'+ brand_codehtml[i].value +'" data-header-name="'+ brand_codehtml[i].name +'" data-flag="brand_code"><input type="checkbox" data-flag="true" class="hide checkbox1"/><span>'+ brand_codehtml[i].value +'</span></a>';
                            }
                        }else{
                            level3+='<a href="javascript:;" data-categary="3" class="c-item" data-header="'+ brand_codehtml[i].value +'" data-header-name="'+ brand_codehtml[i].name +'" data-flag="brand_code"><input type="checkbox" data-flag="true" class="hide checkbox1"/><span>'+ brand_codehtml[i].value +'</span></a>';
                        }
                    }
                }else{//品牌
                    level0+='<a href="javascript:;" class="c-item" data-header="'+ brand_codehtml[i].value +'" data-header-name="'+ brand_codehtml[i].name +'" data-flag="brand_code"><input type="checkbox" data-flag="true" class="hide checkbox1"/><span>'+ brand_codehtml[i].value +'</span></a>';
                }
                arrList.brand_code.push({name:brand_codehtml[i].name,value:brand_codehtml[i].value});
            }
            str=level0+'<p class="remind hide1"><a href="javascript:;" class="checkAll">全选</a><a href="javascript:;" class="assured">确定</a><a href="javascript:;" class="cancel">取消</a> </p>';
            str1=level1+level2+level3+'<p class="remind hide1"><a href="javascript:;" class="checkAll">全选</a><a href="javascript:;" class="assured">确定</a><a href="javascript:;" class="cancel">取消</a> </p>';
            brand_code.eq(0).html(str);
            brand_code.eq(1).html(str1);
        }
        supplierF();//公司
        ditchF();//渠道
        brandF();//品牌
        storeF();//店铺仓库
    }
    //点击操作
    (function(){
        //展示维度
        function showDimension(data){
            if(data=='1'|| data=='2'){
                var dimensionValue=dimension.val();
                dimension.html('');
                var str='';
                for(var i=0;i<flagData.length;i++){
                    if(flagData[i]==dimensionValue){
                        str+='<option selected="selected">'+ flagData[i] +'</option>';
                    }else{
                        str+='<option>'+ flagData[i] +'</option>';
                    }
                }
                dimension.append(str);
                //防止选好之后点击其他的得重新选择
                //dimension.val(dimensionValue);
                var val=dimension.val();
                dimension.nextAll().hide();
                function time(val){
                    if(val=='年度'){
                        $('div.years').css('display','inline-block');
                        timeSelect.attr('disabled','disabled');
                        tableData.dateDemosion.flag='years';
                    }else if(val=='月份'){
                        $('div.month').css('display','inline-block');
                        timeSelect.attr('disabled','disabled');
                        tableData.dateDemosion.flag='month';
                    }else if(val=='日期'){
                        $('div.date').css('display','inline-block');
                        timeSelect.attr('disabled','disabled');
                        tableData.dateDemosion.flag='date';
                    }else{
                        timeSelect.removeAttr('disabled');
                        tableData.dateDemosion.flag=0;
                    }
                }
                time(dimensionValue);
                dimension.on('change',function(){
                    var val=$(this).val();
                    $(this).nextAll().hide();
                    time(val);
                });
            }
        }
        var checkboxData='', headerData='', header='', headerPrefix='',//公司 品牌 单品
            checkboxheader=[], //多选时用来存储显示的名称
            checkboxheaderName=[],//多选时用来存储汉字对应的编码
            checkboxheader1=[],//多选时用来存储汉字对应的编码
            checkboxheaderName1=[],//用来存储多选时的名称
            flagData=['公司','渠道','品牌','仓库/店铺','年度','月份','日期'];//'渠道','区域/类目'
        //收起展开筛选
        $('#show-hide-filter').on('click',function(){
            searchData.is(':hidden')?$(this).html('收起筛选'):$(this).html('展开筛选');
            searchData.slideToggle(200);
        });
        //单项收起展开
        searchFilter.find('a.show-more').on('click',function(){
            var _this=$(this);
            var flag=_this.attr('data-flag');
            if(flag=='true'){
                _this.html('收起');
                _this.attr('data-flag','false');
                _this.parent().prev().css({'max-height':300,'overflow':'auto'});
            }else{
                _this.html('更多');
                _this.attr('data-flag','true');
                _this.parent().prev().css({'max-height':108,'overflow':'hidden'});
            }
        });
        //点击搜索条件值
        searchFilter.on('click','a.c-item',function(){
            var _this=$(this), parents=_this.parents('div.search-item-c'),
                categary = _this.attr('data-categary'),
                header=_this.attr('data-header'), headerName=_this.attr('data-header-name'),
                dataNum=parents.attr('data-num'), dataClick=parents.attr('data-click'),//多选之后设置为false
                flag=_this.attr('data-flag'), type='',
                thischeckbox=_this.parent().next().find('a.multiselect').attr('data-flag');//多选按钮
            headerPrefix=parents.attr('data-name');
            if(dataClick==='true'){//多选之后禁止单选
                if(thischeckbox=='true'){//单选
                    tableData[flag].data.length=0;
                    if(dataNum==1){
                        commonData(flag,headerName,categary,headerName);
                        tableData[flag].data.push({"name":headerName,"value":header});
                    }else if(dataNum==0){
                        type=_this.attr('type');
                        queryData.type=type;
                        tableData[flag].data.push({"name":headerName,"value":header,"type":type});
                        //type 类型
                        if(fieldsData.length>0){
                            fieldsData.length=0;
                        }
                        fieldsData.push({type:type,fields:[headerName]});
                    }
                    if(navBar.find('a[data-flag='+ flag+']').length==1){//搜索栏有值就替换 没有就添加
                        navBar.find('a[data-flag='+ flag+']')
                            .before('<a href="javascript:;" class="all-classify-item" data-num="'+ dataNum +'"  data-name="'+headerPrefix +'" data-flag="'+ flag +'"><span>'+ headerPrefix +'：<i data-header-name="'+ headerName +'" class="i">'+ header +'</i></span><i class="fa fa-close"></i></a>')
                            .remove();
                    }else{
                        navBar.append('<a href="javascript:;" class="all-classify-item"   data-num="'+ dataNum +'"  data-name="'+headerPrefix +'" data-flag="'+ flag +'"><span>'+ headerPrefix +'：<i data-header-name="'+ headerName +'" class="i">'+ header +'</i></span><i class="fa fa-close"></i></a>');
                    }
                    var index=flagData.indexOf(headerPrefix);
                    if(index>=0){
                        flagData.splice(index,1);
                    }
                    showDimension(dataNum);
                }
            }
        });
        //点击多选
        searchFilter.on('click','a.multiselect',function(){
            var _this=$(this),
                prev=_this.parent().prev();
            function aa(){
                _this.hide();
                prev.css({'max-height':300,'overflow':'auto'}).find('p.remind').show();
                prev.find('a input').removeClass('hide');//.attr('checked',false);
                if(_this.attr('data-flag')=='true'){
                    _this.attr('data-flag','false');
                }else{
                    _this.attr('data-flag','true');
                }
            }
            //表格
            if(chuFlag==='table'){
                aa();
            }else if(chuFlag==='line'){// 折线图
                //如果点击是查询数据且不是图表展示
                if(_this.attr('id')=='flowMultiselect'){
                    if(_this.attr('data-chu')=='true'){
                        aa();
                    }
                }else{
                    if(chuNum<2){
                        aa();
                    }else{
                        alert('查询折线图时搜索条件不易过多 ');
                    }
                }
            }
        });
        //点击多选下的选择框
        searchData.on('click','a.c-item',function(ev){
            headerData='';
            var _this=$(this).find('input.checkbox1');
            var thischeckbox=$(this).parent().next().find('a.multiselect').attr('data-flag');
            if(thischeckbox=='false'){//多选状态下
                var _thisFlag=_this.attr('data-flag'),
                    parent=_this.parent(), header=parent.attr('data-header'),
                    headerName=parent.attr('data-header-name'), num=_this.parents('div.search-item-c').attr('data-num'),
                    flag=parent.attr('data-flag'), type='', fiedsNum= 0, fiedsFlag=false;
                headerPrefix=_this.parents('div.search-item-c').attr('data-name');
                tableData[flag].data.length=0;
                if(_thisFlag==='true'){//添加
                    _this.attr('data-flag','false');
                    _this.get(0).checked=true;
                    if(num!=0){
                        checkboxheader.push(header);
                        checkboxheaderName.push(headerName);
                    }else{
                        type=parent.attr('type');
                        //type 类型
                        if(fieldscheck.length>0){
                            for(var i=0;i<fieldscheck.length;i++){
                                if(fieldscheck[i].type==type){
                                    fiedsFlag=true;
                                    fiedsNum=i;
                                    break;
                                }
                            }
                        }
                        if(fiedsFlag){
                            fieldscheck[fiedsNum].fields.push(headerName);
                        }else{
                            fieldscheck.push({type:type,fields:[headerName]});
                        }
                        flowcheckboxheader.push(header);
                        flowcheckboxheaderName.push(headerName);
                        flowType.push(type);
                    }
                }else{//删除
                    _this.attr('data-flag','true');
                    _this.get(0).checked=false;
                    if(num!=0){
                        checkboxheader.splice(checkboxheader.indexOf(header),1);
                        checkboxheaderName.splice(checkboxheaderName.indexOf(headerName),1);
                    }else{
                        type=parent.attr('type');
                        for(var i=0;i<fieldscheck.length;i++){
                            if(fieldscheck[i].type==type){
                                fiedsNum=i;
                                break;
                            }
                        }
                        fieldscheck[fiedsNum].fields.splice(fieldscheck[fiedsNum].fields.indexOf(headerName),1);
                        if(fieldscheck[fiedsNum].fields.length==0){
                            fieldscheck.splice(fiedsNum,1);
                        }
                        flowcheckboxheader.splice(flowcheckboxheader.indexOf(header),1);
                        flowcheckboxheaderName.splice(flowcheckboxheaderName.indexOf(headerName),1);
                        flowType.splice(flowType.indexOf(type),1);
                    }
                }
            }
        });
        //多选下的取消
        searchData.on('click','a.cancel',function(){
            checkboxheader=checkboxheader1;
            checkboxheaderName=checkboxheaderName1;
            flowcheckboxheader=flowcheckboxheader1;
            flowcheckboxheaderName=flowcheckboxheaderName1;
            flowType=flowType1;
            fieldscheck.length=0;
            var _this=$(this),
                parent=_this.parent(),
                parents=_this.parents('div.search-item-c'),
                dataNum=parents.attr('data-num');
            parent.hide();
            parents.css({'max-height':108,'overflow':'hidden'}).find('input').addClass('hide');
            parents.next().find('a.multiselect').show().attr('data-flag','true');
            var flag=_this.parent().prev().attr('data-flag');
            if(dataNum==1){
                parents.find('input').attr('data-flag','true').prop('checked',false);
            }
        });
        //多选下的确定
        searchData.on('click','a.assured',function(){
            var _this=$(this),
                parent=_this.parent(),
                parents=_this.parents('div.search-item-c'),
                dataName=parents.attr('data-name'),
                dataNum=parents.attr('data-num'),
                flag=_this.parent().prev().attr('data-flag');
            checkboxheader1=checkboxheader;
            checkboxheaderName1=checkboxheaderName;
            flowcheckboxheader1=flowcheckboxheader;
            flowcheckboxheaderName1=flowcheckboxheaderName;
            flowType1=flowType;
            if(dataNum!=0){
                for(var i=0;i<checkboxheader1.length;i++){
                    tableData[flag].data.push({"name":checkboxheaderName1[i],"value":checkboxheader1[i]});
                    headerData+='<i data-header-name="'+ checkboxheaderName1[i] +'" class="i">'+ checkboxheader1[i] +'</i>';
                }
            }else{
                fieldsData=fieldscheck;
                for(var i=0;i<flowcheckboxheader1.length;i++){
                    tableData[flag].data.push({"name":flowcheckboxheaderName1[i],"value":flowcheckboxheader1[i],'type':flowType1[i]});
                    headerData+='<i data-header-name="'+ flowcheckboxheaderName1[i] +'" class="i">'+ flowcheckboxheader1[i] +'</i>';
                }
            }
            checkboxData='<a href="javascript:;" class="all-classify-item" type="'+  +'" data-name="'+headerPrefix +'" data-num="'+ dataNum +'" data-flag="'+ flag +'"><span>'+ headerPrefix +'：'+ headerData +'</span><i class="fa fa-close"></i></a>';
            if(dataNum==1){
                //防止点击了多选其实值选择了一个
                if(checkboxheader1.length>1){
                    chuNum++;
                }
                commonData(flag,checkboxheaderName);
                parents.find('input').attr('data-flag','true');
                if(checkboxheader.length==0){
                    alert('请选择至少一个');
                    return;
                }
            }
            //多选下确定，至少选择一个
            if(dataNum==0){
                if(flowcheckboxheader.length>1){
                    chuNum++;
                }else{
                    chuNum--;
                }
                if(flowcheckboxheader.length==0){
                    alert('请选择至少一个');
                    return;
                }
            }
            //清除掉上一次多选的集合
            checkboxheader.length=0;
            checkboxheaderName.length=0;
            parents.attr('data-click','false');
            parent.hide();
            parents.css({'max-height':108,'overflow':'hidden'}).find('input').addClass('hide');
            parents.next().find('a.multiselect').show().attr('data-flag','true');
            var navBarA=navBar.find('a');
            for(var i=0;i<navBarA.length;i++){
                if(navBarA.eq(i).find('span').text().split('：')[0]==dataName){
                    navBarA.eq(i).remove();
                }
            }
            var index=flagData.indexOf(headerPrefix);
            if(index>=0){
                flagData.splice(index,1);
            }
            showDimension(dataNum);
            navBar.append(checkboxData);
            headerData='';
        });
        //多选下的全选
        searchData.on('click','a.checkAll',function(){
            chuNum++;
            var _this=$(this);
            var parents=_this.parents('div.search-item-c');
            var parentA=parents.find('a.c-item');
            var dataName=parents.attr('data-name');
            var dataNum=parents.attr('data-num');
            var flag=_this.parent().prev().attr('data-flag');
            var navBarA=navBar.find('a');
            var str='<a href="javascript:;" class="all-classify-item" data-num="'+ dataNum +'" data-name="'+ dataName +'" data-flag="'+ flag +'"><span>'+ dataName +'：';
            parents.css({'max-height':108,'overflow':'hidden'}).find('input').addClass('hide');
            parents.next().find('a.multiselect').show().attr('data-flag','true');
            tableData[flag].data.length=0;
            for(var i=0;i<navBarA.length;i++){
                if(navBarA.eq(i).find('span').text().split('：')[0]==dataName){
                    navBarA.eq(i).remove();
                }
            }
            for(var i=0;i<parentA.length;i++){
                str+='<i style="font-style:normal;" data-header-name="'+ parentA.eq(i).attr('data-header-name') +'">'+ parentA.eq(i).attr('data-header') +'</i>';
                if(dataNum==0){
                    tableData[flag].data.push({"name":parentA.eq(i).attr('data-header-name'),"value":parentA.eq(i).attr('data-header'),'type':parentA.eq(i).attr('type')});
                }else{
                    tableData[flag].data.push({"name":parentA.eq(i).attr('data-header-name'),"value":parentA.eq(i).attr('data-header')});
                }
            }
            str+='</span><i class="fa fa-close"></i>';
            navBar.append(str);
            var index=flagData.indexOf(dataName);
            if(index>=0){
                flagData.splice(index,1);
            }
            showDimension(dataNum);
        });
        //删除添加的搜索条件
        navBar.on('click','i.fa-close',function(){
            var _this=$(this);
            _this.parent().remove();
            var flag=_this.parent().attr('data-flag');
            var dataNum=_this.parent().attr('data-num');
            headerPrefix=_this.parent().attr('data-name');
            var num=_this.prev().find('i');
            if(dataNum=='2'){
                timeSelect.val('时间选择').nextAll().hide();
                if(flagData.indexOf('年度')<0){
                    flagData.push('年度','月份','日期');
                }
            }
            if(dataNum=='0'){
                searchFilter.find('div.flow').find('a').find('input').attr("data-flag",true).prop("checked",false);
                flowcheckboxheader=[];
                flowcheckboxheaderName=[];
                flowType=[];
                fieldsData=[];
                if(num.length>1){
                    chuNum--;
                }
            }
            if(dataNum==1){
                if(num.length>1){
                    chuNum--;
                }
                commonData(flag);
                if(flagData.indexOf(headerPrefix)<0){
                    flagData.push(headerPrefix);
                }
            }
            tableData[flag].data.length=0;
            if(flag=='data_date'){
                tableData[flag].flag=0;
            }
            searchFilter.find('div.'+flag).attr('data-click','true');
            showDimension(dataNum);
        });

        //单个爆款  有问题  chuFlag===line?
        var prevGoodsArr=0;
        goodsId.change(function(){
            var goodsArr=$(this).val().split(/[ \n， ,]+/gm);
            if(chuFlag==='line'&&chuNum<2){
                if(goodsArr.length>1&&prevGoodsArr<=1){
                    chuNum++;
                }else if(goodsArr.length<=1&&prevGoodsArr>=1){
                    chuNum--;
                }
            }
            prevGoodsArr=goodsArr.length;
        });
        showDimension(1);
        //时间选择 参数选择
        timeSelect.on('change',function(){
            //有问题
            if(timeFlag){
                timeFlag=false;
                chuNum--;
            }
            function popDate(data){
                var index=flagData.indexOf(data);
                if(index>=0){
                    flagData.splice(index,1);
                }
            }
            var _this=$(this),val=_this.val(),headerVal='';
            _this.nextAll('div').hide();
            var parent=_this.parent(),flag='data_date',dataNum=parent.attr('data-num'),header=val;
            if(val=='年度'){
                $('div.syears').css('display','inline-block');
                popDate('年度');
                popDate('月份');
                popDate('日期');
                tableData['data_date'].flag='syear';
                headerVal='year';
            }else if(val=='月份'){
                $('div.smonth').css('display','inline-block');
                popDate('年度');
                popDate('月份');
                popDate('日期');
                tableData['data_date'].flag='smonth';
                headerVal='month';
            }else if(val=='日期'){
                $('div.sdate').css('display','inline-block');
                popDate('年度');
                popDate('月份');
                popDate('日期');
                tableData['data_date'].flag='sdate';
                headerVal='date';
            }else if(val=='时间选择'){
                flagData.push('年度','月份','日期');
                tableData['data_date'].flag=0;
            }
            if(navBar.find('a[data-flag='+ flag+']').length==1){
                if(val=='时间选择'){
                    navBar.find('a[data-flag='+ flag+']').remove();
                }else{
                    navBar.find('a[data-flag='+ flag+']')
                        .before('<a href="javascript:;" class="all-classify-item" data-num="'+ dataNum +'" data-flag="'+ flag +'"><span>时间：<i class="i" data-header-name="'+ headerVal +'">'+ header +'</i></span><i class="fa fa-close"></i></a>')
                        .remove();
                }
            }else{
                navBar.append('<a href="javascript:;" class="all-classify-item" data-num="'+ dataNum +'"  data-flag="'+ flag +'"><span>时间：<i class="i" data-header-name="'+ headerVal +'">'+ header +'</i></span><i class="fa fa-close"></i></a>');
            }
            showDimension(dataNum);
        });
    })();
//展示维度函数 判断时间范围是否为空
// 展示维度查询参数赋值
    var objTable=[];
    function dimensionInformation(){
        var Dimension=$('#Dimension');//展示维度
        var dVal=Dimension.val();
        objTable=[];
        if(dVal=='公司'|| dVal=='品牌'|| dVal=='渠道'||dVal=='仓库/店铺'){
            console.log(chuNum);
            if(chuNum>=2&&chuFlag=='line'){
                alert('查看图表时，不易查询过多选项');
                chuFlag=allChuFlag;
                return false;
            }
        }
        var obj={"name":"data_date","condition":"BETWEEN","values":[]};
        if(Dimension.val()=='年度'){
            var selectVal=Dimension.nextAll('div.years').find('select');
            if(chuFlag==='line'&&chuNum>=2&&explosionFlag){
                if(selectVal.eq(0).val()!=selectVal.eq(1).val()){
                    alert('查看图表时，不易查询过多选项');
                    chuFlag=allChuFlag;
                    return false;
                }
            }
            if(selectVal.eq(0).val()==''||selectVal.eq(1).val()==''){
                alert('请输入展示维度年度范围');
                return false;
            }else{
                objTable.push(selectVal.eq(0).val(),selectVal.eq(1).val());
                obj.values.push(new Date(selectVal.eq(0).val()).Format('yyyy'),new Date(selectVal.eq(1).val()).Format('yyyy'));
            }
            queryData.conditions[queryData.conditions.length-1].values=obj.values;
        }
        if(Dimension.val()=='月份'){
            var dinput2=Dimension.nextAll('div.month').find('input');
            if(chuFlag==='line'&&chuNum>=2&&explosionFlag){
                if(dinput2.eq(0).val()!=dinput2.eq(1).val()){
                    alert('查看图表时，不易查询过多选项');
                    chuFlag=allChuFlag;
                    return false;
                }
            }
            if(dinput2.eq(0).val()==''&&dinput2.eq(1).val()==''){
                alert('请输入展示维度月份范围');
                return false;
            }else if(dinput2.eq(0).val()==''&&dinput2.eq(1).val()!=''){
                obj.values.push(new Date(dinput2.eq(1).val()).Format('yyyyMM'),new Date(dinput2.eq(1).val()).Format('yyyyMM'));
            }else if(dinput2.eq(0).val()!=''&&dinput2.eq(1).val()==''){
                obj.values.push(new Date(dinput2.eq(0).val()).Format('yyyyMM'),new Date(dinput2.eq(0).val()).Format('yyyyMM'));
            }else{
                obj.values.push(new Date(dinput2.eq(0).val()).Format('yyyyMM'),new Date(dinput2.eq(1).val()).Format('yyyyMM'));
            }
            objTable.push(dinput2.eq(0).val(),dinput2.eq(1).val());
            queryData.conditions[queryData.conditions.length-1].values=obj.values;
        }
        if(Dimension.val()=='日期'){
            var dinput3=Dimension.nextAll('div.date').find('input');
            if(chuFlag==='line'&&chuNum>=2&&explosionFlag){
                if(dinput3.eq(0).val()!=dinput3.eq(1).val()){
                    alert('查看图表时，不易查询过多选项');
                    chuFlag=allChuFlag;
                    return false;
                }
            }
            if(dinput3.eq(0).val()==''&&dinput3.eq(1).val()==''){
                alert('请输入展示维度日期范围');
                return false;
            }else if(dinput3.eq(0).val()==''&&dinput3.eq(1).val()!=''){
                obj.values.push(new Date(dinput3.eq(1).val()).Format('yyyyMMdd'),new Date(dinput3.eq(1).val()).Format('yyyyMMdd'));
            }else if(dinput3.eq(0).val()!=''&&dinput3.eq(1).val()==''){
                obj.values.push(new Date(dinput3.eq(0).val()).Format('yyyyMMdd'),new Date(dinput3.eq(0).val()).Format('yyyyMMdd'));
            }else{
                obj.values.push(new Date(dinput3.eq(0).val()).Format('yyyyMMdd'),new Date(dinput3.eq(1).val()).Format('yyyyMMdd'));
            }
            objTable.push(dinput3.eq(0).val(),dinput3.eq(1).val());
            queryData.conditions[queryData.conditions.length-1].values=obj.values;
        }
        return true;
    }
    //时间条件函数 判断时间返回是否为空
// 添加时间参数
    var timeFlag=false;
    function timeData(){
        // 有问题
        if(timeFlag){
            timeFlag=false;
            chuNum--;
        }
        var obj={"name":"data_date","condition":"BETWEEN","values":[]};
        if(timeSelect.val()=='年度'){
            var tinput1=timeSelect.nextAll('div.syears').find('select');
            if(chuFlag==='line'){
                if(tinput1.eq(0).val()!=tinput1.eq(1).val()){
                    chuNum++;
                    timeFlag=true;
                    if(chuNum>2){
                        alert('查看图表时，不易查询过多选项');
                        chuFlag=allChuFlag;
                        return false;
                    }
                }
            }
            if(tinput1.eq(0).val()==''||tinput1.eq(1).val()==''){
                alert('请输入时间中年度范围');
                return false;
            }else{
                obj.values.push(new Date(tinput1.eq(0).val()).Format('yyyy'),new Date(tinput1.eq(1).val()).Format('yyyy'));
            }
            queryData.conditions[queryData.conditions.length-1].values=obj.values;
        }
        if(timeSelect.val()=='月份'){
            var tinput2=timeSelect.nextAll('div.smonth').find('input');
            if(chuFlag==='line'){
                if(tinput2.eq(0).val()!=tinput2.eq(1).val()){
                    chuNum++;
                    timeFlag=true;
                    if(chuNum>2){
                        alert('查看图表时，不易查询过多选项');
                        chuFlag=allChuFlag;
                        return false;
                    }
                }
            }
            if(tinput2.eq(0).val()==''&&tinput2.eq(1).val()==''){
                alert('请输入时间中月份范围');
                return false;
            }else if(tinput2.eq(0).val()==''&&tinput2.eq(1).val()!=''){
                obj.values.push(new Date(tinput2.eq(1).val()).Format('yyyyMM'),new Date(tinput2.eq(1).val()).Format('yyyyMM'));
            }else if(tinput2.eq(0).val()!=''&&tinput2.eq(1).val()==''){
                obj.values.push(new Date(tinput2.eq(0).val()).Format('yyyyMM'),new Date(tinput2.eq(0).val()).Format('yyyyMM'));
            }else{
                obj.values.push(new Date(tinput2.eq(0).val()).Format('yyyyMM'),new Date(tinput2.eq(1).val()).Format('yyyyMM'));
            }
            queryData.conditions[queryData.conditions.length-1].values=obj.values;
        }
        if(timeSelect.val()=='日期'){
            var tinput3=timeSelect.nextAll('div.sdate').find('input');
            if(chuFlag==='line'){
                if(tinput3.eq(0).val()!=tinput3.eq(1).val()){
                    chuNum++;
                    timeFlag=true;
                    if(chuNum>2){
                        alert('查看图表时，不易查询过多选项');
                        chuFlag=allChuFlag;
                        return false;
                    }
                }
            }
            if(tinput3.eq(0).val()==''&&tinput3.eq(1).val()==''){
                alert('请输入时间中日期范围');
                return false;
            }else if(tinput3.eq(0).val()==''&&tinput3.eq(1).val()!=''){
                obj.values.push(new Date(tinput3.eq(1).val()).Format('yyyyMMdd'),new Date(tinput3.eq(1).val()).Format('yyyyMMdd'));
            }else if(tinput3.eq(0).val()!=''&&tinput3.eq(1).val()==''){
                obj.values.push(new Date(tinput3.eq(0).val()).Format('yyyyMMdd'),new Date(tinput3.eq(0).val()).Format('yyyyMMdd'));
            }else{
                obj.values.push(new Date(tinput3.eq(0).val()).Format('yyyyMMdd'),new Date(tinput3.eq(1).val()).Format('yyyyMMdd'));
            }
            queryData.conditions[queryData.conditions.length-1].values=obj.values;
        }
        return true;
    }

    //读取条件栏的查询数据
//如果选择了时间条件 在timeData函数里面赋值
    function readQueryData(){
        queryData.dimensions.length=0;
        queryData.fields.length=0;
        queryData.dimensions.push({"name":dimensionData[dimension.val()]});
        for(var s=0;s<queryData.conditions.length-1;s++){
            queryData.conditions[s].values.length=0;
            queryData.conditions[s].values.push('all');
        }
        //获得条件参数 和查询参数
        for(var key in tableData){
            if(key=='flow'){
                if(tableData['flow'].data.length>=1){
                    for(var j=0;j<tableData['flow'].data.length;j++){
                        queryData.fields.push(tableData['flow'].data[j]['name']);
                    }
                }
            }
            if(tableData[key].data&&tableData[key].data.length>0){
                for(var i=0;i<queryData.conditions.length-1;i++){
                    if(queryData.conditions[i].name==tableData[key].dataFlag){
                        queryData.conditions[i].values.length=0;
                        if(tableData[key].data.length==1){
                            queryData.conditions[i].condition='=';
                            queryData.conditions[i].values.push(tableData[key].data[0]['name']);
                        }else{
                            queryData.conditions[i].condition='IN';
                            for(var c=0;c<tableData[key].data.length;c++){
                                queryData.conditions[i].values.push(tableData[key].data[c]['name']);
                            }
                        }
                    }
                }
            }
        }
    }

    var explosionFlag=true,//爆款按钮是否点击  true  没有
        renderingData=[];//存储查询到的数据
    //用来计算平均值 最大值 最小值 存储的是多少列
    var columns=0;
    var chart=$('#chart'),tableIcon=$('#tableIcon'),echartsDiv=$('#echarts'),table=$('#table'),flowMultiselect=$('#flowMultiselect');
    function tableHeader(en){
        var goodIds=$('#goodsId'),
            navBar=$('#navBar'),
            dimension=$('#Dimension'),
            table=$('#table'),
            tableHeader=table.find('thead'),
            tableBody=table.find('tbody'),
            navBarA=navBar.find('a.all-classify-item'),
            navBar1= 0,//goodsId存在为1
            allColmns= 0,//列数
            arrId1=[],//存公司id
            arrId2=[],//存品牌id
            arrId3=[],//存仓库Id
            arrId4=[],//存查询数据Id
            arrDitch=[],//存渠道id
            arrDate=[],//存date
            arrGoodsId=[],//存goodsId
            arrarea=[],//存customer_code
            arrId=[];//最后表头生成的Id都在这里
        var obj={
            supplierIL:0,
            supplierI:null,
            ditchIL:0,
            ditchI:null,
            brand_codeIL:0,
            brand_codeI:null,
            storeIL:0,
            storeI:null,
            areaIL:0,
            areaI:null,
            goodsIdIL:0,
            goodsIdI:null,
            data_dateL:0,
            flowIL:0,
            flowI:null
        };
        var dateScore=[];//存储时间条件
        var selectInputRange;//存储时间条件的div
        for(var key in tableData){
            if(key=='supplier_code'){
                obj.supplierIL=tableData[key].data.length;
                obj.supplierI=tableData[key].data;
            }
            if(key=='ditch_code'){
                obj.ditchIL=tableData[key].data.length;
                obj.ditchI=tableData[key].data;
            }
            if(key=='brand_code'){
                obj.brand_codeIL=tableData[key].data.length;
                obj.brand_codeI=tableData[key].data;
            }
            if(key=='shop_code'){
                obj.storeIL=tableData[key].data.length;
                obj.storeI=tableData[key].data;
            }
            if(key=='customer_code'){
                obj.areaIL=tableData[key].data.length;
                obj.areaI=tableData[key].data;
            }
            if(key=='flow'){
                obj.flowIL=tableData[key].data.length;
                obj.flowI=tableData[key].data;
            }
            if(key=='goodsId'){
                if(tableData[key].data&&tableData[key].data.length>=1){
                    obj.goodsIdIL=tableData[key].data.length;
                    obj.goodsIdI=tableData[key].data;
                    navBar1=1;
                }
                if(tableData[key].data&&goodIds.val()!=0){
                    obj.goodsIdIL=tableData[key].data.length;
                    obj.goodsIdI=tableData[key].data;
                    navBar1=1;
                }
            }
            if(key=='data_date'){
                if(tableData[key].flag=='syear'){
                    var divYears=$('div.syears');
                    selectInputRange=divYears.find('select');
                    if(Number(selectInputRange.eq(0).val())==Number(selectInputRange.eq(1).val())){
                        dateScore=[Number(selectInputRange.eq(0).val())];
                    }else{
                        for(var c=Number(selectInputRange.eq(0).val());c<=Number(selectInputRange.eq(1).val());c++){
                            dateScore.push(c);
                        }
                    }
                }
                if(tableData[key].flag=='smonth'){
                    selectInputRange=$('div.smonth').find('input');
                    if(selectInputRange.eq(0).val()==''&&selectInputRange.eq(1).val()!=''){
                        dateScore=getMonth(selectInputRange.eq(1).val(),selectInputRange.eq(1).val());
                    }else if(selectInputRange.eq(0).val()!=''&&selectInputRange.eq(1).val()==''){
                        dateScore=getMonth(selectInputRange.eq(0).val(),selectInputRange.eq(0).val());
                    }else{
                        dateScore=getMonth(selectInputRange.eq(0).val(),selectInputRange.eq(1).val());
                    }
                }
                if(tableData[key].flag=='sdate'){
                    selectInputRange=$('div.sdate').find('input');
                    if(selectInputRange.eq(0).val()==''&&selectInputRange.eq(1).val()!=''){
                        dateScore=getDays(selectInputRange.eq(1).val(),selectInputRange.eq(1).val());
                    }else if(selectInputRange.eq(0).val()!=''&&selectInputRange.eq(1).val()==''){
                        dateScore=getDays(selectInputRange.eq(0).val(),selectInputRange.eq(0).val());
                    }else{
                        dateScore=getDays(selectInputRange.eq(0).val(),selectInputRange.eq(1).val());
                    }
                    dateScore=dateScore.split(',');
                }
                obj.data_dateL=dateScore.length;
            }
        }
        headerTemplate(obj);
        if(!en){//是表格还是图表  en为true 是图表
            firstColumn();
        }
        function headerTemplate(obj){
            var su,br,st,fl,bitch,date,goods,area;
            var ssu='',sbr='',sst='',sfl='',sbitch='',sdate='',sgoods='',sarea='';
            var goodsArr=[];
            su=obj.supplierIL==0?1:obj.supplierIL;
            goods=obj.goodsIdIL==0?1:obj.goodsIdIL;
            area=obj.areaIL==0?1:obj.areaIL;
            bitch=obj.ditchIL==0?1:obj.ditchIL;
            br=obj.brand_codeIL==0?1:obj.brand_codeIL;
            st=obj.storeIL==0?1:obj.storeIL;
            date=obj.data_dateL==0?1:obj.data_dateL;
            fl=obj.flowIL==0?1:obj.flowIL;
            //id
            (function(){
                function dataFlowF(data){
                    if(obj.data_dateL>=1){
                        data_dateF(data);
                    }else{
                        if(obj.flowIL>=1){
                            flowF(data);
                        }
                    }
                }
                function flowF(data){
                    arrId4.length=0;
                    for(var a4=0;a4<data.length;a4++){
                        for(var j4=0;j4<obj.flowIL;j4++){
                            arrId4.push(data[a4]+'-'+obj.flowI[j4]['name']+'-'+obj.flowI[j4]['type']);
                        }
                    }
                    arrId=arrId4;
                }
                function data_dateF(data){
                    arrDate.length=0;
                    for(var a3=0;a3<data.length;a3++){
                        for(var j3=0;j3<obj.data_dateL;j3++){
                            var date=0;
                            if(dateScore[j3].length>4){
                                date=dateScore[j3].split('-').join('');
                            }else{
                                date=dateScore[j3];
                            }
                            arrDate.push(data[a3]+'-'+date);
                            if(obj.flowIL>=1){
                                flowF(arrDate);
                            }
                        }
                    }
                }
                function storeF(data){
                    if(obj.storeIL>=1){
                        arrId3.length=0;
                        for(var a2=0;a2<data.length;a2++){
                            for(var j2=0;j2<obj.storeIL;j2++){
                                arrId3.push(data[a2]+'-'+obj.storeI[j2]['name']);
                                dataFlowF(arrId3);
                            }
                        }
                    }else{
                        dataFlowF(data);
                    }
                }
                function ifGoodsIdF(data){
                    if(obj.goodsIdIL>=1){
                        arrGoodsId.length=0;
                        for(var ag=0;ag<data.length;ag++){
                            for(var j3=0;j3<obj.goodsIdIL;j3++){
                                if(data[ag].split('-')[data[ag].split('-').length-1]==obj.goodsIdI[j3]['brandId']){
                                    arrGoodsId.push(data[ag]+'-'+obj.goodsIdI[j3]['goodsId']);
                                    storeF(arrGoodsId);
                                }
                            }
                        }
                    }else{
                        storeF(data);
                    }
                }
                if(obj.supplierIL>=1){
                    arrId1.length=0;
                    for(var i=0;i<obj.supplierIL;i++){
                        arrId1.push(obj.supplierI[i]['name']);
                        if(obj.ditchIL>=1){
                            arrDitch.length=0;
                            for(var a=0;a<arrId1.length;a++){
                                for(var j=0;j<obj.ditchIL;j++){
                                    arrDitch.push(arrId1[a]+'-'+obj.ditchI[j]['name']);
                                    if(obj.brand_codeIL>=1){
                                        arrId2.length=0;
                                        for(var a1=0;a1<arrDitch.length;a1++){
                                            for(var j1=0;j1<obj.brand_codeIL;j1++){
                                                arrId2.push(arrDitch[a1]+'-'+obj.brand_codeI[j1]['name']);
                                                ifGoodsIdF(arrId2);
                                            }
                                        }
                                    }else{
                                        if(obj.goodsIdIL>=1){
                                            arrGoodsId.length=0;
                                            for(var ag=0;ag<arrDitch.length;ag++){
                                                for(var j3=0;j3<obj.goodsIdIL;j3++){
                                                    arrGoodsId.push(arrDitch[ag]+'-'+obj.goodsIdI[j3]['goodsId']);
                                                    storeF(arrGoodsId);
                                                }
                                            }
                                        }else{
                                            storeF(arrDitch);
                                        }
                                    }
                                }
                            }
                        }else{
                            if(obj.brand_codeIL>=1){
                                arrId2.length=0;
                                for(var a1=0;a1<arrId1.length;a1++){
                                    for(var j1=0;j1<obj.brand_codeIL;j1++){
                                        arrId2.push(arrId1[a1]+'-'+obj.brand_codeI[j1]['name']);
                                        ifGoodsIdF(arrId2);
                                    }
                                }
                            }else{
                                if(obj.goodsIdIL>=1){
                                    arrGoodsId.length=0;
                                    for(var ag=0;ag<arrId1.length;ag++){
                                        for(var j3=0;j3<obj.goodsIdIL;j3++){
                                            arrGoodsId.push(arrId1[ag]+'-'+obj.goodsIdI[j3]['goodsId']);
                                            storeF(arrGoodsId);
                                        }
                                    }
                                }else{
                                    storeF(arrId1);
                                }
                            }
                        }
                    }
                }else{
                    if(obj.ditchIL>=1){
                        arrDitch.length=0;
                        for(var j=0;j<obj.ditchIL;j++){
                            arrDitch.push(obj.ditchI[j]['name']);
                            if(obj.brand_codeIL>=1){
                                arrId2.length=0;
                                for(var a1=0;a1<arrDitch.length;a1++){
                                    for(var j1=0;j1<obj.brand_codeIL;j1++){
                                        arrId2.push(arrDitch[a1]+'-'+obj.brand_codeI[j1]['name']);
                                        ifGoodsIdF(arrId2);
                                    }
                                }
                            }else{
                                if(obj.goodsIdIL>=1){
                                    arrGoodsId.length=0;
                                    for(var ag=0;ag<arrDitch.length;ag++){
                                        for(var j3=0;j3<obj.goodsIdIL;j3++){
                                            arrGoodsId.push(arrDitch[ag]+'-'+obj.goodsIdI[j3]['goodsId']);
                                            storeF(arrGoodsId);
                                        }
                                    }
                                }else{
                                    storeF(arrDitch);
                                }
                            }
                        }
                    }else{
                        if(obj.brand_codeIL>=1){
                            arrId2.length=0;
                            for(var j1=0;j1<obj.brand_codeIL;j1++){
                                arrId2.push(obj.brand_codeI[j1]['name']);
                                ifGoodsIdF(arrId2);
                            }
                        }else{
                            if(obj.goodsIdIL>=1){
                                arrGoodsId.length=0;
                                for(var j3=0;j3<obj.goodsIdIL;j3++){
                                    arrGoodsId.push(obj.goodsIdI[j3]['goodsId']);
                                    storeF(arrGoodsId);
                                }
                            }else{
                                if(obj.storeIL>=1){
                                    arrId3.length=0;
                                    for(var j2=0;j2<obj.storeIL;j2++){
                                        arrId3.push(obj.storeI[j2]['name']);
                                        dataFlowF(arrId3);
                                    }
                                }else{
                                    if(obj.data_dateL>=1){
                                        arrDate.length=0;
                                        for(var j3=0;j3<obj.data_dateL;j3++){
                                            var date=0;
                                            if(dateScore[j3].length>4){
                                                date=dateScore[j3].split('-').join('');
                                            }else{
                                                date=dateScore[j3];
                                            }
                                            arrDate.push(date);
                                            if(obj.flowIL>=1){
                                                flowF(arrDate);
                                            }
                                        }
                                    }else{
                                        if(obj.flowIL>=1){
                                            arrId4.length=0;
                                            for(var j4=0;j4<obj.flowIL;j4++){
                                                arrId4.push(obj.flowI[j4]['name']+'-'+obj.flowI[j4]['type']);
                                            }
                                            arrId=arrId4;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            })();
            //头部
            if(!en){//是表格还是图表  en为true 是图表
                (function(){
                    function allSum(data){
                        var resultu=0;
                        for(var i=0;i<data.length;i++){
                            resultu+=data[i];
                        }
                        return resultu;
                    }
                    var allGoods=[];
                    var suAllGoods=[];
                    var flag=false;
                    function data_dateF(){
                        if(obj.data_dateL>=1){
                            for(var s=0;s<dateScore.length;s++){
                                sdate+='<th colspan="'+ fl +'">'+ dateScore[s] +'</th>';
                                if(obj.flowIL>=1){
                                    for(var m=0;m<obj.flowIL;m++){
                                        sfl+='<th>'+ obj.flowI[m]['value'] +'</th>';
                                    }
                                    tableHeader.find('tr.flow').empty().html(sfl);
                                }
                            }
                            tableHeader.find('tr.data_date').empty().html(sdate);
                        }else{
                            tableHeader.find('tr.data_date').empty();
                            if(obj.flowIL>=1){
                                for(var m=0;m<obj.flowIL;m++){
                                    sfl+='<th>'+ obj.flowI[m]['value'] +'</th>';
                                }
                                tableHeader.find('tr.flow').empty().html(sfl);
                            }
                        }
                    }
                    function goodsIdF(brandName){
                        flag=false;
                        var cc=0;
                        if(goodIds.val()==0){
                            if(obj.goodsIdIL>=1){
                                for(var j=0;j<obj.goodsIdIL;j++){
                                    if(brandName==obj.goodsIdI[j]['brandId']||brandName==''){
                                        sgoods+='<th colspan="'+ (date*fl*st) +'">'+ obj.goodsIdI[j]['goodsName'] +'</th>';
                                        storeILF();
                                        flag=true;
                                        cc++;
                                    }
                                }
                                tableHeader.find('tr.goodsId').empty().html(sgoods);
                            }else{
                                tableHeader.find('tr.goodsId').empty();
                                storeILF();
                                cc=1;
                            }
                            goods=cc;
                        }else{
                            if(obj.goodsIdIL>=1){
                                for(var j=0;j<obj.goodsIdIL;j++){
                                    sgoods+='<th colspan="'+ (date*fl*st) +'">'+ obj.goodsIdI[j]['goodsName'] +'</th>';
                                    storeILF();
                                }
                                tableHeader.find('tr.goodsId').empty().html(sgoods);
                            }else{
                                tableHeader.find('tr.goodsId').empty();
                                storeILF();
                            }
                        }
                    }
                    function storeILF(){
                        if(obj.storeIL>=1){
                            for(var k=0;k<obj.storeIL;k++){
                                sst+='<th colspan="'+ (date*fl) +'">'+ obj.storeI[k]['value'] +'</th>';
                                data_dateF();
                            }
                            tableHeader.find('tr.shop_code').empty().html(sst);
                        }else{
                            tableHeader.find('tr.shop_code').empty();
                            data_dateF();
                        }
                    }
                    function brand_codeF(){
                        if(goodIds.val()==0){
                            allGoods=[];
                            if(obj.brand_codeIL>=1){
                                for(var j=0;j<obj.brand_codeIL;j++){
                                    goodsIdF(obj.brand_codeI[j]['name']);
                                    if(obj.goodsIdIL>=1){
                                        if(!flag){
                                            alert(obj.brand_codeI[j]['value']+'没有爆款');
                                        }else{
                                            allGoods.push(st*date*fl*goods);
                                            sbr+='<th colspan="'+ (st*date*fl*goods)+'">'+ obj.brand_codeI[j]['value'] +'</th>';
                                        }
                                    }else{
                                        sbr+='<th colspan="'+ (st*date*fl*goods)+'">'+ obj.brand_codeI[j]['value'] +'</th>';
                                    }
                                }
                                tableHeader.find('tr.brand_code').empty().html(sbr);
                            }else{
                                goodsIdF('');
                                allGoods.push(goods);
                                tableHeader.find('tr.brand_code').empty();
                            }
                        }else{
                            if(obj.brand_codeIL>=1){
                                for(var j=0;j<obj.brand_codeIL;j++){
                                    goodsIdF();
                                    sbr+='<th colspan="'+ (st*date*fl*goods) +'">'+ obj.brand_codeI[j]['value'] +'</th>';
                                }
                                tableHeader.find('tr.brand_code').empty().html(sbr);
                            }else{
                                goodsIdF();
                                tableHeader.find('tr.brand_code').empty();
                            }
                        }
                    }
                    function ditch_codeF(){
                        if(goodIds.val()==0){
                            suAllGoods=[];
                            if(obj.ditchIL>=1){
                                for(var i1=0;i1<obj.ditchIL;i1++){
                                    brand_codeF();
                                    if(obj.goodsIdIL>=1){
                                        suAllGoods.push(allSum(allGoods));
                                        sbitch+='<th colspan="'+ allSum(allGoods) +'">'+ obj.ditchI[i1]['value'] +'</th>';
                                    }else{
                                        sbitch+='<th colspan="'+  (br*st*date*fl*goods) +'">'+ obj.ditchI[i1]['value'] +'</th>';
                                    }
                                }
                                tableHeader.find('tr.ditch_code').empty().html(sbitch);
                            }else{
                                brand_codeF();
                                suAllGoods=allGoods.slice();
                                tableHeader.find('tr.ditch_code').empty();
                            }
                        }else{
                            if(obj.ditchIL>=1){
                                for(var i1=0;i1<obj.ditchIL;i1++){
                                    brand_codeF();
                                    sbitch+='<th colspan="'+  (br*st*date*fl*goods) +'">'+ obj.ditchI[i1]['value'] +'</th>';
                                }
                                tableHeader.find('tr.ditch_code').empty().html(sbitch);
                            }else{
                                brand_codeF();
                                tableHeader.find('tr.ditch_code').empty();
                            }
                        }
                    }
                    if(goodIds.val()==0){
                        if(obj.supplierIL>=1){
                            ssu+='<th rowspan="'+ (8) +'">'+ $('#Dimension').val() +'</th>';
                            for(var i=0;i<obj.supplierIL;i++){
                                ditch_codeF();
                                if(obj.goodsIdIL>=1){
                                    ssu+='<th colspan="'+ allSum(suAllGoods) +'">'+ obj.supplierI[i]['value'] +'</th>';
                                }else{
                                    ssu+='<th colspan="'+ (bitch*br*st*date*fl*goods) +'">'+ obj.supplierI[i]['value'] +'</th>';
                                }
                            }
                            tableHeader.find('tr.supplier_code').empty().html(ssu);
                        }else{
                            ditch_codeF();
                            ssu+='<th rowspan="'+ (8) +'">'+ $('#Dimension').val() +'</th>';
                            tableHeader.find('tr.supplier_code').empty().html(ssu);
                        }
                    }else{
                        if(obj.supplierIL>=1){
                            ssu+='<th rowspan="'+ (8) +'">'+ $('#Dimension').val() +'</th>';
                            for(var i=0;i<obj.supplierIL;i++){
                                ditch_codeF();
                                ssu+='<th colspan="'+ (bitch*br*st*date*fl*goods) +'">'+ obj.supplierI[i]['value'] +'</th>';
                            }
                            tableHeader.find('tr.supplier_code').empty().html(ssu);
                        }else{
                            ditch_codeF();
                            ssu+='<th rowspan="'+ (8) +'">'+ $('#Dimension').val() +'</th>';
                            tableHeader.find('tr.supplier_code').empty().html(ssu);
                        }
                    }
                })();
            }
            //总列数
            var htr= $('#theader').find('tr');
            if(obj.goodsIdIL>=1){
                for(var i=0;i<htr.length;i++){
                    var aa=htr.eq(i).find('th');
                    if(i==0){
                        if(aa.length>=2){
                            for(var j=1;j<aa.length;j++){
                                allColmns+=Number(aa.eq(j).attr('colspan'));
                            }
                            break;
                        }
                    }else{
                        if(aa.length>=1){
                            for(var j=0;j<aa.length;j++){
                                allColmns+=Number(aa.eq(j).attr('colspan'));
                            }
                            break;
                        }
                    }
                }
            }else{
                allColmns=su*bitch*br*st*date*fl*goods;
            }
        }
        function firstColumn(){
            var dateArr=[];
            var str='';
            var tfooterStr='';
            var dateRange=null;
            var flag=true,flag2=true;
            var dimensionVal=dimension.val();
            if(dimensionVal=='年度'){
                dateRange=dimension.nextAll('div.years').find('select');
                var dateRangeInput=dimension.nextAll('div.years').find('input');
                if(Number(dateRange.eq(0).val())==Number(dateRange.eq(1).val())){
                    dateArr.push(Number(dateRange.eq(0).val()));
                }else{
                    for(var s=Number(dateRange.eq(0).val());s<=Number(dateRange.eq(1).val());s++){
                        dateArr.push(s);
                    }
                }
                flag=false;
            }else if(dimensionVal=='月份'){
                dateRange=dimension.nextAll('div.month').find('input');
                if(dateRange.eq(0).val()==''&&dateRange.eq(1).val()!=''){
                    dateArr=getMonth(dateRange.eq(1).val(),dateRange.eq(1).val());
                }else if(dateRange.eq(0).val()!=''&&dateRange.eq(1).val()==''){
                    dateArr=getMonth(dateRange.eq(0).val(),dateRange.eq(0).val());
                }else{
                    dateArr=getMonth(dateRange.eq(0).val(),dateRange.eq(1).val());
                }
                flag=false;
            }else if(dimensionVal=='日期'){
                dateRange=dimension.nextAll('div.date').find('input');
                if(dateRange.eq(0).val()==''&&dateRange.eq(1).val()!=''){
                    dateArr=getDays(dateRange.eq(1).val(),dateRange.eq(1).val());
                }else if(dateRange.eq(0).val()!=''&&dateRange.eq(1).val()==''){
                    dateArr=getDays(dateRange.eq(0).val(),dateRange.eq(0).val());
                }else{
                    dateArr=getDays(dateRange.eq(0).val(),dateRange.eq(1).val());
                }
                flag=false;
            }else{
                dateArr=arrList[dimensionData[dimensionVal]];
                console.log(arrList);
                flag2=false;
            }
            columns=allColmns;
            //选择了其他
            if(!flag2){
                for(var a=0;a<dateArr.length+1;a++){
                    if(a==dateArr.length){
                        tfooterStr+='<tr><td>算数平均值<br/>最大值<br/>最小值</td>';
                        for(var b=0;b<allColmns;b++){
                            tfooterStr+='<td  class="td'+ (b+1) +'"></td>'
                        }
                        tfooterStr+='</tr>';
                    }else{
                        str+='<tr><td>'+ dateArr[a]['value'] +'</td>';
                        for(var b=0;b<allColmns;b++){
                            str+='<td id="'+ arrId[b]+'-'+dateArr[a]['name'] +'" class="td'+ (b+1) +'"></td>';
                        }
                        str+='</tr>';
                    }
                }
                tableBody.empty().html(str);
                $('#tfooter').empty().html(tfooterStr);
            }
            if(!flag){//选择了时间
                if(typeof dateArr=='string'){
                    dateArr=dateArr.split(',');
                }
                for(var i=0;i<dateArr.length+1;i++){
                    if(i==dateArr.length){
                        tfooterStr+='<tr><td>算数平均值<br/>最大值<br/>最小值</td>';
                        for(var b=0;b<allColmns;b++){
                            tfooterStr+='<td  class="td'+ (b+1) +'"></td>'
                        }
                        tfooterStr+='</tr>';
                    }else{
                        var a=0;
                        if(dateArr[i].toString().length<5){
                            a=dateArr[i];
                        }else{
                            a=dateArr[i].split('-').join('');
                        }
                        str+='<tr><td>'+ dateArr[i] +'</td>';
                        for(var j=0;j<allColmns;j++){
                            str+='<td id="'+ arrId[j]+'-'+a +'"  class="td'+ (j+1) +'"></td>';
                        }
                        str+='</tr>';
                    }
                }
                tableBody.empty().html(str);
                $('#tfooter').empty().html(tfooterStr);
            }
        }
    }

    //查询参数的时间
    var syears=$('#syears'),smonth=$('#smonth'),sdate=$('#sdate'),sInput='';
    //展示维度的时间
    var years=$('#years'),month=$('#month'),date=$('#date');

    //获取表格数据
    function getData(){
        renderingData.length=0;
        for(var i=0;i<fieldsData.length;i++){
            queryData.type=fieldsData[i].type;
            queryData.fields=fieldsData[i].fields;
            $.ajax({
                url:'/maochao/aidecision/rest/selectAiDecisionByEntityVo.json',
                contentType: "application/json;charset=utf-8",
                type:"POST",
                dataType: 'json',
                async:false,
                data:JSON.stringify(queryData),
                success:function(data){
                    renderingData.push(data);
                },
                error:function(data){}
            });
        }
    }

    //渲染表格cell
    function RenderingCellDOM(){
        var data=null,keyValue=null,tbody=$('#tbodyer'),tfooter=$('#tfooter');
        for(var i=0;i<renderingData.length;i++){
            data=null;
            data=renderingData[i];
            for(var key in data.dataMap){
                keyValue=document.getElementById(key);
                if(keyValue){keyValue.innerHTML=data.dataMap[key];}
            }
        }
//    计算最底部数据
        for(var i=0;i<columns;i++){
            var td=tbody.find('td.td'+(i+1)),tdLast=tfooter.find('td.td'+(i+1)),
                length=td.length,countArr=[],str='', _kk='';
            if(td.eq(0).text().indexOf('%')>=0){
                _kk='%';
            }
            for(var j=0;j<length;j++){
                var kk=td.eq(j).text();
                if(kk==''){
                    countArr.push('');
                }else{
                    countArr.push(parseFloat(kk));
                }
            }
            var count=averageMaxMin(countArr);
            str+=count.average +_kk+'<br/>' + count.max +_kk+'<br/>' +count.min +_kk;
            tdLast.html(str);
        }
    }
//计算数组中最大值，最小值，平均值
    function averageMaxMin(arr){
        var average=0,max=0,min=0,sum=0,k=0;
        var length=arr.length;
        for(var i=0;i<length;i++){
            if(arr[i]!=''){
                sum+=arr[i];
                k++;
            }
        }
        max=Math.max.apply(null, arr);
        min=Math.min.apply(null, arr);
        average=sum==0?0:(sum/k).toFixed(2);
        return {
            max:max,
            min:min,
            average:average
        }
    }
    //点击查询时的验证
    function VerificationCondition(){
        var navBarFlag=false;//用来判断是否选择了至少一个查询参数
        if(timeSelect.val()=='时间选择'&& dimension.val()!='年度'&&dimension.val()!='月份'&&dimension.val()!='日期'){
            alert('请在时间或者是展示维度中选择一个时间范围');
            return false;
        }
        //必须有一个查询参数
        if(tableData.flow.data.length<1){
            alert('请选择至少一个查询参数');
            return false;
        }
        readQueryData();
        //判断时间条件如果是月份，日期，不能为空，提供时间查询 参数
        if(!timeData()){
            return false;
        }
        //判断展示维度如果是月份、日期，不能为空
        if(!dimensionInformation()){
            return false;
        }
        if(chuFlag==='line'){
            if(chuNum>2){
                alert('查看图表时，不易查询过多选项');
                chuFlag=allChuFlag;
                return false;
            }
            if(tableData.data_date.data.length>=2){
                if(chuNum>1){
                    alert('在搜索条件时间选择时，不能再多选其他搜索条件');
                    chuFlag=allChuFlag;
                    return false;
                }

            }
        }
        return true;
    }

    function queryDataF(){
        var timeSelectVal=timeSelect.val();
        var data_date=[];
        //时间
        if(timeSelectVal!='时间选择'){
            tableData.data_date.flag=0;
            tableData.data_date.data.length=0;
            if(timeSelectVal=='年度'){
                tableData.data_date.flag='syears';
                tableData.data_date.start=syears.find('select').eq(0).val();
                tableData.data_date.end=syears.find('select').eq(1).val();
                tableData.data_date.num=syears.find('input').val();
                for(var i=tableData.data_date.start;i<=tableData.data_date.end;i++){
                    tableData.data_date.data.push({"name":i,"value":i});
                }
            }
            if(timeSelectVal=='月份'){
                sInput=smonth.find('input');
                tableData.data_date.flag='smonth';
                tableData.data_date.start=sInput.eq(0).val();
                tableData.data_date.end=sInput.eq(1).val();
                tableData.data_date.num=sInput.eq(2).val();
                data_date=getMonth(tableData.data_date.start,tableData.data_date.end);
                for(var i=0;i<data_date.length;i++){
                    tableData.data_date.data.push({"name":data_date[i].split('-').join(''),value:data_date[i]});
                }
            }
            if(timeSelectVal=='日期'){
                sInput=sdate.find('input');
                tableData.data_date.flag='sdate';
                tableData.data_date.start=sInput.eq(0).val();
                tableData.data_date.end=sInput.eq(1).val();
                tableData.data_date.num=sInput.eq(2).val();
                data_date=getDays(tableData.data_date.start,tableData.data_date.end).split(',');
                for(var i=0;i<data_date.length;i++){
                    tableData.data_date.data.push({"name":data_date[i].split('-').join(''),value:data_date[i]});
                }
            }
        }
        if(!VerificationCondition()){
            return false;
        }
        if(goodsId.val()!=0){
            var goodsArr=goodsId.val().split(/[ \n， ,]+/);
            for(var i=0;i<queryData.conditions.length;i++){
                if(queryData.conditions[i]['name']=='goods_id'){
                    queryData.conditions.splice(queryData.conditions.indexOf(queryData.conditions[i]),1);
                }
                //if(queryData.conditions[i]['name']=='brand_code'){
                //    queryData.conditions[i].values.length=0;
                //}
            }
            if(goodsArr.length>=2){
                queryData.conditions.unshift({"name":"goods_id","condition":"IN","values":goodsArr});
            }else{
                queryData.conditions.unshift({"name":"goods_id","condition":"=","values":goodsArr});
            }
            queryData.queryType=2;
        }else{
            for(var i=0;i<queryData.conditions.length;i++){
                if(queryData.conditions[i]['name']=='goods_id'){
                    queryData.conditions.splice(queryData.conditions.indexOf(queryData.conditions[i]),1);
                }
            }
            if(explosionFlag&&allFlag){
                delete queryData.queryType;
            }
        }
        getData();
        if(renderingData){
            tableData.goodsId.data.length=0;
            for(var i=0;i<renderingData.length;i++){
                for(var j=0;j<renderingData[i].goodsList.length;j++){
                    tableData.goodsId.data.push(renderingData[i].goodsList[j]);
                }
            }
        }else{
            tableData.goodsId.data.length=0;
        }
        //折线图
        if(chuFlag==='line'){
            tableIcon.find('span').removeClass('active');
            chart.find('span').addClass('active');
            flowMultiselect.attr('data-chu','false');
            echartsDiv.show();
            table.hide();
            tableHeader(true);
            echartOption();
        }else if(chuFlag==='table'){//表格
            tableIcon.find('span').addClass('active');
            chart.find('span').removeClass('active');
            flowMultiselect.attr('data-chu','true');
            echartsDiv.hide();
            table.show();
            //表格头部
            tableHeader(false);
            RenderingCellDOM();

            //增加排序功能
            var col=columns,lift=0;
            if(saveColumn!==''){
                col = saveColumn;
            }
            if(ascendingOrder!==''){
                lift=ascendingOrder;
            }
            if(GetQueryString('column')){
                col=Number(GetQueryString('column'));
            }
            table.tablesorter({
                widgets        : ['zebra', 'columns'],
                usNumberFormat : true,
                sortReset      : true,
                sortRestart    : true,
                sortList:[[col,lift]]//第一列升序
            });
            table.trigger( 'updateAll' );
        }
    }
    //点击查询
    clickQuery.on('click',function(){
        queryDataF();
    });
    //爆款
    var checkboxFlowId=null;
    exgoods.on('click',function(){
        fieldsData.push({type:1,fields:["index6"]});
        queryDataCommon={
            "conditions": [
                {"name": "brand_code", "condition": "!=", "values": ["all"]},
                {"name": "supplier_code", "condition": "!=", "values": ["all"]},
                {"name": "shop_code", "condition": "!=", "values": ["all"]},
                {"name": "ditch_code", "condition": "!=", "values": ["all"]}
            ]
        };
        var insideData1={};
        $.extend(true,insideData1,dataChach);
        supplier_codeF(insideData1);
        navBar.html('');
        dimension.html('');
        var str='';
        var flagData=['公司','渠道','品牌','仓库/店铺','年度','月份','日期'];//'渠道','区域/类目'
        tableData.shop_code.data.length=0;
        tableData.data_date.flag='0';
        tableData.supplier_code.data.length=0;
        tableData.ditch_code.data.length=0;
        tableData.brand_code.data.length=0;
        tableData.goodsId.data.length=0;
        tableData.customer_code.data.length=0;
        tableData.flow.data.length=0;
        var str1='';
        for(var i=0;i<flagData.length;i++){
            str1+='<option>'+ flagData[i] +'</option>';
        }
        dimension.html(str1);
        if(explosionFlag){
            chuNum=2;
            explosionFlag=false;
            $(this).removeClass('btn-success').addClass('btn-primary');
            queryData={
                "fields":["index6"],
                "type":1,
                "conditions":[
                    {"name":"supplier_code","condition":"=","values":["all"]},
                    {"name":"brand_code","condition":"=","values":["all"]},
                    {"name":"shop_code","condition":"=","values":['all']},
                    {"name":"ditch_code","condition":"=","values":["all"]},
                    {"name":"customer_code","condition":"=","values":["all"]},
                    {"name":"data_date","condition":"BETWEEN","values":["all"]}
                ],
                "dimensions":[{"name":"data_date"}],
                "sorts":[],
                "queryType":1
            };
            tableData.flow.data.push({"name":"index6","value":"详情页访客数","type":1});
            checkboxFlowId=searchFilter.find('div.flow').find('a');
            for(var i=0;i<tableData['flow'].data.length;i++){
                for(var j=0;j<checkboxFlowId.length;j++){
                    if(checkboxFlowId.eq(j).attr('data-header-name')==tableData['flow'].data[i]['name']){
                        checkboxFlowId.eq(j).find('input').attr("data-flag",false).prop("checked",true);
                        flowcheckboxheader.push(tableData['flow'].data[i]['value']);
                        flowcheckboxheaderName.push(tableData['flow'].data[i]['name']);
                        flowType.push(tableData['flow'].data[i]['type']);
                    }
                }
            }
            for(var key in tableData){
                if(key=='flow'){
                    str+='<a href="javascript:;" class="all-classify-item" data-num="'+ tableData[key].dataNum +'" data-name="'+ tableData[key].value +'" data-flag="'+ tableData[key].dataFlag +'"><span>'+ tableData[key].value +'：';
                    for(var i=0;i<tableData[key].data.length;i++){
                        str+='<i data-header-name="'+ tableData[key].data[i]['name'] +'" class="i">'+ tableData[key].data[i]['value'] +'</i>';
                    }
                    str+='</span><i class="fa fa-close"></i></a>';
                }
            }
            navBar.html(str);
            queryData.conditions[queryData.conditions.length-1].values.length=0;
            queryData.conditions[queryData.conditions.length-1].values.push(GetDay(14).a1,GetDay(14).a);
            var input=$('div.date').find('input');
            input.eq(0).val(GetDay(14).b1);
            input.eq(1).val(GetDay(14).b);
        }else{
            chuNum=0;
            explosionFlag=true;
            $(this).removeClass('btn-primary').addClass('btn-success');
            delete queryData.queryType;
            tableData.flow.data.length=0;
            queryData.fields.length=0;
        }
        dimension.val('日期').nextAll('div.date').css('display','inline-block');
        timeSelect.val('时间选择').attr('disabled','disabled').nextAll('div').css('display','none');
    });

    // 在点击 列的时候记录点击的列数 保存起来
    var saveColumn='',ascendingOrder='';
    (function(){
        // 保存定制好的模板
        var tabledataAjax={
            "queryType":0,
            "explosionFlag":true,
            "tableData":'',
            "demosion":'',
            "saveColumn":'',
            "ascendingOrder":''
        };
        //点击保存点击的列数和升降值
        var tr=$('#theader').find('tr'),saveReport=$('#saveReport');
        tr.eq(-1).on('click','th',function(){
            saveColumn=Number( this.getAttribute('data-column') );
            if(this.getAttribute('aria-sort')==='descending'){
                ascendingOrder=1;
            }else{
                ascendingOrder=0;
            }
        });
        tr.eq(0).on('click','th',function(){
            if(Number( this.getAttribute('data-column') )===0){
                saveColumn=0;
            }
            if(this.getAttribute('aria-sort')==='descending'){
                ascendingOrder=1;
            }else{
                ascendingOrder=0;
            }
        });
        // 时间
        var status=GetQueryString('status'),nameK=GetQueryString('id');
        //从模板页面跳转过来的
        if(status==2||status==3){
            if(status==3){saveReport.hide();$('#show-hide-filter').click();}
            if(status==2){saveReport.text('修改')}
            $.ajax({
                url:'/maochao/aidecision/rest/selectReportTemplateById',
                type:"POST",
                data:{id:nameK},
                success:function(data){
                    data=JSON.parse(data);
                    data=JSON.parse(data.data.parameter);
                    var dateDay=new Date(),inputA='',tableNum= 0,selectInput,inputSelect,str='',str1='',keyData=[],flag,checkboxFlowId;
                    // 保存的列数以及升降序
                    saveColumn=data.saveColumn;
                    ascendingOrder=data.ascendingOrder;

                    dimension.val(data.demosion);//展示维度
                    tableData=data.tableData;
                    goodsId.val(tableData.goodsId.goodsIdVal);//单品
                    if(!data.explosionFlag){
                        allFlag=data.explosionFlag;
                        explosionFlag=data.explosionFlag;
                        queryData.queryType=1;
                        exgoods.removeClass('btn-success').addClass('btn-primary');
                    }
                    var dataDate=tableData.data_date||tableData.dataDate;
                    if(!tableData.data_date){
                        tableData.data_date=tableData.dataDate;
                    }
                    if(dataDate.flag!=0){
                        tableNum=dataDate.num;
                        if(dataDate.flag=='syears'){
                            syears.css('display','inline-block');
                            timeSelect.val('年度');
                            selectInput=syears.find('select');
                            inputSelect=syears.find('input');
                            if(tableNum!=0){
                                selectInput.eq(0).val(dateDay.getFullYear()-tableNum);
                                selectInput.eq(1).val(dateDay.getFullYear());
                                inputSelect.val(tableNum);
                            }else{
                                selectInput.eq(0).val(dataDate.start);
                                selectInput.eq(1).val(dataDate.start);
                            }
                        }
                        if(dataDate.flag=='smonth'){
                            smonth.css('display','inline-block');
                            timeSelect.val('月份');
                            inputA=smonth.find('input');
                            if(tableNum!=0){
                                inputA.eq(0).val(getNMonth(tableNum).prevMonth);
                                inputA.eq(1).val(getNMonth(tableNum).nextMonth);
                                inputA.eq(2).val(tableNum);
                            }else{
                                inputA.eq(0).val(dataDate.start);
                                inputA.eq(1).val(dataDate.end);
                            }
                        }
                        if(dataDate.flag=='sdate'){
                            inputA=sdate.find('input');
                            sdate.css('display','inline-block');
                            timeSelect.val('日期');
                            if(tableNum!=0){
                                inputA.eq(0).val(GetDay(tableNum).b1);
                                inputA.eq(1).val(GetDay(tableNum).b);
                                inputA.eq(2).val(tableNum);
                            }else{
                                inputA.eq(0).val(dataDate.start);
                                inputA.eq(1).val(dataDate.end);
                            }
                        }
                    }
                    if(tableData.dateDemosion.flag!=0){
                        tableNum=tableData.dateDemosion.num;
                        if(tableData.dateDemosion.flag=='years'){
                            years.css('display','inline-block');
                            dimension.val('年度');
                            selectInput=years.find('select');
                            inputSelect=years.find('input');
                            if(tableNum!=0){
                                selectInput.eq(0).val(dateDay.getFullYear()-tableNum);
                                selectInput.eq(1).val(dateDay.getFullYear());
                                inputSelect.val(tableNum);
                            }else{
                                selectInput.eq(0).val(tableData.dateDemosion.start);
                                selectInput.eq(1).val(tableData.dateDemosion.start);
                            }
                        }
                        if(tableData.dateDemosion.flag=='month'){
                            month.css('display','inline-block');
                            dimension.val('月份');
                            inputA=month.find('input');
                            if(tableNum!=0){
                                inputA.eq(0).val(getNMonth(tableNum).prevMonth);
                                inputA.eq(1).val(getNMonth(tableNum).nextMonth);
                                inputA.eq(2).val(tableNum);
                            }else{
                                inputA.eq(0).val(tableData.dateDemosion.start);
                                inputA.eq(1).val(tableData.dateDemosion.end);
                            }
                        }
                        if(tableData.dateDemosion.flag=='date'){
                            date.css('display','inline-block');
                            dimension.val('日期');
                            inputA=date.find('input');
                            if(tableNum!=0){
                                inputA.eq(0).val(GetDay(tableNum).b1);
                                inputA.eq(1).val(GetDay(tableNum).b);
                                inputA.eq(2).val(tableNum);
                            }else{
                                inputA.eq(0).val(tableData.dateDemosion.start);
                                inputA.eq(1).val(tableData.dateDemosion.end);
                            }
                        }
                    }
                    for(var key in tableData){
                        keyData=[];
                        if(tableData[key].data.length>=1){
                            if(tableData[key].data.length>=2){
                                if(key!='data_date'&&key!='dateDemosion'){
                                    chuNum++;
                                }
                            }
                            if(key!='data_date'&&key!='dateDemosion'&&key!='goodsId'){
                                str+='<a href="javascript:;" class="all-classify-item" data-num="'+ tableData[key].dataNum +'" data-name="'+ tableData[key].value +'" data-flag="'+ tableData[key].dataFlag +'"><span>'+ tableData[key].value +'：';
                                for(var i=0;i<tableData[key].data.length;i++){
                                    str+='<i data-header-name="'+ tableData[key].data[i]['name'] +'" class="i">'+ tableData[key].data[i]['value'] +'</i>';
                                }
                                str+='</span><i class="fa fa-close"></i></a>';
                                if(key!='flow'){
                                    flag=tableData[key].dataFlag;
                                    for(var i=0;i<tableData[key].data.length;i++){
                                        keyData.push(tableData[key].data[i]['name']);
                                    }
                                    commonData(flag,keyData)
                                }
                                if(key=='flow'){
                                    var fieldsDataFlag=false;
                                    checkboxFlowId=searchFilter.find('div.flow').find('a');
                                    for(var i=0;i<tableData['flow'].data.length;i++){
                                        if(fieldsData.length==0){
                                            fieldsData.push({fields:[tableData['flow'].data[i]['name']],type:tableData['flow'].data[i]['type']});
                                            fieldscheck.push({fields:[tableData['flow'].data[i]['name']],type:tableData['flow'].data[i]['type']});
                                        }else{
                                            for(var k=0;k<fieldsData.length;k++){
                                                if(fieldsData[k].type==tableData['flow'].data[i].type){
                                                    fieldsDataFlag=true;
                                                    break;
                                                }
                                            }
                                            if(fieldsDataFlag){
                                                fieldsData[k].fields.push(tableData['flow'].data[i]['name']);
                                                fieldscheck[k].fields.push(tableData['flow'].data[i]['name']);
                                            }else{
                                                fieldsData.push({fields:[tableData['flow'].data[i]['name']],type:tableData['flow'].data[i]['type']});
                                                fieldscheck.push({fields:[tableData['flow'].data[i]['name']],type:tableData['flow'].data[i]['type']});
                                            }
                                        }
                                        for(var j=0;j<checkboxFlowId.length;j++){
                                            if(checkboxFlowId.eq(j).attr('data-header-name')==tableData['flow'].data[i]['name']){
                                                checkboxFlowId.eq(j).find('input').attr("data-flag",false).prop("checked",true);
                                                flowcheckboxheader.push(tableData['flow'].data[i]['value']);
                                                flowcheckboxheaderName.push(tableData['flow'].data[i]['name']);
                                                flowType.push(tableData['flow'].data[i]['type']);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        if(key=='data_date'&&tableData['data_date'].flag!=0){
                            if(tableData['data_date'].flag=='syears'){str1='年份'}
                            if(tableData['data_date'].flag=='smonth'){str1='月份'}
                            if(tableData['data_date'].flag=='sdate'){str1='日期'}
                            str+='<a href="javascript:;" class="all-classify-item" data-num="'+ tableData['data_date'].dataNum +'" data-name="'+ tableData['data_date'].value +'" data-flag="'+ tableData['data_date'].dataFlag +'"><span>'+ tableData['data_date'].value +'：';
                            str+='<i data-header-name="date" class="i">'+ str1 +'</i>';
                            str+='</span><i class="fa fa-close"></i></a>';
                        }
                    }
                    navBar.html(str);
                    // 如果有chart为1
                    var type=GetQueryString('type');
                    if(type === 'line'){
                        chuFlag = 'line';
                    }else if(type === 'table'){
                        chuFlag = 'table';
                    }
                    $('#clickQuery').trigger("click");
                },
                error:function(data){
                    data=JSON.parse(data);
                    alert(data.message);
                }
            });
        }
        //点击保存
        saveReport.on('click',function(){
            tabledataAjax={
                "chuNum":chuNum,
                "queryType":0,
                "explosionFlag":true,
                "tableData":'',
                "demosion":'',
                "saveColumn":saveColumn,
                "ascendingOrder":ascendingOrder
            };
            var navBarFlag=false;//用来判断是否选择了至少一个查询参数
            if(timeSelect.val()=='时间选择'&& timeSelect.val()!='年度'&& timeSelect.val()!='月份'&& timeSelect.val()!='日期'){
                alert('请在时间或者是展示维度中选择一个时间范围');
                return;
            }
            //必须有一个查询参数
            var navBarA=navBar.find('a');
            for(var i=0;i<navBarA.length;i++){
                if(navBarA.eq(i).attr('data-flag')=='flow'){
                    navBarFlag=true;
                    break;
                }else{
                    navBarFlag=false;
                }
            }
            if(!navBarFlag){
                alert('请选择至少一个查询参数');
                return;
            }
            readQueryData();
            //判断时间条件如果是月份，日期，不能为空，提供时间查询 参数
            if(!timeData())return;
            //判断展示维度如果是月份、日期，不能为空
            if(!dimensionInformation())return;
            var timeSelectVal=timeSelect.val();
            var dimesionVal=dimension.val();
            //时间
            if(timeSelectVal!='时间选择'){
                tableData.data_date.flag=0;
                if(timeSelectVal=='年度'){
                    tableData.data_date.flag='syears';
                    tableData.data_date.start=syears.find('select').eq(0).val();
                    tableData.data_date.end=syears.find('select').eq(1).val();
                    tableData.data_date.num=syears.find('input').val();
                }
                if(timeSelectVal=='月份'){
                    sInput=smonth.find('input');
                    tableData.data_date.flag='smonth';
                    tableData.data_date.start=sInput.eq(0).val();
                    tableData.data_date.end=sInput.eq(1).val();
                    tableData.data_date.num=sInput.eq(2).val();
                }
                if(timeSelectVal=='日期'){
                    sInput=sdate.find('input');
                    tableData.data_date.flag='sdate';
                    tableData.data_date.start=sInput.eq(0).val();
                    tableData.data_date.end=sInput.eq(1).val();
                    tableData.data_date.num=sInput.eq(2).val();
                }
            }else{
                tableData.dateDemosion.flag=0;
                if(dimesionVal=='年份'){
                    tableData.dateDemosion.flag='years';
                    tableData.dateDemosion.start=years.find('select').eq(0).val();
                    tableData.dateDemosion.end=years.find('select').eq(1).val();
                    tableData.dateDemosion.num=years.find('input').val();
                }
                if(dimesionVal=='月份'){
                    sInput=month.find('input');
                    tableData.dateDemosion.flag='month';
                    tableData.dateDemosion.start=sInput.eq(0).val();
                    tableData.dateDemosion.end=sInput.eq(1).val();
                    tableData.dateDemosion.num=sInput.eq(2).val();
                }
                if(dimesionVal=='日期'){
                    sInput=date.find('input');
                    tableData.dateDemosion.flag='date';
                    tableData.dateDemosion.start=sInput.eq(0).val();
                    tableData.dateDemosion.end=sInput.eq(1).val();
                    tableData.dateDemosion.num=sInput.eq(2).val();
                }
            }
            //单品
            if(goodsId.val()!=0){
                tableData.goodsId.goodsIdVal=goodIds.val();
                tabledataAjax.queryType=2;
            }
            //维度
            tabledataAjax.demosion=dimension.val();
            //爆款
            if(!explosionFlag&&goodIds.val()==0){
                tabledataAjax.queryType=1;
                tabledataAjax.explosionFlag=false;
            }
            tabledataAjax.tableData=tableData;
            //判断是添加 修改 查看
            if(status==1||status=='null'||!status){
                var nam1=prompt("请输入报表模板名称","");
                if(confirm('是否确定保存？')){
                    if(nam1){
                        $.ajax({
                            url:"/maochao/aidecision/rest/addSaveReportTemplate",
                            type:"POST",
                            data:{
                                "name":nam1,
                                "parameter":JSON.stringify(tabledataAjax)
                            },success:function(data){
                                data=JSON.parse(data);
                                if(data.data==1){
                                    alert('操作成功');
                                }else{
                                    alert('操作失败，请重试');
                                }
                            },error:function(data){
                                data=JSON.parse(data);
                                alert('操作失败，请重试');
                            }
                        });
                    }
                }
            }
            if(status==2){
                if(confirm('是否确定修改？')){
                    $.ajax({
                        url:"/maochao/aidecision/rest/updateSaveReportTemplate",
                        type:"POST",
                        data:{
                            "id":nameK,
                            "parameter":JSON.stringify(tabledataAjax)
                        },success:function(data){
                            data=JSON.parse(data);
                            if(data.data==1){
                                alert('操作成功');
                            }else{
                                alert('操作失败，请重试');
                            }
                        },error:function(data){
                            data=JSON.parse(data);
                            alert('操作失败，请重试');
                        }
                    });
                }
            }
        });
    })();

    /*折线图*/
    chart.on('click',function(){
        allChuFlag=chuFlag;
        chuFlag='line';
        if(queryData.dimensions.length>0){
            queryDataF();
        }else{
            $('#timeSelect').attr('disabled','disabled');
            tableIcon.find('span').removeClass('active');
            $(this).find('span').addClass('active');
            flowMultiselect.attr('data-chu','false');
            echartsDiv.show();
            table.hide();
            $('#exportExcel').addClass('disabled');
        }
    });
//表格
    tableIcon.on('click',function(){
        allChuFlag=chuFlag;
        chuFlag='table';
        if(queryData.dimensions.length>0) {
            queryDataF();
        }else{
            $(this).find('span').addClass('active');
            chart.find('span').removeClass('active');
            flowMultiselect.attr('data-chu','true');
            echartsDiv.hide();
            table.show();
            $('#exportExcel').removeClass('disabled');
        }
    });
//折线图
    (function(){
        var compare = function (prop) {
            return function (obj1, obj2) {
                var val1 = obj1[prop];
                var val2 = obj2[prop];
                if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
                    val1 = Number(val1);
                    val2 = Number(val2);
                }
                if (val1 < val2) {
                    return 1;
                } else if (val1 > val2) {
                    return -1;
                } else {
                    return 0;
                }
            }
        }
        window.onresize=function(){
            if(chuFlag==='line'){
                echartOption();
            }
        };
        window.echartOption=function echartOption(){
            var legendxAxisData=legendxAxisF();
            if(!legendxAxisData){return false;}
            var seriesData=seriesF(legendxAxisData);
            var myChart = echarts.init(document.getElementById('echarts'));
            var option = {
                title: {
                    text:legendxAxisData.text,
                    subtext: tableData.flow.data[0].value
                },
                tooltip: {
                    trigger: 'axis',
                    formatter:function(params){
                        var value=params[0].axisValue;
                        var data=params.sort(compare('data'));
                        var res=value;
                        for(var i=0;i<data.length;i++){
                            res+='<div class="colorBar"><p style="background:'+ data[i].color +'"></p>'+data[i].seriesName+'：'+ data[i].data + "</div>";
                        }
                        return res;
                    }

                },
                legend: {
                    width:'90%',
                    data:legendxAxisData.legendData
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: legendxAxisData.xAxisData
                },
                yAxis: {
                    type: 'value',
                    scale:true
                },
                series: seriesData
            };
            myChart.setOption(option);
            myChart.resize();
        }
        function seriesF(data){
            var map={};
            var seriesData=[];
            var name='';
            var seriesDataData=[];
            var flag=false;
            for(var k=0;k<renderingData.length;k++){
                for(var key in renderingData[k].dataMap){
                    map[key]=renderingData[k].dataMap[key];
                }
            }
            for(var i=0;i<data.legendData.length;i++){
                name=data.legendData[i];
                seriesDataData.length=0;
                for(var j=0;j<data.xAxisName.length;j++){
                    flag=false;
                    for(var key in map){
                        if(key.indexOf(data.legendName[i])>=0&&key.indexOf(data.xAxisName[j])>=0){
                            if(!map[key]){
                                seriesDataData.push(0);
                            }else{
                                seriesDataData.push(parseInt(map[key]));
                            }
                            flag=true;
                        }
                    }
                    if(!flag){
                        seriesDataData.push(0);
                    }
                }
                var insideData=[];
                $.extend(true,insideData,seriesDataData);
                seriesData.push({
                    name:name,
                    type:'line',
                    //stack: '总量',
                    data:insideData
                });
            }
            return seriesData;
        }
        function legendxAxisF(){
            var qiehuan=false;
            var legendFlag=false;
            var legendData=[];
            var legendName=[];
            var xAxisName=[];
            var xAxisData=[];
            var goodsList=[];
            var text='';
            for(var i=0;i<renderingData.length;i++){
                for(var j=0;j<renderingData[i].goodsList.length;j++){
                    goodsList.push(renderingData[i].goodsList[j]);
                }
            }
            function chuFlagNum(flag){
                dimensionInformation();
                if(objTable.length>0){
                    if(dimension.val()=='月份'){
                        if(flag){
                            legendData=getMonth(objTable[0],objTable[1]);
                            for(var i=0;i<legendData.length;i++){
                                legendName.push(legendData[i].split('-').join(''));
                            }
                        }else{
                            xAxisData=getMonth(objTable[0],objTable[1]);
                            for(var i=0;i<xAxisData.length;i++){
                                xAxisName.push(xAxisData[i].split('-').join(''));
                            }
                        }
                    }
                    if(dimension.val()=='日期'){
                        if(flag){
                            legendData=getDays(objTable[0],objTable[1]).split(',');
                            for(var i=0;i<legendData.length;i++){
                                legendName.push(legendData[i].split('-').join(''));
                            }
                        }else{
                            xAxisData=getDays(objTable[0],objTable[1]).split(',');
                            for(var i=0;i<xAxisData.length;i++){
                                xAxisName.push(xAxisData[i].split('-').join(''));
                            }
                        }
                    }
                    if(dimension.val()=='年度'){
                        if(flag){
                            for(var i=objTable[0];i<=objTable[1];i++){
                                legendData.push(i);
                                legendName.push(i);
                            }
                        }else{
                            for(var i=objTable[0];i<=objTable[1];i++){
                                xAxisData.push(i);
                                xAxisName.push(i);
                            }
                        }
                    }
                }else{
                    if(dimension.val()=='公司'){
                        if(flag){
                            for(var i=0;i<arrList.supplier_code.length;i++){
                                legendData.push(arrList.supplier_code[i].value);
                                legendName.push(arrList.supplier_code[i].name);
                            }
                        }else{
                            for(var i=0;i<arrList.supplier_code.length;i++){
                                xAxisData.push(arrList.supplier_code[i].value);
                                xAxisName.push(arrList.supplier_code[i].name);
                            }
                        }

                    }
                    if(dimension.val()=='渠道'){
                        if(flag){
                            for(var i=0;i<arrList.ditch_code.length;i++){
                                legendData.push(arrList.ditch_code[i].value);
                                legendName.push(arrList.ditch_code[i].name);
                            }
                        }else{
                            for(var i=0;i<arrList.ditch_code.length;i++){
                                xAxisData.push(arrList.ditch_code[i].value);
                                xAxisName.push(arrList.ditch_code[i].name);
                            }
                        }
                    }
                    if(dimension.val()=='品牌'){
                        if(flag){
                            for(var i=0;i<arrList.brand_code.length;i++){
                                legendData.push(arrList.brand_code[i].value);
                                legendName.push(arrList.brand_code[i].name);
                            }
                        }else{
                            for(var i=0;i<arrList.brand_code.length;i++){
                                xAxisData.push(arrList.brand_code[i].value);
                                xAxisName.push(arrList.brand_code[i].name);
                            }
                        }
                    }
                    if(dimension.val()=='仓库/店铺'){
                        if(flag){
                            for(var i=0;i<arrList.shop_code.length;i++){
                                legendData.push(arrList.shop_code[i].value);
                                legendName.push(arrList.shop_code[i].name);
                            }
                        }else{
                            for(var i=0;i<arrList.shop_code.length;i++){
                                xAxisData.push(arrList.shop_code[i].value);
                                xAxisName.push(arrList.shop_code[i].name);
                            }
                        }
                    }
                }
            }
            if(chuNum==2&&explosionFlag){
                if(tableData.data_date.data.length<2){
                    if(tableData.supplier_code.data.length>=2){
                        legendFlag=true;
                        for(var i=0;i<tableData.supplier_code.data.length;i++){
                            legendData.push(tableData.supplier_code.data[i]['value']);
                            legendName.push(tableData.supplier_code.data[i]['name']);
                        }
                    }
                    if(tableData.ditch_code.data.length>=2){
                        if(legendFlag){
                            for(var i=0;i<tableData.ditch_code.data.length;i++){
                                xAxisData.push(tableData.ditch_code.data[i]['value']);
                                xAxisName.push(tableData.ditch_code.data[i]['name']);
                            }
                        }else{
                            legendFlag=true;
                            for(var i=0;i<tableData.ditch_code.data.length;i++){
                                legendData.push(tableData.ditch_code.data[i]['value']);
                                legendName.push(tableData.ditch_code.data[i]['name']);
                            }
                        }
                    }
                    if(tableData.brand_code.data.length>=2){
                        if(tableData.goodsId.data.length<=0){
                            if(legendFlag){
                                for(var i=0;i<tableData.brand_code.data.length;i++){
                                    xAxisData.push(tableData.brand_code.data[i]['value']);
                                    xAxisName.push(tableData.brand_code.data[i]['name']);
                                }
                            }else{
                                legendFlag=true;
                                for(var i=0;i<tableData.brand_code.data.length;i++){
                                    legendData.push(tableData.brand_code.data[i]['value']);
                                    legendName.push(tableData.brand_code.data[i]['name']);
                                }
                            }
                        }
                    }
                    if(tableData.goodsId.data.length>=2){
                        if(legendFlag){
                            for(var i=0;i<tableData.goodsId.data.length;i++){
                                xAxisData.push(tableData.goodsId.data[i]['goodsName']);
                                xAxisName.push(tableData.goodsId.data[i]['goodsId']);
                            }
                        }else{
                            legendFlag=true;
                            for(var i=0;i<tableData.goodsId.data.length;i++){
                                legendData.push(tableData.goodsId.data[i]['goodsName']);
                                legendName.push(tableData.goodsId.data[i]['goodsId']);
                            }
                        }
                    }else if(tableData.goodsId.data.length==1){
                        text=tableData.goodsId.data[0]['goodsName'];
                    }
                    if(tableData.shop_code.data.length>=2){
                        if(legendFlag){
                            for(var i=0;i<tableData.shop_code.data.length;i++){
                                xAxisData.push(tableData.shop_code.data[i]['value']);
                                xAxisName.push(tableData.shop_code.data[i]['name']);
                            }
                        }else{
                            legendFlag=true;
                            for(var i=0;i<tableData.shop_code.data.length;i++){
                                legendData.push(tableData.shop_code.data[i]['value']);
                                legendName.push(tableData.shop_code.data[i]['name']);
                            }
                        }
                    }
                    if(tableData.flow.data.length>=2){
                        if(legendFlag){
                            for(var i=0;i<tableData.flow.data.length;i++){
                                xAxisData.push(tableData.flow.data[i]['value']);
                                xAxisName.push(tableData.flow.data[i]['name']);
                            }
                        }else{
                            legendFlag=true;
                            for(var i=0;i<tableData.flow.data.length;i++){
                                legendData.push(tableData.flow.data[i]['value']);
                                legendName.push(tableData.flow.data[i]['name']);
                            }
                        }
                    }
                    if(tableData.data_date.data.length>=2){
                        if(legendFlag){
                            for(var i=0;i<tableData.data_date.data.length;i++){
                                xAxisData.push(tableData.data_date.data[i]['value']);
                                xAxisName.push(tableData.data_date.data[i]['name']);
                            }
                        }else{
                            legendFlag=true;
                            qiehuan=true;
                            for(var i=0;i<tableData.data_date.data.length;i++){
                                xAxisData.push(tableData.data_date.data[i]['value']);
                                xAxisName.push(tableData.data_date.data[i]['name']);
                            }
                        }
                    }
                }else{
                    alert('在搜索条件时间选择时，不能再多选其他搜索条件');
                    chuFlag=allChuFlag;
                    return false;
                }

            }else if(chuNum==1||!explosionFlag){
                if(!explosionFlag){
                    for(var i=0;i<goodsList.length;i++){
                        legendData.push(goodsList[i]['goodsName']);
                        legendName.push(goodsList[i]['goodsId']);
                    }
                }else{
                    if(tableData.supplier_code.data.length>=2){
                        legendFlag=true;
                        for(var i=0;i<tableData.supplier_code.data.length;i++){
                            legendData.push(tableData.supplier_code.data[i]['value']);
                            legendName.push(tableData.supplier_code.data[i]['name']);
                        }
                    }
                    if(tableData.ditch_code.data.length>=2){
                        if(!legendFlag){
                            legendFlag=true;
                            for(var i=0;i<tableData.ditch_code.data.length;i++){
                                legendData.push(tableData.ditch_code.data[i]['value']);
                                legendName.push(tableData.ditch_code.data[i]['name']);
                            }
                        }
                    }
                    if(tableData.brand_code.data.length>=2){
                        if(!legendFlag){
                            legendFlag=true;
                            for(var i=0;i<tableData.brand_code.data.length;i++){
                                legendData.push(tableData.brand_code.data[i]['value']);
                                legendName.push(tableData.brand_code.data[i]['name']);
                            }
                        }
                        if(tableData.goodsId.data.length!=1){
                            if(tableData.shop_code.data.length==1){
                                text=tableData.shop_code.data[0].value;
                            }
                        }
                    }
                    if(tableData.goodsId.data.length>=2){
                        if(!legendFlag){
                            legendFlag=true;
                            for(var i=0;i<tableData.goodsId.data.length;i++){
                                legendData.push(tableData.goodsId.data[i]['goodsName']);
                                legendName.push(tableData.goodsId.data[i]['goodsId']);
                            }
                        }
                    }else if(tableData.goodsId.data.length==1){
                        text=tableData.goodsId.data[0]['goodsName'];
                    }
                    if(tableData.flow.data.length>=2){
                        if(!legendFlag){
                            legendFlag=true;
                            for(var i=0;i<tableData.flow.data.length;i++){
                                legendData.push(tableData.flow.data[i]['value']);
                                legendName.push(tableData.flow.data[i]['name']);
                            }
                        }
                    }
                    if(tableData.shop_code.data.length>=2){
                        if(!legendFlag){
                            legendFlag=true;
                            for(var i=0;i<tableData.shop_code.data.length;i++){
                                legendData.push(tableData.shop_code.data[i]['value']);
                                legendName.push(tableData.shop_code.data[i]['name']);
                            }
                        }
                        if(tableData.brand_code.data.length==1){
                            text=tableData.brand_code.data[0].value;
                        }
                    }
                    if(tableData.data_date.data.length>=2){
                        if(!legendFlag){
                            legendFlag=true;
                            qiehuan=true;
                            for(var i=0;i<tableData.data_date.data.length;i++){
                                xAxisData.push(tableData.data_date.data[i]['value']);
                                xAxisName.push(tableData.data_date.data[i]['name']);
                            }
                        }
                    }
                }
                chuFlagNum(qiehuan);
            }else if(chuNum==0){
                if(tableData.shop_code.data.length>0){
                    legendFlag=true;
                    if(tableData.goodsId.data.length==1){
                        legendData.push(tableData.goodsId.data[0]['goodsName']+'---'+tableData.shop_code.data[0]['value']);
                    }else if(tableData.goodsId.data.length>=2){
                        for(var i=0;i<tableData.goodsId.data.length;i++){
                            legendData.push(tableData.goodsId.data[i]['goodsName']);
                            legendName.push(tableData.goodsId.data[i]['goodsId']);
                        }
                    }else{
                        if(tableData.brand_code.data.length>0){
                            legendData.push(tableData.brand_code.data[0]['value']+'---'+tableData.shop_code.data[0]['value']);
                        }else{
                            legendData.push(tableData.shop_code.data[0]['value']);
                        }
                    }
                    legendName.push(tableData.shop_code.data[0]['name']);
                }
                if(tableData.goodsId.data.length>=2){
                    if(!legendFlag){
                        legendFlag=true;
                        for(var i=0;i<tableData.goodsId.data.length;i++){
                            legendData.push(tableData.goodsId.data[i]['goodsName']);
                            legendName.push(tableData.goodsId.data[i]['goodsId']);
                        }
                    }
                }
                if(tableData.goodsId.data.length==1){
                    if(!legendFlag){
                        legendFlag=true;
                        legendData.push(tableData.goodsId.data[0]['goodsName']);
                        legendName.push(tableData.goodsId.data[0]['goodsId']);
                        text=tableData.goodsId.data[0]['goodsName'];
                    }
                }
                if(tableData.brand_code.data.length>0){
                    if(!legendFlag){
                        legendFlag=true;
                        legendData.push(tableData.brand_code.data[0]['value']);
                        legendName.push(tableData.brand_code.data[0]['name']);
                    }
                }
                if(tableData.flow.data.length>0){
                    if(!legendFlag){
                        legendFlag=true;
                        legendData.push(tableData.flow.data[0]['value']);
                        legendName.push(tableData.flow.data[0]['name']);
                    }
                }
                if(tableData.ditch_code.data.length>0){
                    if(!legendFlag){
                        legendFlag=true;
                        legendData.push(tableData.ditch_code.data[0]['value']);
                        legendName.push(tableData.ditch_code.data[0]['name']);
                    }
                }
                if(tableData.supplier_code.data.length>0){
                    if(!legendFlag){
                        legendFlag=true;
                        legendData.push(tableData.supplier_code.data[0]['value']);
                        legendName.push(tableData.supplier_code.data[0]['name']);
                    }
                }
                if(tableData.data_date.data.length>0){
                    if(!legendFlag){
                        qiehuan=true;
                        legendFlag=true;
                        xAxisData.push(tableData.data_date.data[0]['value']);
                        xAxisName.push(tableData.data_date.data[0]['name']);
                    }
                }
                chuFlagNum(qiehuan);
            }
            return {
                legendData:legendData,
                xAxisData:xAxisData,
                xAxisName:xAxisName,
                legendName:legendName,
                text:text
            }
        }
    })();
})();
