/**
 * Created by Tesla on 2017/12/4/0004.
 */

// import "../fonts/iconfont/iconfont.css";
import "../scss/style.scss";
import "jquery";
import "./async_v201711171014";
import "./main";

$(function(){

	var backtotopBtn = $('.backtotop');
	backtotopBtn.on('click', function(){
		$('html, body').stop(true, false).animate({scrollTop: 0}, 450);
	});

	$(window).on('scroll', function(){
		var scrollTop = $(document).scrollTop();
		scrollTop > 300 ? backtotopBtn.fadeIn(500) : backtotopBtn.fadeOut(500);
	});

});