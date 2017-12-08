// import "../fonts/iconfont/iconfont.css";
import "../scss/style.scss";
import "jquery";
import "./async_v201711171014";
import "./main";

$(function(){

	var scroll = ScrollReveal();
	if(scroll.isSupported()){
		scroll.reveal('.grid-item',{
			duration: 800,
			container: document.querySelector('.main-wrap')
		});
	}

});