!function(__){$(document).ready(function(){
__.hasjbase = true;
$(".jtext")
	.val(function() {return this.jvalue;})
	.focus(function(){
			if(this.value == this.jvalue)
				this.value = "";
		})
	.blur(function(){
			if(this.value === "")
				this.value = this.jvalue;
		});
$(".jlink")
	.keyup(function(e){
			if (e.which != 13) return;//return key
			const $this = $(this);
			const $that = $("#" + this.jlink);
			assert($that[0]);
			$that.focus();
			$that.click();
		});
});}(this.__ = this.__ || /*!function(){throw new Error("Global namespace (__) must be set to an object!");}()*/ {});//throw is commented because the __ isnt used importantly this script
//Example usage
/*
Input that changes to blank when focused, and activates foo when enter is hit
<input type = "text" class = "wow so fresh jtext jlink" jvalue = "cool input!" jlink = "foo"></input>
<input type = "button" id = "foo"></input>

Input that changes to blank when focused
<input type = "text" class = "wow so fresh jtext" jvalue = "cool input!"></input>

*/