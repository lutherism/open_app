var accountPane = {
	create: function () {
		//Render trays and elements with JQuery
		var cnt = $('<div class="opensans accountpane"></div>'); 
		var account_tray = $('<div class= "acttray" id="atr1">Your Account:</div>');
		var robots_tray = $('<div class="opensans acttray" id="atr2">Your Robots:</div>');
		var actions_tray = $('<div class="acttray" id="atr3">Your Account: <br> not logged in <br></div>');
		var logout_btn = $('<button class="btn btn-xs btn-default" id="logout" style="float:right">Logout</button><br>');
		var upload_btn = $('<button id="b01" class="btn btn-default btn-xs" style="float:right;">upload</button>')
		var edit_btn = $('<button id="b02" style="margin-left:3px;float:right;" class="btn btn-default btn-xs">edit</button>')
		//Request API for user info
		$.oajax({
		url: 'http://data.openrobot.net/user/user.php',
		jso_provider: "openrobot",
		jso_allowia: true,
		dataType: 'json',
		success: function(data) {
			$('#atr1').append(data[2]);
		}
		});
		logout_btn.click(function (){jso_wipe(); window.location = 'http://store.openrobot.net/login.html'});
		//Request API for user save list
			$.oajax({
				url: 'http://data.openrobot.net/user/index.php',
				jso_provider: 'openrobot',
				jso_allowia: true,
				dataType: 'json',
				success: function (data){
					console.log(JSON.stringify(data));
					accountPane.filemenu(data);
				}
		});
		//Collate and return elements
		account_tray.append(logout_btn);
		robots_tray.append(edit_btn, upload_btn)
		cnt.append(account_tray, robots_tray, actions_tray);			
		return cnt;
	},
	//Render file menu block, from json data
	filemenu: function(jsonfiles){
			//Create Folder div for each folder
		$.each(jsonfiles, function (i, data){
			var newfolder = $('<div class="usr_group" id="rf'+i+'">'+data.folder+'  <span id="rfb'+i+'">[+]</span></div>');
			//Create Robot title div for each contents
			$.each(data.robots, function (j,rdata){
				newfolder.append($('<div class="usr_saves" id="rl'+j+'">'+rdata.title+'</div>'))
			})
			//Enable display toggling
			newfolder.click(function (){
				accountPane.openfolder(this);
			});
			//Append directories to account tray
			$('#atr2').append(newfolder);
		})
	}, 
	//Hide folder contents and switch to [+]
	closefolder: function(node){	
		$('#'+node.id+'>.usr_saves').css('display','none');
		$('#'+node.id+'>span').html('[+]');
		$('#'+node.id).click(function (){
			accountPane.openfolder(this);
		});
	},
	//Show folder contents and switch to [-]
	openfolder: function(node){	
		$('#'+node.id+'>.usr_saves').css('display','block');
		$('#'+node.id+'>span').html('[-]');
		$('#'+node.id).click(function (){
			accountPane.closefolder(this);
		});
	},
	add: function (act_node) {
		$('.accountslider').prepend(act_node);
	}
}
