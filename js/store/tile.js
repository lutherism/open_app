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
  addTile: function (robot_input, node_id, favorites) {
		//load tile format from HTML file
		var newtile = $('<div></div>');
		newtile.append("<div class=tile_loading'><div class='tload_msg'>Loading Robot...</div></div>");
		newtile.load('http://store.openrobot.net/html/store/tile.html', function (){
			this.id="tile"+robot_input.id;
			//hide loading shadow
			$('#tile'+robot_input.id+' .tile_loading').addClass('hidden');
			console.log('#tile'+robot_input.id+' .tile_loading');
			//onload fill the tile with robot data
			this.id="tile"+robot_input.id;
			$('#tile'+robot_input.id+' h5').html(robot_input.title+'<small>  By: '+robot_input.artist+'</small>');
			$('#tile'+robot_input.id+' img').attr('src',
				'http://data.openrobot.net/robots/'+robot_input.id+'/tmp/tile_img/'+robot_input.image);
			$('#tile'+robot_input.id+' .datacol').html(robot_input.summary);
			//Click profile image to goto robot page
			$('#tile'+robot_input.id+' img').click(function (){
				$('.store').load("http://store.openrobot.net/html/store/robot.html",function (){
					robotProfile.initfromID(robot_input.id);
				});
			});
			//Heart button interaction
			console.log(favorites+" "+robot_input.id);
			if(favorites == 'Favorites'){ $('#tile'+robot_input.id+' #btn-heart i').css('color','red'); }
			else {
				$('#tile'+robot_input.id+' #btn-heart').removeClass('disabled');
			$('#tile'+robot_input.id+' #btn-heart').click(function () {
				this.childNodes[3].setAttribute('style','color:red;');
				this.className = this.className + ' disabled';
				$.oajax({
					jso_provider: 'openrobot',
					jso_allowia: true,
					url: "http://store.openrobot.net/php/store/heart.php",
					data: {'id':robot_input.id}
				});
			});}
			//Download robot from cownload button
			$('#tile'+robot_input.id+' .btn-tile').click(function (){
				
			$('#tile'+robot_input.id+' .tile_loading').removeClass('hidden');
			$('#tile'+robot_input.id+' .tload_msg').html('Preparing Robot for Download...');
				$.oajax({
					jso_provider: 'openrobot',
					jso_allowia: true,
					dataType:'json',
					url: "http://data.openrobot.net/download/index.php",
					data: {'rid':robot_input.id},
					success: function(response){
    				// initiate download using direct path to file
    				window.location.href = response.URL;
						$('#tile'+robot_input.id+' .tile_loading').addClass('hidden');
 					}
				});
			});
			//Bootstrap UI for share dropdown
			$('#btn-share').dropdown();
			//Delete robot
			$('#tile'+robot_input.id+' #btn-remove').click(function (){
				$.oajax({
					jso_provider: 'openrobot',
					jso_allowia: true,
					url: "http://data.openrobot.net/delete/index.php",
					data: {'id':robot_input.id},
					success: function(response){
						//window.location = "http://store.openrobot.net";
 					}
				});
			});
			//activate comment button to toggle showing comments
			$('#tile'+robot_input.id+' #btn-comments').click(function (){
				$('#tile'+robot_input.id+' .comment_container').toggleClass('hidden');
				$('#tile'+robot_input.id+' #inforow').toggleClass('hidden');
			});
			//Render comment section with tile_comments.js
			doComments.get(robot_input.id);
	});
    	$('#'+node_id).append(newtile);
  },
  addAnonTile: function (robot_input, node_id, favorites) {
		//load tile format from HTML file
		var newtile = $('<div></div>');
		newtile.append("<div class=tile_loading'><div class='tload_msg'>Loading Robot...</div></div>");
		newtile.load('http://store.openrobot.net/html/store/tile.html', function (){
			this.id="tile"+robot_input.id;
			//hide loading shadow
			$('#tile'+robot_input.id+' .tile_loading').addClass('hidden');
			console.log('#tile'+robot_input.id+' .tile_loading');
			//onload fill the tile with robot data
			this.id="tile"+robot_input.id;
			$('#tile'+robot_input.id+' h5').html(robot_input.title+'<small>  By: '+robot_input.artist+'</small>');
			$('#tile'+robot_input.id+' img').attr('src',
				'http://data.openrobot.net/robots/'+robot_input.id+'/tmp/tile_img/'+robot_input.image);
			$('#tile'+robot_input.id+' .datacol').html(robot_input.summary);
			//Click profile image to goto robot page
			$('#tile'+robot_input.id+' img').click(function (){
				$('.store').load("http://store.openrobot.net/html/store/robot.html",function (){
					robotProfile.init(robot_input);
				});
			});
			//Interact with download button
			$('#tile'+robot_input.id+' .btn-tile').click(function (){
				console.log('test');
				accountPane.accError("02","You must be logged in to download robots","You can't do that");	
			});
			//Bootstrap UI for share dropdown
			$('#btn-share').dropdown();
			//activate comment button to toggle showing comments
			$('#tile'+robot_input.id+' #btn-comments').click(function (){
				$('#tile'+robot_input.id+' .comment_container').toggleClass('hidden');
				$('#tile'+robot_input.id+' #inforow').toggleClass('hidden');
			});
			//Render comment section with tile_comments.js
			doComments.anonGet(robot_input.id);
	});
    	$('#'+node_id).append(newtile);
  }
};
