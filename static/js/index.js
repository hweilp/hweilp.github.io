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
						SwiperListHtml += '<div class="swiper-slide"><a href="'+ bannerList[i].url +'"><img src="'+ bannerList[i].imgUrl +'" alt=""></a></div>'
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
							el: '.swiper-pagination',
							clickable :true
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

		TechnicalLabel : function (obj) {
			$.ajax({
				type:'get',
				url :'static/json/technical_label.json',
				dataType:'json',
				success : function (res) {
					var result = res.list;
					var Html = '';
					for ( var i = 0 ; i < result.length; i ++ ){
						Html += '<li class="fl"><a target="_blank" href="'+ result[i].url +'">' +result[i].title  + '</a></li>'
					}
					obj.html(Html);
				},
				error : function (err) {
					console.log(err)
				}
			})
		},

		HotArticles : function (obj) {
			$.ajax({
				type:'get',
				url :'static/json/hot_articles.json',
				dataType:'json',
				success : function (res) {
					var result = res.list;
					var Html = '';
					for ( var i = 0 ; i < result.length; i ++ ){
						Html += '<li><a target="_blank" href="'+ result[i].url +'">' +result[i].title  + '</a></li>'
					}
					obj.html(Html);
				},
				error : function (err) {
					console.log(err)
				}
			})
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

	// 技术标签
	new Index.TechnicalLabel($('#technical-label'));

	// 热门文章
	new Index.HotArticles($('#hot-articles'));

});