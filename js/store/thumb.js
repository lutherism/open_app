var thumbRender = {

	//Create thumb node from a Robot Object 
	//Typically called by js/store/main.js with data from php/store/load_bots.php
  fillthumbElements: function (robot_input) {
		//Render html elements with JQuery
    var thumb_node = $('<div class="thumb" id="th' + robot_input.id + '"></div>');
		var info_node = $('<div class="thumbinfo""></div>');
    var title_node = $('<span class="thumbspan"></span>');
    var artist_node = $('<span class="thumbspan"></span>');
		//Fill thumb with Robot Object data
    title_node.html(robot_input.title + ', v' + $(thumb_node).attr('id') + ', '+robot_input.rating+'/5');
    artist_node.html(". by: " +robot_input.artist);
		thumb_node.css('background-image','url("http://data.openrobot.net/robots/'+robot_input.id+'/tmp/tile_img/'+robot_input.image+'")');
		info_node.append(title_node, artist_node);
		thumb_node.append( info_node);
				$(thumb_node).click(function (){
				$('.store').load("http://store.openrobot.net/html/store/robot.html",function (){
					robotProfile.initfromID(robot_input.id);
				});
				});
		return thumb_node;
  },
	
//Remove a thumb from page by id
	closeThumb: function(thumb_id_input){
		$('#'+thumb_id_input).remove();
	},

//Add a thumb, based on html node data from fillThumbElements() (requires thumb node, and target tray id)
  addThumb: function (node_input, parent_id) {
    $('#'+parent_id).append(node_input);	
		//Interactivity of hiding title card unless moused over
		$(node_input).hover(function () {$('#'+this.id+'>div').css('visibility','visible')}, function () {$('#'+this.id+'>div').css('visibility','hidden')});
  }
};

