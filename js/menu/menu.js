var menuDraw = {

	createMenu: function () {
		//render the menu in JQuery with css classes TODO: clean this up
		var menu_node = $('<div class="menu"><div class="menutray">The Open Robot Store<text class="beta">(alpha)</text><div class="settings"><i class="glyphicon menusetting glyphicon-user"></i>    <i class="glyphicon menusetting glyphicon-align-justify"></i>    <i class="glyphicon menusetting glyphicon-cog"></i></div></div></div>');
		return menu_node;
	},

	postMenu: function (menu_node) {
		//post header and footer
		$('#mainpage').prepend(menu_node);
		$('#mainpage').append('<div class="footer"></div>');
	}
}
