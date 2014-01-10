var loadlogin = {
	//Enable clicking and pressing enter for login
	buildpop: function () {
		$('#login').click(function (){loadlogin.login($('#user').val(),$('#pass').val())});
		$('#loginpage input').on('keyup', function(e) {
				if (e.keyCode === 13) {
						$('#login').click();
				}
		});
	},	
	//send login data to server (TODO: THIS NEEDS TO BE through SSL)
	login: function (user,pass) {
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
			alert("That username and password combination was not found. Please try again.");
		});
	}


}

$(document).ready(function (){	
		menuDraw.postMenu(menuDraw.createMenu());
		loadlogin.buildpop();
});
