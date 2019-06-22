var regValidFlag=false;
var userValidFlag=false;

function ajaxload(ahref, showId){
	if($('#'+showId) == null){
		return false;
	}
	
	var url = _getAjaxUrl(ahref);
	if(url == ''){
		return false;
	}

	$('#'+showId).load(url);
	return false;
}

function ajaxget(ahref, callfunc, isasync, datatype){
	var url = _getAjaxUrl(ahref);   
	if(url == ''){
		return false;
	}
	isasync = typeof(isasync)=="undefined" ? true : isasync;
	callfunc = callfunc ? callfunc : function(json){return false;};
	dataType = typeof(datatype)=="undefined" ? "json" : datatype;
	$.ajax({
		cache:false,
		type:"GET",
		async:isasync,
		url: url,
		dataType: dataType, 
		success: callfunc,
		error:function(){}
	});

}

function ajaxpost(ahref, callfunc, datatype, isasync){
	var url = _getAjaxUrl(ahref);
	if(url == ''){
		return false;
	}
	
	callfunc = callfunc ? callfunc : function(json){return false;};
	var index = url.lastIndexOf('?');
	var data = null;
	if(index >= 0){
		data = url.substr(index+1);
		url = url.substring(0, index);
	}
	isasync = typeof(isasync)=="undefined" ? true : isasync;
	dataType = typeof(datatype)=="undefined" ? "json" : datatype;
	$.ajax({
		cache:false,
		type:"POST",
		async:isasync,
		url: url,
		data: data,
		dataType: dataType, 
		success: callfunc,
		error:function(){}
	});
	return false;
}

function ajaxForm(formId, callfunc, datatype){
	var url = $('#'+formId).attr('action');
	dataType = typeof(datatype)=="undefined" ? "json" : datatype;
	$.ajax({
		cache:false,
		type:"POST",
		url: url,
		data: $('#'+formId).serialize(),
		dataType: dataType, 
		success: callfunc,
		error:function(){}
	});
	return false;
}

function _getUrlParams(url){
	var index = url.lastIndexOf('?');
	if(index < 0){
		return null;
	}
	
	var paramstr = url.substr(index+1);
	var parr = paramstr.split('&');
	if(parr == null || parr.length == 0){
		return null;
	}
	
	var params = '{';
	for(var i=0; i<parr.length; i++){
		var partmp = parr[i].split('=');
		params += '"'+partmp[0]+'":"'+partmp[1]+'",';
	}
	if(params.length > 1){
		params = params.substr(0, params.length-1);
	}
	params += '}';
	return params;
}

function ajaxmenu(ahref, callfunc, datatype){
	var url = _getAjaxUrl(ahref);
	if(url == ''){
		return false;
	}
	
	ajaxpost(ahref, function(result){
		var $dialog = _getDialog();
		$dialog.html(result);
		$dialog.dialog('open');
		if(callfunc){callfunc(result);}
	}, datatype ? datatype : "html");
	return false;
}

function _getDialog(type, width, height, okfunc, cancelfunc){
	var $dialog = $('#dialog').dialog({
		autoOpen: false,
		resizable: true,
		width: 'auto',
		height:'auto'
	});
	
	type = type ? type : 'tip';
	switch(type){
	case 'tip' : break;
	case 'msg' : $dialog.dialog( "option", "buttons", {
				'确认': okfunc ? okfunc : function() {
						$( this ).dialog( "close" );
					}
				});
				break;
	case 'confirm' : $dialog.dialog( "option", "buttons", [
					{'确认': okfunc ? okfunc : function() {$( this ).dialog( "close" );}},
					{'取消': cancelfunc ? cancelfunc : function() {$( this ).dialog( "close" );}},
				]);
				break;
	}

	if(width){
		$dialog.dialog( "option", "width", width);
	}
	if(height){
		$dialog.dialog( "option", "height", height);
	}

	return $dialog;
}

function valinputdata(inputid, lowercount, maxcount, tipid, tipmsg, calcfunc){
	var con = $('#'+inputid).val();
	var data = con.replace('/\r\n/g', '').replace(/\n/g, '').replace(/\s/g, '').replace('/<br(\/*)>/g', '');
	if(lowercount > 0 || maxcount > 0){
		var len = typeof(calcfunc) != "undefined" ? calcfunc(inputid) : getBytesLength(data);
		if((lowercount > 0 && len<lowercount) || (maxcount>0 && len>maxcount)){
			$('#'+inputid).focus();
			if(typeof(tipid)!="undefined" && tipid != '' && tipid != null){
				var tipobj = $('#'+tipid);
				if(tipobj.length > 0){
					tipobj.html(tipmsg);
					tipobj.css('display', '');
				}
			}
			return false;
		}
	}
	return con;
}

function _getAjaxUrl(ahref){
	var url = '';
	if(ahref.lastIndexOf('.') < 0){
		var ahrefobj = $('#'+ahref);    
		if(ahrefobj != null){
			var href = ahrefobj.attr('href');
			url = href != undefined ? href : ahref;
		}
	}
	else{
		url = ahref;
	}
	return url;
}

