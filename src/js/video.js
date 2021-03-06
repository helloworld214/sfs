// import "../fonts/iconfont/iconfont.css";
import "../scss/style.scss";
import "jquery";
import "./async_v201711171014";
import "./main";

$(function(){

	var scroll = ScrollReveal();
	if(scroll.isSupported()){
		scroll.reveal('.plug-sr',{
			duration: 800,
			container: document.querySelector('.main-wrap')
		});
	}

	// banner视频
	var videoSrc = 'video/yifini2017wa.mp4';
	$('.banner').on('click', '.picbox', function(e){

		e.stopPropagation();

		var $this = $(this),
			video = $this.find('video')[0];

		if(!video){
			video = document.createElement('video');
			video.controls = true;
			$this.append(video).addClass('has-video');
		}

		$(video).on('ended', function(){
			$this.removeClass('playing').addClass('ended');
		});

		if(!video.src){
			video.src = videoSrc;
		}

		if(video.paused){
			$this.addClass('playing');
			video.play();
		}else{
			$this.removeClass('playing');
			video.pause();
		}
		$this.removeClass('ended');

	});

	// 视频列表筛选
	var oldVal;
	$('.selector').on('click', function(e){
		var $this = $(this),
			el = e.target,
			val = $this.find('.val');
		if(el.tagName === 'LI'){
			var newVal = el.getAttribute('data-val');
			if(oldVal !== newVal){
				oldVal = newVal;
				val.html(el.innerHTML).attr('data-val', newVal);
				filter(newVal);
			}
		}
	    $(this).toggleClass('active');
		e.stopPropagation();
	});

	$(document).on('click', function(){
		$('.selector').removeClass('active');
	});

	function filter(year){
		var list = $('.vdolist').find('li');
		list.hide().filter(function(){
		    return year == $(this).attr('data-year');
		}).show();
	}

	// 弹出视频播放
	var pop = $('.pop'),
		popVdoBox = pop.find('.vdobox'),
		popVdo = document.createElement('video');
	popVdoBox.append(popVdo);
	$('.vdolist').on('click', 'li', function(){
		var vdoSrc = $(this).attr('data-vdosrc');
		if(!vdoSrc){
			return false;
		}
		popVdo.src = vdoSrc;
		popVdo.controls = true;
		popVdo.play();
		pop.fadeIn(500);
	});

	pop.find('.close').on('click', function(){
		!popVdo.paused && popVdo.pause();
		pop.fadeOut(500);
	});

});