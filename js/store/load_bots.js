var loadrobots = {
 loader: function (){
	//define and call a http GET request for a JSON file of all robots in MySQL table
  var add="./php/store/load_bots.php";
  var robots;
	$.oajax({
		url:add,
		jso_provider:'openrobot',
		jso_allowia:true,
		dataType: 'json',
		success: function(data){
   // loop through the members and call .js files for rendering tiles and thumbs
   $.each(data,function(i,dat){
    tileRender.addTile(new Robot(dat.id,dat.title,dat.artist,dat.image,dat.rating,dat.summary), 'tr03', dat.group_name);
    if(i<5)thumbRender.addThumb(thumbRender.fillthumbElements(new Robot(dat.id,dat.title,dat.artist,dat.image,dat.rating,dat.summary)),'tr01');
   });
  }
 });
	}
}