// type:tip,msg,confirm
function popmenu(content, type, width, height, okfunc, cancelfunc){
	var $dialog = _getDialog(type, width, height, okfunc,cancelfunc);
	$dialog.html(content);
	$dialog.dialog('open');
}


function registerFormSubmit(){
	validateEmail();
	if(!regValidFlag){
		return false;
	}
	
	validateNickName();
	if(!regValidFlag){
		return false;
	}
	validatePassword();
	if(!regValidFlag){
		return false;
	}
	validatePassword_Again();
	if(!regValidFlag){
		return false;
	}
	validateCaptcha();
	if(!regValidFlag){
		return false;
	}
	
	   document.register.submit();
}

function userinfoFormSubmit()
{   
// validateDomain();
// if(!userValidFlag)
// {
// return false;
// }
	 validateNickName();
	 if(!userValidFlag)
	 {
		 return false;
	 }
	 
	 validateRealName();
	 if(!userValidFlag)
	 {
		 return false;
	 }
	 
	 validateContactEamil();
	 if(!userValidFlag)
	 {
		 return false;
	 }
	 
	 validateQQ();
	 if(!userValidFlag)
	 {
		 return false;
	 }
	 
	 validateMSN();
	 if(!userValidFlag)
	 {
		 return false;
	 }
	 
	 validateAword();
	 if(!userValidFlag)
	 {
		 return false;
	 }
	 document.userinfo.submit();
}

function isEmail(emailStr){
	var reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
	return reg.test(emailStr);
}

function validateEmail(onlyPattern)
{	
	regValidFlag = false;
	if($('#email').val().length==0){     
        $('#emailPrompt').html('<font color="red">邮箱不能为空</font>');
    }else if($('#email').val().length>128){
    	 $('#emailPrompt').html('<font color="red">邮箱长度太长</font>');
    }
    else{
     	if(isEmail($('#email').val())){
     		if(onlyPattern == false)
     		{
		          ajaxget('index.php?r=register/validateemail&email='+$('#email').val()+'&random='+Math.random(),function(data){ 
		        	  if(data==true)
		        	  {   
		        		  $('#emailPrompt').html('<font color="red">邮箱重复</font>');
		        	  }else
		        	  {   
		        		  $('#emailPrompt').html('<font color="green">可以注册的邮件</font>');
		        		  regValidFlag=true;
		        	  }
		          },false);
	          }else{
	        	  $('#emailPrompt').html('<font color="green">规范的格式</font>');
	        	  regValidFlag=true;
	          }
	    }else
	    {   
	    	$('#emailPrompt').html('<font color="red">邮件格式错误</font>');
	    }
    }
}

/*
 * 验证昵称是否重复以及验证格式
 */
function validateNickName()
{  
	 str=$('#nickName').val();
	 len=checkChineseEnglish(str);
	regValidFlag=false;
	userValidFlag=false;
	if(len==0)
	{   
    	$('#nickNamePrompt').html('<font color="red">昵称不能为空</font>');
	}else if(len<4||len>20){
		$('#nickNamePrompt').html('<font color="red">昵称为应该在4-20位英文、数字和中文组成</font>');
	}else
	{
		 var reg = /^[\u4e00-\u9fa5|0-9|a-zA-Z|\,\.\_\$\@]+$/; 
        if(reg.test($('#nickName').val()))
        {   
        	nickName=encodeURI($('#nickName').val()); 
        	ajaxget('/index.php?r=register/validatenickname&nickName='+nickName+'&random='+Math.random(),function(data){  
	        	  if(data==true)
	        	  {   
	        		  $('#nickNamePrompt').html('<font color="red">昵称重复</font>');
	        	  }else if(data == -1){
	        		  $('#nickNamePrompt').html('<font color="red">含有敏感词</font>');
	        	  }
	        	  else
	        	  {   
	        		  $('#nickNamePrompt').html('<font color="green">符合的昵称</font>');
	        		  regValidFlag=true;
	        		  userValidFlag=true;
	        	  }
	          },false);
        }else
	    {   
        	$('#nickNamePrompt').html('<font color="red">昵称格式错误</font>');
	    }
	}

}

function checkChineseEnglish(str){ 
	num=str.length;
	if(num==0)
	{
		return 0;
	}
	chinese=0;
	english=0;
	var reg1 = /^[\u4e00-\u9fa5]+$/;
	var reg2 = /^[0-9|a-zA-Z]+$/; 
	for(var i=0;i<num;i++){
		if(reg1.test(str.substr(i,1)))
		{  
			chinese++;
		}
		if(reg2.test(str.substr(i,1)))
		{
			english++;
		}
	}
	len=chinese*2+english;
	return len;
}



