/**
 * Created by Tesla on 2017/12/5/0005.
 */

var fs = require('fs');

var files = fs.readdirSync('./build');

var title = {
	index: '首页',
	campaign: '形象视觉',
	lookbook: '经典搭配',
	news: '品牌新闻',
	newsdetails: '新闻详情',
	show: '秀场直击',
	star: '明星演绎',
	storeopen: '新店开业',
	spirit: '高定精神',
	tech: '匠心工艺',
	series: '高定系列',
	brand: '品牌诠释',
	storeimage: '门店形象',
	storesearch: '门店查询',
	contact: '联系方式',
	joinus: '人才招聘',
	video: '视频花絮'
}

// 替换title
files.forEach(function(item){
	if(!/\.html/.test(item)){
		return;
	}
	var html = fs.readFileSync('./build/' + item).toString(),
		filename = item.replace('.html', ''),
		reg = new RegExp('{{title}}', 'g');
	console.log(filename);
	console.log(title[filename]);
	html = html.replace(reg, '歌中歌-' + title[filename]);
	fs.writeFileSync('./build/' + item, html);
});
