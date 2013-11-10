

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

  fillRobotElements: function (robot_input) {
    var tile_node = $('<div class="tile" id="t' + $('.tile').length + '"></div>');
		var info_node = $('<div class="tileinfo"></div>');
    var title_node = $('<div class="tiletitle"></div>');
		var name_node = $('<span></span>')
    var summary1_node = $('<span class="datacol" ></span>');
    var summary2_node = $('<span class="datacol" style="position: absolute;"></span>');
    var closebutton_node = $('<div class="downloadbtn">download & print</div>');
    var artist_node = $('<span style="float:right;"></span>');
    var image_node = $('<img class="tileprofile"></img>');
    name_node.html(robot_input.title + ', R#' + robot_input.id);
		artist_node.html(" By: " + robot_input.artist);
		title_node.append(name_node, artist_node);
		for(var x = 0; x<robot_input.summary.length; x++) {
			var desc_node = $('<span style="disaply:inline; width:50px;">'+robot_input.summary[x][0]+': </span>');
			var val_node = $('<span style="disaply:block; width:50px;">'+robot_input.summary[x][1]+'</span><br>');
			summary1_node.append(desc_node, val_node);
    }
		closebutton_node.attr('id','c'+$(tile_node).attr('id'));
    image_node.attr('src','http://0.0.0.0:8001/images/' + robot_input.image); 
    $(closebutton_node).click(function () {
       $(tile_node).remove();
    });
		info_node.append(summary1_node, summary2_node, closebutton_node);
		tile_node.append(title_node, image_node, info_node);
		return tile_node;
  },

	//Add a tile (reuires tile node)
  addTile: function (node_input) {
    $('body').append(node_input);
  }
};
document.addEventListener('DOMContentLoaded', function () {  
	console.log('loaded');
	//Load Robots from test.json
	var xmlReader = new XMLHttpRequest();
	xmlReader.open("GET", 'http://0.0.0.0:8001/test.json');
	xmlReader.onload = function () {
		robotlist = JSON.parse(xmlReader.responseText).robots;
			//Add Default Tiles
			for(var i = 0; i < robotlist.length; i++) {
				tileRender.addTile(tileRender.fillRobotElements(robotlist[i]))
			}
		}
	xmlReader.send();
	}
);
