var accountPane = {
	create: function () {
		var cnt = $('<div class="opensans accountpane"></div>'); 
		var account_tray = $('<div class= "acttray" id="atr1">Your Account: <br> not logged in <br></div>');
		var robots_tray = $('<div class="opensans acttray" id="atr2"><br>Your Robots: <br> not logged in <br></div>');
		var actions_tray = $('<div class="acttray" id="atr3">Your Account: <br> not logged in <br></div>');
		var login_btn = $('<button class="btn btn-xs btn-default" id="login">Login</button>');
		var register_btn = $('<button style="float: right;" class="btn btn-xs btn-primary" id="register">Register</button>');
		var upload_btn = $('<button id="b01" class="btn btn-default btn-xs" style="float:right;">upload</button>')
		var edit_btn = $('<button id="b02" class="btn btn-default btn-xs">edit</button>')
		account_tray.append($('<input id="user" class="loginfield" type="text" name="username" placeholder="username"><input id="pass" class="loginfield" type="password" name="paddword" placeholder="password">'));
		account_tray.append(login_btn,register_btn);
		robots_tray.prepend(edit_btn, upload_btn)
		cnt.append(account_tray, robots_tray, actions_tray);			
		return cnt;
	},
	add: function (act_node) {
		$('.storebody').prepend(act_node);
	},
	login: function (user,pass) {
		$.ajax({
			type: 'POST',
			url:'http://store.openrobot.net/php/account/token.php',
			data:['admintest','snipermagpie'],
			crossDomain: true,
			done:function (data) {
					$('#user, #pass, #login, #register').remove();
					$('#atr1').html('logged in!');
				},
			error: function(){
				alert("Error");
			}
		});
	}
}
