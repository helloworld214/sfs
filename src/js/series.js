
import "../scss/style.scss";
import "jquery";
import "./async_v201711171014";
import "./masonry.pkgd.min";
import "../plugs/fancybox/jquery.fancybox";
import "../plugs/swiper/swiper.jquery.min";
import "./main";

$(window).on('load', function(){

	// var bannerSwiper = new Swiper ('.banner-swiper', {
	// 	loop: true,
	// 	// effect: 'fade',
	// 	speed: 1500,
	// 	autoplay: 4500
	// });

	var scroll = ScrollReveal();
	if(scroll.isSupported()){
		scroll.reveal('.plug-sr',{
			duration: 800,
			container: document.querySelector('.main-wrap')
		});
	}

	$('.grid').masonry({
		itemSelector: '.grid-item',
		columnWidth: '.grid-item',
		gutter: 0,
		percentPosition: true,
		isAnimated: true
	});

});