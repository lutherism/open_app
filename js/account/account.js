var accountPane = {
	//Open an alert popup
	//Alert is just a message with a close button, in a white tile
	accAlert: function(id, message, title) {
		//Render trays and elements with JQuery
		var acnt = $('<div class="alertpane" id="apane'+id+'"></div>'); 
		var title_tray = $('<div class= "acttray" id="atit'+id+'">'+title+'</div>');
		var message_tray = $('<div class="opensans actray" id="amess'+id+'">'+message+'</div>');
		var closebtn = $('<button id="acls'+id+'" class="btn btn-default btn-xs actbutton">close</button>');
		title_tray.prepend(closebtn);
	  acnt.append(title_tray, message_tray);
		closebtn.click(function(){
			acnt.remove();
		});
		$('#accountslider').append(acnt);	
	},
	//Open an error popup
	//Error is just a message with a close button, in a red tile
	accError: function(id, message, title) {
		//Render trays and elements with JQuery
		var cnt = $('<div class="errpane" id="erpane'+id+'"></div>'); 
		var title_tray = $('<div class= "acttray" id="ertit'+id+'">'+title+'</div>');
		var message_tray = $('<div class="opensans actray" id="ermess'+id+'">'+message+'</div>');
		var closebtn = $('<button id="ercls'+id+'" class="btn btn-default btn-xs actbutton">close</button>');
		title_tray.prepend(closebtn);
	  cnt.prepend(title_tray, message_tray);
		closebtn.click(function(){
			cnt.remove();
		});
		$('#accountslider').append(cnt);	
	},
	//Open a reward popup
	//Reward is just a message with a close button, in a green tile
	accReward: function(id, message, title) {
		//Render trays and elements with JQuery
		var rcnt = $('<div class="repane" id="repane'+id+'"></div>'); 
		var title_tray = $('<div class= "acttray" id="retit'+id+'">'+title+'</div>');
		var message_tray = $('<div class="opensans actray" id="remess'+id+'">'+message+'</div>');
		var closebtn = $('<button id="rcls'+id+'" class="btn btn-default btn-xs actbutton">close</button>');
		title_tray.prepend(closebtn);
	  rcnt.append(title_tray, message_tray);
		closebtn.click(function(){
			rcnt.remove();
		});
		return rcnt;	
	},
	//Open an option popup
	//Option is a message with an OK and cancel button, in a white tile
	accOption: function(id, message, title, onOK, onCancel) {
		//Render trays and elements with JQuery
		var cnt = $('<div class="oppane" id="oppane'+id+'"></div>'); 
		var title_tray = $('<div class= "acttray" id="optit'+id+'">'+title+'</div>');
		var message_tray = $('<div class="opensans actray" id="opmess'+id+'">'+message+'</div>');
		var cancelbtn = $('<button id="opcls'+id+'" class="btn btn-default btn-xs actbutton">cancel</button>');
		var okbtn = $('<button id="opok'+id+'" class="btn btn-default btn-xs actbutton">OK</button>');
		message_tray.append($('<div></div>').append(cancelbtn, okbtn));
	  cnt.append(title_tray, message_tray);
		okbtn.click(function(){
			onOK();
		});
		cancelbtn.click(function(){
			onCancel();
		});
		return cnt;	
	},
	create: function() {
		//Render trays and elements with JQuery
		var cnt = $('<div class="opensans accountpane"></div>'); 
		var account_tray = $('<div class= "acttray" id="atr1"></div>');
		var robots_tray = $('<div class="opensans acttray" id="atr2">Your Robots:</div>');
		var actions_tray = $('<div class="actray" id="atr3"></div>');
		actions_tray.append(
		$('<button class="btn actbutton btn-xs btn-default" id="logout">logout</button>'),
		$('<button id="b01" class="btn btn-default btn-xs actbutton">new robot</button>'),
		$('<button id="b03" class="btn btn-default btn-xs actbutton">send pm</button>')
		);
		$('.unreadmsg').click
		//Request API for user info
		$.oajax({
		url: 'http://data.openrobot.net/user/user.php',
		jso_provider: "openrobot",
		jso_allowia: true,
		dataType: 'json',
		success: function(userdata) {
			console.log(userdata['unread']);
			console.log(userdata.unread);
			$('#atr1').append('<div class="user_info">'+userdata.users+' <div class="repcnt"> (<div class="reppos">'+userdata.total+'</div> pts)</div>');
			$('#atr1').prepend('<div class="unreadmsg">'+Object.keys(userdata.unread).length+' <i class="glyphicon glyphicon-envelope"></i></div></div>');
			if(Object.keys(userdata.unread).length>=1){$('.unreadmsg > .glyphicon').css('color',"red");}
			$('.unreadmsg').click(function (){
				$('.store').load("http://store.openrobot.net/html/store/messages.html",function (){
					MessageCenter.init(userdata);
				});
			});
			$('.user_info').click(function (){
				$('.store').load("http://store.openrobot.net/html/account/user_profile.html",function (){
					userProfile.init(userdata);
				});
			});
		}
		});
		//Collate and return elements
		//actions_tray.append(logout_btn, edit_btn, upload_btn,message_btn);
		cnt.append(account_tray, robots_tray, actions_tray);			
		$('.accountslider').append(cnt);
		$('#b01').click(function () {uploadRender.uploadPopup()});
		$('#b03').click(function () {messageRender.messagePopup()});
		$('#logout').click(function (){jso_wipe(); window.location = 'http://store.openrobot.net/'});
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
	},
	//Render file menu block, from json data
	filemenu: function(jsonfiles){
			//Create Folder div for each folder
		$.each(jsonfiles, function(i, data){
			var newfolder = $('<div class="usr_group" id="rf'+i+'">'+data.folder+'  <span id="rfb'+i+'">[+]</span></div>');
			//Create Robot title div for each contents
			$.each(data.robots, function(j,rdata){
				var robot_title = $('<div class="usr_saves" id="rl'+j+'">'+rdata.title+'</div>');
				newfolder.append(robot_title);
				robot_title.click(function (){
				$('.store').load("http://store.openrobot.net/html/store/robot.html",function (){
					robotProfile.initfromID(rdata.id);
				});
				});
			});
			//Append directories to account tray
			$('#atr2').append(newfolder);
			//Enable display toggling
			$('#rfb'+i).click(function(){
				accountPane.openfolder(i);
			});
		})
	}, 
	//Hide folder contents and switch to [+]
	closefolder: function(fid){	
		$('#rf'+fid+'>.usr_saves').css('display','none');
		$('#rf'+fid+'>span').html('[+]');
		$('#rfb'+fid).unbind();
		$('#rfb'+fid).click(function(){
			accountPane.openfolder(fid);
		});
	},
	//Show folder contents and switch to [-]
	openfolder: function(fid){	
		$('#rf'+fid+'>.usr_saves').css('display','block');
		$('#rf'+fid+'>span').html('[-]');
		$('#rfb'+fid).unbind();
		$('#rfb'+fid).click(function(){
			accountPane.closefolder(fid);
		});
	},
	add: function(act_node) {
		$('.accountpane').after(act_node);
	}
}
