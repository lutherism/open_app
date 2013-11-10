var menuDraw = {

	createMenu: function () {
		var menu_node = $('<div class="menu">Robot Store</div>');
		return menu_node;
	},

	postMenu: function (menu_node) {
		$('#mainpage').prepend(menu_node);
	}
}
