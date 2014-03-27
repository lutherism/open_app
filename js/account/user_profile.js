var userProfile = { 
	init: function(user) {
		//$(".robot_profile").css('background-image','url("http://data.openrobot.net/robots/'+robot.id+'/tmp/'+robot.image+'")');
		$(".nav_crumb").click(function (){
				$('.store').load("http://store.openrobot.net/html/store/main.html",function (){
					pageload.store();
				});
		});
		$(".nav_tray").append(" / <a class='nav_crumb'>Users</a>");
		$(".nav_tray").append(" / <a class='nav_crumb'>"+user.users+"</a>");
		$('#rpcontents').click(function() {
			$('.info_pane').addClass('hidden');
			$('.info_tab').addClass('unselected');
			$('#rpcontents').removeClass('unselected');
			$('#rpcontents_pane').removeClass('hidden');
		});
		$('#rpcomments').click(function() {
			$('.info_pane').addClass('hidden');
			$('.info_tab').addClass('unselected');
			$('#rpcomments').removeClass('unselected');
			$('#rpcomments_pane').removeClass('hidden');
		});
		$('#rphistory').click(function() {
			$('.info_pane').addClass('hidden');
			$('.info_tab').addClass('unselected');
			$('#rphistory').removeClass('unselected');
			$('#rphistory_pane').removeClass('hidden');
		});
		$('#rprelated').click(function() {
			$('.info_pane').addClass('hidden');
			$('.info_tab').addClass('unselected');
			$('#rprelated').removeClass('unselected');
			$('#rprelated_pane').removeClass('hidden');
		});
		$('.user_profile_info').html(
			"User: " +user.users+"<br><br>"+
			"Number: "+user.user_id+"<br><br>"+
			"Total Reputation: "+user.total+" ("+user.positive+"|-"+user.negative+")<br>");
		$('.user_profile_img').attr('src','http://data.openrobot.net/user/lutherism/Icon.png');
			
}
}
