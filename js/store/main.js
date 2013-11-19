var robotlist;

var pageload = {
  store: function () {
		//ON click command for various store page UI buttons
		$('#b01').click(function () {uploadRender.uploadPopup()});
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
};

		$(document).ready(jso_configure({
			"openrobot": {
			client_id: "ostore",
			redirect_uri: "http://store.openrobot.net/login.html",
			authorization: "http://oauth.openrobot.net/authorization.php",
			presenttoken: "qs"
			}
			}));
			if(jso_getToken('openrobot')){
			$(document).ready($.oajax({
				jso_provider: 'openrobot',
				jso_allowia: true,
				url: 'http://store.openrobot.net/front.php',
				dataType: 'html',
				success: function (data){
					$('#body').html(data);
			$(document).ready(pageload.account());
			$(document).ready(pageload.menu());
			$(document).ready(pageload.store());
				}
			}));
			} else {
			console.log('not logged in');	
			$.ajax({
			url:"http://store.openrobot.net/html/store/login.html",
			dataType: 'html',
			success: function (data){
				$('#body').html(data);
			}
			});
			}
