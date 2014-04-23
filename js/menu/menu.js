var menuDraw = {

	createMenu: function () {
		//render the header in JQuery with css classes TODO: clean this up
		var menu_node = $('<div class="menu"><div class="menutray"><div class="logo">Robot Store</div><a href="http://openrobot.net"><img src="http://data.openrobot.net/store/logo.png" class="logo_pic"></img></a><div class="settings"></div></div></div>');
		return menu_node;
	},

	postMenu: function (menu_node) {
		//post header and footer
		$('#mainpage').prepend(menu_node);
		$('#mainpage').append('<div class="footer"></div>');
		$('.footer').append('<div class="foot_col_l">Get Involved</div><div class="foot_col_m">Pages</div><div class="foot_col_r">Search</div>');
			
		$(".logo").click(function (){
				$('.store').load("http://store.openrobot.net/html/store/main.html",function (){
					pageload.store();
				});
		});
			
	}
}
