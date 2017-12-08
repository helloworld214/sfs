/**
 * Created by Tesla on 2017/11/21/0021.
 */



let fs = require('fs');

let pages = [
	'lookbook',
	'video',
	'star',
	'storeopen',
	'show',
	'spirit',
	'tech',
	'series',
	'brand',
	'stores',
	'address',
	'contact',
	'joinus'
];

fs.readFile('template.html', function(err, data){
    if(err){
		console.log(err);
    	throw err;
	}else {
		var html = solve(data.toString(), {
			pageClass: '这里是关键字',
			description: '这里是描述',
			title: '深圳市歌中歌服饰有限公司 SONG OF SONG',
		});
		create(data, pages);
	}
});

function create(data, pages){
	var styleImport = [
			'@charset "utf-8";\n\n',
			'@import "variables";\n',
			'@import "mixins";\n',
			'@import "extend";\n',
			'@import "reset";\n',
			'@import "common";\n'
		].join('');
	var jsImport = 'import "../fonts/iconfont/iconfont.css";\nimport "../scss/style.scss";\nimport "jquery";\nimport "./async_v201711171014";\nimport "./main";';
    pages.forEach(function(item){

		// styleImport += '@import "' + item + '.scss";\n';
		var html = solve(data.toString(), {pageClass: item});
		// fs.writeFile('./src/pages/' + item + '.html', html, function(err){
		// 	if(err){
		// 		console.log(err);
		// 		throw err;
		// 	}else {
		// 		console.log(item + '.html创建成功！');
		// 	}
		// });
		fs.writeFile('./src/js/' + item + '.js', jsImport, function(err){
			if(err){
				console.log(err);
				throw err;
			}else {
				console.log(item + '.js创建成功！');
			}
		});
		// fs.writeFile('./src/scss/' + item + '.scss', '', function(err){
		// 	if(err){
		// 		console.log(err);
		// 		throw err;
		// 	}else {
		// 		console.log(item + '.scss创建成功！');
		// 	}
		// });

    });
	//
	// fs.writeFile('./src/scss/style.scss', styleImport, function(err){
	// 	if(err){
	// 		console.log(err);
	// 		throw err;
	// 	}else {
	// 		console.log('style.scss创建成功！');
	// 	}
	// });

}

function solve(tpl, obj){
	var str = tpl, key, reg;
	for(key in obj){
		if(obj.hasOwnProperty(key)){
			reg = new RegExp('{{' + key + '}}', 'g');
			str = str.replace(reg, obj[key]);
		}
	}
	return str;
};