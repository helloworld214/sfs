
import "../scss/style.scss";
import "jquery";
import "./async_v201711171014";
import "./map";
import "./main";

$(function(){

	var map = null,
		point = {
		coordinate: '114.072931,22.572868',
		title: '深圳市歌中歌服饰有限公司',
		addr: '地址：深圳市龙华新区大浪服装工业园浪琴路9号',
		tel: '0755-83105988'
	};

	initMap(point);

	// 初始化地图
	function initMap(store) {
		map = new TeslaMap('.map', {
			center: store.coordinate,
			zoom: 14,
			bindList: false,
			markIconSrc: 'images/icons/contact_map_marker.png',
			marker: {
				point: store.coordinate,
				tips: '',
				title: store.title,
				summary: store.addr,
				tel: store.tel ? '电话：' + store.tel : ''
			},
		});
	}

});