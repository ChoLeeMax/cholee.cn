(function(){
	var login={};
	login.info=[{name:'lichao',pass:'520'},
		{name:'xiaomeng',pass:'520'}];
	login.init=function(){
		this.addEvent();
	};
	login.addEvent=function(){
	    window.onload = function()
		{
			$(".connect p").eq(0).animate({"left":"0%"}, 600);
			$(".connect p").eq(1).animate({"left":"0%"}, 400);
		}
		$(".btn").click(function(){
			login.is_hide();
		})
	    var u = $("input[name=username]");
		var p = $("input[name=password]");
		$("#submit").on('click',function(){
			if(u.val() == '' || p.val() =='')
			{
				$("#ts").html("用户名或密码不能为空!");
				login.is_show();
				return false;
			}else{
                for(var i in login.info){
                	var item=login.info[i];
                	if(u.val()==item.name&&p.val()==item.pass){
                		//登录成功
                		window.location.href="wish.html";
                		break;
                	}else{
                	   $("#ts").html("用户名或密码错误!");
				       login.is_show();
                	}
                }
			}
		});
	};
	login.is_hide=function (){ 
		$(".alert").animate({"top":"-40%"}, 300) 
	};
	login.is_show=function(){ 
		$(".alert").show().animate({"top":"45%"}, 300) 
	};
	login.init();
})();
