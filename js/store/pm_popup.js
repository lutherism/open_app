
var messageRender = {
//Load html file for messsage popup with an jaxa call through jQuery	
  messagePopup: function () {
		//Create Upload features with JQuery
		var shadow = $('<div></div>');
		shadow.load("http://store.openrobot.net/html/store/pm_popup.html", function (data){
		//onload, send html nodes to get posted and activated
		messageRender.messageUpload(data);});
  },

//Add the popup and activate button (reuires tile node)
  messageUpload: function (node_input) {
    $('body').prepend(node_input);
		//on button press, send message data to server
		$('.pm_pop button').click(function (){
		$.oajax({
			jso_provider: 'openrobot',
			jso_allowia: true,
			url: 'http://store.openrobot.net/php/store/pm.php',
			data: {
				receipt: $('#preceipt').val(),	
				subject: $('#psubject').val(),	
				message: $('#pmessage').val()	
			},
			success: function (data){
				window.location = "http://store.openrobot.net"
			}
		})
		});
		//close popup by clicking outside
		$('#upshadow').click(function () {$('.pm_pop, #upshadow').remove()});
 		}
};
