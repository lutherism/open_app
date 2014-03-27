var backPage = {
	headinit: function(){
		$(".logo").click(function (){
				$('.store').load("http://store.openrobot.net/html/store/main.html",function (){
					pageload.store();
				});
		});
	},
	footinit: function(){

	}
}
