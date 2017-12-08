// import "../fonts/iconfont/iconfont.css";
import "../scss/style.scss";
import "jquery";
import "./async_v201711171014";
import "./map";
import "../plugs/mCustomScrollbar/jquery.mCustomScrollbar.concat.min";
import "./main";

$(function(){

	var selectors = $('.selector');
	selectors.on('click', function(e){

		var $this = $(this),
			el = e.target,
			value = $this.find('.value');

		$(this).toggleClass('active');
		selectors.not(this).removeClass('active');
		e.stopPropagation();
	});

	$(document).on('click', function(){
		selectors.removeClass('active');
	});

	// 省市筛选、店铺地址列表滚动条
	selectors.find('.dropdown').add($('.listbox')).mCustomScrollbar({
		autoHideScrollbar: true
	});

	// 地图部分
	var map = null,
		mapBox = $('.mapbox'),
		search = $('.search'),
		select = $('.selector'),
		provinceSelect = select.filter('.province'),
		citySelect = select.filter('.city'),
		listbox = $('.listbox'),
		address = listbox.find('li'),
		provinces = {},
		initProvinceId = 0;

	var p0 = {
		coordinate: '114.072931,22.572868',
		title: '歌中歌',
		addr: '地址：广东省深圳市福田区彩田北越华路16号影儿大厦6楼',
		tel: ''
	};

	initMap(p0);

	// fix IE9 placeholder
	var UA = window.navigator.userAgent;
	if(/MSIE 9.0/gi.test(UA)){
		var placeholder = search.attr('placeholder');
		search.val(placeholder);
		search.on('focus blur', function(e){
			var focus = e.type === 'focus',
				val = $(this).val();
			$(this).val(focus ? '' : val ? val : searchByProvinceId(initProvinceId) || placeholder);
		});
	}

	// 输入实时搜索
	search.on('input', function () {
		var val = this.value.trim();
		val ? searchByKeyword(val) : address.show();
	});

	// 手机端点击地址弹出地图
	listbox.on('click', 'li', function () {
		setTimeout(function(){
			mapBox.fadeIn();
		}, 50);
	});

	// 手机端点击地图关闭按钮关闭地图
	$('.map-close').on('click', function () {
		mapBox.fadeOut();
	});

	// 通过省份ID搜索(由于异步接口限制，其实是通过城市ID搜索)
	function searchByProvinceId(provinceId){
		if (!provinceId || !address) {
			return;
		}
		address.hide();
		provinces[provinceId].cities.forEach(function(item){
			address.filter('[data-cityid=' + item.id + ']').show();
		});
	}

	// 通过城市ID搜索
	function searchByCityId(cityId){
		if (!cityId || !address) {
			return;
		}
		address.hide();
		address.filter('[data-cityid=' + cityId + ']').show();
	}

	// 通过关键词ID搜索
	function searchByKeyword(keyword){
		if (!keyword || !address) {
			return;
		}
		address.hide();
		address.each(function(){
			$(this).text().match(new RegExp(keyword, 'gi')) && $(this).show();
		});
	}

	// 通过省份ID更新城市列表
	function updateCitySelect(provincesId){
		if(!provincesId || !provinces){
			return;
		}
		var list = '';
		provinces[provincesId].cities.forEach(function(item){
			list += '<li data-code="' + item.id + '" title="' + item.title + '">' + item.title + '</li>';
		});
		citySelect.find('ul').html(list);
	}

	// 清除城市选择结果
	function clearCitySelect(){
		citySelect.find('.value').html('请选择城市').attr({
			dataCode: '--',
			title: '--'
		});
	}

	// 创建省份列表
	function getProvinces(data){
		var list = '';
		data.forEach(function(item){
			list += '<li data-code="' + item.id + '">' + item.title + '</li>';
		});
		return list;
	}

	// 创建店铺地址列表
	function getStores(data, tpl){
		var list = '';
		data.forEach(function(item){
			list += tesla.solve(tpl, {
				provinceId: item.provinceId,
				cityId: item.cityId,
				location: item.coordinate,
				title: item.title,
				address: item.address,
				tel: item.tel_phone ? '电话：' + item.tel_phone : ''
			});
		});
		return list;
	}

	// 初始化地图
	function initMap(store) {
		map = new TeslaMap('.map', {
			center: store.coordinate,
			zoom: 14,
			addressSelector: '.store-item',
			mTitleSeletor: '.name',
			mSummarySeletor: '.addr',
			mTelSeletor: '.tel',
			markIconSrc: 'images/icons/map_marker.png',
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