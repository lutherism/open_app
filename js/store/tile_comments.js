var doComments = {
//method for getting comments for each robot tile
		anonGet: function (tile_id){
			//AJAX call for comment data
				$.ajax({
					url: "http://data.openrobot.net/comments/get.php",
					dataType: 'json',
					data: {'id':tile_id},
					success: function(response){
    				// add comment length to comment button (or leave at default 0)
						if(response.length){$('#tile'+tile_id+" #btn-comments .tile_btn_data").html(response.length+" ");
						// send data to get rendered in html
						doComments.post(response);
						}
 					}
				});
			$('#tile'+tile_id+' .btn-comm').addClass('disabled');
		},
		get: function (tile_id){
			//AJAX call for comment data
				$.oajax({
					jso_provider: 'openrobot',
					jso_allowia: true,
					url: "http://data.openrobot.net/comments/get.php",
					dataType: 'json',
					data: {'id':tile_id},
					success: function(response){
    				// add comment length to comment button (or leave at default 0)
						if(response.length){$('#tile'+tile_id+" #btn-comments .tile_btn_data").html(response.length+" ");
						// send data to get rendered in html
						doComments.post(response);
						}
 					}
				});
			$('#tile'+tile_id+' .btn-comm').unbind('click');
			$('#tile'+tile_id+' .btn-comm').click(function (){
			$.oajax({
				jso_provider: 'openrobot',
				jso_allowia: true,
				url: 'http://data.openrobot.net/comments/add.php',
				method: 'POST',
				data: {
					p: 0,
					c: tile_id,
					cm: $('#tile'+tile_id+' .comm_input').val()
				},
				success: function (data) {
					$('#tile'+tile_id+' .comm_input').val('');
					doComments.get(tile_id);
				}
			});
			});
		},
		//render JSON comment data in div containers
		post: function (comments){
		$('#tile'+comments[0].container_id+" #tc0").html('');	
			for(i=0;i<comments.length;i++){
				//nest threaded comments (top layer is always #tc0)
				$('#tile'+comments[i].container_id+' #tc'+comments[i].parent_id).append(
					"<div class='cmnt' id='tc"+comments[i].id+"'>\""+comments[i].comment+"\" -"+comments[i].users+" <a id='tr"+comments[i].id+"' class='reply'>reply</a></div>"
				);
			//Save comment data to reply tag	
				$('#tr'+comments[i].id).data(comments[i]);
				//On reply click use comment data to change comment button action
				$('#tr'+comments[i].id).click(function (){
					doComments.reply($('#'+this.id).data());
				//toggle reply action on clicking reply again
			var comment = $('#'+this.id).data();
				$('#tr'+comment.id).unbind('click');
				$('#tr'+comment.id).click(function (){
					doComments.get(comment.container_id);
					});
				});
			}
		},
		reply: function (comment){
			//Change comment section formatting with JQuery
			$('#tile'+comment.container_id+' .btn-comm').removeClass('disabled');
			$('#tile'+comment.container_id+' .cmnt').removeClass('replyon');
			$('#tile'+comment.container_id+' #reply').remove();
			$('#tc'+comment.id).addClass('replyon');
			$('#tc'+comment.id).append("<div class='cmnt' id='reply'>...</div>");
			//change AJAX call for comment button to reply to parent comment
			$('#tile'+comment.container_id+' .btn-comm').unbind('click');
			$('#tile'+comment.container_id+' .btn-comm').click(function (){
				$.oajax({
					jso_provider: 'openrobot',
					jso_allowia: true,
					url: 'http://data.openrobot.net/comments/add.php',
					method: 'POST',
					data: {
						p: comment.id,
						c: comment.container_id,
						cm: $('#tile'+comment.container_id+' .comm_input').val()
					},
					success: function (data) {
						$('#tile'+comment.container_id+' .comm_input').val('');
						doComments.get(comment.container_id);
					}
				});
			});
		}
}