function validatePassword()
{    
	regValidFlag=false;
    $('#strength1').addClass('red');
    $('#strength2').addClass('red');
    $('#strength3').addClass('red');
    $('#strength4').addClass('red');
    $('#strength5').addClass('red');
	if($('#password').val().length==0)
	{   
		$('#passwordPrompt').html('<font color="red">密码不能为空</font>');
	}else if($('#password').val().length<6||$('#password').val().length>16)
	{
		$('#passwordPrompt').html('<font color="red">密码应该在6-16位英文、数字或者_!组成</font>');
	}else
	{
		 var reg =/^[0-9|a-zA-Z|_!]+$/;
		 if(reg.test($('#password').val()))
	        {
			    $('#passwordPrompt').html('<font color="green">规范密码</font>');
			    var flag=0;
			    if($('#password').val().match(/[0-9]/))
			    {
			    	flag++;
			    }
			    if($('#password').val().match(/[a-zA-Z]/))
			    {
			    	flag++;
			    }
			    if($('#password').val().match(/[_!]/))
			    {
			    	flag++;
			    }
			    if(flag==1){     
			    	  $('#passwordPrompt').html('<font color="red">弱</font>');
			          $('#strength1').removeClass('red');
			    }else if(flag==2){     
			    		$('#passwordPrompt').html('<font style="color:#F68210">中等</font>');
					    $('#strength1').removeClass('red');
					    $('#strength2').removeClass('red');
					    $('#strength3').removeClass('red');
			    }else if(flag==3){     
			    	$('#strength1').removeClass('red');
			        $('#strength2').removeClass('red');
			        $('#strength3').removeClass('red');
			        $('#strength4').removeClass('red');
			        $('#strength5').removeClass('red');
			    	$('#passwordPrompt').html('<font color="green">强</font>');
			    }
			    if($('#password_again').val!=''){
			    	  if($('#password').val()==$('#password_again').val()){
			    		  $('#password_againPrompt').html('<font color="green">2次密码一致</font>');
			    	  }else{
			    		  $('#password_againPrompt').html('<font color="red">2次密码输入不一致</font>');
			    	  }
			    }
			    regValidFlag=true;
	        }else
		    {   
	        	$('#passwordPrompt').html('<font color="red">密码格式错误</font>');
		    }
	}
}


function validatePassword_Again()
{   
	regValidFlag=false;
    if($('#password_again').val().length==0)
    {   
    	$('#password_againPrompt').html('<font color="red">密码不能为空</font>');
    }else{
	    if($('#password').val()!==$('#password_again').val())
	    {   
	    	$('#password_againPrompt').html('<font color="red">2次密码输入不一致</font>');
	    }else
	    {   
	    	$('#password_againPrompt').html('<font color="green">正确</font>');
	    	regValidFlag=true;
	    }
    }
    
}


function validateCaptcha()
{  
	regValidFlag=false;
	  ajaxget('/index.php?r=index/validatecaptcha&captcha='+$('#captcha').val()+'&random='+Math.random(),function(data){  
    	  if(data==true)
    	  {   
    		  $('#captchaPrompt').html('<font color="green">通过</font>');
    		  regValidFlag=true;
    	  }else
    	  {   
    		  $('#captchaPrompt').html('<font color="red">验证码错误</font>');
    	  }
      },false);
}

function validateDomain()
{    userValidFlag=false;
      if($('#domain').val().length>10)
      {   
    	  $('#domainPrompt').show();
    	  $('#domainPrompt').html('域名不能超过10个');
      }else
      {
    	  $('#domainPrompt').hide();
    	  userValidFlag=true;
      }
}



function validateRealName()
{    
	userValidFlag=false;
	if($('#realName').val().length>8){
		$('#realNamePrompt').html('<font color="red">姓名不应该超过8位英文或者中文组成</font>');
	}else
	{
		 var reg = /^[\u4e00-\u9fa5|a-zA-Z]+$/; 
		 if($('#realName').val().length!=0){
	        if(reg.test($('#realName').val()))
	        {   
		        		  $('#realNamePrompt').html('<font color="green">符合的姓名</font>');
		        		  userValidFlag=true;
	        }else
		    {   
	        	$('#realNamePrompt').html('<font color="red">姓名格式错误</font>');
		    }
		 }else
		 {
			 $('#realNamePrompt').html('');
			 userValidFlag=true;
		 }
	}

}


function validateContactEamil()
{     
	userValidFlag=false;
	     if($('#contactEmail').val().length>128)
	    {
	    	    $('#contactEmailPrompt').html('<font color="red">邮箱长度太长</font>');
	    }
	    else{   
	    	   if($('#contactEmail').val().length!=0)
	    	   {
				    	var reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
			     	    if(reg.test($('#contactEmail').val()))
				    {  
				        $('#contactEmailPrompt').html('<font color="green">合格的邮件</font>');
				        userValidFlag=true;
				    }else
				    {   
				    	$('#contactEmailPrompt').html('<font color="red">邮件格式错误</font>');
				    }
	    	   }else
	    	   {
	    		       $('#contactEmailPrompt').html('');
	    		       userValidFlag=true;
	    	   }
	    }
}

function validateMSN()
{    
	userValidFlag=false;
	  if($('#msn').val().length>100)
	    {
	    	    $('#msnPrompt').html('<font color="red">msn长度太长</font>');
	    }else
	    {
	    	userValidFlag=true;
	    }
	}

function validateQQ()
{    
	userValidFlag=false;
	 if($('#qq').val().length>16)
	    {
	    	    $('#qqPrompt').html('<font color="red">qq长度太长</font>');
	    }else
	    {
	    	userValidFlag=true;
	    }
	}

