var doComments = {
		get: function (tile_id){
				$.oajax({
					jso_provider: 'openrobot',
					jso_allowia: true,
					url: "http://data.openrobot.net/comments/get.php",
					dataType: 'json',
					data: {'id':tile_id},
					success: function(response){
    				// initiate download using direct path to file
						if(response.length){$('#tile'+tile_id+" #btn-comments .tile_btn_data").html(response.length+" ");
						doComments.post(response);
						}
 					}
				});
		},
		post: function (comments){
		$('#tile'+comments[0].container_id+" #tc0").html('');
			for(i=0;i<comments.length;i++){
				$('#tile'+comments[i].container_id+' #tc'+comments[i].parent_id).append("<div class='cmnt' id='tc"+comments[i].id+"'>\""+comments[i].comment+"\" -"+comments[i].users+"</div>");
			}
		}
}
