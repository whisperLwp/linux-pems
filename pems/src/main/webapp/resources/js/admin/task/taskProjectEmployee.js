$(function(){
	$("#save_btn").bind("click", TaskProjectEmployee.saveData);
});
var TaskProjectEmployee={
	//弹出编辑对话框
	showEdit : function(taskProjectEmployeeId){
		//弹框方式
		$(".formError").remove();
		if(!taskProjectEmployeeId){//新增
			this.clearData();
		}
		else{//修改
			this.fillData(taskProjectEmployeeId);
		}
		$('#editModal').modal({keyboard: false});
		//页面跳转方式
		//if(!taskProjectEmployeeId) taskProjectEmployeeId = "";
		//document.location.href = ctx + "/taskProjectEmployee/editTaskProjectEmployee?taskProjectEmployeeId="+taskProjectEmployeeId;
	},	
	//清除弹出框数据
	clearData : function(){
		$("#editForm select").each(function() {
			$(this).find("option:first").prop("selected", 'selected');
		})
		$("#editForm input").each(function() {
			$(this).val("");
		})
	},
	//填充弹出框数据
	fillData : function(taskProjectEmployeeId){
		this.getData(taskProjectEmployeeId, function(data){
			for (dataAttr in data)  
			  {  
			   	 if($("#editForm [name="+dataAttr+"]")){
			   		$("#editForm [name="+dataAttr+"]").val(data[dataAttr]);
			   	 }
			  } 
		});
	},
	//保存数据
	saveData : function(){
		if(!$("form#editForm").validationEngine("validate")) return ;  
		$.ajax({
    		url: ctx+"/admin/taskProjectEmployee/saveTaskProjectEmployee",
    		type: "POST",
    		async: true,
    		data: $("#editForm").serialize(),
    		success: function(data){
    			if(data.errorCode =="000000"){
    				Dialog.showSuccess("保存成功");
    				document.location.reload();
    				//document.location.href = ctx + "/taskProjectEmployee/taskProjectEmployeeList";
    			}
    			else{
    				Dialog.showError(data.errorMessage);
    			}
    		},
    		error: function(){
    		}
    	});
	},	
	//获取数据
	getData : function(taskProjectEmployeeId, callback){
		$.ajax({
    		url: ctx+"/admin/taskProjectEmployee/findTaskProjectEmployee",
    		type: "POST",
    		async: true,
    		data: {"taskProjectEmployeeId" : taskProjectEmployeeId},
    		success: function(data){
    			if(data.errorCode =="000000"){
    				callback(data.data);
    				return;
    			}
    			else{
    				Dialog.showError(data.errorMessage);
    			}
    		},
    		error: function(){
    		}
    	});
	},
	//删除数据
	deleteData : function (taskProjectEmployeeId, delFlag) {
        Dialog.showConfirm(function() {
        	$.ajax({
        		url: ctx+"/admin/taskProjectEmployee/deleteTaskProjectEmployee",
        		type: "POST",
        		async: true,
        		data: {"taskProjectEmployeeId" : taskProjectEmployeeId},
        		success: function(data){
        			if(data.errorCode =="000000"){
        				Dialog.showSuccess("操作成功");
        				document.location.reload();
        			}
        			else{
        				Dialog.showError(data.errorMessage);
        			}
        		},
        		error: function(){
        		}
        	});
		});
	}
}