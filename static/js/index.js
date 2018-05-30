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

		TodayTime : function (obj) {
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
				nowDate.y = new Date().getFullYear();
				nowDate.m = new Date().getMonth()+1;
				nowDate.d = new Date().getDate();
				nowDate.h = new Date().getHours();
				nowDate.min = new Date().getMinutes();
				nowDate.sec = new Date().getSeconds();
				nowDate.week = new Date().getDay();
				return nowDate;
			},1000)
		}
	};

	//banner
	new Index.Banner();

	// 个人推荐
	new Index.Recommend($('#recommend'));

	// 友情链接
	new Index.FriendshipLink($('#link'));

	// 今日时间
	new Index.TodayTime($('#date'));
});