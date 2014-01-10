//Uses an html file to display a popup for uploading new robots
//html file uses jQuery Fileupload, and connects to a data.openrobot.net php/mysql backend to save robots

var uploadRender = {
	
  uploadPopup: function () {
		//Create Upload features with JQuery
    var tile_node = $('<div class="tilepopup"><h3 style="display:inline-block;margin-top:0px">Upload a New Robot:<small> (Last image uploaded used for profile)</h3></div>');
		var form_div = $('<div id="fileform"></div>');
		var close_btn = $("<button id='closeupload' class='btn btn-default btn-xs' style='float:right;'>Close</button>");
		tile_node.append(close_btn, form_div);
		//send node data to get uploaded and activated
		uploadRender.popupUpload(tile_node);
  },

//Add the tile (reuires tile node)
  popupUpload: function (node_input) {
		//add shadow and popup
		$('body').prepend($('<div class="browsershadow" id="upshadow"></div>'));
		//create a new robot directory, save it to MySQL, and get a form in html targeting that new robot location
    $('body').append(node_input);
		$.oajax({
			jso_provider: 'openrobot',
			jso_allowia: true,
			url: 'http://data.openrobot.net/new/index.php',
			dataType:'html',
			success: function (data){
				$('#fileform').append($(data));	
				}
		});
		//close window if they click outside
		$('#closeupload, #upshadow').click(function () {$('.tilepopup, #upshadow').remove()});
 		}
};
