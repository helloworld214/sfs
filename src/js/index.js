
import "../scss/style.scss";
import "jquery";
import "./async_v201711171014";
import "../plugs/swiper/swiper.jquery.min";
import "./main";

$(function(){

	var scroll = ScrollReveal();

	var p1 = sfs.api.getRecords({
			categoryId: 73,
			title_en: 1
		}),
		p2 = sfs.api.getRecord({
			id: 163,
			title_en: 1,
			video_src: 1
		}),
		p3 = sfs.api.getRecord({
			id: 159,
			title_en: 1,
		}),
		p4 = sfs.api.getRecords({
			categoryId: 144,
			pageSize: 3,
			pageIndex: 1
		});

	Promise.all([p1, p2, p3, p4]).then(function(result){

	    // part1
		writePart1(result[0].data);

		// part2
		writePart2(result[1].data[0]);

		// part3
		writePart3(result[2].data[0]);

		// part4
		writePart4(result[3].data);

		// scroll show item
		if(scroll.isSupported()){
			scroll.reveal('.plug-sr',{
				duration: 800,
				container: document.querySelector('.main-wrap')
			});
		}

		// hide loading
		sfs.hideLoading();

	});

	function writePart1(data){
		var part1 = $('.banner .swiper-container'),
			imgBox = part1.find('.swiper-wrapper'),
			txtBox = part1.find('.textbox'),
			slideTpl = imgBox.html(),
			txtTpl = txtBox.html(),
			slide = '',
			text = '';
		data.forEach(function(item, index){
			slide += tesla.solve(slideTpl, {
				img: tesla.createElement('img', {src: sfs.rootDir + item.img_url}, 1)
			});
			if(index === 0){
				text = tesla.solve(txtTpl, {
					en: item.title_en,
					cn: item.title
				});
			}
		});
		imgBox.html(slide);
		txtBox.html(text);
		var bannerSwiper = new Swiper ('.banner-swiper', {
			loop: true,
			effect: 'fade',
			speed: 1500,
			autoplay: 4500
		});
	}

	function writePart2(data){
		var videoSrc = sfs.rootDir + data.video_src,
			part2 = $('.video .content'),
			html = tesla.solve(part2.html(), {
				img: tesla.createElement('img', {src: sfs.rootDir + data.img_url}, 1),
				en: data.title_en,
				cn: data.title
			});
		part2.html(html);

		var videobox = $('.videobox'),
			video = videobox.find('video')[0];

		if(!video){
			video = document.createElement('video');
			videobox[0].appendChild(video);
		}
		video.src = videoSrc;
		videobox.add(video).on('click', function(){
			if(video.paused){
				videobox.addClass('playing');
				video.play();
			}else{
				videobox.removeClass('playing');
				video.pause();
			}
		});

	}

	function writePart3(data){
		var part3 = $('.haute'),
			html = tesla.solve(part3.html(), {
				img: tesla.createElement('img', {src: sfs.rootDir + data.img_url}, 1),
				en: data.title_en,
				cn: data.title,
				summary: data.zhaiyao
			});
		part3.html(html);
	}

	function writePart4(data){
		var part4 = $('.list ul'),
			list = '';
		data.forEach(function(item, index){
			var link, category;
			switch (index){
				case 0:
					link = 'news.html?id=' + item.id;
					category = 'News';
					break;
				case 1:
					link = 'star.html';
					category = 'Star';
					break;
				case 2:
					link = 'storeimage.html';
					category = 'Stores';
					break;
			}
			list += tesla.solve(part4.html(), {
				link: link,
				category: category,
				img: tesla.createElement('img', {src: sfs.rootDir + item.img_url}, 1),
				title: item.title
			});
		});
		part4.html(list);
	}



	//
	// setSrc();
	// $(window).on('reszie', setSrc);
	//
	// function setSrc(){
	//     var imgs = $('.swiper-container .picbox img');
	// 	imgs.each(function(){
	// 	    var src = $(this).attr('src');
	// 	    src = window.innerWidth < 768 ? src.replace('pic', 'wap_pic') : src;
	// 	    $(this).attr('src', src);
	// 	});
	// }


});