function validateAword()
{   
	userValidFlag=false;
	str=$('#aword').val();
	 len= checkChineseEnglish(str);
	   if(len >140){
		$('#awordPrompt').html('<font color="red">此处字数限制不超过140个字</font>');
		return false;
	}
    $('#awordPrompt').html();
    userValidFlag=true;
    return true;
}




/**
 * 生成日期
 */
function decideDays()
{
	  var year=document.getElementById('year').value;
	  var month=document.getElementById('month').value;
	  var day;
	    if((year%4==0)&&(year%100!=0)||(year%400==0))
	  {
		    if(month==2)
		    {
		    	day=29;
		    }else if("1,3,5,7,8,10,12".search(month)!==false)
		    {
		    	day=31;
		    }else
		    {
		    	day=30;
		    }
	  }else{
		if(month==2)
		{
	    day=28;
	    }else if("1,3,5,7,8,10,12".search(month)!==false)
	    {
	    	 day=31;
	    }else
	    {
	    	  day=30;
	    }
	  }
	    var str='';
	  for(var i=1;i<=day;i++){
	    	str+="<option value='"+i+"'>"+i+"</option>";
	    	
	  }
	  $('#days').html(str);
}

function getBytesLength(str) {
	return str.replace(/[^\x00-\xff]/g, 'xx').length;
};


/**
 * 
 * 生成省市部分
 * 
 */
function set_pro_select1(so,prov) {
	// /alert(123);
	    for (var i = 0, n = p.length; i < n; i++ ) {
	        var opt = document.createElement('option');
	        opt.text = p[i];
	        opt.value = i;
	        if(prov==i)
	        {
	        	opt.selected=true;
	        }
	        // 有些浏览器不支持 options 属性的 add 方法，
	        // 但支持 DOM 的 appendChild 方法（比如：Konqueror）
	        if (so.options.add) {
	            so.options.add(opt);
	        }
	        else {
	            so.appendChild(opt);
	        }
	    }
	}

	/*
	 * 将对应的城市添加到第二个select中去
	 */
	function set_city_select1(so,pid){
		var city=document.getElementById('cityHidden').value;  
	for(var i = 0,n = c[pid].length;i < n;i++){
	        var opt=document.createElement('option');
	   opt.text = c[pid][i];
	   opt.value = i;
	   if(city==i)
       {
       	    opt.selected=true;
       }
	   if (so.options.add) {
	            so.options.add(opt);
	        }
	        else {
	            so.appendChild(opt);
	        }
	}
	}

	/*
	 * 清除城市select中的内容
	 */
	function clear_select(so) {
	    for (var i = so.options.length - 1; i > -1; i--) {
	        // 有些浏览器不支持 options 属性的 remove 方法，
	        // 但支持 DOM 的 removeChild 方法（比如：Konqueror）
	        if (so.options.remove) {
	            so.options.remove(i);
	        }
	        else {
	            so.removeChild(so.options[i]);
	        }
	    }
	}

	/*
	 * 改变省份
	 */
	function change_province(pid) {
	    set_city_select(pid);
	}

	/*
	 * 用来初始化省份的菜单
	 */
	function init(){ 
	var so=document.getElementById('prov');  
	var prov=document.getElementById('provHidden').value;
	if(prov==''){  prov=0; }
	set_pro_select1(so,prov);
	change_province(prov);
	}

	function set_city_select(pid){
	var so = document.getElementById('city');
	clear_select(so);
	set_city_select1(so,pid);
	}
	

	
	function removeword(id,str)
	{   
		 if($('#'+id).val()==str)
		 {
			 $('#'+id).val('');
		 }
	}
	
function setpage(curp, totalp, bindelemid, func){
	var html = '';
	if(curp != 1){
		html += '<span class="page_pre"><a style="cursor:pointer" onclick="'+func+'('+(curp-1)+')"><i class="slide_l"></i></a></span>';
	}
	var start = curp-2;
	start = start <= 0 ? 1 : start;
	var end = curp+2;
	if(end > totalp){
		var diff = end - totalp;
		var std = start - diff;
		start = std <= 0 ? 1 : std;
		end = totalp;
	}

	for(var i=start; i<=end; i++){
		html += '<a style="cursor:pointer" ';
		if(i == curp){
			html += ' class="current"';
		}
		html += ' onclick="'+func+'('+i+')"><span>'+i+'</span></a>';
	}
	if(end < totalp){
		if(end == totalp-1){
			html += '<a style="cursor:pointer" onclick="'+func+'('+totalp+')"><span>'+totalp+'</span></a>';
		}
		else{
			html += '<span class="page_break">...</span><a style="cursor:pointer" onclick="'+func+'('+totalp+')"><span>'+totalp+'</span></a>';
		}
	}
	if(curp != totalp){
		html += '<span class="page_next"><a style="cursor:pointer;width:0px;" onclick="'+func+'('+(curp+1)+')"><i class="slide_r"></i></a></span>';
	}
	$('#'+bindelemid).html(html);
}

