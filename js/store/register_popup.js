var registerRender = {
//Load html file for messsage popup with an jaxa call through jQuery	
  registerPopup: function () {
		//Create Upload features with JQuery
		var shadow = $('<div></div>');
		shadow.load("http://store.openrobot.net/html/account/register_popup.html", function (data){
		//onload, send html nodes to get posted and activated
		registerRender.registerUpload(data);});
  },

//Add the popup and activate button (reuires tile node)
  registerUpload: function (node_input) {
    $('body').prepend(node_input);
		//on button press, send message data to server
		$('#submit').click(function (){
		$.ajax({
			url: 'http://store.openrobot.net/php/account/register.php',
			data: {
				user: $('#reg_username').val(),	
				email: $('#reg_email').val(),	
				message: $('#reg_message').val()
			},
			success: function (data){
				window.location = "http://store.openrobot.net"
			}
		})
		});
		//close popup by clicking outside
		$('#upshadow').click(function () {$('.register_pop, #upshadow').remove()});
 		}
};
