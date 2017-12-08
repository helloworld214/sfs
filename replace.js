/**
 * Created by Tesla on 2017/11/23/0023.
 */

var fs = require('fs');

var filePath = './index.html';
var re = './str.html';


readFile(filePath, function(data){
   var str = data.toString();
   // console.log(str);
   console.log(getReg('header').test(str));
   console.log(str.match(getReg('header'))[0]);
	readFile(re, function(data){
	    var s = str.replace(getReg('header'), data.toString());
		writeFile(filePath, s);
	});
});


function readFile(filePath, callback){
	fs.readFile(filePath, function(err, data){
		if(err){
			console.log(err);
			throw err;
		}else {
			callback(data);
		}
	});
}

function writeFile(filePath, data, callback){
	fs.writeFile(filePath, data, function(err){
		if(err){
			console.log(err);
			throw err;
		}else {
			typeof callback === 'function' && callback();
			console.log(filePath + ' update Successfuly!');
		}
	});
}


function getReg(note){
	var reg = '<!--\\s*' + note + '\\s+start\\s*-->([\\s\\S]*)<!--\\s*' + note + '\\s+end\\s*-->';
	return new RegExp(reg, 'gim');
}