function setpage1(curp, totalp, bindelemid, type , func){
	var html = '';
	if(curp != 1){
		html += '<a class="pre" style="cursor:pointer" onclick="'+func+'('+(curp-1)+')"></a>';
	}
	var start = curp-2;
	start = start <= 0 ? 1 : start;
	var end = curp+2;
	if(end > totalp){
		var diff = end - totalp;
		var std = start - diff;
		start = std <= 0 ? 1 : std;
		end = totalp;
	}
	
	for(var i=start; i<=end; i++){
		html += '<a style="cursor:pointer" ';
		if(i == curp){
			html += ' class="current"';
		}
		html += ' onclick="'+func+'('+i+')"><span>'+i+'</span></a>';
	}
	if(end < totalp){
		if(end == totalp-1){
			html += '<a style="cursor:pointer" onclick="'+func+'('+totalp+')"><span>'+totalp+'</span></a>';
		}
		else{
			html += '<span class="page_break">...</span><a style="cursor:pointer" onclick="'+func+'('+totalp+')"><span>'+totalp+'</span></a>';
		}
	}
	if(curp != totalp){
		html += '<a class="next" style="cursor:pointer;" onclick="'+func+'('+(curp+1)+')"></a>';
	}
		// html += '&nbsp;&nbsp;&nbsp;&nbsp;跳转到&nbsp;<input type="text" id="p"
		// name="p" />&nbsp;<input type="submit" onclick="_gotofind(' + type +
		// ');" value=" " class="btn">';
	$('#'+bindelemid).html(html);
}

function setPointPage(curp, totalp, bindelemid, type , func)
{	
	var html = '';
	var start = curp-2;
	start = start <= 0 ? 1 : start;
	var end = curp+2;
	if(end > totalp){
		var diff = end - totalp;
		var std = start - diff;
		start = std <= 0 ? 1 : std;
		end = totalp;
	}
	html += '<span>';
	for(var i=start; i<=end; i++){
		html += '<a style="cursor:pointer;"';
		if(i == curp){
			html += ' class="current"';
		}
		html += ' onclick="'+func+'('+i+')"><i class="slide_point"></i></a>';
	}
	if(end < totalp){
		if(end == totalp-1){
			html += '<a style="cursor:pointer;" onclick="'+func+'('+totalp+')"><i class="slide_point"></i></a>';
		}
		else{
			html += '<a style="cursor:pointer;" onclick="'+func+'('+totalp+')"><i class="slide_point"></i></a>';
		}
	}
	html += '</span><span class="padding_L10">';
	if(curp != 1){
		html += '<a style="cursor:pointer;" onclick="'+func+'('+(curp-1)+')"><i class="slide_l"></i></a>';
	}
	if(curp != totalp){
		html += '<a style="cursor:pointer;" onclick="'+func+'('+(curp+1)+')"><i class="slide_r"></i></a>';
	}
	html += '</span>';
		// html += '&nbsp;&nbsp;&nbsp;&nbsp;跳转到&nbsp;<input type="text" id="p"
		// name="p" />&nbsp;<input type="submit" onclick="_gotofind(' + type +
		// ');" value=" " class="btn">';
	$('#'+bindelemid).html(html);
}

function setpageWithSplitNum(curp, totalp, bindelemid , func, splitNum){
	var html = '';
	if(curp != 1){
		html += '<a class="pre" style="cursor:pointer" onclick="'+func+'('+(curp-1)+')"></a>';
	}
	var start = curp - splitNum;
	var end = curp + splitNum;
	if(start <= 0 )
	{
		start =  1 ;
		end = curp + splitNum +(splitNum - curp +1);
	}
	
	if(end > totalp){
		var diff = end - totalp;
		var std = start - diff;
		start = std <= 0 ? 1 : std;
		end = totalp;
	}
	
	for(var i=start; i<=end; i++){
		html += '<a style="cursor:pointer" ';
		if(i == curp){
			html += ' class="current"';
		}
		html += ' onclick="'+func+'('+i+')"><span>'+i+'</span></a>';
	}
	if(end < totalp){
		if(end == totalp-1){
			html += '<a style="cursor:pointer" onclick="'+func+'('+totalp+')"><span>'+totalp+'</span></a>';
		}
		else{
			html += '<span class="page_break">...</span><a style="cursor:pointer" onclick="'+func+'('+totalp+')"><span>'+totalp+'</span></a>';
		}
	}
	if(curp != totalp){
		html += '<a class="next" style="cursor:pointer;" onclick="'+func+'('+(curp+1)+')"></a>';
	}
	html += '&nbsp;&nbsp;&nbsp;&nbsp;跳转到&nbsp;<input style="width:30px" type="text" id="p" name="p" />&nbsp;<input type="submit" onclick="gotoPage(' + totalp + ');" value=" " class="btn">';
	$('#'+bindelemid).html(html);
}

