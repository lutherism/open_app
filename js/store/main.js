var robotlist;

var pageload = {

	//init function when logged in
	store: function (){
			if(!jso_getToken('openrobot')){
				pageload.anon_store();
				return;
			}
		//Init option sorters		
		$('.options>>div').click(function () {$('.options>>div').attr('class','option_off'); this.setAttribute('class','option_on');});
		$('#tileoptions>div').click(function () {$('#tileoptions').children().attr('class','option_off'); this.setAttribute('class','option_on');});

		//Load Robots from API
		loadrobots.loader();

		//Bottom Tray Link Boxes
		$('#tr04').append(
			'<div id="promo1" class="promo_thumb">Buy an Orange</div>'+
			'<div id="promo2" class="promo_thumb">Read Our Blog</div>'+
			'<div id="promo3" class="promo_thumb">Follow Us on Twitter</div>'
		);
	},

	//init function when logged out
	anon_store: function (){
		//Init option sorters		
		$('.options>>div').click(function () {$('.options>>div').attr('class','option_off'); this.setAttribute('class','option_on');});
		$('#tileoptions>div').click(function () {$('#tileoptions').children().attr('class','option_off'); this.setAttribute('class','option_on');});
		//Load Robots from test.json
		loadrobots.anon_loader();
		$('#tr04').append(
			'<div id="promo1" class="promo_thumb">Buy an Orange</div>'+
			'<div id="promo2" class="promo_thumb">Read Our Blog</div>'+
			'<div id="promo3" class="promo_thumb">Follow Us on Twitter</div>'
		);
	},
  init: function () {
			if(jso_getToken('openrobot')){ //Load Page if logged in
			jso_configure({
			"openrobot": {
			client_id: "ostore",
			authorization: "http://oauth.openrobot.net/authorization.php",
			presenttoken: "qs"
			}});
			$(document).ready($.ajax({
				url: 'http://store.openrobot.net/html/store/main.html',
				dataType: 'html',
				success: function (data){
					$('.store').html(data);
			$(document).ready(function(){
				pageload.account();
				pageload.menu();
				pageload.store();});
				}
			}));
			} else {			//Load Page if not logged in
			$(document).ready($.ajax({
				url: 'http://store.openrobot.net/html/store/main.html',
				dataType: 'html',
				success: function (data){
					$('.store').html(data);
			console.log('not logged in');	
			$(document).ready(function (){
				pageload.login();
				pageload.menu();
				pageload.store();});
				}
			}));
			}
	},
	//Load menu and footer
	menu: function () {
		menuDraw.postMenu(menuDraw.createMenu());
	},
	//Draw account pane
	account: function () {
		accountPane.create();
	},
	login: function () {
		//create login pane items in JQuery
		var login_cnt = $('<div class="opensans accountpane"></div>');
		var field_tray = $('<div class="acttray" id="actr1"></div>');
		var username_field = $('<input class="loginfield" type="text" name="username" placeholder="username" id="useri"></input>');
		var password_field = $('<input class="loginfield" type="password" name="password" placeholder="password" id="passi"></input>');
		var login_btn = $('<button id="login" class="btn btn-primary btn-xs actbutton">login</button>');		
		var register_btn = $('<button id="b01" class="btn btn-success btn-xs actbutton">register</button>');		
		var action_tray =$('<div class="acttray" style="border:0" id="actr3"></div>');
		//fill containers
		action_tray.append(register_btn,login_btn);
		field_tray.append("Login:",username_field,password_field);
		login_cnt.append(field_tray,action_tray);
		login_btn.click(function (){pageload.send_login(username_field.val(),password_field.val())});
		//set return button function
		password_field.on('keyup', function(e) {
				if (e.keyCode === 13) {
						login_btn.click();
				}
		});
		//apply account pane to page
		register_btn.click(function(){registerRender.registerPopup()});
		$('#accountslider').append(login_cnt);
	},
	//login method
	send_login: function (user,pass) {
		$.ajax({
			type:'POST',
			url:'http://oauth.openrobot.net/token.php',
			data:
   		{
				grant_type: 'password',
				username: user,
				password: pass,
				client_id: 'ostore',
				client_secret: 'testtesttest'
			},
		})
		//save the returned Access Token to localStorage for use with jso
		.done(function (data) {
			var now = Math.round(new Date().getTime()/1000.0);
			data.expires = now+data.expires_in;
			var tokens = jso_getToken('openrobot');
			if(!tokens) tokens = [];
			tokens.push(data);
			localStorage.setItem("tokens-openrobot",JSON.stringify(tokens));
			window.location = 'http://store.openrobot.net/';
		})
		.error(function(){
			console.log('tesst');
			accountPane.accError("01","That username and password combination was not found. Please try again.","Invalid Credentials");
		});
	}
};

			$(document).ready(function(){
				pageload.init();
			}
			);
