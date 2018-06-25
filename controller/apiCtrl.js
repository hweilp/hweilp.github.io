var pgPool = require('../db/connectionPool');
var apiConfig = require('./apiConfig');
apiConfig.results.data = {}; // 清空data
var ApiCtrl = {
  Register : function (req,res) {
    if(!req.body){
      apiConfig.results.msg = apiConfig.errTips.noParams;
      apiConfig.results.code = 500;
      res.send(apiConfig.results);
      return;
    }
    if(!req.body.user_name || req.body.user_name == ''){
      apiConfig.results.msg = apiConfig.errTips.userName;
      apiConfig.results.code = 500;
      res.send(apiConfig.results);
      return;
    }
    if(!req.body.password || req.body.password == ''){
      apiConfig.results.msg = apiConfig.errTips.password;
      apiConfig.results.code = 500;
      res.send(apiConfig.results);
      return;
    }
    var field = '';
    var values = '';
    for(var name in req.body){
      if(name == req.body.length){
        field += name;
        values += req.body[name];
      }else {
        field += name + ',';
        values += req.body[name] + ',';
      }

    }

    // INSERT INTO user_list(user_name,password) VALUES ('天命星','123456')
    var sql = "INSERT INTO user_list(" + field + ") VALUES (" + values + ")";

    pgPool.connect(function (err, client, done) {
      if(err){
        return console.log('数据库连接出错',err);
      }
      console.log(sql)

      client.query(sql,function (err,result) {
        if(err) {
          console.log(err);
          apiConfig.results.code = 500;
          apiConfig.results.msg = apiConfig.errTips.params;
          res.send(apiConfig.results);
          done();// 释放连接（将其返回给连接池）
        }else {
          apiConfig.results.msg =  '注册成功,请登录!!!';
          res.send(apiConfig.results);
          done();// 释放连接（将其返回给连接池）
        }
      })
    });
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

    pgPool.connect(function (err, client, done) {
      if(err){
        return console.log(apiConfig.errTips.dataBase,err);
      }

      client.query("SELECT * FROM articles where type = '1' ",function (err,result) {
        done();// 释放连接（将其返回给连接池）
        if(err) {
          res.send(apiConfig.results);
          return console.error(apiConfig.errTips.password, err);
        }else {
          apiConfig.results.data.list = result.rows;
          res.send(apiConfig.results);
        }
      })
    });

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