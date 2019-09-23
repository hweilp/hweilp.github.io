var scrollHeight = document.body.scrollHeight; // 网页正文全文高

(function () {
	// 设置中间部分最小高度
	document.getElementById('main-container').style.minHeight = scrollHeight - 90 + 'px';

  var Index = {

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
        nowDate.month = Number(new Date().getMonth()+1)  < 10 ? "0" + Number(new Date().getMonth()+1): new Date().getMonth()+1;
        nowDate.day = Number(new Date().getDate()) < 10 ? "0" + new Date().getDate() : new Date().getDate();
        nowDate.hours = Number(new Date().getHours()) < 10 ? "0" + new Date().getHours() : new Date().getHours();
        nowDate.min = Number(new Date().getMinutes()) < 10 ? "0" + new Date().getMinutes() : new Date().getMinutes();
        nowDate.sec = Number(new Date().getSeconds()) < 10 ? "0" + new Date().getSeconds() : new Date().getSeconds();
        nowDate.week = new Date().getDay();

        if(type == 'date'){
          obj.find('#year').html(nowDate.year);
          obj.find('#month').html(nowDate.month);
          obj.find('#day').html(nowDate.day);
        }
        if(type == 'time'){
          obj.find('#hours').html(nowDate.hours);
          obj.find('#min').html(nowDate.min);
          obj.find('#sec').html(nowDate.sec);
        }
        if(type == 'week'){
          obj.find('#weekdays').html( weekdays[nowDate.week]);
        }
        return nowDate;
      },1000)
    },

    Calendar : function (obj,params) {
      var ObjEl = obj ? obj : $('#calendar');
      var  Params =  params ? params : {
        setYear : new Date().getFullYear(),
        setMonth : Number(new Date().getMonth()+1),
        selectDate: 'each-each-each'
      };
      ObjEl.flexoCalendar(Params);
    }
  };

  // 日期
  new Index.TodayTime($('#date'),'date');
  // 今日时间
  new Index.TodayTime($('#time'),'time');
  // 今日星期
  new Index.TodayTime($('#week'),'week');

  // 日历
  new Index.Calendar();
})(window);