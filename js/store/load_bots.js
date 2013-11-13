var loadrobots = {
 loader: function (){
	//define and call GET request for JSON of all robots in table
  var url="./php/store/load_bots.php";
  var robots;
  $.getJSON(url,function(json){
   // loop through the members here
   $.each(json,function(i,dat){
    console.log(dat.title);
    tileRender.addTile(new Robot(dat.id,dat.title,dat.artist,dat.image,dat.rating,dat.summary), 'tr03');
    if(i<5)thumbRender.addThumb(thumbRender.fillthumbElements(new Robot(dat.id,dat.title,dat.artist,dat.image,dat.rating,dat.summary)),'tr01');
   });
  });
 }
}
