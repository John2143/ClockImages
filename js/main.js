!function(){
$(document).ready(function(){

	const radius = 200;
	const picx = 75;
	const picy = 75;
	const numpics = 6;
	const pipcs = Math.PI*2/numpics;
	var expandedImage = -1;
	var cont = $("#contain");
	cont.css("width",radius*2+20);
	cont.css("height",radius*2+20);
	
	function toggleState(num){
		if(expandedImage>0){
			$(".clock-imageholder").each(function(){
				$(this)
					.animate({left:Math.sin(pipcs)*200-picx/2,top:Math.cos(pipcs)*200-picy/2});
			});
		}else{
		}
	}
	
	$("<style>")
		.prop("type", "text/css")
		.html("\
			.clock-imagecontain {\
				position: absolute;\
				width: " + picx + ";\
				height: " + picy + ";\
			}")
		.appendTo("head")
	;
	log("wow");
	for(var i = 0; i < numpics; i++){
		$("<div/>",{class:"vis clock-imageholder",clockID:i, width: picx, height: picy})
			.html("spooky"+ i)
			.appendTo(cont)
		;
	}
}); 
}();