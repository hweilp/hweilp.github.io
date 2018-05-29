var scrollHeight = document.body.scrollHeight; // 网页正文全文高

function CountDate(date1,date2) {
	var StartTime = date1 ? date1 : '1994-05-07';
	var EndTime = date2 ? date2 : new Date();
	var Result = {};
	var DiffSeconds = 0;

	DiffSeconds = new Date(EndTime).getTime() - new Date(StartTime).getTime();

	let date = new Date(DiffSeconds);
	Result.y = date.getFullYear();
	Result.m = date.getMonth()+1;
	Result.d = date.getDate();
	// Result.h = date.getHours();
	// Result.min = date.getMinutes();
	// Result.sec = date.getSeconds();
	console.log(DiffSeconds,Result)
}

(function () {
	// 设置中间部分最小高度
	CountDate();
	document.getElementById('main-container').style.minHeight = scrollHeight - 90 + 'px';
})(window);