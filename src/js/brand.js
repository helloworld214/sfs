/**
 * Created by Tesla on 2017/11/30/0030.
 */

import "../scss/style.scss";
import "jquery";
import "./async_v201711171014";
import "../plugs/swiper/swiper.jquery.min";
import "./main";

$(function(){

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

});