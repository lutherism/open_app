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
	//Add a tile (reuires tile node)
  addTile: function (robot_input, node_id) {
		//load tile format from HTML file
		var newtile = $('<div></div>')
		newtile.load('http://store.openrobot.net/html/store/tile.html', function (){
			//onload fill the tile with robot data
			this.id="tile"+robot_input.id;
			$('#tile'+robot_input.id+'>>>>h5').html(robot_input.title+'<small>  By: '+robot_input.artist+'</small>');
			$('#tile'+robot_input.id+'>>>>img').attr('src',
				'http://data.openrobot.net/robots/'+robot_input.id+'/tmp/tile_img/'+robot_input.image);
			$('#tile'+robot_input.id+'>>>>.datacol').html(robot_input.summary);
			//Heart button interaction
			$('#tile'+robot_input.id+'>>>>>#btn-heart').click(function () {
				this.childNodes[1].setAttribute('style','color:red;');
			});
			$('#tile'+robot_input.id+'>>>>.btn-tile').click(function (){
				$.oajax({
					jso_provider: 'openrobot',
					jso_allowia: true,
					dataType:'json',
					url: "http://data.openrobot.net/download/index.php",
					data: {'id':robot_input.id},
					success: function(response){
    				// initiate download using direct path to file
    				window.location.href = response.URL;
 					}
				});
			});
		});
    $('#'+node_id).append(newtile);
  }
};
