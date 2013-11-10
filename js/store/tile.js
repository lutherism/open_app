//Builds a Robot Object from an id number


//Robot Object Decleration
function Robot(id_input, title_input, artist_input, image_input, rating_input, summary_input) {
  this.image = image_input;
  this.summary = summary_input;
  this.artist = artist_input;
  this.rating = rating_input;
  this.title = title_input;
  this.id = id_input;
}


var tileRender = {

  /*fillRobotElements: function (robot_input) {
    var tile_node = $('<div class="tile" id="t' + $('.tile').length + '"></div>');
		var info_node = $('<div class="tileinfo"></div>');
		var name_node = $('<h5 class="opensans" style="margin-top:0px;"></h5>')
    var summary1_node = $('<span class="datacol">'+robot_input.summary+'</span>');
    var closebutton_node = $('<button class="btn btn-tile btn-default btn-block" style="bottom:0px;">download & print</button>');
    var artist_node = $('<small></small>');
    var image_node = $('<img class="tileprofile"></img>');
    name_node.html(robot_input.title);
		artist_node.html(" By: " + robot_input.artist);
		name_node.append(artist_node);
		info_node.append(image_node, summary1_node, closebutton_node);
		closebutton_node.attr('id','c'+$(tile_node).attr('id'));
    image_node.attr('src','http://data.openrobot.net/robot_imgs/tile_img/' + robot_input.image); 
    $(closebutton_node).click(function () {
       $(tile_node).remove();
    });
		tile_node.append(name_node, info_node);
		return tile_node;
  },*/

	//Add a tile (reuires tile node)
  addTile: function (robot_input, node_id) {
		var newtile = $('<div></div>')
		newtile.load('http://store.openrobot.net/tilet.html', function (){
			this.id="tile"+robot_input.id;
			$('#tile'+robot_input.id+'>>>>h5').html(robot_input.title+'<small>  By: '+robot_input.artist+'</small>');
			$('#tile'+robot_input.id+'>>>>img').attr('src',
				'http://data.openrobot.net/robot_imgs/tile_img/'+robot_input.image);
			$('#tile'+robot_input.id+'>>>>.datacol').html(robot_input.summary);
			$('#tile'+robot_input.id+'>>>>>#btn-heart').click(function () {
				this.childNodes[1].setAttribute('style','color:red;');
			});
		});
    $('#'+node_id).append(newtile);
		//console.log($('tile'+robot_input.id+'>>>h5'));
  }
};
document.addEventListener('DOMContentLoaded', function () {  
	}
);
