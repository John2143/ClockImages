var nnnnnnnnnnnnnn;

!function(){
$(document).ready(function(){
	
	const radius = 200;
	const picx = 50;
	const picy = 50;
	const numpics = 10;
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
	var normalizeImage = function(bw,bh,elem){
		function edgyobject(w,h,l,t){
			this.height = h;
			this.width = w;
			this.top = t;
			this.left = l;
		};
		const nh = elem.naturalHeight, nw = elem.naturalWidth;
		if(bw >= nw && bh >= nh){
			return edgyobject(nw,nh,(bw-nw)/2,(bh-nh)/2);
		}else{
			var scale = 0;
			if(bw < nw && bh < nh){
				scale = 0;
				return edgyobject(nw,nh,(bw-nw)/2,(bh-nh)/2);
			}else if(bw < nw){
				scale = bw/nw;
				var offset1 = Math.round(nh*scale);
				return edgyobject(bw,offset1,0,(bh-offset1)/2);
			}else{ //bh < nh
				scale = bh/nh;
				var offset1 = Math.round(nw*scale);
				return edgyobject(offset1,bh,(bw-offset1)/2,0);
			}
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
			expandedImage = 0;
			log("Expanding...");
		}else{
			
			$(".clock-imageholder[clockID='"+num+"']")
				.animate({left: picx+2, top:picy+2,width:radius*2-picx,height:radius*2-picy},animationSpeed);
			$(".clock-imageholder[clockID!='"+num+"']")
				.animate({left: 0, top:0},animationSpeed)
			;
			expandedImage = num;
			log("Clicked " + num);
		}
	};
	log("wow");
	for(var i = 1; i <= numpics; i++){
		startpos = getClockPos(i);
		log(i + ": " + startpos.left + ", " + startpos.top);
		$("<div/>",{class:"vis clock-imageholder",clockID:i})
			//.html("spooky"+ i)
			.css("width",picx)
			.css("height",picy)
			.css("left",startpos.left)
			.css("top",startpos.top)
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