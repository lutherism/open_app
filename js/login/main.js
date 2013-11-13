var loadlogin = {
	//Enable clicking and pressing enter for login
	buildpop: function () {
		$('#login').click(function (){loadlogin.login($('#user').val(),$('#pass').val())});
		$('input').on('keyup', function(e) {
				if (e.keyCode === 13) {
						$('#login').click();
				}
		});
	},	
	//send login data to server (TODO: THIS NEEDS TO BE ENCODED)
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
		.done(function (data) {
			var now = Math.round(new Date().getTime()/1000.0);
			data.expires = now+data.expires_in;
			var tokens = jso_getToken('openrobot');
			if(!tokens) tokens = [];
			tokens.push(data);
			console.log(JSON.stringify(data)+"~~");
			localStorage.setItem("tokens-openrobot",JSON.stringify(tokens));
			window.location = 'http://store.openrobot.net/';
		})
		.error(function(){
			alert("Error");
		});
	},
	//Register Account with server (TODO: Should only request registration)
	register: function (user,pass) {
		$.ajax({
			type:'POST',
			url:'http://oauth.openrobot.net/register.php',
			data:
   		{
				username: user,
				password: pass,
			},
		})
		.done(function (data) {
			$('#user, #pass, #login, #register').remove();
			$('#atr1').html('logged in as '+data.username);
		})
		.error(function(){
			alert("Error");
		});
	}


}

$(document).ready(function (){	
		//init OAuth connection on page load
		jso_configure({
			"openrobot": {
			client_id: "ostore",
			redirect_uri: "http://store.openrobot.net/",
			authorization: "http://oauth.openrobot.net/authorization.php",
			presenttoken: "header"
			}
		});
		loadlogin.buildpop();
});
