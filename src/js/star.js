// import "../fonts/iconfont/iconfont.css";
import "../scss/style.scss";
import "jquery";
import "./async_v201711171014";
import "../plugs/fancybox/jquery.fancybox";
import "./main";

$(function(){

	var scroll = ScrollReveal();
	if(scroll.isSupported()){
		scroll.reveal('.plug-sr',{
			duration: 800,
			container: document.querySelector('.main-wrap')
		});
	}

});