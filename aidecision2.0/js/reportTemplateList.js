var curRow = {};	//当前选中的行信息
//条件改变时触发
function searchFunction(){
    $('#StockListTable').bootstrapTable('destroy');//先要将table销毁，否则会保留上次加载的内容
			getData();
}
//得到查询的参数
var queryParams = function (params) {
      var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
          pageSize: params.limit,   //页面大小
          page: (params.offset / params.limit) + 1,  //页码
          name: $('#nameInput').val(),  //模板名称
          useraccount: $('#useraccountInput').val(),  //制单人账号
          username: $('#usernameInput').val(),  //制单人名称
          updateuser:$('#updateuserInput').val(),//修改人名称
          updateaccount:$('#updateaccountInput').val(),//修改人账号
          creationdateStart:$('#creationdateStart').val(),//制单开始日期
          creationdateEnd:$('#creationdateEnd').val(),//制单结束日期
          updatedateStart:$('#updatedateStart').val(),//修改开始日期
          updatedateEnd:$('#updatedateEnd').val()//修改结束日期
      };
      return temp;
};

function GetRequest() {
	  
	  var url = location.search; //获取url中"?"符后的字串
	   var theRequest = new Object();
	   if (url.indexOf("?") != -1) {
	      var str = url.substr(1);
	      strs = str.split("&");
	      for(var i = 0; i < strs.length; i ++) {
	         theRequest[strs[i].split("=")[0]]=(strs[i].split("=")[1]);
	      }
	   }
	   return theRequest;
}

function getData(){
	
				$('#StockListTable').bootstrapTable({
					url:"rest/findReportTemplateAll.json",
					method:'post',
					queryParams: queryParams,//传递参数（*）
					search: false, //不显示 搜索框
					//uniqueId: "id",      //每一行的唯一标识，一般为主键列
					detailView: false,     //是否显示父子表
					showToggle:true,     //是否显示详细视图和列表视图的切换按钮
				   	cardView: false,     //是否显示详细视图
					striped: true,      //是否显示行间隔色
					cache: false,      //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
					pagination: true,     //是否显示分页（*）
					pageNumber:1,      //初始化加载第一页，默认第一页
					pageSize: 10,      //每页的记录行数（*）
					pageList: [10, 25, 50, 100, 1000],  //可供选择的每页的行数（*）
					sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
					clickToSelect: false,                //是否启用点击选中行
					searchOnEnterKey:true,				//设置为 true时，按回车触发搜索方法，否则自动触发搜索方法
					searchText:true,					//初始化搜索文字
					showRefresh:true,	//刷新
					maintainSelected:true,		//设置为 true 在点击分页按钮或搜索按钮时，将记住checkbox的选择项
					contentType: "application/x-www-form-urlencoded",
			    columns: [{
			    	checkbox: true	//复选框
			    }
			    ,{
			        field: 'id',
			        title: 'id',
			        visible:false		//隐藏列
			    },
			    {
			        field: 'parameter',
			        title: 'parameter',
			        visible:false		//隐藏列
			    },{
			        field: 'name',
			        title: '模板名称'
			    },  {
			        field: 'userAccount',
			        title: '制单人账号'
			    },  {
			        field: 'userName',
			        title: '制单人名称'
			    },  {
			        field: 'creationDate',
			        title: '制单日期'
			    },  {
			        field: 'updateAccout',
			        title: '修改人账号'
			    },  {
			        field: 'updateUser',
			        title: '修改人名称'
			    },  {
			        field: 'updateDate',
			        title: '修改日期'
			    },  {
			        field: 'operation',
			        title: '操作',
			        width:200,
			        formatter:function(value,row,index){
			        	var pageElementUrl="pageElement";
			        	var deleteUrl=""
			        	var look="<a href='"+pageElementUrl+".html?status=3&id=" + row.id + "' id='lookPageElement'"+
			        		"class='btn btn-primary'  target='main' class='btn btn-success' >查看</a>&nbsp;"	;
			        		
			        	var update = "<a href='"+pageElementUrl+".html?status=2&id=" + row.id +"' id='updateReportTemplate'"+
	        					"class='btn btn-primary'   target='main' class='btn btn-success' >修改</a>&nbsp;";
	                    var delect = '<a href="#" mce_href="#" onclick="del(\''+ row.id +'\')" class="btn btn-primary" >删除</a> ';
	                    return look+update+delect;	
			        }
	                      
			    }
			    	],
			    //双击该列事件
			    /* 当用户双击某一列的时候触发，参数包括：
				field：点击列的 field 名称，
				value：点击列的 value 值，
				row：点击列的整行数据，
				$element：td 元素。 */
			  //双击该列事件
			    /* 当用户双击某一列的时候触发，参数包括：
				field：点击列的 field 名称，
				value：点击列的 value 值，
				row：点击列的整行数据，
				$element：td 元素。 */
			    onDblClickCell:function(field, value, row, $element){	
			    	
			    },
			 
				onExpandRow: function (index, row, $detail) {
					
					InitSubTable(index, row, $detail);
				},
			    onClickRow:function(row, $element){
			    	curRow = row;
			    },
		        rowAttributes:function(row,index) {
		        	
		        	if(row.creationDate){
			        	row.creationDate = new Date(row.creationDate).Format('yyyy-MM-dd');
		        	}
		        	if(row.updateDate){
			        	row.updateDate = new Date(row.updateDate).Format('yyyy-MM-dd');
		        	}
		        	row._index = index;
					return row;
				},
				onLoadSuccess:function(aa, bb, cc){
					
				},
				onAll:function(name, args){	//所有事件
					
				}
				
			});
				
		
}