/*改*/
function setpageWithSplitNumSearch(curp, totalp, bindelemid , func, splitNum){
	var html = '';
	if(curp != 1){
		html += '<a class="pre" style="cursor:pointer" onclick="'+func+'('+(curp-1)+')"> '+'<i>< </i>'+'上一页</a>';
	}
	var start = curp - splitNum;
	var end = curp + splitNum;
	if(start <= 0 )
	{
		start =  1 ;
		end = curp + splitNum +(splitNum - curp +1);
	}
	
	if(end > totalp){
		var diff = end - totalp;
		var std = start - diff;
		start = std <= 0 ? 1 : std;
		end = totalp;
	}
	
	for(var i=start; i<=end; i++){
		html += '<a style="cursor:pointer" ';
		if(i == curp){
			html += ' class="current"';
		}
		html += ' onclick="'+func+'('+i+')"><span>'+i+'</span></a>';
	}
	if(end < totalp){
		if(end == totalp-1){
			html += '<a style="cursor:pointer" onclick="'+func+'('+totalp+')"><span>'+totalp+'</span></a>';
		}
		else{
			html += '<span class="page_break">...</span><a style="cursor:pointer" onclick="'+func+'('+totalp+')"><span>'+totalp+'</span></a>';
		}
	}
	if(curp != totalp){
		html += '<a class="next" style="cursor:pointer;" onclick="'+func+'('+(curp+1)+')"> 下一页 <i>></i></a>';
	}
	
	html += '共'+ totalp +'页&nbsp;&nbsp;&nbsp;&nbsp;到第&nbsp;<input style="width:30px" type="text" id="p" name="p" />页&nbsp;<input type="submit" onclick="gotoPage(' + totalp + ');" value="确定" class="btn">';
	$('#'+bindelemid).html(html);
}

function gotoPage(totoalp)
{
	var page = parseInt($('#p').val());
	if(page>parseInt(totoalp) || page<=0 || isNaN(page) || isNaN(page))
	{
		showAlert('输入页码不正确', 3);
	}
	else
	{
		gotobookpage(page);
	}
}

/**
 *@zhou
 */
function setpageWithSplitNumSearchz(curp, totalp, bindelemid , func, splitNum,sortField,order){
	var html = '';
	if(curp != 1){
		html += '<a class="pre" style="cursor:pointer" onclick="'+func+'('+(curp-1)+',true)"> '+'<i>< </i>'+'上一页</a>';
	}
	var start = curp - splitNum;
	var end = curp + splitNum;
	if(start <= 0 )
	{
		start =  1 ;
		end = curp + splitNum +(splitNum - curp +1);
	}
	
	if(end > totalp){
		var diff = end - totalp;
		var std = start - diff;
		start = std <= 0 ? 1 : std;
		end = totalp;
	}
	
	for(var i=start; i<=end; i++){
		html += '<a style="cursor:pointer" ';
		if(i == curp){
			html += ' class="current"';
		}
		html += ' onclick="'+func+'('+i+',true)"><span>'+i+'</span></a>';
	}
	if(end < totalp){
		if(end == totalp-1){
			html += '<a style="cursor:pointer" onclick="'+func+'('+totalp+',true)"><span>'+totalp+'</span></a>';
		}
		else{
			html += '<span class="page_break">...</span><a style="cursor:pointer" onclick="'+func+'('+totalp+',true)"><span>'+totalp+'</span></a>';
		}
	}
	if(curp != totalp){
		html += '<a class="next" style="cursor:pointer;" onclick="'+func+'('+(curp+1)+',true)"> 下一页 <i>></i></a>';
	}
	
	html += '共'+ totalp +'页&nbsp;&nbsp;&nbsp;&nbsp;到第&nbsp;<input style="width:30px" type="text" id="p" name="p"  value="'+(curp)+'" />页&nbsp;<input type="submit" onclick="gotoPagez(' + totalp + ',true);" value="确定" class="btn">';
	$('#'+bindelemid).html(html);
}
function gotoPagez(totoalp,a)
{
	var page = parseInt($('#p').val());
	if(page>parseInt(totoalp) || page<=0 || isNaN(page) || isNaN(page))
	{
		showAlert('输入页码不正确', 3);
	}
	else
	{
		gotobookpage(page,a);
	}
}

function _gotofind(type)
{	
	var page = $('#p').val();
	var style = $('#style').val();
	var sourceType = $('#sourceType').val();
	if(page == '' || page ==0)
	{
		return ;
	}
	if(type==1)
	{
		var url = "yunshu.php?r=bookshelf/index&p=" + page + '&sourceType=' +sourceType + '&style=' +style;
	}else if(type==2)
	{
		var url = "yunshu.php?r=order/list&p=" + page;
	}
	location.href = url;
}

function gotoSearch()
{
  var keyword = document.getElementById('searchinput').value;
  var currentUrl = location.href; 
  var index = currentUrl.indexOf("/",8);
  var baseUrl = currentUrl.substring(0,index);
  // var str = baseUrl+"/index.php?r=books/index&skw="+ keyword;
  location.href= baseUrl+"/index.php?r=books/index&skw="+ keyword; 
}


function bindgotoSearch()
{	
	document.onkeydown = function(event_e){
		if( window.event )            
		{
			event_e = window.event;            
		}
		var int_keycode = event_e.charCode||event_e.keyCode;            
		if(int_keycode ==13)
		{ 	
			gotoSearch();
		}  
	}
}


function clearInput()
{
	var searchobj = $('#searchinput');
	if(searchobj.val() == '输入感兴趣的书名/作者/简介'){
		searchobj.val('');
		searchobj[0].onkeydown = function(event_e){ 
			if( window.event )
				event_e = window.event;            
			var int_keycode = event_e.charCode||event_e.keyCode;
			if(int_keycode == 13){
				//if(document.getElementById('searchinput').value!=''){
					gotoSearch();
				//}
			}
		}
	}
	return false;
}

