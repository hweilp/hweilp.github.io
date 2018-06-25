var ApiCtrl = {
  Register : function (req,res) {

  },
  Login : function (req, res) {

  },
  GetBannerWeb : function(req,res,next){
    var result = {
      code : 200,
      msg : '数据获取成功了',
      data : require('../public/json/banner.json')
    };
    res.send(result);
  },
  getPersonal : function(req,res,next){
    var result = {
      code : 200,
      msg : '数据获取成功',
      data : require('../public/json/personal_recommend.json')
    };
    res.send(result);
  },
  getLastest : function(req,res,next){
    var result = {
      code : 200,
      msg : '数据获取成功',
      data : require('../public/json/lastest_release.json')
    };
    res.send(result);
  },
  getFriendshipLink : function(req,res,next){
    var result = {
      code : 200,
      msg : '数据获取成功',
      data :  require('../public/json/friendship_link.json')
    };
    res.send(result);
  },
  getTechnicalLabel : function(req,res,next){
    var result = {
      code : 200,
      msg : '数据获取成功',
      data : require('../public/json/technical_label.json')
    };
    res.send(result);
  },
  getHotArticles : function(req,res,next){
    var result = {
      code : 200,
      msg : '数据获取成功',
      data :  require('../public/json/hot_articles.json')
    };
    res.send(result);
  },
}

module.exports = ApiCtrl;