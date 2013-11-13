var thumbRender = {

	//Create thumb node from a Robot Object
  fillthumbElements: function (robot_input) {
		//Render html elements with JQuery
    var thumb_node = $('<div class="thumb" id="th' + robot_input.id + '"></div>');
		var info_node = $('<div class="thumbinfo""></div>');
    var title_node = $('<span class="thumbspan"></span>');
    var artist_node = $('<span class="thumbspan"></span>');
		//Fill thumb with robot data
    title_node.html(robot_input.title + ', v' + $(thumb_node).attr('id') + ', '+robot_input.rating+'/5');
    artist_node.html(". by: " +robot_input.artist);
		thumb_node.css('background-image','url(http://data.openrobot.net/robot_imgs/thumb_img/'+robot_input.image+')');
		info_node.append(title_node, artist_node);
		thumb_node.append( info_node);
		return thumb_node;
  },
	
//Remove a thumb by id
	closeThumb: function(thumb_id_input){
		$('#'+thumb_id_input).remove();
	},

//Add a thumb (requires thumb node, and target tray id)
  addThumb: function (node_input, parent_id) {
    $('#'+parent_id).append(node_input);	
		//Hide title card unless moused over
		$(node_input).hover(function () {$('#'+this.id+'>div').css('visibility','visible')}, function () {$('#'+this.id+'>div').css('visibility','hidden')});
  }
};

