/**
 * Created by Tesla on 2017/11/27/0027.
 */
let fs = require('fs');


fs.readdir('./src/cutimgs/', function(err, files){
    console.log(files);
    var reg = /^lb_/gi;
	files.forEach(function(item){
		fs.rename('./src/cutimgs/'+ item, './src/cutimgs/'+ item.replace('-min', ''), function(err){
		    console.log(err);
		});
	});
})