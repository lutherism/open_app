var MessageCenter = { 
	init: function(user) {
		$(".nav_tray").append(" / <a class='nav_crumb'>"+user.name+"</a>");
		$(".nav_tray").append(" / <a class='nav_crumb'>"+"Messages"+"</a>");
		$(".robot_profile_title").append("<h2>"+user.name+"</h2>");
		$(".robot_profile_summary").append("<p>"+user.summary+"</p>");
		$(".robot_profile_reputation").append("<h4>"+user.rep+"</h4>");
		$('#um_tab').click(function() {
			$('.info_pane').addClass('hidden');
			$('.info_tab').addClass('unselected');
			this.removeClass('unselected');
			this.removeClass('hidden');
		});
		console.log(user);
		MessageCenter.pullPMessageData(user.user_id);
	},
  pullPMessageData: function(user_id) {
		$.oajax({
			jso_provider: 'openrobot',
			jso_allowia: true,
			url: "http://data.openrobot.net/comments/get.php",
			dataType: 'json',
			data: {'uid':user_id},
			success: function(response){
				// add comment length to comment button (or leave at default 0)
				console.log(response);
				$('#inbox').html("Inbox "+response.length);
				MessageCenter.buildCommentDivs(response);
			}
		});
	},	
	buildCommentDivs: function(comments) {
			for(i=0;i<comments.length;i++){
		//nest threaded comments (top layer is always #rc0)
				$('#um_comments_pane').append(
					"<div class='rcmnt new' id='rc"+comments[i].id+"'><h3>"+comments[i].subject+"</h3>\""+comments[i].message+"\" -"+comments[i].users+" <a id='rr"+comments[i].id+"' class='rreply'>reply</a></div>"
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
				$('#rc'+comments[i].id).click(function() {
			var comment = $('#'+this.id+'>.rreply').data();
		$.oajax({
			jso_provider: 'openrobot',
			jso_allowia: true,
			url: "http://data.openrobot.net/comments/edit.php",
			data: {
				'pmid':comment.id,
				'read':'true'},
			success: function(response){
				$('#rc'+comment.id).removeClass('new');
			}
		});
				});
		}
	},
	cmntreply: function(comment){
			//Change comment section formatting with JQuery
			$('.rcmnt').removeClass('replyon');
			$('#rc'+comment.id).addClass('replyon');
			$('#rc'+comment.id).append("<textarea class='cmnt' id='reply'>...</textarea><button class='PMreply'>Send</button>");
			//change AJAX call for comment button to reply to parent comment
			$('.btn-rpcomments').unbind('click');
			$('.PMreply').click(function (){
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
