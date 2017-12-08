/**
 * Created by Tesla on 2017/11/21/0021.
 */

import "../scss/style.scss";
import "./async_v201711171014";
import "./tesla";
import "jquery";

window.sfs = {
	api: new Async({
		rootDir: 'http://test2.yfd.com.cn/work29098'
	}),
	rootDir: 'http://test2.yfd.com.cn/work29098',
	random: function (min, max) {
		var range = max - min,
			rand = Math.random();
		return min + Math.round(range * rand);
	}
};


$(function () {

	// 预定义函数
	sfs.getDir = function (event, $container) {
		var w = $container.innerWidth(),
			h = $container.innerHeight(),
			p = $container.offset(),
			x = (event.pageX - p.left - w / 2) * (w > h ? h / w : 1),
			y = (event.pageY - p.top - h / 2) * (h > w ? w / h : 1),
			d = Math.round((((Math.atan2(y, x) * (180 / Math.PI)) + 180) / 90) + 3) % 4;
		return d;
	};

	sfs.enter = function ($mask, dir) {
		switch (dir) {
			case 0:
				$mask.css({top: "-100%", left: 0}).stop(true, true).animate({top: 0}, 350);
				break;
			case 1:
				$mask.css({top: 0, left: "100%"}).stop(true, true).animate({left: 0}, 350);
				break;
			case 2:
				$mask.css({top: "100%", left: 0}).stop(true, true).animate({top: 0}, 350);
				break;
			case 3:
				$mask.css({top: 0, left: "-100%"}).stop(true, true).animate({left: 0}, 350);
				break;
		}
	};

	sfs.out = function ($mask, dir) {
		switch (dir) {
			case 0:
				$mask.stop(true, true).animate({top: "-100%"}, 350);
				break;
			case 1:
				$mask.stop(true, true).animate({left: "100%"}, 350);
				break;
			case 2:
				$mask.stop(true, true).animate({top: "100%"}, 350);
				break;
			case 3:
				$mask.stop(true, true).animate({left: "-100%"}, 350);
				break;
		}
	};

	sfs.hideLoading = function(){
		$('.loading-gezi').fadeOut(350);
	}

	var allWrap = $('.allwrap');

	// fancybox禁用哈希
	if ($.fancybox) {
		$.fancybox.defaults.hash = false;
	}

	setTimeout(function () {
		$('.loading-gezi').fadeOut(350);
	}, 2000);

	var thirdTpl = '<li data-sign="{sign}"><a href="{link}"><span class="en">{en}</span><span class="cn">{cn}</span></a></li>';

	var navIds = [54, 57],
		navList = navIds.map(function(item){
			return sfs.api.getSubCategories(item);
		});

	Promise.all(navList).then(function(result){
		// 下载pc导航
		$('.header-pc').load('header_pc.html', function () {
			var headerPC = $('.header-pc'),
				search = $('.top .search'),
				searchInput = search.find('input'),
				campaignThird = $(this).find('.campaign-third'),
				lookbookThird = $(this).find('.lookbook-third');

			console.log('result: %o', result);
			campaignThird.html(tesla.solve(campaignThird.html(), getThird(result[0].data, 'campaign')));
			lookbookThird.html(tesla.solve(lookbookThird.html(), getThird(result[1].data, 'lookbook')));

			// 标记当前页菜单
			var url = tesla.parseUrl(),
				fileName = url.filename ? url.filename.replace(/\.html$/, '') : 'index',
				pid = url.params.id,
				cls = $('html').attr('class'),
				sign = pid ? fileName + '-' + pid : fileName;
			if (cls.indexOf(fileName) > -1) {
				var targetSelector = '.header-pc [data-sign=' + sign + ']',
					target = $(targetSelector);
				target.add(target.parents('li')).addClass('active');
				target.parents('li').siblings('li').removeClass('active');
				target.siblings('li').removeClass('active');
			}

			// pc端滚动时搜索图标点击跳转顶部搜索
			$('.bottom .search').on('click', function () {
				$('.main-wrap').stop(true, false).animate({scrollTop: 0}, 300, function () {
					searchInput.focus();
				});
			});

		});

		// 下载wap导航
		$('.header-wap').load('header_wap.html', function () {

			var campaignThird = $(this).find('.campaign-third'),
				lookbookThird = $(this).find('.lookbook-third');

			console.log('result: %o', result);
			campaignThird.html(tesla.solve(campaignThird.html(), getThird(result[0].data, 'campaign')));
			lookbookThird.html(tesla.solve(lookbookThird.html(), getThird(result[1].data, 'lookbook')));

			// 移动端btn-buger
			$('.buger').on('click', function (e) {
				var btn = $(this).find('.btn-buger');
				btn.addClass('active');
				$('.allwrap').addClass('sidenav-open');
				e.stopPropagation();
			});

			$('.allwrap-inner').on('click', function () {
				if (window.innerWidth > 991) {
					return;
				}
				if ($(this).parent().hasClass('sidenav-open')) {
					$(this).parent().removeClass('sidenav-open');
					$('.buger').find('.btn-buger').removeClass('active');
				}
			});

			$('.sidenav').on('click', function (e) {
				e.stopPropagation();
			});

			$('.sidenav').on('click', 'li', function (e) {
				var $this = $(this),
					child = $(this).children('ul'),
					siblings = $(this).siblings();
				if (child.length) {
					$(this).toggleClass('active');

					$(this).hasClass('active') ? child.slideDown() : $(this).find('li').removeClass('active').end().find('ul').slideUp();
					// child.slideToggle();
					siblings.find('ul').slideUp();
					siblings.add(siblings.find('li')).removeClass('active');
					$(this).add(siblings).find('a').each(function (index, item) {
						var ul = $(this).next('ul'),
							flag = $(this).children('.flag');
						ul.length && flag.html($(this).parent().hasClass('active') ? '-' : '+');
					});
				}
				e.stopPropagation();
			});

			// 给手机端菜单添加'+'/'-'标记
			$('.sidenav .first a').each(function () {
				var next = $(this).next('ul'),
					flag = $('<span class="flag"></span>');
				flag.html(next.length ? '+' : '-');
				$(this).prepend(flag);

				// 中文换行
				var li = $(this).parent(),
					en = $(this).children('.en'),
					cn = $(this).children('.cn');
				if (en.width() >= (li.width() / 2)) {
					li.addClass('cn-break');
				} else {
					li.removeClass('cn-break');
				}
			});

			// 标记当前页菜单
			var url = tesla.parseUrl(),
				fileName = url.filename ? url.filename.replace(/\.html$/, '') : 'index',
				pid = url.params.id,
				cls = $('html').attr('class'),
				sign = pid ? fileName + '-' + pid : fileName;
			if(cls.indexOf(fileName) > -1){
				var targetSelector = '.header-wap [data-sign=' + sign + ']',
					target = $(targetSelector);
				target.addClass('active').siblings('li').removeClass('active');
				[].slice.call(target.parents('li')).reverse().forEach(function(item){
					$(item).trigger('click');
				});
			}

		});

		function getThird(data, sign){
			var third = '', link = 'javascript:void(0);';
			data.forEach(function(item, index){
				link = index === 0 ? sign + '.html?id=' + item.id : link;
				third += tesla.solve(thirdTpl, {
					sign: sign + '-' + item.id,
					link: sign + '.html?id=' + item.id,
					en: item.title_en,
					cn: item.title
				});
			});
			return {
				link: link,
				third: third
			};
		}
	});



	// 下载footer
	$('.footer').load('footer.html', function () {
		var qrcode = $(this).find('.qrcode');
		$(this).find('.fullyear').html(new Date().getFullYear());
		$(this).on('click', '.wechat', function () {
			if (window.innerWidth < 992) {
				qrcode.fadeIn(500);
			}
		});
		qrcode.on('click', function (e) {
			$(this).fadeOut(300);
			e.stopPropagation();
		});
		$(window).on('resize', function () {
			if (this.innerWidth > 991) {
				qrcode.show();
			} else {
				qrcode.hide();
			}
		});
	});


	// 回到顶部
	var backtotopBtn = $('.backtotop');
	backtotopBtn.on('click', function () {
		$('.main-wrap').stop(true, false).animate({scrollTop: 0}, 450);
	});

	// pc端滚动变化header
	$('.main-wrap').on('scroll', function () {
		var scrollTop = $(this).scrollTop(),
			flag = window.innerWidth < 992 ? 80 : 116;

		// backtotop
		scrollTop > 300 ? backtotopBtn.fadeIn(500) : backtotopBtn.fadeOut(500);

		if (scrollTop >= flag) {
			!allWrap.hasClass('secrolled') && allWrap.addClass('secrolled');
		} else {
			allWrap.hasClass('secrolled') && allWrap.removeClass('secrolled');
		}
	});

})