function del(id){
	
	if(!confirm("确定要删除数据吗?")){
		$('#batchDeletByIds').prop('disabled', false);
		return;
	}
	$.ajax({
		url:"rest/deleteReportTemplateById",
		type: "POST",
		async:false,
		data: {'id':id},
			dataType: "json",
			success:function(json){
				if(json && json.status == 'success'){
				 	alert("已删除成功！删除条数："+json.data+"条");
				   
				}else{
					alert(json.message);
				}
			}
	
	});
	 $('#StockListTable').bootstrapTable('destroy');//先要将table销毁，否则会保留上次加载的内容
		getData();
}


//批量删除

$('#batchDeletByIds').click(function(){
			//将该按钮禁用
			$('#batchDeletByIds').prop('disabled', true);
			var selects = $('#StockListTable').bootstrapTable('getSelections', null);
			var ids = "";
			if(!selects || selects.length <= 0){
				alert('至少选择一条数据!')
    			$('#batchDeletByIds').prop('disabled', false);
				return;
			}
			
			if(!confirm("确定要批量删除吗?")){
    			$('#batchDeletByIds').prop('disabled', false);
				return;
			}
			for(var i in selects){
				ids += "'" + selects[i].id + "',";
			}
			ids = ids.substring(0, ids.length - 1);
			
			$.ajax({
    			url:"rest/deleteReportTemplateByIds",
    			type: "POST",
    			async:false,
    			data: {'ids':ids},
  				dataType: "json",
  				success:function(json){
  					if(json && json.status == 'success'){
  					 	alert("已删除成功！删除条数："+json.data+"条");
  					   
  					}else{
  						alert(json.message);
  					}
  				}
    		
			});
			 $('#StockListTable').bootstrapTable('destroy');//先要将table销毁，否则会保留上次加载的内容
				getData();
			$('#batchDeletByIds').removeAttr("disabled");
	});


    	//初始化日期插件
$('.datetimepicker').datetimepicker({
    language: 'zh-CN',/*加载日历语言包，可自定义*/
    format: 'yyyy-mm-dd',
    minView: "month",	//选择到日期
    autoclose:true
});
$(function(){
    		  //报表模板信息
        getData();
        
         	
})
    	