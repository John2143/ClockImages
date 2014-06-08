var nnnnnnnnnnnnnn;

!function(){
$(document).ready(function(){
	function edgyobject(w,h,l,t){
		this.height = h;
		this.width = w;
		this.top = t;
		this.left = l;
	}
	const radius = 200;
	const picx = 50;
	const picy = 50;
	const numpics = 12;
	const buffer = 0;
	const animationSpeed = 400;
	
	const pipcs = Math.PI*2/numpics;
	var expandedImage = -1;
	var cont = $("#contain");
	cont.css("width",(radius+buffer)*2+picx);
	cont.css("height",(radius+buffer)*2+picy);
	var getClockPos = function(num){
		return {	left:Math.sin(pipcs*num)*radius+radius+buffer,
					top: Math.cos(pipcs*num)*radius+radius+buffer
			};
	};
	var normalizeImage = function(bw,bh,nw,nh){

		var ratio = nw/nh;
		if (ratio > 1){
			var change = nw/bw;
			return new edgyobject(bw,nh/change,0,0);
		}else{
			var change = nh/bh;
			return new edgyobject(nw/change,bh,0,0);
		}
	};
	var toggleState = function(num){
		if(expandedImage>0){
			$(".clock-imageholder")
				// .animate({width:picx, height:picy},animationSpeed/2)
				.each(function(){
				var thes = $(this);
				var to = getClockPos(thes.attr("clockID"));
				// setTimeout(
					// function(){
						thes.animate({left: to.left, top:to.top, width:picx, height:picy},animationSpeed);
					// },
					// (animationSpeed/(2*numpics))*thes.attr("clockID")
				// );
			});
			$(".clock-image")
				.animate(new edgyobject(picx,picy,0,0),animationSpeed)
			;
			expandedImage = 0;
			log("Expanding...");
		}else{
			
			$(".clock-imageholder[clockID='"+num+"']")
				.animate({left: picx+2, top:picy+2,width:radius*2-picx,height:radius*2-picy},animationSpeed);
			$(".clock-imageholder[clockID!='"+num+"']")
				.animate({left: 0, top:0},animationSpeed)
			;
			$(".clock-image[clockID='"+num+"']")
				.each(function(){
					$(this).animate(normalizeImage(radius*2-picx,radius*2-picy,this.naturalWidth,this.naturalHeight),animationSpeed);
			});
			expandedImage = num;
			log("Clicked " + num);
		}
	};
	log("wow");
	for(var i = 1; i <= numpics; i++){
		startpos = getClockPos(i);
		var img = $("<img/>",{class:"clock-image",clockID:i,src:"./images/"+i+".jpg"})
			//.html("spooky"+ i)
			.css("width",picx)
			.css("height",picy)
			.css("left",0)
			.css("top",0)
		;
		$("<div/>",{class:"vis clock-imageholder",clockID:i})
			//.html("spooky"+ i)
			.css("width",picx)
			.css("height",picy)
			.css("left",startpos.left)
			.css("top",startpos.top)
			.append(img)
			.appendTo(cont)
		;
	}
	$(".clock-imageholder")
		.click(function(){
			toggleState($(this).attr("clockID"));
		})
	;
	nnnnnnnnnnnnnn=normalizeImage;
}); 
}();