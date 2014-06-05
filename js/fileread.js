!function(__){
	const reader = new FileReader();
	var fileQueue = [];
	const loadFileFromQueue = function(fe){
		//assert(reader.readyState == FileReader.EMPTY || reader.readyState = FileReader.DONE);
		var file = fileQueue.pop();
		if(!file) return false;
		reader.readAsText(file);
		reader.onload = function(e){
			fe(e.target.result);
			loadFileFromQueue(fe);
		};
	}
	__.doFiles = function(fi,fe){
		if(fi){
			assert(fe);
			for(var i = 0;i < fi.length;i++)
				fileQueue.push(fi[i]);
			while(loadFileFromQueue(fe));
		}
	}
	
	__.trim = function(str){ //http://blog.stevenlevithan.com/archives/faster-trim-javascript
		const whitespace = ' \n\r\t\f\x0b\xa0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000';
		for (var i = 0; i < str.length; i++) {
			if (whitespace.indexOf(str.charAt(i)) === -1) {
				str = str.substring(i);
				break;
			}
		}
		for (i = str.length - 1; i >= 0; i--) {
			if (whitespace.indexOf(str.charAt(i)) === -1) {
				str = str.substring(0, i + 1);
				break;
			}
		}
		return whitespace.indexOf(str.charAt(0)) === -1 ? str : '';
	}

}(this.__ = this.__ || {});