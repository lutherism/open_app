var robotProfile = { 
	initfromID: function(rid) {
	$.ajax({
		url:'http://data.openrobot.net/store/robot_info.php',
		data: {'rid':rid},
		dataType: 'json',
		success: function(data){
			console.log('wattt');
			console.log(data);
			robotProfile.init(data);},
		error: function(request,error){accountPane.accError(rid, "We failed to find a robot with the ID #"+rid, "Robot not found")}
		});
	},
	init: function(robot) {
		console.log('faill');
		$(".robot_profile").css('background-image','url("http://data.openrobot.net/robots/'+robot.id+'/tmp/'+robot.image+'")');
		$(".nav_crumb").click(function (){
				$('.store').load("http://store.openrobot.net/html/store/main.html",function (){
					pageload.store();
				});
		});
		$(".nav_tray").append(" / <a class='nav_crumb' id='artist_crumb'>"+robot.artist+"</a>");
		$(".nav_tray").append(" / <a class='nav_crumb'>"+robot.id+"</a>");
		$(".robot_profile_title").append("<h2>"+robot.title+"<h4> By "+robot.artist+"</h4></h2><p>"+robot.summary+"</p>");
		robot.files.forEach(function(file){
			var fileUI = $('<div class="file_box"><div class="file_icon"></div>'+file.file_name+'</div>');
			$('#rpcontents_pane').append(fileUI);
		});
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
			$('.fright').click(function (){
				
			$('.robot_loading').removeClass('hidden');
			$('.rload_msg').html('Preparing Robot for Download...');
				$.oajax({
					jso_provider: 'openrobot',
					jso_allowia: true,
					dataType:'json',
					url: "http://data.openrobot.net/download/index.php",
					data: {'rid':robot.id},
					success: function(response){
    				// initiate download using direct path to file
    				window.location.href = response.URL;
						$('.tile_loading').addClass('hidden');
 					}
				});
			});
		console.log("init run");	
		robotProfile.pullCommentData(robot.id);
	},
  pullCommentData: function(comment_id) {
		$.ajax({
			url: "http://data.openrobot.net/comments/get.php",
			dataType: 'json',
			data: {'id':comment_id},
			success: function(response){
				// add comment length to comment button (or leave at default 0)
				if(response.length){$('#rpcomments').html(response.length+"  Comments");
				// send data to get rendered in html
				robotProfile.buildCommentDivs(response);
				}
			}
		});
	},	
	buildCommentDivs: function(comments) {
			$('#rc0').html('');
			for(i=0;i<comments.length;i++){
				//nest threaded comments (top layer is always #rc0)
				$('#rc'+comments[i].parent_id).append(
					"<div class='rcmnt' id='rc"+comments[i].id+"'>\""+comments[i].comment+"\" -"+comments[i].users+" <a id='rr"+comments[i].id+"' class='rreply'>reply</a></div>"
				);
			//Save comment data to reply tag
				$('#rr'+comments[i].id).data(comments[i]);
				//On reply click use comment data to change comment button action
				$('#rr'+comments[i].id).click(function (){
					robotProfile.cmntreply($('#'+this.id).data());
				//toggle reply action on clicking reply again
			var comment = $('#'+this.id).data();
				$('#tr'+comment.id).unbind('click');
				$('#tr'+comment.id).click(function (){
					robotProfile.init(comment.container_id);
					});
				});
			}
	},
	cmntreply: function(comment){
			//Change comment section formatting with JQuery
			$('.rcmnt').removeClass('replyon');
			$('#rc'+comment.id).addClass('replyon');
			$('#rc'+comment.id).append("<div class='cmnt' id='reply'>...</div>");
			//change AJAX call for comment button to reply to parent comment
			$('.btn-rpcomments').unbind('click');
			$('.btn-rpcomments').click(function (){
				$.oajax({
					jso_provider: 'openrobot',
					jso_allowia: true,
					url: 'http://data.openrobot.net/comments/add.php',
					method: 'POST',
					data: {
						p: comment.id,
						c: comment.container_id,
						cm: $('.rcmnt_input').val()
					},
					success: function (data) {
						$('.rcmnt_input').val('');
						robotProfile.pullCommentData(comment.container_id);
					}
				});
			});

		
	}
}