function valMobilePhone(phone){
	var reg = /^[0-9]{11}$/;
	if((phone != null && phone.length<11) || !reg.test($.trim(phone))){
	   return false;
	}
	return true;
}

function valTelPhone(phone){
	var m =/^\d{3}-\d{8}|\d{4}-\d{8}|\d{4}-\d{6}|\d{4}-\d{7}$/;// 验证电话号码为7-8位数字并带有区号
	if((phone != null && phone.length<6) || !m.test($.trim(phone))){
	   return false;
	}
	return true;
}

function isCardNo(card) {
    //身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
    var reg = /(^\d{15}$)|(^\d{17}(\d|X)$)/;
    if (reg.test(card) === false) {
        return false;
    }

    return true;
}

function valZipCode(code){
	var reg=/^[0-9]+$/;
	if((code != null && code.length<6) || !reg.test($.trim(code))){
		return false;
	}
	return true;
}

function scrollElem(id){
	var pos=$('#'+id).offset().top;// 获取该点到头部的距离
	$("html,body").animate({scrollTop:pos}, 700);
}

function poptocenter(id){
	var windowWidth = document.documentElement.scrollWidth;
	var windowHeight = document.documentElement.clientHeight;
	if( document.documentElement.clientHeight < document.body.scrollHeight ){
		windowHeight = (document.body.scrollHeight-document.documentElement.clientHeight)+(document.documentElement.clientHeight/2);
	}else{
		windowHeight = document.documentElement.clientHeight/2;
	}
	var popupHeight = $("#"+id).height();
	var popupWidth = $("#"+id).width();
	$("#"+id).css({ 
		"position": "absolute",   
		"top": windowHeight-popupHeight,  
		"left": windowWidth/2-popupWidth/2  
	});
}

(function($){var menu,shadow,trigger,content,hash,currentTarget;var defaults={menuStyle:{listStyle:'none',padding:'1px',margin:'0px',backgroundColor:'#fff',border:'1px solid #999',width:'100px'},itemStyle:{margin:'0px',color:'#000',display:'block',cursor:'default',padding:'3px',border:'1px solid #fff',backgroundColor:'transparent'},itemHoverStyle:{border:'1px solid #0a246a',backgroundColor:'#b6bdd2'},eventPosX:'pageX',eventPosY:'pageY',shadow:true,onContextMenu:null,onShowMenu:null};$.fn.contextMenu=function(id,options){if(!menu){menu=$('<div id="jqContextMenu"></div>').hide().css({position:'absolute',zIndex:'500'}).appendTo('body').bind('click',function(e){e.stopPropagation()})}if(!shadow){shadow=$('<div></div>').css({backgroundColor:'#000',position:'absolute',opacity:0.2,zIndex:499}).appendTo('body').hide()}hash=hash||[];hash.push({id:id,menuStyle:$.extend({},defaults.menuStyle,options.menuStyle||{}),itemStyle:$.extend({},defaults.itemStyle,options.itemStyle||{}),itemHoverStyle:$.extend({},defaults.itemHoverStyle,options.itemHoverStyle||{}),bindings:options.bindings||{},shadow:options.shadow||options.shadow===false?options.shadow:defaults.shadow,onContextMenu:options.onContextMenu||defaults.onContextMenu,onShowMenu:options.onShowMenu||defaults.onShowMenu,eventPosX:options.eventPosX||defaults.eventPosX,eventPosY:options.eventPosY||defaults.eventPosY});var index=hash.length-1;$(this).bind('contextmenu',function(e){var bShowContext=(!!hash[index].onContextMenu)?hash[index].onContextMenu(e):true;if(bShowContext)display(index,this,e,options);return false});return this};function display(index,trigger,e,options){var cur=hash[index];content=$('#'+cur.id).find('ul:first').clone(true);content.css(cur.menuStyle).find('li').css(cur.itemStyle).hover(function(){$(this).css(cur.itemHoverStyle)},function(){$(this).css(cur.itemStyle)}).find('img').css({verticalAlign:'middle',paddingRight:'2px'});menu.html(content);if(!!cur.onShowMenu)menu=cur.onShowMenu(e,menu);$.each(cur.bindings,function(id,func){$('#'+id,menu).bind('click',function(e){hide();func(trigger,currentTarget)})});menu.css({'left':e[cur.eventPosX],'top':e[cur.eventPosY]}).show();if(cur.shadow)shadow.css({width:menu.width(),height:menu.height(),left:e.pageX+2,top:e.pageY+2}).show();$(document).one('click',hide)}function hide(){menu.hide();shadow.hide()}$.contextMenu={defaults:function(userDefaults){$.each(userDefaults,function(i,val){if(typeof val=='object'&&defaults[i]){$.extend(defaults[i],val)}else defaults[i]=val})}}})(jQuery);$(function(){$('div.contextMenu').hide()});

function CPos(x, y)
{
    this.x = x;
    this.y = y;
}

