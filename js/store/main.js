var robotlist;

var pageload = {
  store: function () {
		//ON click command for various store page UI buttons
		$('#b01').click(function () {uploadRender.uploadPopup()});
		/*$('#b01').click(function (){
			$.oajax({
				jso_provider: 'openrobot',
				jso_alowia: true,
				url: 'http://data.openrobot.net/new/'
			})
		});*/
		$('#register').click(function (){accountPane.register($('#user').val(),$('#pass').val())});
		//Init option sorters		
		$('.options>>div').click(function () {$('.options>>div').attr('class','option_off'); this.setAttribute('class','option_on');});
		$('#tileoptions>div').click(function () {$('#tileoptions').children().attr('class','option_off'); this.setAttribute('class','option_on');});
		//Load Robots from test.json
		loadrobots.loader();
	},
	//???
	menu: function () {
		menuDraw.postMenu(menuDraw.createMenu());
	},
	//Draw account pane
	account: function () {
		accountPane.add(accountPane.create());
	}
}

$(document).ready(function (){
		//set up OAuth connection on entrance
		jso_configure({
			"openrobot": {
			client_id: "ostore",
			redirect_uri: "http://store.openrobot.net/",
			authorization: "http://oauth.openrobot.net/authorization.php",
			presenttoken: "qs"
			}
		});
});
