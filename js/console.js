var log,assert;
!function(__){
__.hasConsole = true;
const ilconsole = $("#console-log");
log = function(text,level){
	if (!ilconsole[0]) return false;
	level = "log-" + (level || "log"); //log-log for best log 2012
	$('<div/>',{class:level}).html(text).appendTo(ilconsole);
	return true;
};
assert = function(a){
	if(!a){
		var n = new Error("Assertion failed");
		log(n.stack,"fatal"); //I love stacks, but I hate the way this looks ;c
		throw (n);
		//mabye could replace all this with 'throw new Error("Assertion failed");' or even 'throw "assertion failed";'
	}
};
$(document).ready(function(){
	if (!log("Inline console found","important")){
		log = function(f){console.log(f);}; //Prevents the second paramater interfering with default consoles that take a second paramater
		log("No inline console found, defaulting to browser console. Add an object with id 'console-log' into the document to enable inline console.");
		__.hasConsole = false;
	}
});
}(this.__ = this.__ || {});