function GetObjPos(ATarget)
{
    var target = ATarget;
    var pos = new CPos(target.offsetLeft, target.offsetTop);
    var target = target.offsetParent;
    while (target)
    {
        pos.x += target.offsetLeft;
        pos.y += target.offsetTop;
        
        target = target.offsetParent
    }
    
    return pos;
}

function comm_showmenu(locId, menuId, offX, offY){// alert(222);
	pos = GetObjPos($('#'+locId)[0]);
	l = $("#"+menuId)[0];
	$("#"+menuId).css('left', (pos.x + offX)+'px').css('top', (pos.y + offY)+'px').css('display', 'block');
	/*
	 * l.style.left = pos.x + offX; l.style.top = pos.y + offY;
	 * l.style.display="block";
	 */
}

function comm_getAvatar(userIds, size, avatarIdPre){
	ajaxpost('/index.php?r=index/getavatar&userIds='+userIds+'&size='+size, function(data){
		if(data == null){
			return;
		}
		var len = data.length;
		for(var i=0; i<len; i++){
			var avaobj = $('[name="'+avatarIdPre+data[i].id+'"]');
			if(avaobj.length > 0){
				avaobj.attr('src',data[i].avatar);
			}
		}
	});
}



/* 数组 转 json */
function arrayToJson(o) { 
	var r = []; 
	if (typeof o == "string") return "\"" + o.replace(/([\'\"\\])/g, "\\$1").replace(/(\n)/g, "\\n").replace(/(\r)/g, "\\r").replace(/(\t)/g, "\\t") + "\""; 
	if (typeof o == "object") { 
	if (!o.sort) { 
	for (var i in o) 
	r.push(i + ":" + arrayToJson(o[i])); 
	if (!!document.all && !/^\n?function\s*toString\(\)\s*\{\n?\s*\[native code\]\n?\s*\}\n?\s*$/.test(o.toString)) { 
	r.push("toString:" + o.toString.toString()); 
	} 
	r = "{" + r.join() + "}"; 
	} else { 
	for (var i = 0; i < o.length; i++) { 
	r.push(arrayToJson(o[i])); 
	} 
	r = "[" + r.join() + "]"; 
	} 
	return r; 
	} 
	return o.toString(); 
}

function comm_newwindow(url){
}

function computeDiffTime(inputdate){
	//var dls = Date.parse(inputdate);
	var deadline = new Date(inputdate);
	var time_end = deadline.getTime();
	var time_now = (new Date()).getTime();
	var time_distance = time_end-time_now;
	if(time_distance <= 0){
		return [0, 0, 0, 0];
	}
	int_day=Math.floor(time_distance/86400000);
	time_distance-=int_day*86400000;
	int_hour=Math.floor(time_distance/3600000);
	time_distance-=int_hour*3600000;
	int_minute=Math.floor(time_distance/60000);
	time_distance-=int_minute*60000;
	int_second=Math.floor(time_distance/1000);
	if(int_hour<10)
		int_hour="0"+int_hour;
	if(int_minute<10)
		int_minute="0"+int_minute;
	if(int_second<10)
		int_second="0"+int_second;
	return [int_day, int_hour, int_minute, int_second];
}

function showAlert(msginfo, type, w, h){
	w = w ? w+'px' : 'auto';
	h = h ? h+'px' : 'auto';
	$.layer({
		area : [w, h],
		dialog : {msg:msginfo,type : type}	
	});
}

function isDate(dateString){
	if(dateString.trim()=="")
		return false;
	//年月日正则表达式
	var r=dateString.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
	if(r==null){
		r = dateString.match(/^(\d{1,4})(-|\/)(\d{1,2})$/);
		if(r == null){
			return false;
		}
		r[4] = 1;
	}
	var d = new Date(r[1],r[3]-1,r[4]);   
	var num = (d.getFullYear()==r[1]&&(d.getMonth()+1)==r[3]&&d.getDate()==r[4]);
	return (num!=0);
}

function isEmptyStr(con){
	var data = con.replace('/\r\n/g', '').replace(/\n/g, '').replace(/\s/g, '').replace('/<br(\/*)>/g', '');
	return data=='';
}

$(function(){
	($('.goodsInfo .txtArea p:first a').text()).replace(/\s/g,'').search('生活服务')>=0?$(".goodsInfo  .price_sty2,.goodsInfo  .item2").remove():"";
document.location.search.search(/category=\s*030/g)>0 ? $('.info ').find('.btn_orange,.price_sty2').css({'visibility':'hidden'}):'';
})

    function browserRedirect() {
        var sUserAgent = navigator.userAgent.toLowerCase();
        var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
        var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
        var bIsMidp = sUserAgent.match(/midp/i) == "midp";
        var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
        var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
        var bIsAndroid = sUserAgent.match(/android/i) == "android";
        var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
        var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
        if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM ){
            window.location.href='http://m.iyunshu.com';
        }
    }	
	
function setCookie(name,value,time)
{
var exp = new Date();
if(time){
exp.setTime(exp.getTime() + time*1000);
document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}else{
document.cookie = name + "="+ escape (value)	
}
}


//(function() {
  var hm = document.createElement("script");
  hm.src = "http://data.iyunshu.com/Public/Admin/Js/tongji.js";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
//})();

