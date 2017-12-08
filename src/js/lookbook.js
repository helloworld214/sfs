// import "../fonts/iconfont/iconfont.css";
import "../scss/style.scss";
import "jquery";
import "./async_v201711171014";
import "../plugs/fancybox/jquery.fancybox";
import "./main";


$(function(){

	// grid hover
	$('.grid').on('mouseenter mouseleave', '.picbox', function (e) {
		if(window.innerWidth < 992){
			return;
		}
		var mask = $(this).find('.mask'),
			dir = sfs.getDir(e, $(this));
		e.type === 'mouseenter' ? sfs.enter(mask, dir) : sfs.out(mask, dir);
	});

	$('.main-wrap').on('scroll', function(){
		var h = $(this).height(),
			st = $(this).scrollTop(),
			gh = $('.grid-loader').height();
		if(st + gh > 2 * h){
			// $('.grid-loader').addClass('grid-loader-show');
		}else{
			// $('.grid-loader').removeClass('grid-loader-show');
		}
	});

	var scroll = ScrollReveal();
	if(scroll.isSupported()){
		scroll.reveal('.plug-sr',{
			duration: 800,
			container: document.querySelector('.main-wrap')
		});
	}
});

