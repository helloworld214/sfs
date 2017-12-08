// import "../fonts/iconfont/iconfont.css";
import "../scss/style.scss";
import "jquery";
import "./async_v201711171014";
import "./masonry.pkgd.min";
import "./main";

$(window).on('load', function () {

	var scroll = ScrollReveal();
	if(scroll.isSupported()){
		scroll.reveal('.grid-link',{
			duration: 800,
			container: document.querySelector('.main-wrap')
		});
	}

	var grid = $('.grid');
	var hasFormat = false,
		screen = 'pc';

	uniteItemHeight();
	formatTextBox();
	grid.masonry({
		itemSelector: '.grid-item',
		columnWidth: '.grid-item',
		gutter: 0,
		percentPosition: true,
		isAnimated: true
	});


	$(window).on('resize', function(){
		uniteItemHeight();
		formatTextBox();
	});

	// 按照平面规律定位textbox：'rrlrrllrrllrrllrrllrr...'
	function formatTextBox(){
		var flag = window.innerWidth > 1280,
			start = flag ? 2 : -1,
			list = grid.find('li'),
			special = list.filter(function () {
				return $(this).index() <= start;
			}),
			normal = list.filter(function () {
				return $(this).index() > start;
			});
		screen = flag ? screen : 'wap';
		list.removeClass('tl tr');
		special.each(function(index){
			$(this).addClass(index === 0 || index === 1 ? 'tr' : 'tl');
		});
		normal.each(function (index) {
			var num = flag ? Math.floor(index / 2) : index;	// 1280以上每隔两个换一次样式
			$(this).addClass(num % 2 === 0 ? 'tr' : 'tl');
		});
	}

	function uniteItemHeight(){
		if(window.innerWidth < 768){
			return;
		}
		var flag = window.innerWidth > 1280,
			items = grid.find('li'),
			hs = [], min = 0;
		items.each(function(){
			$(this).css('height', 'auto');
			hs.push($(this).height());
		});
		min = Math.floor(Math.min.apply(null, hs));
		items.each(function(index){
			$(this).css('height', (flag && index === 0) ? 2 * min : min);
		});
	}

});