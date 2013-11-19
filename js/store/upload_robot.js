//Builds a Robot Object from an id number
var uploadRender = {
	
  uploadPopup: function () {
		//Create Upload features with JQuery
    var tile_node = $('<div class="tilepopup"><h3 style="display:inline-block;margin-top:0px">Upload a New Robot:<small> (Last image uploaded used for profile)</h3></div>');
		var form_div = $('<div id="fileform"></div>');
		var close_btn = $("<button id='closeupload' class='btn btn-default btn-xs' style='float:right;'>Close</button>");
		//Load HTML file for fileuploader
		//form_div.load('http://data.openrobot.net/new/index.php');
//This block is for seperating filupload form the submit form
			/*function (){
				$('#robotSubmit').click (function (){
					$.oajax({
						url: 'http://data.openrobot.net/upload/newrobot.php',
						jso_provider: "openrobot",
						jso_allowia: true,
						dataType: 'json',
						data: {
							inputRobotName: $('#inputRobotName').val(),
							inputSummary: $('#inputSummary').val(),
							uploadedfile: $('#uploadedfile').val(),
						}
					});
					window.location.reload();
				})
		});*/
		tile_node.append(close_btn, form_div);
		uploadRender.popupUpload(tile_node);
  },

//Add the tile (reuires tile node)
  popupUpload: function (node_input) {
		$('body').prepend($('<div class="browsershadow" id="upshadow"></div>'));
    $('body').append(node_input);
		$.oajax({
			jso_provider: 'openrobot',
			jso_allowia: true,
			url: 'http://data.openrobot.net/new/index.php',
			dataType:'html',
			success: function (data){
				console.log('test');
				$('#fileform').append($(data));	
				}
		});
		$('#closeupload, #upshadow').click(function () {$('.tilepopup, #upshadow').remove()});
        /*dataType: 'json',
        done: function (e, data) {
            $.each(data.result.files, function (index, file) {
                $('<p/>').text(file.name).appendTo(document.body);
            });
        });*/	
 		}
};
