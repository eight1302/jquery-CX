/**
 * Created by chushitong on 2017/11/2.
 */
(function(){
    //选择类型展示
    $('#type1').css({"background":"#51c1f9","color":"#fff"});
    $('#type2').css({"background":"#f5f5f5","color":"#333"});
    $('#type3').css({"background":"#f5f5f5","color":"#333"});
    //类型一
    $('#type1').on('click',function(){
      $(this).css({"background":"#51c1f9","color":"#fff"});
      $('#type2').css({"background":"#f5f5f5","color":"#333"});
      $('#type3').css({"background":"#f5f5f5","color":"#333"});
      $(this).addClass("active").siblings().removeClass("active");
      $('#type2').removeClass("active");
      $('#type3').removeClass("active");
      $('#navBar').children().remove();
      $('#tbodyer').empty();
      $('#tfooter').empty();
      $('.table_head').empty();
      SearchData();
    });
  
    //类型二
    $('#type2').on('click',function(){
      $(this).css({"background":"#51c1f9","color":"#fff"});
      $('#type1').css({"background":"#f5f5f5","color":"#333"});
      $('#type3').css({"background":"#f5f5f5","color":"#333"});
      $(this).addClass("active").siblings().removeClass("active");
      $('#type1').removeClass("active");
      $('#type3').removeClass("active");
      $('#navBar').children().remove();
      $('#tbodyer').empty();
      $('#tfooter').empty();
      $('.table_head').empty();
      SearchData();
    });
  
    //类型三
    $('#type3').on('click',function(){
      $(this).css({"background":"#51c1f9","color":"#fff"});
      $('#type1').css({"background":"#f5f5f5","color":"#333"});
      $('#type2').css({"background":"#f5f5f5","color":"#333"});
      $(this).addClass("active").siblings().removeClass("active");
      $('#type1').removeClass("active");
      $('#type2').removeClass("active");
      $('#navBar').children().remove();
      $('#tbodyer').empty();
      $('#tfooter').empty();
      $('.table_head').empty();
      SearchData();
    });
    
    //用来判断是否切换 表格 折线图
    //用来判断是否是展示图表
    var insideData={};
    var chuFlag='table',allChuFlag='table',allFlag=true,
    //用来在图表是选了几次多选，目前是只能多选两项 日期也只能选择一天/月
    chuNum= 0,
    dataChach={},//缓存得到的条件数据;
        //用来存储首次加载渲染到页面的元素
    data_all = new Array(),
    dataS={
        supplier_code:[],
        ditch_code:[],
        brand_code:[],
        shop_code:[],
        warehous_code : []
    },
    //用来存储点击搜索条件后添加到页面的元素
    dataS1={
        supplier_code:[],
        ditch_code:[],
        brand_code:[],
        shop_code:[],
        warehous_code:[]
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
            "value":'客户',
            "dataNum":1,
            "flag":0,
            "data":[]
        },
        "warehous_code":{
            "dataFlag":"warehous_code",
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
                var data = [
                    {
                        "id": "000ed05c538594adbe7679b81127c348",
                        "dic_code": "ananjinchun",
                        "dic_name": "安安金纯",
                        "dic_type": "brand1",
                        "dic_ext1": null,
                        "dic_ext2": null,
                        "dic_ext3": null
                        },
                        {
                        "id": "00c07952c20a6a1240b0ed8dcf9ce440",
                        "dic_code": "chunjuan",
                        "dic_name": "春娟",
                        "dic_type": "brand1",
                        "dic_ext1": null,
                        "dic_ext2": null,
                        "dic_ext3": null
                        },
                        {
                        "id": "04b6c9e960817dd2e631d79173b6a9a0",
                        "dic_code": "lidezi",
                        "dic_name": "丽得姿",
                        "dic_type": "brand1",
                        "dic_ext1": null,
                        "dic_ext2": null,
                        "dic_ext3": null
                        },
                        {
                        "id": "0e750e802a9f38010ad300d216df9b9d",
                        "dic_code": "yaboshi",
                        "dic_name": "牙博士",
                        "dic_type": "brand1",
                        "dic_ext1": null,
                        "dic_ext2": null,
                        "dic_ext3": null
                        },
                        {
                        "id": "0f248a204ce0e631fbde3aca45579e98",
                        "dic_code": "saiwei",
                        "dic_name": "赛维",
                        "dic_type": "brand1",
                        "dic_ext1": null,
                        "dic_ext2": null,
                        "dic_ext3": null
                        },
                        {
                        "id": "119285f5875f721a5499eeac27b93833",
                        "dic_code": "yumeijing",
                        "dic_name": "郁美净",
                        "dic_type": "brand1",
                        "dic_ext1": null,
                        "dic_ext2": null,
                        "dic_ext3": null
                        },
                        {
                        "id": "124fcd31a0e1943ac407119a43eeb53d",
                        "dic_code": "66935",
                        "dic_name": "CLEAN&CLEAR/可伶可俐",
                        "dic_type": "brand1",
                        "dic_ext1": null,
                        "dic_ext2": null,
                        "dic_ext3": null
                        },
                        {
                        "id": "14329680b45a58b62c7682e46b3ee90f",
                        "dic_code": "66932",
                        "dic_name": "大宝",
                        "dic_type": "brand1",
                        "dic_ext1": null,
                        "dic_ext2": null,
                        "dic_ext3": null
                        },
                        {
                        "id": "175cc80da72124c890c3b2e27e2cec23",
                        "dic_code": "JJN101",
                        "dic_name": "晋江心怡商超仓",
                        "dic_type": "shop1",
                        "dic_ext1": null,
                        "dic_ext2": null,
                        "dic_ext3": null
                        },
                        {
                        "id": "185a9f48ebb1a05cd0c9b9b8543b0cac",
                        "dic_code": "xiangyibencao",
                        "dic_name": "相宜本草",
                        "dic_type": "brand1",
                        "dic_ext1": null,
                        "dic_ext2": null,
                        "dic_ext3": null
                        },
                        {
                        "id": "19403b35a7ce0ec89b42c02e5bc415d1",
                        "dic_code": "ALOG-0002",
                        "dic_name": "心怡广州淘宝商超仓库",
                        "dic_type": "shop1",
                        "dic_ext1": null,
                        "dic_ext2": null,
                        "dic_ext3": null
                        },
                        {
                        "id": "19623ab2eb5cf6ea0c6764b2d852549f",
                        "dic_code": "50023282",
                        "dic_name": "美发护发/假发",
                        "dic_type": "brand1",
                        "dic_ext1": null,
                        "dic_ext2": null,
                        "dic_ext3": null
                        },
                        {
                        "id": "1a1c05e6c6834ab3ff56823aeb23ea16",
                        "dic_code": "3304331",
                        "dic_name": "elsker/嗳呵",
                        "dic_type": "brand1",
                        "dic_ext1": null,
                        "dic_ext2": null,
                        "dic_ext3": null
                        },
                        {
                        "id": "1b1c99d96ad72571482acda3fc899428",
                        "dic_code": "ob",
                        "dic_name": "OB",
                        "dic_type": "brand1",
                        "dic_ext1": null,
                        "dic_ext2": null,
                        "dic_ext3": null
                        },
                        {
                        "id": "1e64bc62a52222d917c99b99b91ac668",
                        "dic_code": "100037387",
                        "dic_name": "北京润合美商贸有限公司",
                        "dic_type": "supplier1",
                        "dic_ext1": "1",
                        "dic_ext2": null,
                        "dic_ext3": null
                        },
                        {
                        "id": "1fe99c43158ecfc7bca1b3f50a446411",
                        "dic_code": "heiren",
                        "dic_name": "黑人",
                        "dic_type": "brand1",
                        "dic_ext1": null,
                        "dic_ext2": null,
                        "dic_ext3": null
                        },
                        {
                        "id": "210794ab7fb104f17e282bd5474d1969",
                        "dic_code": "100039757",
                        "dic_name": "北京美宜达科贸有限公司",
                        "dic_type": "supplier1",
                        "dic_ext1": "2",
                        "dic_ext2": null,
                        "dic_ext3": null
                        },
                        {
                        "id": "2392b2110cc8185bdcd1e285cfe1f612",
                        "dic_code": "1801",
                        "dic_name": "美容护肤/美体/精油",
                        "dic_type": "brand1",
                        "dic_ext1": null,
                        "dic_ext2": null,
                        "dic_ext3": null
                        },
                        {
                        "id": "2a5850c8f06cd61a79ff502c5fe64882",
                        "dic_code": "50023294",
                        "dic_name": "染发烫发",
                        "dic_type": "brand1",
                        "dic_ext1": null,
                        "dic_ext2": null,
                        "dic_ext3": null
                        },
                        {
                        "id": "2b04187ed4865ac63804a2ead6034bd2",
                        "dic_code": "aihe",
                        "dic_name": "嗳呵",
                        "dic_type": "brand1",
                        "dic_ext1": null,
                        "dic_ext2": null,
                        "dic_ext3": null
                        },
                        {
                        "id": "2b964beaff2e116a44ddd2ad4abb5ed4",
                        "dic_code": "20081",
                        "dic_name": "Nivea/妮维雅",
                        "dic_type": "brand1",
                        "dic_ext1": null,
                        "dic_ext2": null,
                        "dic_ext3": null
                        },
                        {
                        "id": "2c87b81c3dafb94f7192fbc817ea8399",
                        "dic_code": "121410029",
                        "dic_name": "护发",
                        "dic_type": "brand1",
                        "dic_ext1": null,
                        "dic_ext2": null,
                        "dic_ext3": null
                        },
                        {
                        "id": "2d8049c678c3be248f811a9e5a101f2b",
                        "dic_code": "ziying",
                        "dic_name": "自营",
                        "dic_type": "ditch1",
                        "dic_ext1": null,
                        "dic_ext2": null,
                        "dic_ext3": null
                        },
                        {
                        "id": "32f4ec8905446ff4400fc0f03845a512",
                        "dic_code": "3459747",
                        "dic_name": "LEADERS/丽得姿",
                        "dic_type": "brand1",
                        "dic_ext1": null,
                        "dic_ext2": null,
                        "dic_ext3": null
                        },
                        {
                        "id": "33d57dbc4222d4554c5144059f8d29a6",
                        "dic_code": "3304242",
                        "dic_name": "PZH/片仔癀",
                        "dic_type": "brand1",
                        "dic_ext1": null,
                        "dic_ext2": null,
                        "dic_ext3": null
                        },
                        {
                        "id": "33fd8890b045273fdab493ab4a1cc310",
                        "dic_code": "3425417",
                        "dic_name": "o．b．",
                        "dic_type": "brand1",
                        "dic_ext1": null,
                        "dic_ext2": null,
                        "dic_ext3": null
                        },
                        {
                        "id": "350c7c10f25a8f53192c78fa63204341",
                        "dic_code": "ALOG-0003",
                        "dic_name": "心怡天津淘宝商超仓库",
                        "dic_type": "shop1",
                        "dic_ext1": null,
                        "dic_ext2": null,
                        "dic_ext3": null
                        },
                        {
                        "id": "367ed9a1c7433ec0fc1ea52ed6f48841",
                        "dic_code": "hongruilai",
                        "dic_name": "红瑞徕",
                        "dic_type": "brand1",
                        "dic_ext1": null,
                        "dic_ext2": null,
                        "dic_ext3": null
                        },
                        {
                        "id": "36b504683e1b848b49f403455935f69c",
                        "dic_code": "HFE101",
                        "dic_name": "科捷合肥商超仓",
                        "dic_type": "shop1",
                        "dic_ext1": null,
                        "dic_ext2": null,
                        "dic_ext3": null
                        },
                        {
                        "id": "378a874b5f600aa216902d454d432d9c",
                        "dic_code": "50011991",
                        "dic_name": "其他保养",
                        "dic_type": "brand1",
                        "dic_ext1": null,
                        "dic_ext2": null,
                        "dic_ext3": null
                        },
                        {
                        "id": "3795cea8406f218260b7065e0a1f0529",
                        "dic_code": "ALOG-0004",
                        "dic_name": "心怡苏州淘宝商超仓库",
                        "dic_type": "shop1",
                        "dic_ext1": null,
                        "dic_ext2": null,
                        "dic_ext3": null
                        },
                        {
                        "id": "383b16fde648d424702971c878988935",
                        "dic_code": "57597007",
                        "dic_name": "Johnson’s baby/强生婴儿",
                        "dic_type": "brand1",
                        "dic_ext1": null,
                        "dic_ext2": null,
                        "dic_ext3": null
                        },
                        {
                        "id": "3945063e0d596edbedd4aa4c1c52f765",
                        "dic_code": "HGH101",
                        "dic_name": "华东萧山百世商超仓",
                        "dic_type": "shop1",
                        "dic_ext1": null,
                        "dic_ext2": null,
                        "dic_ext3": null
                        },
                        {
                        "id": "3cce9ba6adcb74158ba4500fcfcd60ba",
                        "dic_code": "qita",
                        "dic_name": "其他",
                        "dic_type": "brand1",
                        "dic_ext1": null,
                        "dic_ext2": null,
                        "dic_ext3": null
                        },
                        {
                        "id": "3d39faf191c50335070d223754b939ac",
                        "dic_code": "20080",
                        "dic_name": "Neutrogena/露得清",
                        "dic_type": "brand1",
                        "dic_ext1": null,
                        "dic_ext2": null,
                        "dic_ext3": null
                        },
                        {
                        "id": "3df96054d5210e192225149b1a965f50",
                        "dic_code": "187206347",
                        "dic_name": "青蛙",
                        "dic_type": "brand1",
                        "dic_ext1": null,
                        "dic_ext2": null,
                        "dic_ext3": null
                        },
                        {
                        "id": "3fbdfd68513a54ebfb28d99b56dadac4",
                        "dic_code": "anan",
                        "dic_name": "安安",
                        "dic_type": "brand1",
                        "dic_ext1": null,
                        "dic_ext2": null,
                        "dic_ext3": null
                        },
                        {
                        "id": "41ef3b0f55baeccdb3f16c8f1794bb54",
                        "dic_code": "fenghua",
                        "dic_name": "蜂花",
                        "dic_type": "brand1",
                        "dic_ext1": null,
                        "dic_ext2": null,
                        "dic_ext3": null
                        },
                        {
                        "id": "43b802a9bc163cfad93e32516323cbf4",
                        "dic_code": "50011982",
                        "dic_name": "防晒",
                        "dic_type": "brand1",
                        "dic_ext1": null,
                        "dic_ext2": null,
                        "dic_ext3": null
                        },
                        {
                        "id": "48dfff26fa099b076165d599bdf54ca0",
                        "dic_code": "50023293",
                        "dic_name": "头发造型",
                        "dic_type": "brand1",
                        "dic_ext1": null,
                        "dic_ext2": null,
                        "dic_ext3": null
                        },
                        {
                        "id": "4a874d380dd642c99504c596c50818a6",
                        "dic_code": "121408009",
                        "dic_name": "T区护理（新）",
                        "dic_type": "brand1",
                        "dic_ext1": null,
                        "dic_ext2": null,
                        "dic_ext3": null
                        },
                        {
                        "id": "4bb02b2fdcff43cd060ae5a2825c4f50",
                        "dic_code": "yunnanbaiyao",
                        "dic_name": "云南白药",
                        "dic_type": "brand1",
                        "dic_ext1": null,
                        "dic_ext2": null,
                        "dic_ext3": null
                        },
                        {
                        "id": "4c4c2cd4b5ce935530983fdb4e5eedd3",
                        "dic_code": "50023283",
                        "dic_name": "假发",
                        "dic_type": "brand1",
                        "dic_ext1": null,
                        "dic_ext2": null,
                        "dic_ext3": null
                        },
                        {
                        "id": "4eada97720161ceaca275c2a9434b127",
                        "dic_code": "121454013",
                        "dic_name": "眼部护理（新）",
                        "dic_type": "brand1",
                        "dic_ext1": null,
                        "dic_ext2": null,
                        "dic_ext3": null
                        },
                        {
                        "id": "5065623578032a56a888b2ec97f0a56f",
                        "dic_code": "gongdeng",
                        "dic_name": "宫灯",
                        "dic_type": "brand1",
                        "dic_ext1": null,
                        "dic_ext2": null,
                        "dic_ext3": null
                        },
                        {
                        "id": "50c3ac9a7794412c3838baa5b113b706",
                        "dic_code": "zhaogui",
                        "dic_name": "昭贵",
                        "dic_type": "brand1",
                        "dic_ext1": null,
                        "dic_ext2": null,
                        "dic_ext3": null
                        },
                        {
                        "id": "536bde0aa442b212ea6622348646b91b",
                        "dic_code": "CSX101",
                        "dic_name": "百世长沙商超仓",
                        "dic_type": "shop1",
                        "dic_ext1": null,
                        "dic_ext2": null,
                        "dic_ext3": null
                        },
                        {
                        "id": "53a32f8cee7a0d89594110e1a48a7fda",
                        "dic_code": "qiangshengmeiji",
                        "dic_name": "强生美肌",
                        "dic_type": "brand1",
                        "dic_ext1": null,
                        "dic_ext2": null,
                        "dic_ext3": null
                        },
                        {
                        "id": "550875dd4bda3aa049ff15936263d5e8",
                        "dic_code": "miqi",
                        "dic_name": "迷奇",
                        "dic_type": "brand1",
                        "dic_ext1": null,
                        "dic_ext2": null,
                        "dic_ext3": null
                        },
                        {
                        "id": "562a00b1f5590f10d44012a5731f2c43",
                        "dic_code": "fumeiling",
                        "dic_name": "肤美灵",
                        "dic_type": "brand1",
                        "dic_ext1": null,
                        "dic_ext2": null,
                        "dic_ext3": null
                        },
                        {
                        "id": "56c4cd2019cf07a89eac531235c2f8d2",
                        "dic_code": "o.b.",
                        "dic_name": "o.b.",
                        "dic_type": "brand1",
                        "dic_ext1": null,
                        "dic_ext2": null,
                        "dic_ext3": null
                        },
                        {
                        "id": "58eaa2dbdb88f4affda6393fb9f785dc",
                        "dic_code": "50011978",
                        "dic_name": "化妆水/爽肤水",
                        "dic_type": "brand1",
                        "dic_ext1": null,
                        "dic_ext2": null,
                        "dic_ext3": null
                        },
                        {
                        "id": "5e6dce5ae0a75674afbaf83ac536a10c",
                        "dic_code": "qingwa",
                        "dic_name": "青蛙",
                        "dic_type": "brand1",
                        "dic_ext1": null,
                        "dic_ext2": null,
                        "dic_ext3": null
                        },
                        {
                        "id": "6170016c8d061a11a0e7712115e5da5e",
                        "dic_code": "50011980",
                        "dic_name": "乳液/面霜",
                        "dic_type": "brand1",
                        "dic_ext1": null,
                        "dic_ext2": null,
                        "dic_ext3": null
                        },
                        {
                        "id": "619b848ab0831f34c6d391d678e506b0",
                        "dic_code": "121396029",
                        "dic_name": "洗发水",
                        "dic_type": "brand1",
                        "dic_ext1": null,
                        "dic_ext2": null,
                        "dic_ext3": null
                        },
                        {
                        "id": "65ff2c121a77c0944c2b99069888d02d",
                        "dic_code": "lishidelin",
                        "dic_name": "李施德林",
                        "dic_type": "brand1",
                        "dic_ext1": null,
                        "dic_ext2": null,
                        "dic_ext3": null
                        },
                        {
                        "id": "665e64a9f1d349b03f35d4e5b1ed505b",
                        "dic_code": "7763479",
                        "dic_name": "牙博士",
                        "dic_type": "brand1",
                        "dic_ext1": null,
                        "dic_ext2": null,
                        "dic_ext3": null
                        },
                        {
                        "id": "66cf835d83939886274f66d8e225a724",
                        "dic_code": "KHN101",
                        "dic_name": "百世南昌商超仓",
                        "dic_type": "shop1",
                        "dic_ext1": null,
                        "dic_ext2": null,
                        "dic_ext3": null
                        },
                        {
                        "id": "66d99873b08a90a1e274d26ddf62cb65",
                        "dic_code": "hengshi",
                        "dic_name": "亨氏",
                        "dic_type": "brand1",
                        "dic_ext1": null,
                        "dic_ext2": null,
                        "dic_ext3": null
                        },
                        {
                        "id": "697fae93b472e7c92d652e75e3ccaa7e",
                        "dic_code": "ludeqing",
                        "dic_name": "露得清",
                        "dic_type": "brand1",
                        "dic_ext1": null,
                        "dic_ext2": null,
                        "dic_ext3": null
                        },
                        {
                        "id": "6c0d9ecc246d2fc54501bd5b9ecf40a6",
                        "dic_code": "TAO101",
                        "dic_name": "心怡青岛商超仓",
                        "dic_type": "shop1",
                        "dic_ext1": null,
                        "dic_ext2": null,
                        "dic_ext3": null
                        },
                        {
                        "id": "6c1a6a0a7785196c69cf03ebeaad9391",
                        "dic_code": "shanghaijiahua",
                        "dic_name": "上海加化",
                        "dic_type": "brand1",
                        "dic_ext1": null,
                        "dic_ext2": null,
                        "dic_ext3": null
                        },
                        {
                        "id": "6c259bc9eafcee6d0584989ca50951f9",
                        "dic_code": "3294388",
                        "dic_name": "A’Gensn/安安金纯",
                        "dic_type": "brand1",
                        "dic_ext1": null,
                        "dic_ext2": null,
                        "dic_ext3": null
                        },
                        {
                        "id": "6cd7bdc9ec7fe40077c1e61de4b60468",
                        "dic_code": "121366011",
                        "dic_name": "胸部护理（新）",
                        "dic_type": "brand1",
                        "dic_ext1": null,
                        "dic_ext2": null,
                        "dic_ext3": null
                        },
                        {
                        "id": "6e6c0bb5b19fdd40ef31e51f00e63ba4",
                        "dic_code": "fenxiao",
                        "dic_name": "分销",
                        "dic_type": "ditch1",
                        "dic_ext1": null,
                        "dic_ext2": null,
                        "dic_ext3": null
                        },
                        {
                        "id": "6edc1f2f09b87984de451c6488e6c314",
                        "dic_code": "XIY101",
                        "dic_name": "西北长安北领商超仓",
                        "dic_type": "shop1",
                        "dic_ext1": null,
                        "dic_ext2": null,
                        "dic_ext3": null
                        },
                        {
                        "id": "709f0e1cf1c10254f6d10bd65ef88952",
                        "dic_code": "30533492",
                        "dic_name": "强生美肌",
                        "dic_type": "brand1",
                        "dic_ext1": null,
                        "dic_ext2": null,
                        "dic_ext3": null
                        },
                        {
                        "id": "72cc87994b1ddba9edf201e41b60d50c",
                        "dic_code": "121390006",
                        "dic_name": "面膜（新）",
                        "dic_type": "brand1",
                        "dic_ext1": null,
                        "dic_ext2": null,
                        "dic_ext3": null
                        },
                        {
                        "id": "776ecf17696a474530cd83a8895258de",
                        "dic_code": "biaoting",
                        "dic_name": "标婷",
                        "dic_type": "brand1",
                        "dic_ext1": null,
                        "dic_ext2": null,
                        "dic_ext3": null
                        },
                        {
                        "id": "7d881c95b9b8be47c3b703074639b093",
                        "dic_code": "kelingkeli",
                        "dic_name": "可伶可俐",
                        "dic_type": "brand1",
                        "dic_ext1": null,
                        "dic_ext2": null,
                        "dic_ext3": null
                        },
                        {
                        "id": "8000a56083fffdde963fe64468b8efcc",
                        "dic_code": "texie",
                        "dic_name": "特写",
                        "dic_type": "brand1",
                        "dic_ext1": null,
                        "dic_ext2": null,
                        "dic_ext3": null
                        },
                        {
                        "id": "812182ecefe4c7093300cb30bd9026da",
                        "dic_code": "1",
                        "dic_name": "美容护理",
                        "dic_type": "brand1",
                        "dic_ext1": null,
                        "dic_ext2": null,
                        "dic_ext3": null
                        },
                        {
                        "id": "8466a3331bf9853c5e575f94041e929b",
                        "dic_code": "122430002",
                        "dic_name": "足部护理",
                        "dic_type": "brand1",
                        "dic_ext1": null,
                        "dic_ext2": null,
                        "dic_ext3": null
                        },
                        {
                        "id": "870d072f8fcac351f575527bf5cce595",
                        "dic_code": "3326302",
                        "dic_name": "maestro/美涛",
                        "dic_type": "brand1",
                        "dic_ext1": null,
                        "dic_ext2": null,
                        "dic_ext3": null
                        },
                        {
                        "id": "8730390d7abc7e4e311b7b127b74fd2b",
                        "dic_code": "STORE_1228938",
                        "dic_name": "心怡武汉猫超仓",
                        "dic_type": "shop1",
                        "dic_ext1": null,
                        "dic_ext2": null,
                        "dic_ext3": null
                        },
                        {
                        "id": "88cdf16499151cc2d797ca725c5c4f40",
                        "dic_code": "SHE101",
                        "dic_name": "心怡沈阳猫超仓",
                        "dic_type": "shop1",
                        "dic_ext1": null,
                        "dic_ext2": null,
                        "dic_ext3": null
                        },
                        {
                        "id": "8903485746b58c4b381a1b846acf60c4",
                        "dic_code": "ananchunxin",
                        "dic_name": "安安纯新",
                        "dic_type": "brand1",
                        "dic_ext1": null,
                        "dic_ext2": null,
                        "dic_ext3": null
                        },
                        {
                        "id": "8917ce6f0715afb8898a5e442f8f46c3",
                        "dic_code": "NKG101",
                        "dic_name": "心怡南京猫超仓",
                        "dic_type": "shop1",
                        "dic_ext1": null,
                        "dic_ext2": null,
                        "dic_ext3": null
                        },
                        {
                        "id": "8c9b5b36ce282b084d75a2b3141bb584",
                        "dic_code": "pianzaihuang",
                        "dic_name": "片仔癀",
                        "dic_type": "brand1",
                        "dic_ext1": null,
                        "dic_ext2": null,
                        "dic_ext3": null
                        },
                        {
                        "id": "8d7f29fa2418c5e2aad96da2a35b485b",
                        "dic_code": "JIM101",
                        "dic_name": "北领江门商超仓",
                        "dic_type": "shop1",
                        "dic_ext1": null,
                        "dic_ext2": null,
                        "dic_ext3": null
                        },
                        {
                        "id": "94e137ef1618c622dde0f801ad7930b5",
                        "dic_code": "maochao",
                        "dic_name": "天猫超市",
                        "dic_type": "ditch1",
                        "dic_ext1": "1",
                        "dic_ext2": null,
                        "dic_ext3": null
                        },
                        {
                        "id": "94ebbb3637d121bfa8ba7c4f01ebb25c",
                        "dic_code": "STORE_757914",
                        "dic_name": "百世物流金华金义仓",
                        "dic_type": "shop1",
                        "dic_ext1": null,
                        "dic_ext2": null,
                        "dic_ext3": null
                        },
                        {
                        "id": "957ea55526c138a5410cbd0770e944df",
                        "dic_code": "CKG101",
                        "dic_name": "北领重庆商超仓",
                        "dic_type": "shop1",
                        "dic_ext1": null,
                        "dic_ext2": null,
                        "dic_ext3": null
                        },
                        {
                        "id": "994cb72256710958c5a1b660a55af1bb",
                        "dic_code": "dabao",
                        "dic_name": "大宝",
                        "dic_type": "brand1",
                        "dic_ext1": null,
                        "dic_ext2": null,
                        "dic_ext3": null
                        },
                        {
                        "id": "a0e74aa3ca5f7100d06662c029f1a8e3",
                        "dic_code": "huayin",
                        "dic_name": "花印",
                        "dic_type": "brand1",
                        "dic_ext1": null,
                        "dic_ext2": null,
                        "dic_ext3": null
                        },
                        {
                        "id": "a3a92399c91511d77c7484d04d98a824",
                        "dic_code": "youkesi",
                        "dic_name": "悠珂思",
                        "dic_type": "brand1",
                        "dic_ext1": null,
                        "dic_ext2": null,
                        "dic_ext3": null
                        },
                        {
                        "id": "a3e435997910983a6e413205b703e9b2",
                        "dic_code": "HUZ101",
                        "dic_name": "华南惠阳蜂网仓",
                        "dic_type": "shop1",
                        "dic_ext1": null,
                        "dic_ext2": null,
                        "dic_ext3": null
                        },
                        {
                        "id": "a80930ddcd412cf19eaa04e5e21e1e70",
                        "dic_code": "125178006",
                        "dic_name": "旅行装/体验装",
                        "dic_type": "brand1",
                        "dic_ext1": null,
                        "dic_ext2": null,
                        "dic_ext3": null
                        },
                        {
                        "id": "a824087c46a0ada92ef2b04b44e286fb",
                        "dic_code": "DGM101",
                        "dic_name": "北领东莞商超仓",
                        "dic_type": "shop1",
                        "dic_ext1": null,
                        "dic_ext2": null,
                        "dic_ext3": null
                        },
                        {
                        "id": "a8d7867452d71229af9ad334d5ea92c0",
                        "dic_code": "WUX101",
                        "dic_name": "北领无锡商超仓",
                        "dic_type": "shop1",
                        "dic_ext1": null,
                        "dic_ext2": null,
                        "dic_ext3": null
                        },
                        {
                        "id": "abda9d2c40afbbd19cb176f1d044fb9c",
                        "dic_code": "3862586",
                        "dic_name": "蜂花",
                        "dic_type": "brand1",
                        "dic_ext1": null,
                        "dic_ext2": null,
                        "dic_ext3": null
                        },
                        {
                        "id": "b0b9269dff9ca5383f63d6f4161b3483",
                        "dic_code": "50011979",
                        "dic_name": "面部精华",
                        "dic_type": "brand1",
                        "dic_ext1": null,
                        "dic_ext2": null,
                        "dic_ext3": null
                        },
                        {
                        "id": "b31b1b70cef393ff50b7daf603124082",
                        "dic_code": "STORE_1366687",
                        "dic_name": "心怡山东猫超仓",
                        "dic_type": "shop1",
                        "dic_ext1": null,
                        "dic_ext2": null,
                        "dic_ext3": null
                        },
                        {
                        "id": "b521a5ec170f01bea245795faf5c6416",
                        "dic_code": "50011990",
                        "dic_name": "卸妆",
                        "dic_type": "brand1",
                        "dic_ext1": null,
                        "dic_ext2": null,
                        "dic_ext3": null
                        },
                        {
                        "id": "b6335faeacf7762f579fcc964aeaf5ff",
                        "dic_code": "121390007",
                        "dic_name": "手部保养（新）",
                        "dic_type": "brand1",
                        "dic_ext1": null,
                        "dic_ext2": null,
                        "dic_ext3": null
                        },
                        {
                        "id": "b99e2f1d9e995dff0bfa962893696157",
                        "dic_code": "7637686",
                        "dic_name": "HANAJIRUSHI/花印",
                        "dic_type": "brand1",
                        "dic_ext1": null,
                        "dic_ext2": null,
                        "dic_ext3": null
                        },
                        {
                        "id": "bc98b714ce586e75d63798aec13178e9",
                        "dic_code": "121476023",
                        "dic_name": "洗护套装",
                        "dic_type": "brand1",
                        "dic_ext1": null,
                        "dic_ext2": null,
                        "dic_ext3": null
                        },
                        {
                        "id": "bca116fe1b5324ad23c1b0b22af8c376",
                        "dic_code": "50011992",
                        "dic_name": "精油芳疗",
                        "dic_type": "brand1",
                        "dic_ext1": null,
                        "dic_ext2": null,
                        "dic_ext3": null
                        },
                        {
                        "id": "bda01550c15cb5c2f78f3db1f6faaa68",
                        "dic_code": "764222770",
                        "dic_name": "LEASUN FOOD/林家铺子",
                        "dic_type": "brand1",
                        "dic_ext1": null,
                        "dic_ext2": null,
                        "dic_ext3": null
                        },
                        {
                        "id": "bea871f92cc0de8467eca5b3fac9286b",
                        "dic_code": "122438002",
                        "dic_name": "假发配件",
                        "dic_type": "brand1",
                        "dic_ext1": null,
                        "dic_ext2": null,
                        "dic_ext3": null
                        },
                        {
                        "id": "c1f4a37d9900ca475a2bdd8dbb003fa7",
                        "dic_code": "shulei",
                        "dic_name": "舒蕾",
                        "dic_type": "brand1",
                        "dic_ext1": null,
                        "dic_ext2": null,
                        "dic_ext3": null
                        },
                        {
                        "id": "c5a6e69d2156638c3404332e7dc273a8",
                        "dic_code": "languliang",
                        "dic_name": "懒菇凉",
                        "dic_type": "brand1",
                        "dic_ext1": null,
                        "dic_ext2": null,
                        "dic_ext3": null
                        },
                        {
                        "id": "c91e9e6593f62e893a80c22028dc4504",
                        "dic_code": "xuanqi",
                        "dic_name": "宣琪",
                        "dic_type": "brand1",
                        "dic_ext1": null,
                        "dic_ext2": null,
                        "dic_ext3": null
                        },
                        {
                        "id": "cdd59e69d5bcf5ded36fd19ee374af28",
                        "dic_code": "SZV102",
                        "dic_name": "心怡苏州商超2号仓",
                        "dic_type": "shop1",
                        "dic_ext1": null,
                        "dic_ext2": null,
                        "dic_ext3": null
                        },
                        {
                        "id": "ce89f2e44e19f0590c3c436581d1dc17",
                        "dic_code": "TSN101",
                        "dic_name": "华北宁河北领猫超仓",
                        "dic_type": "shop1",
                        "dic_ext1": null,
                        "dic_ext2": null,
                        "dic_ext3": null
                        },
                        {
                        "id": "d1f72e504c7cf9769c93e8fdcbbffa65",
                        "dic_code": "qiutianmeiren",
                        "dic_name": "秋田美人",
                        "dic_type": "brand1",
                        "dic_ext1": null,
                        "dic_ext2": null,
                        "dic_ext3": null
                        },
                        {
                        "id": "d5a1f7489998352501f289cb032f3571",
                        "dic_code": "NNG101",
                        "dic_name": "苏宁南宁商超仓",
                        "dic_type": "shop1",
                        "dic_ext1": null,
                        "dic_ext2": null,
                        "dic_ext3": null
                        },
                        {
                        "id": "d5d270690a4a9bc72cac97a0b134711f",
                        "dic_code": "meitao",
                        "dic_name": "美涛",
                        "dic_type": "brand1",
                        "dic_ext1": null,
                        "dic_ext2": null,
                        "dic_ext3": null
                        },
                        {
                        "id": "dc1a51f9ce797b8529c1136a5b0d7a8d",
                        "dic_code": "50011996",
                        "dic_name": "面部按摩霜",
                        "dic_type": "brand1",
                        "dic_ext1": null,
                        "dic_ext2": null,
                        "dic_ext3": null
                        },
                        {
                        "id": "dc5dfe08daecf52ae8e0a6f14673b32e",
                        "dic_code": "STORE_8751445",
                        "dic_name": "心怡上海松江猫超仓",
                        "dic_type": "shop1",
                        "dic_ext1": null,
                        "dic_ext2": null,
                        "dic_ext3": null
                        },
                        {
                        "id": "dc7af77af5d6690c79a4e116531508ed",
                        "dic_code": "50011993",
                        "dic_name": "面部护理套装",
                        "dic_type": "brand1",
                        "dic_ext1": null,
                        "dic_ext2": null,
                        "dic_ext3": null
                        },
                        {
                        "id": "dd08461819fc4f943b1a25f472c2e775",
                        "dic_code": "27134",
                        "dic_name": "Missha/谜尚",
                        "dic_type": "brand1",
                        "dic_ext1": null,
                        "dic_ext2": null,
                        "dic_ext3": null
                        },
                        {
                        "id": "debac303fe6b0b1299bd76f9803970d8",
                        "dic_code": "50011977",
                        "dic_name": "洁面",
                        "dic_type": "brand1",
                        "dic_ext1": null,
                        "dic_ext2": null,
                        "dic_ext3": null
                        },
                        {
                        "id": "df9f1a3e5abbf496923fbc5e280d877c",
                        "dic_code": "121368010",
                        "dic_name": "男士护理（新）",
                        "dic_type": "brand1",
                        "dic_ext1": null,
                        "dic_ext2": null,
                        "dic_ext3": null
                        },
                        {
                        "id": "e0630ca2a2b092c70b38fc0414dd945d",
                        "dic_code": "121448009",
                        "dic_name": "唇部护理（新）",
                        "dic_type": "brand1",
                        "dic_ext1": null,
                        "dic_ext2": null,
                        "dic_ext3": null
                        },
                        {
                        "id": "e3888910c3d539799e2037e0f46817b5",
                        "dic_code": "94520",
                        "dic_name": "DARLIE/黑人",
                        "dic_type": "brand1",
                        "dic_ext1": null,
                        "dic_ext2": null,
                        "dic_ext3": null
                        },
                        {
                        "id": "ea5ba73908d6d5c1a7e3886fbbdfda1b",
                        "dic_code": "STORE_823547",
                        "dic_name": "心怡成都淘宝商超仓库",
                        "dic_type": "shop1",
                        "dic_ext1": null,
                        "dic_ext2": null,
                        "dic_ext3": null
                        },
                        {
                        "id": "ebc6395eecaebc37632d1edc813a03ec",
                        "dic_code": "STORE_11435919",
                        "dic_name": "百世物流北京顺义仓",
                        "dic_type": "shop1",
                        "dic_ext1": null,
                        "dic_ext2": null,
                        "dic_ext3": null
                        },
                        {
                        "id": "ece06a637acec6b215ef1d1cb0e50159",
                        "dic_code": "zeping",
                        "dic_name": "泽平",
                        "dic_type": "brand1",
                        "dic_ext1": null,
                        "dic_ext2": null,
                        "dic_ext3": null
                        },
                        {
                        "id": "ece50b5d0d5c4e3bfe3509b3278a0181",
                        "dic_code": "STORE_12005465",
                        "dic_name": "心怡嘉兴猫超仓",
                        "dic_type": "shop1",
                        "dic_ext1": null,
                        "dic_ext2": null,
                        "dic_ext3": null
                        },
                        {
                        "id": "ed9c11033095c65708a3b6462649fa8d",
                        "dic_code": "mishang",
                        "dic_name": "谜尚",
                        "dic_type": "brand1",
                        "dic_ext1": null,
                        "dic_ext2": null,
                        "dic_ext3": null
                        },
                        {
                        "id": "f0b15237b926203789c37525d70c6fa2",
                        "dic_code": "CTU101",
                        "dic_name": "北领成都商超仓",
                        "dic_type": "shop1",
                        "dic_ext1": null,
                        "dic_ext2": null,
                        "dic_ext3": null
                        },
                        {
                        "id": "f1a6d8df69c26388a3ce2be38a1535cf",
                        "dic_code": "ALOG-0001",
                        "dic_name": "心怡上海淘宝商超仓库",
                        "dic_type": "shop1",
                        "dic_ext1": null,
                        "dic_ext2": null,
                        "dic_ext3": null
                        },
                        {
                        "id": "f3c12725b50972e628ce2bbb9454f37d",
                        "dic_code": "121466009",
                        "dic_name": "身体护理（新）",
                        "dic_type": "brand1",
                        "dic_ext1": null,
                        "dic_ext2": null,
                        "dic_ext3": null
                        },
                        {
                        "id": "f3c1520996f727f2694a1b05639020fb",
                        "dic_code": "fanxi",
                        "dic_name": "凡茜",
                        "dic_type": "brand1",
                        "dic_ext1": null,
                        "dic_ext2": null,
                        "dic_ext3": null
                        },
                        {
                        "id": "f8804e081355aae496547a5bfba2aabf",
                        "dic_code": "3485944",
                        "dic_name": "Listerine/李施德林",
                        "dic_type": "brand1",
                        "dic_ext1": null,
                        "dic_ext2": null,
                        "dic_ext3": null
                        },
                        {
                        "id": "fac3fa8865d2b33167f3cadefc5e9547",
                        "dic_code": "baiqueling",
                        "dic_name": "百雀羚",
                        "dic_type": "brand1",
                        "dic_ext1": null,
                        "dic_ext2": null,
                        "dic_ext3": null
                        },
                        {
                        "id": "fb3942e52bf0ba8e19df6f0bbbd0f2a1",
                        "dic_code": "CGO101",
                        "dic_name": "心怡郑州商超仓",
                        "dic_type": "shop1",
                        "dic_ext1": null,
                        "dic_ext2": null,
                        "dic_ext3": null
                        },
                        {
                        "id": "fbbe2b31c7803426f0a5a7b08cff0d9b",
                        "dic_code": "qiangshengyinger",
                        "dic_name": "强生婴儿",
                        "dic_type": "brand1",
                        "dic_ext1": null,
                        "dic_ext2": null,
                        "dic_ext3": null
                        },{
                        "id": "fdcf35b70a4c67e568d6fac28e2e793c",
                        "dic_code": "xingfucao",
                        "dic_name": "幸福草",
                        "dic_type": "brand1",
                        "dic_ext1": null,
                        "dic_ext2": null,
                        "dic_ext3": null
                        },
                        {
                        "id": "fe0da72c7d391263d9fdef04554d6cf2",
                        "dic_code": "50011997",
                        "dic_name": "面部磨砂/去角质",
                        "dic_type": "brand1",
                        "dic_ext1": null,
                        "dic_ext2": null,
                        "dic_ext3": null
                        },
                        {
                        "id": "fe2cf1f6c3804188f869be26a2999423",
                        "dic_code": "siyun",
                        "dic_name": "丝蕴",
                        "dic_type": "brand1",
                        "dic_ext1": null,
                        "dic_ext2": null,
                        "dic_ext3": null
                        },
                        {
                        "id": "ff04b1fb49ba7c1e5c9292d0f1fc68bd",
                        "dic_code": "niweiya",
                        "dic_name": "妮维雅",
                        "dic_type": "brand1",
                        "dic_ext1": null,
                        "dic_ext2": null,
                        "dic_ext3": null
                        },
                        {
                        "id": "ff07963ef78c37f881faff92689cd0db",
                        "dic_code": "94138",
                        "dic_name": "舒蕾",
                        "dic_type": "brand1",
                        "dic_ext1": null,
                        "dic_ext2": null,
                        "dic_ext3": null
                        }
                    ];
                insideData = data;
                supplier_codeF(data);
         //获取维度数据对应关系
         
            //获取数据进行数据对象处理
            var data21 = {
"100037387": {
"maochao": {
"20080": {
"all": {
"153": "",
"159": "",
"163": "",
"164": "",
"JJN101": "",
"TAO101": "",
"SZV102": "",
"STORE_757914": "",
"JIM101": "",
"STORE_11435919": "",
"STORE_12005465": "",
"CAN803": "",
"HGH101": "",
"STORE_1366687": "",
"HFE101": "",
"HGH302": "",
"NNG101": "",
"CTU101": "",
"STORE_823547": "",
"CGO101": "",
"SHE101": "",
"WUX101": "",
"ALOG-0001": "",
"TSN101": "",
"CSX101": "",
"KHN101": "",
"ALOG-0003": "",
"CKG101": "",
"ALOG-0002": "",
"DGM101": "",
"STORE_8751445": "",
"ALOG-0004": "",
"HUZ101": "",
"XIY101": "",
"NKG101": "",
"STORE_1228938": "",
"JJN801": ""
}
},
"20081": {
"all": {
"153": "",
"159": "",
"163": "",
"164": "",
"JJN101": "",
"TAO101": "",
"SZV102": "",
"STORE_757914": "",
"JIM101": "",
"STORE_11435919": "",
"STORE_12005465": "",
"CAN803": "",
"HGH101": "",
"STORE_1366687": "",
"HFE101": "",
"HGH302": "",
"NNG101": "",
"CTU101": "",
"STORE_823547": "",
"CGO101": "",
"SHE101": "",
"WUX101": "",
"ALOG-0001": "",
"TSN101": "",
"CSX101": "",
"KHN101": "",
"ALOG-0003": "",
"CKG101": "",
"ALOG-0002": "",
"DGM101": "",
"STORE_8751445": "",
"ALOG-0004": "",
"HUZ101": "",
"XIY101": "",
"NKG101": "",
"STORE_1228938": "",
"JJN801": ""
}
},
"31854": {
"all": {
"JJN101": "",
"TAO101": "",
"SZV102": "",
"JIM101": "",
"STORE_757914": "",
"STORE_11435919": "",
"STORE_12005465": "",
"HGH101": "",
"HFE101": "",
"STORE_1366687": "",
"NNG101": "",
"CTU101": "",
"CGO101": "",
"STORE_823547": "",
"SHE101": "",
"ALOG-0001": "",
"CSX101": "",
"KHN101": "",
"ALOG-0003": "",
"CKG101": "",
"ALOG-0002": "",
"DGM101": "",
"STORE_8751445": "",
"HUZ101": "",
"ALOG-0004": "",
"XIY101": "",
"NKG101": "",
"STORE_1228938": ""
}
},
"66932": {
"all": {
"153": "",
"159": "",
"163": "",
"164": "",
"JJN101": "",
"TAO101": "",
"SZV102": "",
"STORE_757914": "",
"JIM101": "",
"STORE_11435919": "",
"STORE_12005465": "",
"CAN803": "",
"HGH101": "",
"STORE_1366687": "",
"HFE101": "",
"HGH302": "",
"NNG101": "",
"CTU101": "",
"STORE_823547": "",
"CGO101": "",
"SHE101": "",
"WUX101": "",
"ALOG-0001": "",
"TSN101": "",
"CSX101": "",
"KHN101": "",
"ALOG-0003": "",
"CKG101": "",
"ALOG-0002": "",
"DGM101": "",
"STORE_8751445": "",
"ALOG-0004": "",
"HUZ101": "",
"XIY101": "",
"NKG101": "",
"STORE_1228938": "",
"JJN801": ""
}
},
"66935": {
"all": {
"153": "",
"159": "",
"163": "",
"JJN101": "",
"TAO101": "",
"SZV102": "",
"STORE_757914": "",
"JIM101": "",
"STORE_11435919": "",
"STORE_12005465": "",
"CAN803": "",
"HGH101": "",
"STORE_1366687": "",
"HFE101": "",
"HGH302": "",
"NNG101": "",
"CTU101": "",
"STORE_823547": "",
"CGO101": "",
"SHE101": "",
"WUX101": "",
"ALOG-0001": "",
"TSN101": "",
"CSX101": "",
"KHN101": "",
"ALOG-0003": "",
"CKG101": "",
"ALOG-0002": "",
"DGM101": "",
"STORE_8751445": "",
"ALOG-0004": "",
"HUZ101": "",
"XIY101": "",
"NKG101": "",
"STORE_1228938": "",
"JJN801": ""
}
},
"94138": {
"all": {
"153": "",
"159": "",
"163": "",
"164": "",
"JJN101": "",
"TAO101": "",
"SZV102": "",
"STORE_757914": "",
"JIM101": "",
"STORE_11435919": "",
"STORE_12005465": "",
"CAN803": "",
"HGH101": "",
"STORE_1366687": "",
"HFE101": "",
"HGH302": "",
"NNG101": "",
"CTU101": "",
"STORE_823547": "",
"CGO101": "",
"SHE101": "",
"WUX101": "",
"ALOG-0001": "",
"TSN101": "",
"CSX101": "",
"KHN101": "",
"ALOG-0003": "",
"CKG101": "",
"ALOG-0002": "",
"DGM101": "",
"STORE_8751445": "",
"ALOG-0004": "",
"HUZ101": "",
"XIY101": "",
"NKG101": "",
"STORE_1228938": "",
"JJN801": ""
}
},
"94520": {
"all": {
"153": "",
"159": "",
"163": "",
"164": "",
"JJN101": "",
"TAO101": "",
"SZV102": "",
"STORE_757914": "",
"JIM101": "",
"STORE_11435919": "",
"STORE_12005465": "",
"CAN803": "",
"HGH101": "",
"STORE_1366687": "",
"HFE101": "",
"HGH302": "",
"NNG101": "",
"CTU101": "",
"STORE_823547": "",
"CGO101": "",
"SHE101": "",
"WUX101": "",
"ALOG-0001": "",
"TSN101": "",
"CSX101": "",
"KHN101": "",
"ALOG-0003": "",
"CKG101": "",
"ALOG-0002": "",
"DGM101": "",
"STORE_8751445": "",
"ALOG-0004": "",
"HUZ101": "",
"XIY101": "",
"NKG101": "",
"STORE_1228938": "",
"JJN801": ""
}
},
"3294388": {
"all": {
"153": "",
"159": "",
"163": "",
"JJN101": "",
"TAO101": "",
"SZV102": "",
"STORE_757914": "",
"JIM101": "",
"STORE_11435919": "",
"STORE_12005465": "",
"HGH101": "",
"CAN803": "",
"HFE101": "",
"STORE_1366687": "",
"HGH302": "",
"NNG101": "",
"CTU101": "",
"STORE_823547": "",
"CGO101": "",
"SHE101": "",
"WUX101": "",
"ALOG-0001": "",
"TSN101": "",
"CSX101": "",
"KHN101": "",
"CKG101": "",
"DGM101": "",
"STORE_8751445": "",
"HUZ101": "",
"XIY101": "",
"NKG101": "",
"JJN801": ""
}
},
"3304242": {
"all": {
"153": "",
"159": "",
"163": "",
"164": "",
"JJN101": "",
"TAO101": "",
"SZV102": "",
"STORE_757914": "",
"JIM101": "",
"STORE_11435919": "",
"STORE_12005465": "",
"CAN803": "",
"HGH101": "",
"STORE_1366687": "",
"HFE101": "",
"HGH302": "",
"NNG101": "",
"CTU101": "",
"STORE_823547": "",
"CGO101": "",
"SHE101": "",
"WUX101": "",
"ALOG-0001": "",
"TSN101": "",
"CSX101": "",
"KHN101": "",
"CKG101": "",
"DGM101": "",
"STORE_8751445": "",
"HUZ101": "",
"XIY101": "",
"NKG101": "",
"JJN801": ""
}
},
"3304331": {
"all": {
"153": "",
"159": "",
"163": "",
"164": "",
"JJN101": "",
"TAO101": "",
"SZV102": "",
"STORE_757914": "",
"JIM101": "",
"STORE_11435919": "",
"STORE_12005465": "",
"CAN803": "",
"HGH101": "",
"STORE_1366687": "",
"HFE101": "",
"HGH302": "",
"NNG101": "",
"CTU101": "",
"STORE_823547": "",
"CGO101": "",
"SHE101": "",
"WUX101": "",
"ALOG-0001": "",
"TSN101": "",
"CSX101": "",
"KHN101": "",
"CKG101": "",
"DGM101": "",
"STORE_8751445": "",
"HUZ101": "",
"XIY101": "",
"NKG101": "",
"JJN801": ""
}
},
"3326302": {
"all": {
"153": "",
"159": "",
"163": "",
"164": "",
"JJN101": "",
"TAO101": "",
"SZV102": "",
"STORE_757914": "",
"JIM101": "",
"STORE_11435919": "",
"STORE_12005465": "",
"CAN803": "",
"HGH101": "",
"STORE_1366687": "",
"HFE101": "",
"HGH302": "",
"NNG101": "",
"CTU101": "",
"STORE_823547": "",
"CGO101": "",
"SHE101": "",
"WUX101": "",
"ALOG-0001": "",
"TSN101": "",
"CSX101": "",
"KHN101": "",
"CKG101": "",
"DGM101": "",
"STORE_8751445": "",
"HUZ101": "",
"XIY101": "",
"NKG101": "",
"JJN801": ""
}
},
"3425417": {
"all": {
"153": "",
"159": "",
"164": "",
"JJN101": "",
"TAO101": "",
"SZV102": "",
"STORE_757914": "",
"JIM101": "",
"STORE_11435919": "",
"STORE_12005465": "",
"HGH101": "",
"CAN803": "",
"HFE101": "",
"STORE_1366687": "",
"HGH302": "",
"NNG101": "",
"CTU101": "",
"STORE_823547": "",
"CGO101": "",
"SHE101": "",
"WUX101": "",
"ALOG-0001": "",
"TSN101": "",
"CSX101": "",
"KHN101": "",
"CKG101": "",
"DGM101": "",
"STORE_8751445": "",
"HUZ101": "",
"XIY101": "",
"NKG101": "",
"JJN801": ""
}
},
"3459747": {
"all": {
"153": "",
"159": "",
"JJN101": "",
"TAO101": "",
"SZV102": "",
"JIM101": "",
"STORE_757914": "",
"STORE_11435919": "",
"STORE_12005465": "",
"HGH101": "",
"CAN803": "",
"HFE101": "",
"STORE_1366687": "",
"HGH302": "",
"NNG101": "",
"CTU101": "",
"STORE_823547": "",
"CGO101": "",
"SHE101": "",
"WUX101": "",
"ALOG-0001": "",
"TSN101": "",
"CSX101": "",
"KHN101": "",
"CKG101": "",
"DGM101": "",
"STORE_8751445": "",
"HUZ101": "",
"XIY101": "",
"NKG101": "",
"JJN801": ""
}
},
"3485944": {
"all": {
"153": "",
"159": "",
"163": "",
"164": "",
"JJN101": "",
"TAO101": "",
"SZV102": "",
"STORE_757914": "",
"JIM101": "",
"STORE_11435919": "",
"STORE_12005465": "",
"CAN803": "",
"HGH101": "",
"STORE_1366687": "",
"HFE101": "",
"HGH302": "",
"NNG101": "",
"CTU101": "",
"STORE_823547": "",
"CGO101": "",
"SHE101": "",
"WUX101": "",
"ALOG-0001": "",
"TSN101": "",
"CSX101": "",
"KHN101": "",
"CKG101": "",
"DGM101": "",
"STORE_8751445": "",
"HUZ101": "",
"XIY101": "",
"NKG101": "",
"JJN801": ""
}
},
"3862586": {
"all": {
"153": "",
"159": "",
"163": "",
"164": "",
"JJN101": "",
"TAO101": "",
"SZV102": "",
"STORE_757914": "",
"JIM101": "",
"STORE_11435919": "",
"STORE_12005465": "",
"CAN803": "",
"HGH101": "",
"STORE_1366687": "",
"HFE101": "",
"HGH302": "",
"NNG101": "",
"CTU101": "",
"STORE_823547": "",
"CGO101": "",
"SHE101": "",
"WUX101": "",
"ALOG-0001": "",
"TSN101": "",
"CSX101": "",
"KHN101": "",
"CKG101": "",
"DGM101": "",
"STORE_8751445": "",
"HUZ101": "",
"XIY101": "",
"NKG101": "",
"JJN801": ""
}
},
"7637686": {
"all": {
"153": "",
"159": "",
"163": "",
"164": "",
"JJN101": "",
"TAO101": "",
"SZV102": "",
"STORE_757914": "",
"JIM101": "",
"STORE_11435919": "",
"STORE_12005465": "",
"CAN803": "",
"HGH101": "",
"STORE_1366687": "",
"HFE101": "",
"HGH302": "",
"NNG101": "",
"CTU101": "",
"STORE_823547": "",
"CGO101": "",
"SHE101": "",
"WUX101": "",
"ALOG-0001": "",
"TSN101": "",
"CSX101": "",
"KHN101": "",
"CKG101": "",
"DGM101": "",
"STORE_8751445": "",
"HUZ101": "",
"XIY101": "",
"NKG101": "",
"JJN801": ""
}
},
"7763479": {
"all": {
"153": "",
"159": "",
"163": "",
"JJN101": "",
"TAO101": "",
"SZV102": "",
"STORE_757914": "",
"JIM101": "",
"STORE_11435919": "",
"STORE_12005465": "",
"HGH101": "",
"CAN803": "",
"HFE101": "",
"STORE_1366687": "",
"HGH302": "",
"NNG101": "",
"CTU101": "",
"STORE_823547": "",
"CGO101": "",
"SHE101": "",
"WUX101": "",
"ALOG-0001": "",
"TSN101": "",
"CSX101": "",
"KHN101": "",
"CKG101": "",
"DGM101": "",
"STORE_8751445": "",
"HUZ101": "",
"XIY101": "",
"NKG101": "",
"JJN801": ""
}
},
"12237707": {
"all": {
"JJN101": "",
"TAO101": "",
"NNG101": "",
"SZV102": "",
"CTU101": "",
"STORE_757914": "",
"JIM101": "",
"STORE_823547": "",
"CGO101": "",
"SHE101": "",
"STORE_11435919": "",
"ALOG-0001": "",
"CSX101": "",
"KHN101": "",
"HGH101": "",
"CKG101": "",
"DGM101": "",
"HUZ101": "",
"XIY101": "",
"NKG101": "",
"HFE101": ""
}
},
"16564449": {
"all": {
"JJN101": "",
"TAO101": "",
"NNG101": "",
"SZV102": "",
"CTU101": "",
"STORE_757914": "",
"JIM101": "",
"STORE_823547": "",
"CGO101": "",
"SHE101": "",
"STORE_11435919": "",
"ALOG-0001": "",
"CSX101": "",
"KHN101": "",
"HGH101": "",
"CKG101": "",
"DGM101": "",
"HUZ101": "",
"XIY101": "",
"NKG101": "",
"HFE101": ""
}
},
"30533492": {
"all": {
"153": "",
"159": "",
"163": "",
"164": "",
"JJN101": "",
"TAO101": "",
"SZV102": "",
"JIM101": "",
"STORE_757914": "",
"STORE_11435919": "",
"CAN803": "",
"HGH101": "",
"HFE101": "",
"HGH302": "",
"NNG101": "",
"CTU101": "",
"STORE_823547": "",
"CGO101": "",
"SHE101": "",
"WUX101": "",
"ALOG-0001": "",
"TSN101": "",
"CSX101": "",
"KHN101": "",
"CKG101": "",
"DGM101": "",
"HUZ101": "",
"XIY101": "",
"NKG101": "",
"JJN801": ""
}
},
"57597007": {
"all": {
"153": "",
"159": "",
"163": "",
"164": "",
"JJN101": "",
"TAO101": "",
"SZV102": "",
"JIM101": "",
"STORE_757914": "",
"STORE_11435919": "",
"CAN803": "",
"HGH101": "",
"HFE101": "",
"HGH302": "",
"NNG101": "",
"CTU101": "",
"STORE_823547": "",
"CGO101": "",
"SHE101": "",
"WUX101": "",
"ALOG-0001": "",
"TSN101": "",
"CSX101": "",
"KHN101": "",
"CKG101": "",
"DGM101": "",
"HUZ101": "",
"XIY101": "",
"NKG101": "",
"JJN801": ""
}
},
"187206347": {
"all": {
"153": "",
"159": "",
"JJN101": "",
"TAO101": "",
"SZV102": "",
"JIM101": "",
"STORE_11435919": "",
"HGH101": "",
"CAN803": "",
"HFE101": "",
"HGH302": "",
"NNG101": "",
"CTU101": "",
"CGO101": "",
"SHE101": "",
"WUX101": "",
"ALOG-0001": "",
"CSX101": "",
"KHN101": "",
"TSN101": "",
"CKG101": "",
"DGM101": "",
"HUZ101": "",
"XIY101": "",
"NKG101": "",
"JJN801": ""
}
}
},
"fenxiao": {
"0": {
"all": {
"SHOP32": "",
"SHOP302": "",
"SHOP31": "",
"SHOP110": "",
"SHOP16": "",
"SHOP170": "",
"SHOP129": "",
"SHOP87": "",
"SHOP287": "",
"SHOP362": "",
"SHOP107": "",
"SHOP443": "",
"SHOP444": "",
"SHOP453": "",
"SHOP20": "",
"SHOP452": "",
"SHOP104": "",
"SHOP451": "",
"SHOP25": "",
"SHOP226": "",
"SHOP26": "",
"SHOP369": "",
"SHOP70": "",
"SHOP148": "",
"SHOP49": "",
"SHOP183": "",
"SHOP71": "",
"SHOP75": "",
"SHOP76": "",
"SHOP52": "",
"SHOP96": ""
}
},
"shanghaijiahua": {
"all": {
"132": ""
}
},
"xingfucao": {
"all": {
"102": "",
"106": "",
"132": ""
}
},
"zeping": {
"all": {
"101": "",
"102": "",
"106": "",
"132": ""
}
},
"niweiya": {
"all": {
"101": "",
"102": "",
"103": "",
"106": "",
"108": "",
"109": "",
"129": "",
"130": "",
"131": "",
"132": "",
"155": "",
"163": "",
"SHOP177": "",
"SHOP176": "",
"SHOP175": "",
"SHOP358": "",
"SHOP174": "",
"SHOP4": "",
"SHOP179": "",
"SHOP81": "",
"SHOP173": "",
"SHOP171": "",
"SHOP215": "",
"SHOP170": "",
"SHOP225": "",
"SHOP82": "",
"SHOP220": "",
"SHOP87": "",
"SHOP423": "",
"SHOP365": "",
"SHOP185": "",
"SHOP101": "",
"SHOP102": "",
"SHOP104": "",
"SHOP182": "",
"SHOP204": "",
"SHOP181": "",
"SHOP184": "",
"SHOP206": "",
"SHOP70": "",
"SHOP71": "",
"SHOP72": "",
"SHOP74": "",
"SHOP75": "",
"SHOP79": "",
"SHOP350": "",
"SHOP356": "",
"SHOP294": "",
"SHOP111": "",
"SHOP198": "",
"SHOP292": "",
"SHOP193": "",
"SHOP192": "",
"SHOP295": "",
"SHOP242": "",
"SHOP246": "",
"SHOP245": "",
"SHOP244": "",
"SHOP107": "",
"SHOP68": "",
"SHOP69": "",
"SHOP126": "",
"SHOP226": "",
"SHOP53": "",
"SHOP50": "",
"SHOP16": "",
"SHOP9": "",
"SHOP15": "",
"SHOP7": "",
"SHOP19": "",
"SHOP18": "",
"SHOP129": "",
"SHOP128": "",
"SHOP265": "",
"SHOP456": "",
"SHOP452": "",
"SHOP141": "",
"SHOP143": "",
"SHOP26": "",
"SHOP148": "",
"SHOP147": "",
"SHOP250": "",
"SHOP306": "",
"SHOP304": "",
"SHOP303": "",
"SHOP393": "",
"SHOP34": "",
"SHOP150": "",
"SHOP32": "",
"SHOP31": "",
"SHOP30": "",
"SHOP154": "",
"SHOP35": "",
"SHOP282": "",
"SHOP149": "",
"SHOP92": "",
"SHOP167": "",
"SHOP169": "",
"SHOP164": "",
"SHOP166": "",
"SHOP49": "",
"SHOP165": "",
"SHOP278": "",
"SHOP96": "",
"SHOP279": ""
}
},
"fanxi": {
"all": {
"106": "",
"132": "",
"SHOP177": "",
"SHOP115": "",
"SHOP358": "",
"SHOP302": "",
"SHOP30": "",
"SHOP12": "",
"SHOP110": "",
"SHOP293": "",
"SHOP111": "",
"SHOP292": "",
"SHOP16": "",
"SHOP15": "",
"SHOP130": "",
"SHOP13": "",
"SHOP137": "",
"SHOP19": "",
"SHOP135": "",
"SHOP18": "",
"SHOP215": "",
"SHOP66": "",
"SHOP67": "",
"SHOP360": "",
"SHOP63": "",
"SHOP281": "",
"SHOP423": "",
"SHOP361": "",
"SHOP108": "",
"SHOP68": "",
"SHOP126": "",
"SHOP140": "",
"SHOP40": "",
"SHOP229": "",
"SHOP47": "",
"SHOP164": "",
"SHOP163": "",
"SHOP48": "",
"SHOP165": "",
"SHOP50": "",
"SHOP99": "",
"SHOP303": "",
"SHOP58": "",
"SHOP59": "",
"SHOP357": "",
"SHOP393": ""
}
},
"qiangshengyinger": {
"all": {
"102": ""
}
},
"zhaogui": {
"all": {
"132": ""
}
},
"ob": {
"all": {
"102": "",
"106": "",
"132": ""
}
},
"chunjuan": {
"all": {
"132": ""
}
},
"kelingkeli": {
"all": {
"102": "",
"106": "",
"132": ""
}
},
"lishidelin": {
"all": {
"102": "",
"106": "",
"132": "",
"155": "",
"SHOP212": "",
"SHOP177": "",
"SHOP450": "",
"SHOP313": ""
}
},
"yaboshi": {
"all": {
"101": "",
"102": "",
"106": "",
"109": "",
"115": "",
"132": "",
"SHOP115": "",
"SHOP359": "",
"SHOP12": "",
"SHOP313": "",
"SHOP23": "",
"SHOP237": "",
"SHOP130": "",
"SHOP229": "",
"SHOP48": "",
"SHOP66": "",
"SHOP212": "",
"SHOP314": "",
"SHOP57": "",
"SHOP59": "",
"SHOP357": "",
"SHOP445": "",
"SHOP365": ""
}
},
"hengshi": {
"all": {
"102": ""
}
},
"youkesi": {
"all": {
"132": ""
}
},
"xuanqi": {
"all": {
"132": ""
}
},
"shulei": {
"all": {
"101": "",
"102": "",
"106": "",
"109": "",
"115": "",
"129": "",
"131": "",
"132": "",
"159": "",
"163": "",
"SHOP177": "",
"SHOP290": "",
"SHOP150": "",
"SHOP358": "",
"SHOP359": "",
"SHOP110": "",
"SHOP111": "",
"SHOP179": "",
"SHOP19": "",
"SHOP18": "",
"SHOP66": "",
"SHOP420": "",
"SHOP265": "",
"SHOP450": "",
"SHOP101": "",
"SHOP23": "",
"SHOP184": "",
"SHOP79": "",
"SHOP96": ""
}
},
"heiren": {
"all": {
"101": "",
"102": "",
"106": "",
"108": "",
"109": "",
"129": "",
"132": "",
"SHOP177": "",
"SHOP290": "",
"SHOP359": "",
"SHOP193": "",
"SHOP19": "",
"SHOP18": "",
"SHOP135": "",
"SHOP66": "",
"SHOP225": "",
"SHOP61": "",
"SHOP420": "",
"SHOP314": "",
"SHOP317": "",
"SHOP265": "",
"SHOP365": "",
"SHOP455": "",
"SHOP187": "",
"SHOP450": "",
"SHOP101": "",
"SHOP313": "",
"SHOP23": "",
"SHOP169": "",
"SHOP181": "",
"SHOP48": "",
"SHOP212": "",
"SHOP306": "",
"SHOP304": "",
"SHOP99": "",
"SHOP303": "",
"SHOP57": ""
}
},
"lidezi": {
"all": {
"101": "",
"102": "",
"106": "",
"132": "",
"SHOP358": "",
"SHOP174": "",
"SHOP110": "",
"SHOP5": "",
"SHOP190": "",
"SHOP68": "",
"SHOP215": ""
}
},
"mishang": {
"all": {
"102": "",
"106": ""
}
},
"yumeijing": {
"all": {
"132": ""
}
},
"qiutianmeiren": {
"all": {
"102": "",
"132": ""
}
},
"pianzaihuang": {
"all": {
"101": "",
"102": "",
"106": "",
"129": "",
"132": "",
"159": "",
"163": "",
"SHOP10": ""
}
},
"biaoting": {
"all": {
"132": ""
}
},
"baiqueling": {
"all": {
"132": ""
}
},
"meitao": {
"all": {
"101": "",
"102": "",
"106": "",
"109": "",
"115": "",
"131": "",
"132": "",
"159": "",
"SHOP177": "",
"SHOP150": "",
"SHOP358": "",
"SHOP110": "",
"SHOP111": "",
"SHOP19": "",
"SHOP18": "",
"SHOP66": "",
"SHOP346": "",
"SHOP92": "",
"SHOP450": "",
"SHOP101": "",
"SHOP102": "",
"SHOP23": "",
"SHOP166": "",
"SHOP138": "",
"SHOP74": "",
"SHOP79": "",
"SHOP306": "",
"SHOP99": "",
"SHOP303": "",
"SHOP57": "",
"SHOP393": ""
}
},
"o.b.": {
"all": {
"SHOP453": "",
"SHOP81": "",
"SHOP19": "",
"SHOP18": ""
}
},
"saiwei": {
"all": {
"132": ""
}
},
"gongdeng": {
"all": {
"132": ""
}
},
"qiangshengmeiji": {
"all": {
"102": ""
}
},
"ananchunxin": {
"all": {
"132": ""
}
},
"xiangyibencao": {
"all": {
"132": ""
}
},
"fumeiling": {
"all": {
"132": ""
}
},
"fenghua": {
"all": {
"101": "",
"102": "",
"106": "",
"109": "",
"115": "",
"132": "",
"143": "",
"163": "",
"SHOP177": "",
"SHOP358": "",
"SHOP359": "",
"SHOP12": "",
"SHOP323": "",
"SHOP179": "",
"SHOP131": "",
"SHOP7": "",
"SHOP130": "",
"SHOP13": "",
"SHOP81": "",
"SHOP137": "",
"SHOP136": "",
"SHOP135": "",
"SHOP215": "",
"SHOP134": "",
"SHOP84": "",
"SHOP225": "",
"SHOP420": "",
"SHOP314": "",
"SHOP317": "",
"SHOP368": "",
"SHOP365": "",
"SHOP454": "",
"SHOP186": "",
"SHOP455": "",
"SHOP100": "",
"SHOP187": "",
"SHOP101": "",
"SHOP313": "",
"SHOP140": "",
"SHOP23": "",
"SHOP208": "",
"SHOP141": "",
"SHOP27": "",
"SHOP143": "",
"SHOP28": "",
"SHOP184": "",
"SHOP183": "",
"SHOP138": "",
"SHOP212": "",
"SHOP79": "",
"SHOP306": "",
"SHOP303": "",
"SHOP357": "",
"SHOP290": "",
"SHOP115": "",
"SHOP110": "",
"SHOP339": "",
"SHOP111": "",
"SHOP336": "",
"SHOP197": "",
"SHOP195": "",
"SHOP296": "",
"SHOP39": "",
"SHOP66": "",
"SHOP67": "",
"SHOP242": "",
"SHOP63": "",
"SHOP60": "",
"SHOP61": "",
"SHOP108": "",
"SHOP124": "",
"SHOP126": "",
"SHOP41": "",
"SHOP40": "",
"SHOP229": "",
"SHOP163": "",
"SHOP48": "",
"SHOP234": "",
"SHOP271": "",
"SHOP99": "",
"SHOP57": "",
"SHOP93": "",
"SHOP58": "",
"SHOP59": "",
"SHOP431": "",
"SHOP119": ""
}
},
"miqi": {
"all": {
"132": ""
}
},
"siyun": {
"all": {
"SHOP225": "",
"SHOP92": "",
"SHOP101": "",
"SHOP79": "",
"SHOP81": "",
"SHOP80": ""
}
},
"huayin": {
"all": {
"101": "",
"102": "",
"106": "",
"108": "",
"109": "",
"115": "",
"132": "",
"164": ""
}
},
"dabao": {
"all": {
"101": "",
"102": "",
"105": "",
"106": "",
"108": "",
"109": "",
"131": "",
"132": "",
"143": "",
"145": "",
"155": "",
"163": "",
"SHOP177": "",
"SHOP358": "",
"SHOP179": "",
"SHOP2": "",
"SHOP81": "",
"SHOP173": "",
"SHOP220": "",
"SHOP86": "",
"SHOP420": "",
"SHOP363": "",
"SHOP362": "",
"SHOP365": "",
"SHOP186": "",
"SHOP185": "",
"SHOP100": "",
"SHOP187": "",
"SHOP101": "",
"SHOP102": "",
"SHOP208": "",
"SHOP209": "",
"SHOP212": "",
"SHOP74": "",
"SHOP76": "",
"SHOP77": "",
"SHOP79": "",
"SHOP351": "",
"SHOP350": "",
"SHOP353": "",
"SHOP352": "",
"SHOP354": "",
"SHOP357": "",
"SHOP290": "",
"SHOP115": "",
"SHOP110": "",
"SHOP199": "",
"SHOP339": "",
"SHOP111": "",
"SHOP198": "",
"SHOP197": "",
"SHOP291": "",
"SHOP195": "",
"SHOP295": "",
"SHOP66": "",
"SHOP67": "",
"SHOP242": "",
"SHOP240": "",
"SHOP63": "",
"SHOP246": "",
"SHOP60": "",
"SHOP245": "",
"SHOP61": "",
"SHOP244": "",
"SHOP440": "",
"SHOP441": "",
"SHOP442": "",
"SHOP342": "",
"SHOP108": "",
"SHOP443": "",
"SHOP68": "",
"SHOP444": "",
"SHOP340": "",
"SHOP123": "",
"SHOP124": "",
"SHOP126": "",
"SHOP325": "",
"SHOP121": "",
"SHOP226": "",
"SHOP229": "",
"SHOP230": "",
"SHOP234": "",
"SHOP52": "",
"SHOP335": "",
"SHOP57": "",
"SHOP58": "",
"SHOP59": "",
"SHOP431": "",
"SHOP119": "",
"SHOP12": "",
"SHOP323": "",
"SHOP16": "",
"SHOP15": "",
"SHOP131": "",
"SHOP7": "",
"SHOP130": "",
"SHOP13": "",
"SHOP137": "",
"SHOP136": "",
"SHOP19": "",
"SHOP135": "",
"SHOP18": "",
"SHOP134": "",
"SHOP128": "",
"SHOP314": "",
"SHOP317": "",
"SHOP265": "",
"SHOP453": "",
"SHOP456": "",
"SHOP455": "",
"SHOP20": "",
"SHOP313": "",
"SHOP452": "",
"SHOP140": "",
"SHOP23": "",
"SHOP451": "",
"SHOP22": "",
"SHOP25": "",
"SHOP141": "",
"SHOP144": "",
"SHOP143": "",
"SHOP28": "",
"SHOP138": "",
"SHOP306": "",
"SHOP303": "",
"SHOP449": "",
"SHOP34": "",
"SHOP39": "",
"SHOP152": "",
"SHOP149": "",
"SHOP281": "",
"SHOP287": "",
"SHOP284": "",
"SHOP41": "",
"SHOP40": "",
"SHOP169": "",
"SHOP47": "",
"SHOP369": "",
"SHOP163": "",
"SHOP166": "",
"SHOP48": "",
"SHOP271": "",
"SHOP274": "",
"SHOP99": "",
"SHOP277": "",
"SHOP93": "",
"SHOP278": "",
"SHOP96": "",
"SHOP279": "",
"SHOP95": ""
}
},
"aihe": {
"all": {
"102": "",
"106": "",
"132": "",
"155": ""
}
},
"qingwa": {
"all": {
"SHOP212": "",
"SHOP186": "",
"SHOP101": "",
"SHOP197": "",
"SHOP265": "",
"SHOP365": ""
}
},
"ananjinchun": {
"all": {
"101": "",
"102": "",
"106": "",
"109": "",
"132": "",
"163": "",
"SHOP100": ""
}
},
"ludeqing": {
"all": {
"101": "",
"102": "",
"106": "",
"108": "",
"109": "",
"129": "",
"131": "",
"132": "",
"155": "",
"163": "",
"SHOP177": "",
"SHOP175": "",
"SHOP358": "",
"SHOP174": "",
"SHOP2": "",
"SHOP323": "",
"SHOP16": "",
"SHOP133": "",
"SHOP15": "",
"SHOP19": "",
"SHOP18": "",
"SHOP134": "",
"SHOP128": "",
"SHOP220": "",
"SHOP362": "",
"SHOP265": "",
"SHOP453": "",
"SHOP456": "",
"SHOP100": "",
"SHOP249": "",
"SHOP452": "",
"SHOP25": "",
"SHOP446": "",
"SHOP391": "",
"SHOP447": "",
"SHOP448": "",
"SHOP31": "",
"SHOP110": "",
"SHOP30": "",
"SHOP111": "",
"SHOP295": "",
"SHOP154": "",
"SHOP67": "",
"SHOP284": "",
"SHOP444": "",
"SHOP126": "",
"SHOP325": "",
"SHOP229": "",
"SHOP48": "",
"SHOP99": "",
"SHOP59": ""
}
},
"yunnanbaiyao": {
"all": {
"132": ""
}
},
"anan": {
"all": {
"106": "",
"132": "",
"SHOP290": "",
"SHOP358": "",
"SHOP12": "",
"SHOP110": "",
"SHOP111": "",
"SHOP197": "",
"SHOP131": "",
"SHOP130": "",
"SHOP13": "",
"SHOP39": "",
"SHOP137": "",
"SHOP135": "",
"SHOP66": "",
"SHOP67": "",
"SHOP63": "",
"SHOP61": "",
"SHOP68": "",
"SHOP365": "",
"SHOP186": "",
"SHOP41": "",
"SHOP40": "",
"SHOP48": "",
"SHOP99": "",
"SHOP58": "",
"SHOP357": "",
"SHOP59": ""
}
}
},
"ziying": {
"languliang": {
"all": {
"103": ""
}
},
"xingfucao": {
"all": {
"170": ""
}
},
"zeping": {
"all": {
"103": "",
"129": "",
"170": ""
}
},
"niweiya": {
"all": {
"103": "",
"129": "",
"146": "",
"150": "",
"151": "",
"155": "",
"170": ""
}
},
"fanxi": {
"all": {
"103": "",
"129": ""
}
},
"qiangshengyinger": {
"all": {
"103": ""
}
},
"texie": {
"all": {
"103": "",
"129": ""
}
},
"ob": {
"all": {
"129": ""
}
},
"kelingkeli": {
"all": {
"103": "",
"129": ""
}
},
"lishidelin": {
"all": {
"103": "",
"129": "",
"170": ""
}
},
"yaboshi": {
"all": {
"103": "",
"129": "",
"155": "",
"170": ""
}
},
"hengshi": {
"all": {
"129": ""
}
},
"shulei": {
"all": {
"103": "",
"129": "",
"150": "",
"170": ""
}
},
"heiren": {
"all": {
"103": "",
"129": "",
"155": "",
"170": ""
}
},
"lidezi": {
"all": {
"103": "",
"129": "",
"155": "",
"170": ""
}
},
"mishang": {
"all": {
"170": ""
}
},
"pianzaihuang": {
"all": {
"103": "",
"129": "",
"155": "",
"170": ""
}
},
"qiutianmeiren": {
"all": {
"103": "",
"129": ""
}
},
"baiqueling": {
"all": {
"103": "",
"129": ""
}
},
"meitao": {
"all": {
"103": "",
"129": "",
"155": "",
"170": ""
}
},
"qiangshengmeiji": {
"all": {
"103": ""
}
},
"fenghua": {
"all": {
"103": "",
"129": "",
"138": "",
"160": "",
"170": ""
}
},
"huayin": {
"all": {
"103": "",
"129": "",
"170": ""
}
},
"dabao": {
"all": {
"103": "",
"129": "",
"170": ""
}
},
"aihe": {
"all": {
"129": ""
}
},
"ananjinchun": {
"all": {
"103": "",
"129": "",
"155": ""
}
},
"ludeqing": {
"all": {
"103": "",
"129": "",
"170": ""
}
},
"qita": {
"all": {
"103": "",
"129": ""
}
},
"anan": {
"all": {
"103": "",
"129": ""
}
}
}
},
"100039757": {
"maochao": {
"27134": {
"all": {
"153": "",
"159": ""
}
},
"764222770": {
"all": {
"153": "",
"159": "",
"163": "",
"JJN101": "",
"TAO101": "",
"SZV102": "",
"JIM101": "",
"STORE_11435919": "",
"HGH101": "",
"CAN803": "",
"HFE101": "",
"HGH302": "",
"NNG101": "",
"CTU101": "",
"CGO101": "",
"SHE101": "",
"WUX101": "",
"ALOG-0001": "",
"TSN101": "",
"CSX101": "",
"KHN101": "",
"CKG101": "",
"DGM101": "",
"HUZ101": "",
"XIY101": "",
"NKG101": "",
"JJN801": ""
}
}
},
"fenxiao": {
"mishang": {
"all": {
"102": "",
"106": "",
"175": ""
}
},
"lidezi": {
"all": {
"102": "",
"106": ""
}
},
"pianzaihuang": {
"all": {
"102": "",
"106": ""
}
},
"xingfucao": {
"all": {
"102": "",
"106": "",
"132": ""
}
},
"zeping": {
"all": {
"102": "",
"106": ""
}
},
"niweiya": {
"all": {
"102": "",
"106": ""
}
},
"meitao": {
"all": {
"102": "",
"106": ""
}
},
"qiangshengyinger": {
"all": {
"102": ""
}
},
"qiangshengmeiji": {
"all": {
"102": ""
}
},
"hongruilai": {
"all": {
"132": "",
"175": ""
}
},
"fenghua": {
"all": {
"102": "",
"106": ""
}
},
"ob": {
"all": {
"102": "",
"106": ""
}
},
"huayin": {
"all": {
"102": "",
"106": ""
}
},
"kelingkeli": {
"all": {
"102": "",
"106": ""
}
},
"lishidelin": {
"all": {
"102": "",
"106": ""
}
},
"yaboshi": {
"all": {
"102": "",
"106": ""
}
},
"dabao": {
"all": {
"102": "",
"106": ""
}
},
"hengshi": {
"all": {
"102": "",
"132": ""
}
},
"aihe": {
"all": {
"102": "",
"106": ""
}
},
"shulei": {
"all": {
"102": "",
"106": ""
}
},
"heiren": {
"all": {
"102": "",
"106": ""
}
},
"ananjinchun": {
"all": {
"102": "",
"106": ""
}
},
"ludeqing": {
"all": {
"102": "",
"106": ""
}
}
},
"ziying": {
"xingfucao": {
"all": {
"103": "",
"146": "",
"150": "",
"170": "",
"172": "",
"173": ""
}
},
"niweiya": {
"all": {
"103": "",
"129": "",
"150": "",
"170": "",
"172": "",
"173": ""
}
},
"fanxi": {
"all": {
"103": "",
"129": "",
"172": ""
}
},
"qiangshengyinger": {
"all": {
"103": ""
}
},
"texie": {
"all": {
"103": ""
}
},
"kelingkeli": {
"all": {
"103": "",
"129": ""
}
},
"lishidelin": {
"all": {
"129": "",
"170": "",
"173": ""
}
},
"yaboshi": {
"all": {
"103": "",
"129": "",
"170": "",
"173": ""
}
},
"hengshi": {
"all": {
"129": ""
}
},
"xuanqi": {
"all": {
"129": ""
}
},
"shulei": {
"all": {
"103": "",
"129": "",
"170": "",
"173": ""
}
},
"heiren": {
"all": {
"103": "",
"129": "",
"170": "",
"172": "",
"173": ""
}
},
"lidezi": {
"all": {
"103": "",
"170": "",
"172": "",
"173": ""
}
},
"mishang": {
"all": {
"175": ""
}
},
"pianzaihuang": {
"all": {
"103": "",
"129": "",
"170": "",
"172": "",
"173": ""
}
},
"qiutianmeiren": {
"all": {
"103": ""
}
},
"baiqueling": {
"all": {
"103": "",
"129": ""
}
},
"meitao": {
"all": {
"103": "",
"129": "",
"170": "",
"173": ""
}
},
"hongruilai": {
"all": {
"103": "",
"172": "",
"175": ""
}
},
"qiangshengmeiji": {
"all": {
"103": ""
}
},
"fenghua": {
"all": {
"103": "",
"129": "",
"170": "",
"172": "",
"173": ""
}
},
"huayin": {
"all": {
"103": "",
"129": "",
"170": ""
}
},
"dabao": {
"all": {
"103": "",
"129": "",
"170": "",
"172": "",
"173": ""
}
},
"aihe": {
"all": {
"129": "",
"173": ""
}
},
"ananjinchun": {
"all": {
"103": "",
"129": "",
"172": "",
"173": ""
}
},
"ludeqing": {
"all": {
"103": "",
"129": "",
"170": ""
}
},
"qita": {
"all": {
"103": "",
"172": ""
}
},
"anan": {
"all": {
"103": ""
}
}
}
},
"ali": {
"taobao": {
"lidezi": {
"all": {
"SHOP358": "",
"SHOP174": "",
"SHOP5": "",
"SHOP190": "",
"SHOP68": "",
"SHOP215": ""
}
},
"pianzaihuang": {
"all": {
"SHOP177": "",
"SHOP358": "",
"SHOP12": "",
"SHOP179": "",
"SHOP10": "",
"SHOP131": "",
"SHOP7": "",
"SHOP130": "",
"SHOP217": "",
"SHOP137": "",
"SHOP135": "",
"SHOP265": "",
"SHOP365": "",
"SHOP186": "",
"SHOP185": "",
"SHOP187": "",
"SHOP455": "",
"SHOP101": "",
"SHOP140": "",
"SHOP208": "",
"SHOP184": "",
"SHOP352": "",
"SHOP357": "",
"SHOP290": "",
"SHOP115": "",
"SHOP111": "",
"SHOP197": "",
"SHOP336": "",
"SHOP39": "",
"SHOP66": "",
"SHOP242": "",
"SHOP67": "",
"SHOP246": "",
"SHOP63": "",
"SHOP60": "",
"SHOP244": "",
"SHOP109": "",
"SHOP108": "",
"SHOP123": "",
"SHOP124": "",
"SHOP41": "",
"SHOP40": "",
"SHOP229": "",
"SHOP163": "",
"SHOP48": "",
"SHOP99": "",
"SHOP57": "",
"SHOP58": "",
"SHOP431": "",
"SHOP59": ""
}
},
"meitao": {
"all": {
"SHOP177": "",
"SHOP150": "",
"SHOP358": "",
"SHOP92": "",
"SHOP101": "",
"SHOP102": "",
"SHOP111": "",
"SHOP19": "",
"SHOP166": "",
"SHOP18": "",
"SHOP66": "",
"SHOP138": "",
"SHOP74": "",
"SHOP79": "",
"SHOP306": "",
"SHOP99": "",
"SHOP303": "",
"SHOP57": "",
"SHOP393": ""
}
},
"niweiya": {
"all": {
"SHOP177": "",
"SHOP176": "",
"SHOP175": "",
"SHOP358": "",
"SHOP174": "",
"SHOP4": "",
"SHOP179": "",
"SHOP15": "",
"SHOP7": "",
"SHOP81": "",
"SHOP173": "",
"SHOP19": "",
"SHOP18": "",
"SHOP215": "",
"SHOP225": "",
"SHOP423": "",
"SHOP265": "",
"SHOP365": "",
"SHOP185": "",
"SHOP456": "",
"SHOP101": "",
"SHOP102": "",
"SHOP141": "",
"SHOP143": "",
"SHOP181": "",
"SHOP184": "",
"SHOP206": "",
"SHOP72": "",
"SHOP74": "",
"SHOP250": "",
"SHOP79": "",
"SHOP306": "",
"SHOP350": "",
"SHOP304": "",
"SHOP303": "",
"SHOP393": "",
"SHOP34": "",
"SHOP150": "",
"SHOP294": "",
"SHOP30": "",
"SHOP111": "",
"SHOP198": "",
"SHOP292": "",
"SHOP193": "",
"SHOP295": "",
"SHOP242": "",
"SHOP282": "",
"SHOP246": "",
"SHOP245": "",
"SHOP244": "",
"SHOP68": "",
"SHOP92": "",
"SHOP126": "",
"SHOP169": "",
"SHOP164": "",
"SHOP166": "",
"SHOP165": "",
"SHOP50": "",
"SHOP278": "",
"SHOP279": ""
}
},
"o.b.": {
"all": {
"SHOP81": "",
"SHOP19": "",
"SHOP18": ""
}
},
"fanxi": {
"all": {
"SHOP177": "",
"SHOP115": "",
"SHOP358": "",
"SHOP12": "",
"SHOP30": "",
"SHOP111": "",
"SHOP292": "",
"SHOP15": "",
"SHOP130": "",
"SHOP13": "",
"SHOP137": "",
"SHOP19": "",
"SHOP135": "",
"SHOP18": "",
"SHOP215": "",
"SHOP66": "",
"SHOP67": "",
"SHOP63": "",
"SHOP281": "",
"SHOP423": "",
"SHOP108": "",
"SHOP68": "",
"SHOP126": "",
"SHOP140": "",
"SHOP40": "",
"SHOP229": "",
"SHOP47": "",
"SHOP164": "",
"SHOP163": "",
"SHOP48": "",
"SHOP165": "",
"SHOP50": "",
"SHOP99": "",
"SHOP303": "",
"SHOP58": "",
"SHOP59": "",
"SHOP357": "",
"SHOP393": ""
}
},
"qiangshengyinger": {
"all": {
"SHOP177": "",
"SHOP242": "",
"SHOP420": "",
"SHOP265": "",
"SHOP19": "",
"SHOP18": "",
"SHOP134": ""
}
},
"qiangshengmeiji": {
"all": {
"SHOP177": "",
"SHOP456": "",
"SHOP455": "",
"SHOP126": "",
"SHOP19": "",
"SHOP18": ""
}
},
"fenghua": {
"all": {
"SHOP177": "",
"SHOP358": "",
"SHOP12": "",
"SHOP179": "",
"SHOP323": "",
"SHOP131": "",
"SHOP7": "",
"SHOP13": "",
"SHOP130": "",
"SHOP81": "",
"SHOP137": "",
"SHOP136": "",
"SHOP135": "",
"SHOP215": "",
"SHOP134": "",
"SHOP225": "",
"SHOP420": "",
"SHOP317": "",
"SHOP365": "",
"SHOP186": "",
"SHOP455": "",
"SHOP100": "",
"SHOP187": "",
"SHOP101": "",
"SHOP140": "",
"SHOP208": "",
"SHOP141": "",
"SHOP143": "",
"SHOP28": "",
"SHOP184": "",
"SHOP138": "",
"SHOP79": "",
"SHOP306": "",
"SHOP303": "",
"SHOP357": "",
"SHOP290": "",
"SHOP115": "",
"SHOP111": "",
"SHOP339": "",
"SHOP197": "",
"SHOP336": "",
"SHOP195": "",
"SHOP39": "",
"SHOP66": "",
"SHOP67": "",
"SHOP242": "",
"SHOP63": "",
"SHOP60": "",
"SHOP61": "",
"SHOP108": "",
"SHOP124": "",
"SHOP126": "",
"SHOP41": "",
"SHOP40": "",
"SHOP229": "",
"SHOP163": "",
"SHOP48": "",
"SHOP234": "",
"SHOP271": "",
"SHOP99": "",
"SHOP57": "",
"SHOP93": "",
"SHOP58": "",
"SHOP59": "",
"SHOP431": "",
"SHOP119": ""
}
},
"siyun": {
"all": {
"SHOP225": "",
"SHOP92": "",
"SHOP101": "",
"SHOP79": "",
"SHOP81": "",
"SHOP80": ""
}
},
"lishidelin": {
"all": {
"SHOP177": "",
"SHOP456": "",
"SHOP358": "",
"SHOP19": "",
"SHOP18": ""
}
},
"yaboshi": {
"all": {
"SHOP66": "",
"SHOP115": "",
"SHOP12": "",
"SHOP229": "",
"SHOP130": "",
"SHOP57": "",
"SHOP59": "",
"SHOP357": "",
"SHOP48": "",
"SHOP365": ""
}
},
"dabao": {
"all": {
"SHOP177": "",
"SHOP358": "",
"SHOP2": "",
"SHOP179": "",
"SHOP81": "",
"SHOP173": "",
"SHOP86": "",
"SHOP420": "",
"SHOP363": "",
"SHOP365": "",
"SHOP186": "",
"SHOP185": "",
"SHOP187": "",
"SHOP100": "",
"SHOP101": "",
"SHOP102": "",
"SHOP208": "",
"SHOP209": "",
"SHOP74": "",
"SHOP77": "",
"SHOP79": "",
"SHOP351": "",
"SHOP350": "",
"SHOP352": "",
"SHOP357": "",
"SHOP290": "",
"SHOP115": "",
"SHOP199": "",
"SHOP198": "",
"SHOP111": "",
"SHOP339": "",
"SHOP197": "",
"SHOP291": "",
"SHOP195": "",
"SHOP295": "",
"SHOP66": "",
"SHOP67": "",
"SHOP242": "",
"SHOP240": "",
"SHOP63": "",
"SHOP246": "",
"SHOP245": "",
"SHOP60": "",
"SHOP61": "",
"SHOP244": "",
"SHOP440": "",
"SHOP441": "",
"SHOP108": "",
"SHOP342": "",
"SHOP68": "",
"SHOP340": "",
"SHOP123": "",
"SHOP124": "",
"SHOP126": "",
"SHOP121": "",
"SHOP229": "",
"SHOP230": "",
"SHOP234": "",
"SHOP57": "",
"SHOP58": "",
"SHOP119": "",
"SHOP431": "",
"SHOP59": "",
"SHOP12": "",
"SHOP323": "",
"SHOP15": "",
"SHOP131": "",
"SHOP7": "",
"SHOP13": "",
"SHOP130": "",
"SHOP137": "",
"SHOP19": "",
"SHOP136": "",
"SHOP18": "",
"SHOP135": "",
"SHOP134": "",
"SHOP317": "",
"SHOP265": "",
"SHOP456": "",
"SHOP455": "",
"SHOP140": "",
"SHOP22": "",
"SHOP141": "",
"SHOP144": "",
"SHOP143": "",
"SHOP28": "",
"SHOP138": "",
"SHOP306": "",
"SHOP303": "",
"SHOP449": "",
"SHOP34": "",
"SHOP39": "",
"SHOP152": "",
"SHOP281": "",
"SHOP284": "",
"SHOP41": "",
"SHOP40": "",
"SHOP169": "",
"SHOP47": "",
"SHOP163": "",
"SHOP166": "",
"SHOP48": "",
"SHOP271": "",
"SHOP274": "",
"SHOP99": "",
"SHOP277": "",
"SHOP93": "",
"SHOP278": "",
"SHOP279": "",
"SHOP95": ""
}
},
"shulei": {
"all": {
"SHOP177": "",
"SHOP290": "",
"SHOP150": "",
"SHOP358": "",
"SHOP101": "",
"SHOP111": "",
"SHOP179": "",
"SHOP19": "",
"SHOP18": "",
"SHOP184": "",
"SHOP66": "",
"SHOP79": "",
"SHOP420": "",
"SHOP265": ""
}
},
"heiren": {
"all": {
"SHOP177": "",
"SHOP290": "",
"SHOP455": "",
"SHOP187": "",
"SHOP101": "",
"SHOP193": "",
"SHOP169": "",
"SHOP181": "",
"SHOP19": "",
"SHOP135": "",
"SHOP18": "",
"SHOP48": "",
"SHOP66": "",
"SHOP225": "",
"SHOP61": "",
"SHOP420": "",
"SHOP306": "",
"SHOP317": "",
"SHOP304": "",
"SHOP99": "",
"SHOP303": "",
"SHOP57": "",
"SHOP265": "",
"SHOP365": ""
}
},
"qingwa": {
"all": {
"SHOP186": "",
"SHOP101": "",
"SHOP197": "",
"SHOP265": "",
"SHOP365": ""
}
},
"ananjinchun": {
"all": {
"SHOP177": "",
"SHOP186": "",
"SHOP115": "",
"SHOP358": "",
"SHOP100": "",
"SHOP12": "",
"SHOP111": "",
"SHOP40": "",
"SHOP131": "",
"SHOP13": "",
"SHOP229": "",
"SHOP137": "",
"SHOP135": "",
"SHOP48": "",
"SHOP67": "",
"SHOP234": "",
"SHOP60": "",
"SHOP61": "",
"SHOP99": "",
"SHOP59": "",
"SHOP357": ""
}
},
"ludeqing": {
"all": {
"SHOP177": "",
"SHOP456": "",
"SHOP358": "",
"SHOP175": "",
"SHOP100": "",
"SHOP126": "",
"SHOP174": "",
"SHOP30": "",
"SHOP249": "",
"SHOP111": "",
"SHOP323": "",
"SHOP2": "",
"SHOP133": "",
"SHOP15": "",
"SHOP295": "",
"SHOP229": "",
"SHOP19": "",
"SHOP18": "",
"SHOP48": "",
"SHOP134": "",
"SHOP67": "",
"SHOP284": "",
"SHOP99": "",
"SHOP265": "",
"SHOP59": ""
}
},
"anan": {
"all": {
"SHOP186": "",
"SHOP290": "",
"SHOP358": "",
"SHOP12": "",
"SHOP111": "",
"SHOP41": "",
"SHOP197": "",
"SHOP40": "",
"SHOP131": "",
"SHOP39": "",
"SHOP13": "",
"SHOP130": "",
"SHOP137": "",
"SHOP135": "",
"SHOP48": "",
"SHOP66": "",
"SHOP67": "",
"SHOP63": "",
"SHOP61": "",
"SHOP99": "",
"SHOP58": "",
"SHOP68": "",
"SHOP59": "",
"SHOP357": "",
"SHOP365": ""
}
}
},
"tmall": {
"0": {
"all": {
"SHOP32": "",
"SHOP302": "",
"SHOP31": "",
"SHOP110": "",
"SHOP16": "",
"SHOP170": "",
"SHOP129": "",
"SHOP87": "",
"SHOP287": "",
"SHOP362": "",
"SHOP107": "",
"SHOP443": "",
"SHOP444": "",
"SHOP453": "",
"SHOP20": "",
"SHOP452": "",
"SHOP104": "",
"SHOP451": "",
"SHOP25": "",
"SHOP226": "",
"SHOP26": "",
"SHOP369": "",
"SHOP70": "",
"SHOP148": "",
"SHOP49": "",
"SHOP183": "",
"SHOP71": "",
"SHOP75": "",
"SHOP76": "",
"SHOP52": "",
"SHOP96": ""
}
},
"lidezi": {
"all": {
"SHOP110": ""
}
},
"pianzaihuang": {
"all": {
"SHOP110": "",
"SHOP9": ""
}
},
"meitao": {
"all": {
"SHOP450": "",
"SHOP110": "",
"SHOP23": "",
"SHOP346": ""
}
},
"niweiya": {
"all": {
"SHOP32": "",
"SHOP31": "",
"SHOP16": "",
"SHOP9": "",
"SHOP192": "",
"SHOP154": "",
"SHOP171": "",
"SHOP170": "",
"SHOP35": "",
"SHOP129": "",
"SHOP82": "",
"SHOP128": "",
"SHOP220": "",
"SHOP149": "",
"SHOP87": "",
"SHOP107": "",
"SHOP69": "",
"SHOP452": "",
"SHOP104": "",
"SHOP226": "",
"SHOP167": "",
"SHOP26": "",
"SHOP182": "",
"SHOP204": "",
"SHOP70": "",
"SHOP148": "",
"SHOP49": "",
"SHOP147": "",
"SHOP71": "",
"SHOP53": "",
"SHOP75": "",
"SHOP96": "",
"SHOP356": ""
}
},
"o.b.": {
"all": {
"SHOP453": ""
}
},
"fanxi": {
"all": {
"SHOP302": "",
"SHOP360": "",
"SHOP110": "",
"SHOP293": "",
"SHOP16": "",
"SHOP361": ""
}
},
"qiangshengyinger": {
"all": {
"SHOP453": "",
"SHOP359": "",
"SHOP220": "",
"SHOP25": "",
"SHOP362": "",
"SHOP447": "",
"SHOP444": ""
}
},
"qiangshengmeiji": {
"all": {
"SHOP453": "",
"SHOP220": "",
"SHOP452": "",
"SHOP362": "",
"SHOP447": ""
}
},
"fenghua": {
"all": {
"SHOP84": "",
"SHOP454": "",
"SHOP212": "",
"SHOP359": "",
"SHOP110": "",
"SHOP313": "",
"SHOP23": "",
"SHOP314": "",
"SHOP296": "",
"SHOP27": "",
"SHOP368": "",
"SHOP183": ""
}
},
"lishidelin": {
"all": {
"SHOP212": "",
"SHOP453": "",
"SHOP359": "",
"SHOP450": "",
"SHOP313": "",
"SHOP314": "",
"SHOP27": ""
}
},
"yaboshi": {
"all": {
"SHOP212": "",
"SHOP359": "",
"SHOP313": "",
"SHOP23": "",
"SHOP314": "",
"SHOP237": "",
"SHOP445": ""
}
},
"dabao": {
"all": {
"SHOP110": "",
"SHOP16": "",
"SHOP128": "",
"SHOP220": "",
"SHOP149": "",
"SHOP287": "",
"SHOP314": "",
"SHOP362": "",
"SHOP442": "",
"SHOP443": "",
"SHOP444": "",
"SHOP453": "",
"SHOP325": "",
"SHOP313": "",
"SHOP20": "",
"SHOP23": "",
"SHOP452": "",
"SHOP451": "",
"SHOP25": "",
"SHOP226": "",
"SHOP369": "",
"SHOP212": "",
"SHOP76": "",
"SHOP52": "",
"SHOP335": "",
"SHOP353": "",
"SHOP354": "",
"SHOP96": ""
}
},
"shulei": {
"all": {
"SHOP359": "",
"SHOP450": "",
"SHOP110": "",
"SHOP23": "",
"SHOP96": ""
}
},
"heiren": {
"all": {
"SHOP212": "",
"SHOP359": "",
"SHOP450": "",
"SHOP313": "",
"SHOP23": "",
"SHOP314": ""
}
},
"qingwa": {
"all": {
"SHOP212": ""
}
},
"ludeqing": {
"all": {
"SHOP453": "",
"SHOP31": "",
"SHOP110": "",
"SHOP325": "",
"SHOP452": "",
"SHOP16": "",
"SHOP25": "",
"SHOP154": "",
"SHOP128": "",
"SHOP220": "",
"SHOP362": "",
"SHOP446": "",
"SHOP447": "",
"SHOP391": "",
"SHOP448": "",
"SHOP444": ""
}
},
"anan": {
"all": {
"SHOP110": ""
}
}
}
}
};
            hqwdDataDeil(data21);
            
        
    }
    //获取数据进行维度数据处理
    function hqwdDataDeil(data){   
        //此方法，主要处理通用的数据展示，包括把公司、渠道、品牌、店铺、仓库进行数据拆分赋值处理
        //第一层for循环,是区分公司;第二层for循环,是区分渠道;第三层for循环,是区分品牌;第四层for循环,是区分店铺(客户):第五层for循环,是区分仓库.
        var datasx = new Array();
        for (let i in data) {
            let customer = i;
            child = data[i];
            var  ditch = new Array();
            for (let j in child) {
                let ditchName = j;
                let brand = new Array();
                ditch.push({"ditch":ditchName,"brandList":brand});
                for (let m in child[j]) {
                    let brandName = m;
                    let shop = new Array();
                    brand.push({"brand":brandName,"shopList":shop});
                    for(let q in child[j][m]){
                        let shopName = q;
                        let warehouList = new Array();
                        shop.push({"shop":shopName,"warehousesList":warehouList});
                        for(let p in child[j][m][q]){
                            let warehousesName = p;
                            warehouList.push({"warehous":warehousesName});
                        }
                    }                   
                }
            }
            data_all.push({"customer":customer,"ditchList":ditch});
        }
    }

    //公司下面的
    function supplier_codeF(data){
        dataS.supplier_code.length=0;
        dataS.ditch_code.length=0;
        dataS.brand_code.length=0;
        dataS.shop_code.length=0;
        dataS.warehous_code.length=0;
        var flag=true;
        var supplier_code=data;
        for(var i=0;i<supplier_code.length;i++){
            if(supplier_code[i]!=null){
                if($('.active').val() == 1){
                    if(supplier_code[i].dic_type == 'shop1'){
                        dataS.warehous_code.push(supplier_code[i]);
                    }else if(supplier_code[i].dic_type == 'ditch1' ){
                             dataS.ditch_code.push(supplier_code[i]);
                    }else if(supplier_code[i].dic_type == 'supplier1'){
                        dataS.supplier_code.push(supplier_code[i]);
                    }else if(supplier_code[i].dic_type == 'brand1'){
                        dataS.brand_code.push(supplier_code[i]);
                    }else{
                        dataS.shop_code.push(supplier_code[i]);
                    }
                }else if($('.active').val() == 2){
                    if(supplier_code[i].dic_type == 'shop2'){
                        dataS.warehous_code.push(supplier_code[i]);
                    }else if(supplier_code[i].dic_type == 'ditch2' ){
                             dataS.ditch_code.push(supplier_code[i]);
                    }else if(supplier_code[i].dic_type == 'supplier2'){
                        dataS.supplier_code.push(supplier_code[i]);
                    }else if(supplier_code[i].dic_type == 'brand2'){
                        dataS.brand_code.push(supplier_code[i]);
                    }else{
                        dataS.shop_code.push(supplier_code[i]);
                    }
                }else{
                    if(supplier_code[i].dic_type == 'shop3'){
                        dataS.warehous_code.push(supplier_code[i]);
                    }else if(supplier_code[i].dic_type == 'ditch3' ){
                             dataS.ditch_code.push(supplier_code[i]);
                    }else if(supplier_code[i].dic_type == 'supplier3'){
                        dataS.supplier_code.push(supplier_code[i]);
                    }else if(supplier_code[i].dic_type == 'brand3'){
                        dataS.brand_code.push(supplier_code[i]);
                    }else{
                        dataS.shop_code.push(supplier_code[i]);
                    }
                }
                ditchF(dataS.ditch_code);
                wareHousesF(dataS.shop_code);
                brand_codeF(dataS.brand_code);
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
    var supplier = '',ditch ='',brand ='',shop ='',warehous = '';
    function commonData(key,data,categary,headerName){
        //判断维度是否存在
        if(categary == "supplier_code"){
            supplier = headerName;
        }else if(categary == "ditch_code"){
            ditch = headerName;
        }else if(categary == "brand_code"){
            brand = headerName;
        }else if(categary == "shop_code"){
            shop = headerName;
        }else if(categary == "warehous_code"){
            warehous = headerName;
        }
        if(key == "supplier_code" && headerName == undefined && categary == undefined){
            supplier ='';
        }else if(key == "ditch_code" && headerName == undefined && categary == undefined){
            ditch = '';
        }else if(key == "brand_code" && headerName == undefined && categary == undefined){
            brand = '';
        }else if(key == "shop_code" && headerName == undefined && categary == undefined){
            shop = '';
        }else if(key == "warehous_code" && headerName == undefined && categary == undefined){
            warehous = '';
        }

        var data_wd = {
            supplier : supplier,
            ditch : ditch,
            brand : brand,
            shop : shop,
            warehous : warehous
        };

        if(data_wd.supplier !='' && data_wd.ditch =='' && data_wd.brand == '' &&  data_wd.shop == '' && data_wd.warehous == ''){
            localStorage.setItem("flagsx",1);
        }else if(data_wd.supplier =='' && data_wd.ditch !='' && data_wd.brand == '' &&  data_wd.shop == '' && data_wd.warehous == ''){
            localStorage.setItem("flagsx",2);
        }else if(data_wd.supplier =='' && data_wd.ditch =='' && data_wd.brand != '' &&  data_wd.shop == '' && data_wd.warehous == ''){
            localStorage.setItem("flagsx",3);
        }else if(data_wd.supplier =='' && data_wd.ditch =='' && data_wd.brand == '' &&  data_wd.shop != '' && data_wd.warehous == ''){
            localStorage.setItem("flagsx",4);
        }else if(data_wd.supplier =='' && data_wd.ditch =='' && data_wd.brand == '' &&  data_wd.shop == '' && data_wd.warehous != ''){
            localStorage.setItem("flagsx",5);
        }else if(data_wd.supplier =='' && data_wd.ditch =='' && data_wd.brand == '' &&  data_wd.shop == '' && data_wd.warehous == ''){
            localStorage.setItem("flagsx",0);
        }

        var flagsx = localStorage.flagsx;
       
        dataS1={
            supplier_code:[],
            ditch_code:[],
            brand_code:[],
            shop_code:[],
            warehous_code : []
        };
        //数据整合
        if(flagsx == 1){
            for(var i=0;i<data_all.length;i++){
                if(data_wd.supplier == data_all[i].customer){
                    ditchData = data_all[i];
                    dataS1.supplier_code.push(data_all[i].customer);
                    for(var j=0;j<data_all[i].ditchList.length;j++){
                        for(var m=0;m<data_all[i].ditchList[j].brandList.length;m++){
                            dataS1.brand_code.push(data_all[i].ditchList[j].brandList[m].brand);
                            for(var q=0;q<data_all[i].ditchList[j].brandList[m].shopList.length;q++){
                                dataS1.shop_code.push(data_all[i].ditchList[j].brandList[m].shopList[q].shop);
                                for(var p=0;p<data_all[i].ditchList[j].brandList[m].shopList[q].warehousesList.length;p++){
                                    dataS1.warehous_code.push(data_all[i].ditchList[j].brandList[m].shopList[q].warehousesList[p].warehous);
                                }
                            }
                        }
                        dataS1.ditch_code.push(data_all[i].ditchList[j].ditch);
                    }
                }
            }
    
            //判断渠道
            if(data_wd.supplier!='' && data_wd.ditch!=''){
                for(var i=0;i<ditchData.ditchList.length;i++){
                    if(data_wd.ditch == ditchData.ditchList[i].ditch){
                        dataS1.ditch_code.length=0;
                        dataS1.brand_code.length=0;
                        dataS1.shop_code.length=0;
                        dataS1.warehous_code.length=0;
                        brandData = ditchData.ditchList[i].brandList;
                        dataS1.ditch_code.push(ditchData.ditchList[i].ditch);
                        for(var m=0;m<brandData.length;m++){
                            dataS1.brand_code.push(brandData[m].brand);
                            shopData = ditchData.ditchList[i].brandList[m].shopList;
                            for(var q=0;q<ditchData.ditchList[i].brandList[m].shopList.length;q++){
                                dataS1.shop_code.push(ditchData.ditchList[i].brandList[m].shopList[q].shop);
                                for(var p=0;p<ditchData.ditchList[i].brandList[m].shopList[q].warehousesList.length;p++){
                                    dataS1.warehous_code.push(ditchData.ditchList[i].brandList[m].shopList[q].warehousesList[p].warehous);
                                }
                            }
                        }
                    } 
                }
            }

            //判断公司、品牌都选择
            var ckDataS = new Array();
            var ppDataS = new Array();
            if(data_wd.supplier!='' && data_wd.brand!='' && data_wd.warehous==''){
                dataS1.brand_code.length = 0;
                dataS1.shop_code.length = 0;
                dataS1.warehous_code.length = 0;
                dataS1.ditch_code.length = 0;
                ppDataS.length = 0;
                for(var i=0;i<data_all.length;i++){
                    for(var j=0;j<data_all[i].ditchList.length;j++){
                        for(var m=0;m<data_all[i].ditchList[j].brandList.length;m++){
                            if(data_wd.supplier == data_all[i].customer && data_wd.brand == data_all[i].ditchList[j].brandList[m].brand){
                                for(var q=0;q<data_all[i].ditchList[j].brandList[m].shopList.length;q++){
                                    for(var p=0;p<data_all[i].ditchList[j].brandList[m].shopList[q].warehousesList.length;p++){
                                        dataS1.brand_code.push(data_all[i].ditchList[j].brandList[m].brand);
                                        dataS1.shop_code.push(data_all[i].ditchList[j].brandList[m].shopList[q].shop);
                                        dataS1.warehous_code.push(data_all[i].ditchList[j].brandList[m].shopList[q].warehousesList[p].warehous);
                                        dataS1.ditch_code.push(data_all[i].ditchList[j].ditch);
                                        ckDataS.push({"warehous":data_all[i].ditchList[j].brandList[m].shopList[q].warehousesList[p].warehous});

                                    }
                                }
                            }
                        }
                    }
                }
            }

            //判断公司、品牌、仓库都选择
            if(data_wd.supplier!='' && data_wd.brand!='' && data_wd.warehous!=''){
                dataS1.brand_code.length = 0;
                dataS1.shop_code.length = 0;
                dataS1.warehous_code.length = 0;
                dataS1.ditch_code.length = 0;
                for(var i=0;i<data_all.length;i++){
                    for(var j=0;j<data_all[i].ditchList.length;j++){
                        for(var m=0;m<data_all[i].ditchList[j].brandList.length;m++){
                            for(var q=0;q<data_all[i].ditchList[j].brandList[m].shopList.length;q++){
                                for(var p=0;p<data_all[i].ditchList[j].brandList[m].shopList[q].warehousesList.length;p++){
                                    if(data_wd.supplier == data_all[i].customer && data_wd.brand == data_all[i].ditchList[j].brandList[m].brand && data_wd.warehous ==data_all[i].ditchList[j].brandList[m].shopList[q].warehousesList[p].warehous){
                                        dataS1.brand_code.push(data_all[i].ditchList[j].brandList[m].brand);
                                        dataS1.shop_code.push(data_all[i].ditchList[j].brandList[m].shopList[q].shop);
                                        dataS1.warehous_code.push(data_all[i].ditchList[j].brandList[m].shopList[q].warehousesList[p].warehous);
                                        dataS1.ditch_code.push(data_all[i].ditchList[j].ditch);
                                    }
                                }
                            }
                        }
                    }
                }
            }
           
            //判断选择公司、仓库
            if(data_wd.supplier!='' && data_wd.warehous!='' && data_wd.brand==''){
                dataS1.brand_code.length = 0;
                dataS1.shop_code.length = 0;
                dataS1.warehous_code.length = 0;
                dataS1.ditch_code.length = 0;
                ckDataS.length = 0;
                for(var i=0;i<data_all.length;i++){
                    for(var j=0;j<data_all[i].ditchList.length;j++){
                        for(var m=0;m<data_all[i].ditchList[j].brandList.length;m++){
                            for(var q=0;q<data_all[i].ditchList[j].brandList[m].shopList.length;q++){
                                 for(var p=0;p<data_all[i].ditchList[j].brandList[m].shopList[q].warehousesList.length;p++){
                                    if(data_wd.supplier == data_all[i].customer && data_wd.warehous == data_all[i].ditchList[j].brandList[m].shopList[q].warehousesList[p].warehous){
                                        dataS1.brand_code.push(data_all[i].ditchList[j].brandList[m].brand);
                                        dataS1.shop_code.push(data_all[i].ditchList[j].brandList[m].shopList[q].shop);
                                        dataS1.warehous_code.push(data_all[i].ditchList[j].brandList[m].shopList[q].warehousesList[p].warehous);
                                        dataS1.ditch_code.push(data_all[i].ditchList[j].ditch);
                                        ppDataS.push({"brand":data_all[i].ditchList[j].brandList[m].brand});
                                    }
                                }
                            }
                        }
                    }
                }
            }

        }else if(flagsx == 2){
           //选择渠道
           var gsData = new Array(),brandData = new Array(),ckData = new Array();
           for(var i=0;i<data_all.length;i++){
                for(var j=0;j<data_all[i].ditchList.length;j++){
                    if(data_wd.ditch ==data_all[i].ditchList[j].ditch){
                        for(var m=0;m<data_all[i].ditchList[j].brandList.length;m++){
                            for(var p=0;p<data_all[i].ditchList[j].brandList[m].shopList.length;p++){
                                for(var q=0;q<data_all[i].ditchList[j].brandList[m].shopList[p].warehousesList.length;q++){
                                    dataS1.warehous_code.push(data_all[i].ditchList[j].brandList[m].shopList[p].warehousesList[q].warehous);
                                    dataS1.shop_code.push(data_all[i].ditchList[j].brandList[m].shopList[p].shop);
                                    dataS1.brand_code.push(data_all[i].ditchList[j].brandList[m].brand);
                                    dataS1.ditch_code.push(data_all[i].ditchList[j].ditch);
                                    dataS1.supplier_code.push(data_all[i].customer);
                                    gsData.push({"customer":data_all[i].customer});
                                    brandData.push({"brand":data_all[i].ditchList[j].brandList[m].brand});
                                }
                            }
                        }
                    }
                }
            }

            //判断渠道，公司都选择
            if(data_wd.ditch!='' && data_wd.supplier!=''){
                dataS1.supplier_code.length = 0;
                for(var i=0;i<gsData.length;i++){
                    if(data_wd.supplier == gsData[i].customer){
                        dataS1.supplier_code.push(gsData[i].customer);
                    }
                }
            }

            //判断品牌，渠道都选择
            if(data_wd.ditch!='' && data_wd.brand!=''){
                dataS1.warehous_code.length = 0;
                dataS1.shop_code.length = 0;
                dataS1.brand_code.length = 0;
                for(var i=0;i<data_all.length;i++){
                    for(var j=0;j<data_all[i].ditchList.length;j++){
                        for(var m=0;m<data_all[i].ditchList[j].brandList.length;m++){
                            if(data_wd.ditch ==data_all[i].ditchList[j].ditch && data_wd.brand == data_all[i].ditchList[j].brandList[m].brand){
                                for(var p=0;p<data_all[i].ditchList[j].brandList[m].shopList.length;p++){
                                    for(var q=0;q<data_all[i].ditchList[j].brandList[m].shopList[p].warehousesList.length;q++){
                                        dataS1.warehous_code.push(data_all[i].ditchList[j].brandList[m].shopList[p].warehousesList[q].warehous);
                                        dataS1.shop_code.push(data_all[i].ditchList[j].brandList[m].shopList[p].shop);
                                        dataS1.brand_code.push(data_all[i].ditchList[j].brandList[m].brand);
                                        ckData.push({"warehous":data_all[i].ditchList[j].brandList[m].shopList[p].warehousesList[q].warehous});
                                    }
                                }
                            }
                        }
                    }
                }    
            }
            
            //判断品牌，渠道，仓库都选择
            if(data_wd.ditch!='' && data_wd.brand!='' && data_wd.warehous!=''){
                dataS1.warehous_code.length = 0;
                for(var i=0;i<ckData.length;i++){
                    if(data_wd.warehous == ckData[i].warehous){
                        dataS1.warehous_code.push(ckData[i].warehous);
                    }
                }
                if(brandData.length>0){
                    dataS1.brand_code.length = 0;
                    for(var i=0;i<brandData.length;i++){
                        if(data_wd.brand == brandData[i].brand){
                            dataS1.brand_code.push(brandData[i].brand);
                        }
                    }
                }
            }

            //判断渠道、仓库都选择
            if(data_wd.ditch!='' && data_wd.warehous!=''){
                dataS1.warehous_code.length = 0;
                dataS1.shop_code.length = 0;
                dataS1.brand_code.length = 0;
                brandData.length = 0;
                for(var i=0;i<data_all.length;i++){
                    for(var j=0;j<data_all[i].ditchList.length;j++){
                        for(var m=0;m<data_all[i].ditchList[j].brandList.length;m++){
                            for(var p=0;p<data_all[i].ditchList[j].brandList[m].shopList.length;p++){
                                for(var q=0;q<data_all[i].ditchList[j].brandList[m].shopList[p].warehousesList.length;q++){
                                    if(data_wd.ditch ==data_all[i].ditchList[j].ditch && data_wd.warehous == data_all[i].ditchList[j].brandList[m].shopList[p].warehousesList[q].warehous){
                                        dataS1.warehous_code.push(data_all[i].ditchList[j].brandList[m].shopList[p].warehousesList[q].warehous);
                                        dataS1.shop_code.push(data_all[i].ditchList[j].brandList[m].shopList[p].shop);
                                        dataS1.brand_code.push(data_all[i].ditchList[j].brandList[m].brand);
                                        ckData.push({"warehous":data_all[i].ditchList[j].brandList[m].shopList[p].warehousesList[q].warehous});
                                        brandData.push({"brand":data_all[i].ditchList[j].brandList[m].brand});
                                    }
                                }
                            }
                        }
                    }
                }    
            }

        }else if(flagsx == 3){
           //判断选择品牌
           dataS1.supplier_code.length = 0;
           dataS1.ditch_code.length = 0;
           dataS1.brand_code.length = 0;
           dataS1.shop_code.length = 0;
           dataS1.warehous_code.length = 0;
           var ckData = new Array(),qdData = new Array(), gsData = new Array();
           for(var i=0;i<data_all.length;i++){
                for(var j=0;j<data_all[i].ditchList.length;j++){
                    for(var m=0;m<data_all[i].ditchList[j].brandList.length;m++){
                        if(data_wd.brand == data_all[i].ditchList[j].brandList[m].brand){
                            for(var p = 0;p<data_all[i].ditchList[j].brandList[m].shopList.length;p++){
                                for(var q = 0;q<data_all[i].ditchList[j].brandList[m].shopList[p].warehousesList.length;q++){
                                    dataS1.warehous_code.push(data_all[i].ditchList[j].brandList[m].shopList[p].warehousesList[q].warehous);
                                    dataS1.shop_code.push(data_all[i].ditchList[j].brandList[m].shopList[p].shop);
                                    ckData.push({"warehous":data_all[i].ditchList[j].brandList[m].shopList[p].warehousesList[q].warehous});
                                }
                            }
                            dataS1.brand_code.push(data_all[i].ditchList[j].brandList[m].brand);
                            dataS1.ditch_code.push(data_all[i].ditchList[j].ditch);
                            dataS1.supplier_code.push(data_all[i].customer); 
                            qdData.push({"ditch":data_all[i].ditchList[j].ditch});
                            gsData.push({"customer":data_all[i].customer});
                        }
                    }
                }
            }
            if(data_wd.brand!='' && data_wd.warehous!=''){
                dataS1.warehous_code.length = 0;
                for(var i=0;i<ckData.length;i++){
                    if(data_wd.warehous == ckData[i].warehous){
                        dataS1.warehous_code.push(ckData[i].warehous);
                    }
                }
            }
            if(data_wd.brand!='' && data_wd.ditch!=''){
                dataS1.ditch_code.length = 0;
                for(var i=0;i<qdData.length;i++){
                    if(data_wd.ditch == qdData[i].ditch){
                        dataS1.ditch_code.push(qdData[i].ditch);
                    }
                }
            }
            if(data_wd.brand!='' && data_wd.supplier!=''){
                dataS1.supplier_code.length = 0;
                for(var i=0;i<gsData.length;i++){
                    if(data_wd.supplier == gsData[i].customer){
                        dataS1.supplier_code.push(gsData[i].customer);
                    }
                }
            }
        }else if(flagsx == 4){
            console.log("客户暂无数据");
        }else if(flagsx == 5){
            var gsData = new Array();
            for(var i=0;i<data_all.length;i++){
                for(var j=0;j<data_all[i].ditchList.length;j++){
                    for(var m=0;m<data_all[i].ditchList[j].brandList.length;m++){
                        for(var p=0;p<data_all[i].ditchList[j].brandList[m].shopList.length;p++){
                            for(var q=0;q<data_all[i].ditchList[j].brandList[m].shopList[p].warehousesList.length;q++){
                                if(data_wd.warehous == data_all[i].ditchList[j].brandList[m].shopList[p].warehousesList[q].warehous){
                                    dataS1.warehous_code.push(data_all[i].ditchList[j].brandList[m].shopList[p].warehousesList[q].warehous);
                                    dataS1.shop_code.push(data_all[i].ditchList[j].brandList[m].shopList[p].shop);
                                    dataS1.brand_code.push(data_all[i].ditchList[j].brandList[m].brand);
                                    dataS1.ditch_code.push(data_all[i].ditchList[j].ditch);
                                    dataS1.supplier_code.push(data_all[i].customer);
                                    gsData.push({"customer":data_all[i].customer});
                                }
                            }
                        }
                    }
                }
            }
            //判断同时选择仓库、品牌
            if(data_wd.brand!='' && data_wd.warehous!=''){
                dataS1.brand_code.length = 0;
                dataS1.supplier_code.length = 0;
                for(var i=0;i<data_all.length;i++){
                    for(var j=0;j<data_all[i].ditchList.length;j++){
                        for(var m=0;m<data_all[i].ditchList[j].brandList.length;m++){
                            for(var p=0;p<data_all[i].ditchList[j].brandList[m].shopList.length;p++){
                                for(var q=0;q<data_all[i].ditchList[j].brandList[m].shopList[p].warehousesList.length;q++){
                                    if(data_wd.warehous == data_all[i].ditchList[j].brandList[m].shopList[p].warehousesList[q].warehous &&data_wd.brand == data_all[i].ditchList[j].brandList[m].brand){
                                        dataS1.warehous_code.push(data_all[i].ditchList[j].brandList[m].shopList[p].warehousesList[q].warehous);
                                        dataS1.shop_code.push(data_all[i].ditchList[j].brandList[m].shopList[p].shop);
                                        dataS1.brand_code.push(data_wd.brand);
                                        dataS1.ditch_code.push(data_all[i].ditchList[j].ditch);
                                        dataS1.supplier_code.push(data_all[i].customer);
                                        
                                    }
                                }
                            }
                        }
                    }
                }
            }

            //判断仓库，公司都都选择
            if(data_wd.warehous!='' && data_wd.supplier!=''){
                dataS1.supplier_code.length = 0;
                for(var i=0;i<gsData.length;i++){
                    if(data_wd.supplier == gsData[i].customer){
                        dataS1.supplier_code.push(gsData[i].customer);
                    }
                }
            }

        }else{
            for(var i=0;i<data_all.length;i++){
                dataS1.supplier_code.push(data_all[i].customer);
                for(var j=0;j<data_all[i].ditchList.length;j++){
                    for(var m=0;m<data_all[i].ditchList[j].brandList.length;m++){
                        dataS1.brand_code.push(data_all[i].ditchList[j].brandList[m].brand);
                        for(var q=0;q<data_all[i].ditchList[j].brandList[m].shopList.length;q++){
                            dataS1.shop_code.push(data_all[i].ditchList[j].brandList[m].shopList[q].shop);
                            for(var p=0;p<data_all[i].ditchList[j].brandList[m].shopList[q].warehousesList.length;p++){
                                dataS1.warehous_code.push(data_all[i].ditchList[j].brandList[m].shopList[q].warehousesList[p].warehous);
                            }
                        }
                    }
                    dataS1.ditch_code.push(data_all[i].ditchList[j].ditch);
                }
            }
        }
        removeDuplicatedItem(dataS1.supplier_code);
        removeDuplicatedItem(dataS1.ditch_code);
        removeDuplicatedItem(dataS1.brand_code);
        removeDuplicatedItem(dataS1.shop_code);
        removeDuplicatedItem(dataS1.warehous_code);
        //数据整合处理，把两个接口的数据，进行品牌，赋值处理
        for(var i=0;i<dataS1.supplier_code.length;i++){
            for(let j=0;j<insideData.length;j++){
                if(dataS1.supplier_code[i] === insideData[j].dic_code){
                    dataS1.supplier_code[i] = insideData[j];
                }
            }
        }
        for(var i=0;i<dataS1.ditch_code.length;i++){
            for(let j=0;j<insideData.length;j++){
                if(dataS1.ditch_code[i] === insideData[j].dic_code){
                    dataS1.ditch_code[i] = insideData[j];
                }
            }
        }
        for(var i=0;i<dataS1.brand_code.length;i++){
            for(let j=0;j<insideData.length;j++){
                if(dataS1.brand_code[i] === insideData[j].dic_code){
                    dataS1.brand_code[i] = insideData[j];
                }
            }
        }
        for(var i=0;i<dataS1.shop_code.length;i++){
            for(let j=0;j<insideData.length;j++){
                if(dataS1.shop_code[i] === insideData[j].dic_code){
                    dataS1.shop_code[i] = insideData[j];
                }
            }
        }
        for(var i=0;i<dataS1.warehous_code.length;i++){
            for(let j=0;j<insideData.length;j++){
                if(dataS1.warehous_code[i] === insideData[j].dic_code){
                    dataS1.warehous_code[i] = insideData[j];
                }
            }
        }
        //仓库对应数据进行判断，是去除字符串，只保留json对象。
        dataS1.supplier_code = warehousJson(dataS1.supplier_code);
        dataS1.ditch_code = warehousJson(dataS1.ditch_code);
        dataS1.brand_code = warehousJson(dataS1.brand_code);
        dataS1.shop_code = warehousJson(dataS1.shop_code);
        dataS1.warehous_code = warehousJson(dataS1.warehous_code);
        //数据筛选整合
        showSelectData(dataS1,categary,headerName,data_wd);
       
    }

    //数组去重
    function removeDuplicatedItem(arr) {
        for(var i = 0; i < arr.length-1; i++){
            for(var j = i+1; j < arr.length; j++){
                if(arr[i]==arr[j]){
                    arr.splice(j,1);//console.log(arr[j]);
                    j--;
               }
            }
        }
        return arr;
    }
    //清除数组中的非json对象的数据
    function warehousJson(data){
        var warehouse = new Array();
        for(var i=0;i<data.length;i++){
            if(data[i].id != null || data[i].id != undefined){
                warehouse.push(data[i]);
            }
        }
        data = warehouse;
        return data;
    }

    //通过筛选条件，展示对应的相关筛选数据
    function showSelectData(dataS1,categary,headerName,data_wd){
        queryReload(dataS1,categary,headerName,data_wd);
    }

    //用来控制那个搜索条件刷新
    function queryReload(data,categary,headerName,data_wd){
        arrList={
            supplier_code:[],
            ditch_code:[],
            brand_code:[],
            shop_code:[],
            warehous_code : []
        };
        var searchData=$('#search-data');

        //公司
        function supplierF(){
            var str='';
            var supplier_code=searchData.find('div.supplierId');
            var supplier_codehtml=data.supplier_code;
            //数据排序
            var compare = function (obj1, obj2) {
                var val1 = obj1.dic_ext1?Number(obj1.dic_ext1):'999';
                var val2 = obj2.dic_ext1?Number(obj1.dic_ext1):'999';
                if (val1 < val2) {
                    return -1;
                } else if (val1 > val2) {
                    return 1;
                } else {
                    return 0;
                }            
            };
            var level1='<span class="list" style="vertical-align:top;display:inline-block;height:36px;line-height:36px;">一级：</span>',
            level2='<br/><span class="list" style="vertical-align:top;display:inline-block;height:36px;line-height:36px;">二级：</span>',
            level3='<br/><span class="list" style="vertical-align:top;display:inline-block;height:36px;line-height:36px;">三级：</span>';
           supplier_codehtml.sort(compare);
            for(var i=0;i<supplier_codehtml.length;i++){
                //判断类目展示
                if(supplier_codehtml[i].dic_ext2 == '1' || supplier_codehtml[i].dic_ext2 == null){
                    level1 += '<a href="javascript:;" class="c-item" data-header="'+ supplier_codehtml[i].dic_name +'" data-header-name="'+ supplier_codehtml[i].dic_code +'" data-flag="supplier_code"><input type="checkbox" data-flag="true" class="hide checkbox1"/><span>'+ supplier_codehtml[i].dic_name +'</span></a>';
                }else if(supplier_codehtml[i].dic_ext2 == '2'){
                    level2 += '<a href="javascript:;" class="c-item" data-header="'+ supplier_codehtml[i].dic_name +'" data-header-name="'+ supplier_codehtml[i].dic_code +'" data-flag="supplier_code"><input type="checkbox" data-flag="true" class="hide checkbox1"/><span>'+ supplier_codehtml[i].dic_name +'</span></a>';
                }else{
                    level3 += '<a href="javascript:;" class="c-item" data-header="'+ supplier_codehtml[i].dic_name +'" data-header-name="'+ supplier_codehtml[i].dic_code +'" data-flag="supplier_code"><input type="checkbox" data-flag="true" class="hide checkbox1"/><span>'+ supplier_codehtml[i].dic_name +'</span></a>';
                }
                arrList.supplier_code.push({name:supplier_codehtml[i].dic_name,value:supplier_codehtml[i].dic_code});
            }
            str+=level1+level2+level3+'<p class="remind hide1"><a href="javascript:;" class="assured">确定</a><a href="javascript:;" class="cancel">取消</a> </p>';
            supplier_code.html(str);
        }

        //渠道
        function ditchF(){
            var str='';
            var ditch_code=searchData.find('div.ditchId');
            var brand_codehtml=data.ditch_code;
            var compare = function (obj1, obj2) {
                var val1 = obj1.dic_ext1?Number(obj1.dic_ext1):'999';
                var val2 = obj2.dic_ext1?Number(obj1.dic_ext1):'999';
                if (val1 < val2) {
                    return -1;
                } else if (val1 > val2) {
                    return 1;
                } else {
                    return 0;
                }            
            };
            brand_codehtml.sort(compare);
            var level1='<span class="list" style="vertical-align:top;display:inline-block;height:36px;line-height:36px;">一级：</span>',
            level2='<br/><span class="list" style="vertical-align:top;display:inline-block;height:36px;line-height:36px;">二级：</span>',
            level3='<br/><span class="list" style="vertical-align:top;display:inline-block;height:36px;line-height:36px;">三级：</span>';
            for(var i=0;i<brand_codehtml.length;i++){
                if(brand_codehtml[i].dic_ext2 == '1' || brand_codehtml[i].dic_ext2 == null){
                    level1+='<a href="javascript:;" class="c-item" data-header="'+ brand_codehtml[i].dic_name +'" data-header-name="'+ brand_codehtml[i].dic_code +'" data-flag="ditch_code"><input type="checkbox" data-flag="true" class="hide checkbox1"/><span>'+ brand_codehtml[i].dic_name +'</span></a>';
                }else if(brand_codehtml[i].dic_ext2 == '2'){
                    level2+='<a href="javascript:;" class="c-item" data-header="'+ brand_codehtml[i].dic_name +'" data-header-name="'+ brand_codehtml[i].dic_code +'" data-flag="ditch_code"><input type="checkbox" data-flag="true" class="hide checkbox1"/><span>'+ brand_codehtml[i].dic_name +'</span></a>';
                }else{
                    level3+='<a href="javascript:;" class="c-item" data-header="'+ brand_codehtml[i].dic_name +'" data-header-name="'+ brand_codehtml[i].dic_code +'" data-flag="ditch_code"><input type="checkbox" data-flag="true" class="hide checkbox1"/><span>'+ brand_codehtml[i].dic_name +'</span></a>';
                }
               
                arrList.ditch_code.push({name:brand_codehtml[i].dic_name,value:brand_codehtml[i].dic_code});
            }
            str+=level1+level2+level3+'<p class="remind hide1"><a href="javascript:;" class="assured">确定</a><a href="javascript:;" class="cancel">取消</a> </p>';
            ditch_code.html(str);
        }
        
        //店铺仓库
        function storeF(){
            var str='';
            var shop_code=searchData.find('div.store_warehouse');
            var storewarehousehtml=data.warehous_code;
           
            for(var i=0;i<storewarehousehtml.length;i++){
                str+='<a href="javascript:;" class="c-item" data-header="'+ storewarehousehtml[i].dic_name +'" data-header-name="'+ storewarehousehtml[i].dic_code +'" data-flag="warehous_code"><input type="checkbox" data-flag="true" class="hide checkbox1"/><span>'+ storewarehousehtml[i].dic_name +'</span></a>';
                arrList.shop_code.push({name:storewarehousehtml[i].dic_name,value:storewarehousehtml[i].dic_code});
            }
            str+='<p class="remind hide1"><a href="javascript:;" class="checkAll">全选</a> <a href="javascript:;" class="assured">确定</a><a href="javascript:;" class="cancel">取消</a> </p>';
            shop_code.html(str);
        }

        //品牌
        function brandF(){
            var level0='',
                level1='<span class="list" style="vertical-align:top;display:inline-block;height:36px;line-height:36px;">一级：</span>',
                level2='<br/><span class="list" style="vertical-align:top;display:inline-block;height:36px;line-height:36px;">二级：</span>',
                level3='<br/><span class="list" style="vertical-align:top;display:inline-block;height:36px;line-height:36px;">三级：</span>';
            var str='',name='',str1='',flag=false;
            var brand_code=searchData.find('div.brand_code');
            var brand_codehtml=data.brand_code;
            
            for(var i=0;i<brand_codehtml.length;i++){
                level0+='<a href="javascript:;" class="c-item" data-header="'+ brand_codehtml[i].dic_name +'" data-header-name="'+ brand_codehtml[i].dic_code +'" data-flag="brand_code"><input type="checkbox" data-flag="true" class="hide checkbox1"/><span>'+ brand_codehtml[i].dic_name +'</span></a>';
                arrList.brand_code.push({name:brand_codehtml[i].dic_name,value:brand_codehtml[i].dic_code});
            }
            str=level0+'<p class="remind hide1"><a href="javascript:;" class="checkAll">全选</a><a href="javascript:;" class="assured">确定</a><a href="javascript:;" class="cancel">取消</a> </p>';
            brand_code.eq(0).html(str);
        }

        //客户
        function shopF(){
            var level1='<span class="list" style="vertical-align:top;display:inline-block;height:36px;line-height:36px;">一级：</span>',
            level2='<br/><span class="list" style="vertical-align:top;display:inline-block;height:36px;line-height:36px;">二级：</span>',
            level3='<br/><span class="list" style="vertical-align:top;display:inline-block;height:36px;line-height:36px;">三级：</span>';
        var str='',name='',str1='',flag=false;
        var brand_code=searchData.find('div.brand_code');
        var brand_codehtml=data.shop_code;
        
        for(var i=0;i<brand_codehtml.length;i++){
            // if(brand_codehtml[i].dic_ext2==='3'){
            //     level1+='<a href="javascript:;" data-categary="1" class="c-item" data-header="'+ brand_codehtml[i].dic_name +'" data-header-name="'+ brand_codehtml[i].dic_code +'" data-flag="brand_code"><input type="checkbox" data-flag="true" class="hide checkbox1"/><span>'+ brand_codehtml[i].dic_name +'</span></a>';
            // }else if(brand_codehtml[i].dic_ext2==='4'){
            //     level2+='<a href="javascript:;" data-categary="2" class="c-item" data-header="'+ brand_codehtml[i].dic_name +'" data-header-name="'+ brand_codehtml[i].dic_code +'" data-flag="brand_code"><input type="checkbox" data-flag="true" class="hide checkbox1"/><span>'+ brand_codehtml[i].dic_name +'</span></a>';
            // }else if(brand_codehtml[i].dic_ext2==='5'){ 
            //     level3+='<a href="javascript:;" data-categary="3" class="c-item" data-header="'+ brand_codehtml[i].dic_name +'" data-header-name="'+ brand_codehtml[i].dic_code +'" data-flag="brand_code"><input type="checkbox" data-flag="true" class="hide checkbox1"/><span>'+ brand_codehtml[i].dic_name +'</span></a>';
            // }
            arrList.brand_code.push({name:brand_codehtml[i].dic_name,value:brand_codehtml[i].dic_code});
        }
        str1=level1+level2+level3+'<p class="remind hide1"><a href="javascript:;" class="checkAll">全选</a><a href="javascript:;" class="assured">确定</a><a href="javascript:;" class="cancel">取消</a> </p>';
         brand_code.eq(1).html(str1);
        }
        supplierF();//公司
        ditchF();//渠道
        brandF();//品牌
        shopF();//客户
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
                categary = _this.attr('data-flag'),
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
                            .before('<a href="javascript:;" class="all-classify-item" data-num="'+ dataNum +'"  data-name="'+headerPrefix +'" data-flag="'+ flag +'"><span>'+ headerPrefix +'：<i data-header-name="'+ headerName +'" class="i">'+ header +'</i></span><i class="fa fa-close">X</i></a>')
                            .remove();
                    }else{
                        navBar.append('<a href="javascript:;" class="all-classify-item"   data-num="'+ dataNum +'"  data-name="'+headerPrefix +'" data-flag="'+ flag +'"><span>'+ headerPrefix +'：<i data-header-name="'+ headerName +'" class="i">'+ header +'</i></span><i class="fa fa-close">X</i></a>');
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
            checkboxData='<a href="javascript:;" class="all-classify-item" type="'+  +'" data-name="'+headerPrefix +'" data-num="'+ dataNum +'" data-flag="'+ flag +'"><span>'+ headerPrefix +'：'+ headerData +'</span><i class="fa fa-close">X</i></a>';
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
            str+='</span><i class="fa fa-close">X</i>';
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
                        .before('<a href="javascript:;" class="all-classify-item" data-num="'+ dataNum +'" data-flag="'+ flag +'"><span>时间：<i class="i" data-header-name="'+ headerVal +'">'+ header +'</i></span><i class="fa fa-close">X</i></a>')
                        .remove();
                }
            }else{
                navBar.append('<a href="javascript:;" class="all-classify-item" data-num="'+ dataNum +'"  data-flag="'+ flag +'"><span>时间：<i class="i" data-header-name="'+ headerVal +'">'+ header +'</i></span><i class="fa fa-close">X</i></a>');
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

    //请求获取表格数据
    function getData(){
        var dateBegin ='',
        dateEnd = '',
        dimension = '',
        itemCode = '',
        page = 1,
        pageSize = -1,
        fields = queryData.fields.join(','),
        tier1 = '',
        tier2 = '',
        tier3 = '',
        tier4 = '',
        tier5 = '',
        type = $('.active').val();

        //获取日期数据
        for(var i=0;i<queryData.conditions.length;i++){
            if(queryData.conditions[i].name == "data_date"){
                dateBegin = queryData.conditions[i].values[0];
                dateEnd = queryData.conditions[i].values[1];
            }
        }

        //获取单品数据
        for(var i=0;i<queryData.conditions.length;i++){
            if(queryData.conditions[i].name == "goods_id"){
                itemCode = queryData.conditions[i].values[0];
            }
        }

        //获取公司code
        for(var i=0;i<queryData.conditions.length;i++){
            if(queryData.conditions[i].name == "supplier_code"){
                tier1 = queryData.conditions[i].values[0];
            }
        }

        //获取渠道数据
        for(var i=0;i<queryData.conditions.length;i++){
            if(queryData.conditions[i].name == "ditch_code"){
                tier2 = queryData.conditions[i].values[0];
            }
        }

        //获取品牌数据
        for(var i=0;i<queryData.conditions.length;i++){
            if(queryData.conditions[i].name == "brand_code"){
                tier3 = queryData.conditions[i].values[0];
            }
        }

        //获取仓库数据
        for(var i=0;i<queryData.conditions.length;i++){
            if(queryData.conditions[i].name == "shop_code"){
                tier5 = queryData.conditions[i].values[0];
            }
        }

        //判断品牌、仓库、店铺、渠道、公司值为all替换''
        tier1 = (tier1 != 'all')?tier1:'';
        tier2 = (tier2 != 'all')?tier2:'';
        tier3 = (tier3 != 'all')?tier3:'';
        tier4 = (tier4 != 'all')?tier4:'';
        tier5 = (tier5 != 'all')?tier5:'';
        //dimension数据拼接
        var dsn1 = '',dsn2 = '',dsn3 = '',dsn4 = '',dsn5 = '',dsn6 = '',dsn7 = '';
        dsn1 = tier1?'1':'0';dsn2 = tier2?'1':'0';dsn3 = tier3?'1':'0';dsn4 = tier4?'1':'0';dsn5 = tier5?'1':'0'; dsn6 = type?'1':'0';
        //判断年月日
        //获取下拉框数据描述，年度、月度、日期
        var data1 = $('#timeSelect').find("option:selected").text();
        var data2 = $('#Dimension ').find("option:selected").text();
        if(data1 == "年度" || data2 == "年度"){
            dsn7 = '100';
        }else if(data1 == "月份" || data2 == "月份"){
            dsn7 = '110';
        }else if(data1 == "日期" || data2 == "日期"){
            dsn7 = '111';
        }else{
            dsn7 = '000';
        }
        dimension = dsn1+dsn2+dsn3+dsn4+dsn5+dsn6+'.'+dsn7;
        
        var data = {
            'dateBegin' : dateBegin,
            'dateEnd' : dateEnd,
            'dimension' : dimension,
            'itemCode' : itemCode,
            'page' : page,
            'pageSize' : pageSize,
            'tier1' : tier1,
            'tier2' : tier2,
            'tier3' : tier3,
            'tier4' : tier4,
            'tier5' : tier5,
            'fields' : fields,
            'type' : type
        };
        var dealData = dealElement(data);
          
        $.ajax({
            url:'/maochao/dw/getDW.json',
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            type:"POST",
            dataType: 'json',
            async:false,
            data:dealData,
            success:function(data){
                renderingData.push(data);
            },
            error:function(data){}
        });
        
    }

    //判断提交数据为有空的对象，去除空对象，同时返回新的对象
    function dealElement(obj){
        var param = {};
        if ( obj === null || obj === undefined || obj === "" ) return param;
        for ( var key in obj ){
            if ( obj[key] !== null && obj[key] !== undefined && obj[key] !== "" ){
                param[key] = obj[key];
            }
        }
        return param;
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
        //计算最底部数据
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

    //查询数据
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
                data_date=getDays(tableData.data_date.start,tableData.data_date.end);
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
        if(renderingData.status == 'success'){
            tableData.goodsId.data.length=0;
            tableData.goodsId.data.push(renderingData.data.result); 
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
                    str+='</span><i class="fa fa-close">X</i></a>';
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
        var status='';
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
                                str+='</span><i class="fa fa-close">X</i></a>';
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
                            str+='</span><i class="fa fa-close">X</i></a>';
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