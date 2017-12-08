// import "../fonts/iconfont/iconfont.css";
import "../scss/style.scss";
import "jquery";
import "./async_v201711171014";
import "./main";

$(function(){

	var jobsData = {},
		jobs = $('.jobs'),
		joblist = $('.joblist'),
		jobIntro = $('.jobintro'),
		introTpl = $('#introTpl').html();
	joblist.on('click', 'li', function(){
		var jobId = $(this).attr('data-jobcode');
		jobs.addClass('open');

	});

	jobIntro.find('.btn-close').on('click', function(){
		jobs.removeClass('open');
	});

	jobIntro.find('.btn-other').on('click', function(){
		var jobId = $(this).attr('data-jobcode');

	});

	function update(job){
		var details = '';
		jobIntro.html(details);
	}

});