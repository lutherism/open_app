//Builds a Robot Object from an id number
var uploadRender = {
	
  uploadPopup: function () {
    var tile_node = $('<div class="tilepopup"><h3 style="display:inline-block;margin-top:0px">Upload a New Robot:</h3></div>');
		var form_div = $('<div id="fileform"></div>');
		var close_btn = $("<button id='closeupload' class='btn btn-default btn-xs' style='float:right;'>Close</button>");
		//form_node.append(title_node, artist_node, image_node, summary_node, submit_node);
		form_div.load('http://store.openrobot.net/html/fileupload/upload_robot.html');
		tile_node.append(close_btn, form_div);
		uploadRender.popupUpload(tile_node);
  },

//Add a tile (reuires tile node)
  popupUpload: function (node_input) {
		$('body').prepend($('<div class="browsershadow" id="upshadow"></div>'));
    $('body').append(node_input);
		$('#closeupload, #upshadow').click(function () {$('.tilepopup, #upshadow').remove()});
        /*dataType: 'json',
        done: function (e, data) {
            $.each(data.result.files, function (index, file) {
                $('<p/>').text(file.name).appendTo(document.body);
            });
        });*/	
 		}
};
