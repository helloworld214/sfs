/**
 * Created by Tesla on 2017/11/21/0021.
 */

var fs = require('fs');

function update(file){
	fs.readFile(file, function(err, data){
		if(err){
			console.log(err);
			throw err;
		}else {
			var str = data.toString();
			var reg = /\n\n"byNodejsChangeHtml"/;
			var has = reg.test(str);
			console.log(has);
			str = has ? str.replace(reg, '') : str + '\n\n"byNodejsChangeHtml"';
			fs.writeFile(file, str, function(err){
				if(err){
					console.log(err);
					throw err;
				}else {
					console.log(file + ' update Successfuly!');
				}
			});
		}
	});
}



fs.watch('./src/pages',{persistent: true}, function(e, filename){
    if(e === 'change'){
    	var file = './src/js/' + filename.replace('.html', '.js');
		update(file);
	}
});

