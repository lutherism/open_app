var robotlist;

var pageload = {
  store: function () {
		$('#b01').click(function () {uploadRender.uploadPopup()});
		$('#login').click(function (){accountPane.login($('#user').val(),$('#pass').val())});
		//Init option sorters		
		$('.options>>div').click(function () {$('.options>>div').attr('class','option_off'); this.setAttribute('class','option_on');});
		$('#tileoptions>div').click(function () {$('#tileoptions').children().attr('class','option_off'); this.setAttribute('class','option_on');});
		//Load Robots from test.json
		loadrobots.loader();
				
		$('#btn-heart').click(function (){
			$("#btn-heart").remove();
		});
	},
	menu: function () {
		menuDraw.postMenu(menuDraw.createMenu());
	},
	account: function () {
		accountPane.add(accountPane.create());
	}
}
