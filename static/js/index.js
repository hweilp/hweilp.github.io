$(document).ready(function () {
	var Index = {
		Banner : function () {
			$.ajax({
				type : 'get',
				url  : 'static/json/banner.json',
				success : function (res) {
					var bannerList = res.banner_list;
					var SwiperListHtml = '';
					for (var i = 0; i < bannerList.length; i++){
						SwiperListHtml += '<div class="swiper-slide"><a href="'+ bannerList[i].url +'"><img src="'+ bannerList[i].imgUrl +'" alt="' + bannerList[i].title  +'"></a></div>'
					}


					$('.swiper-wrapper').html(SwiperListHtml);
					var mySwiper = new Swiper('.swiper-container', {
						autoplay: true,//可选选项，自动滑动
						preventClicks : true,
						loop : true, // 循环
						navigation: {
							nextEl: '.swiper-button-next',
							prevEl: '.swiper-button-prev'
						},
						pagination: {
							el: '.swiper-pagination'
						}
					})
				},
				error : function (err) {
					console.log(err)
				}
			})
		},
		Recommend : function (obj) {
			$.ajax({
				type:'get',
				url :'static/json/personal_recommend.json',
				success : function (res) {
					var result = res.list;
					var Html = '';
					for ( var i = 0 ; i < result.length; i ++ ){
						Html += '<li class="fl">' +
								'<a target="_blank" href="'+ result[i].url +'">' +
									'<img src="'+ result[i].imgUrl +'" alt="">' +
									'<div class="text">' +
										'<h3>'+ result[i].title +'</h3>' +
										'<p>'+ result[i].desc +'</p>' +
									'</div>' +
								'</a>' +
							'</li>'
					}
					obj.html(Html);
				},
				error : function (err) {

				}
			})

		},

		LatestRelease : function(obj){
			$.ajax({
				type:'get',
				url :'static/json/lastest_release.json',
				success : function (res) {
					var result = res.list;
					var Html = '';
					for ( var i = 0 ; i < result.length; i ++ ){
						Html += '<li>' +
							'<a class="clear-fix" target="_blank" href="'+ result[i].url +'">' +
							'<img class="fl" src="'+ result[i].imgUrl +'" alt="">' +
							'<div class="text fr">' +
							'<h3>'+ result[i].title +'</h3>' +
							'<p class="desc">'+ result[i].desc +'</p>' +
							'<p class="date">'+ result[i].date +'</p>' +
							'</div>' +
							'</a>' +
							'</li>'
					}
					obj.html(Html);
				},
				error : function (err) {

				}
			})
		},

		FriendshipLink : function (obj) {
			$.ajax({
				type:'get',
				url :'static/json/friendship_link.json',
				success : function (res) {
					var result = res.list;
					var Html = '';
					for ( var i = 0 ; i < result.length; i ++ ){
						Html += '<li class="fl"><a target="_blank" href="'+ result[i].url +'">' +result[i].title  + '</a></li>'
					}
					obj.html(Html);
				},
				error : function (err) {}
			})
		},

		TodayTime : function (obj,type) {
			var weekdays = ["日","一","二","三","四","五","六"];

			var nowDate = {
				year : '',
				month : '',
				day : '',
				hours : '',
				min : '',
				sec : '',
				week : ''
			};

			setInterval(function () {
				nowDate.year = new Date().getFullYear();
				nowDate.month = new Date().getMonth()+1  > 10 ? "0" + new Date().getMonth()+1: new Date().getMonth()+1;
				nowDate.day = Number(new Date().getDate()) < 10 ? "0" + new Date().getDate() : new Date().getDate();
				nowDate.hours = Number(new Date().getHours()) < 10 ? "0" + new Date().getHours() : new Date().getHours();
				nowDate.min = Number(new Date().getMinutes()) < 10 ? "0" + new Date().getMinutes() : new Date().getMinutes();
				nowDate.sec = Number(new Date().getSeconds()) < 10 ? "0" + new Date().getSeconds() : new Date().getSeconds();
				nowDate.week = new Date().getDay();

				var Html = '';
				if(type == 'date'){
					Html = nowDate.year + '年' + nowDate.month + '月' + nowDate.day + '日'
				}
				if(type == 'time'){
					Html = nowDate.hours + '时' + nowDate.min + '分' + nowDate.sec + '秒'
				}
				if(type == 'week'){
					Html = '星期' + weekdays[nowDate.week]
				}
				obj.html(Html);
				return nowDate;
			},1000)
		}
	};

	//banner
	new Index.Banner();

	// 个人推荐
	new Index.Recommend($('#recommend'));

	// 最新发布
	new Index.LatestRelease($('#latest-release'));

	// 友情链接
	new Index.FriendshipLink($('#link'));

	// 日期
	new Index.TodayTime($('#date'),'date');
	// 今日时间
	new Index.TodayTime($('#time'),'time');
	// 今日星期
	new Index.TodayTime($('#week'),'week');
});