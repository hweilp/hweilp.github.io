var scrollHeight = document.body.scrollHeight; // 网页正文全文高

(function () {
	// 设置中间部分最小高度
	document.getElementById('main-container').style.minHeight = scrollHeight - 90 + 'px';
})(window);