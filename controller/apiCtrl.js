var apiConfig = require('./apiConfig');
var PgOpr = require('../db/dbOpr');
var ApiCtrl = {
  Register : function (req,res) {
    if(!req.body || req.body == undefined){
      apiConfig.error(res,1005);
      return;
    }
    if(!req.body.user_name || req.body.user_name == ''){
      apiConfig.error(res,1007);
      return;
    }
    if(!req.body.password || req.body.password == ''){
      apiConfig.error(res,1009);
      return;
    }

    var field = [];
    var values = [];
    for(var name in req.body){
      field.push(name);
      values.push("'" + req.body[name] + "'");
    }
    var sql = "INSERT INTO user_list (" + field.join(",") + ") VALUES (" + values.join(",") + ")";

    PgOpr(res,sql,'register');
  },
  Login : function (req, res) {

  },

  UserList: function (req,res) {
    var sql = "SELECT * FROM user_list ";
    if(JSON.stringify(req.query) !== "{}"){
      // sql += " where user_id = " + req.query.id;
      var count = 1;
      sql += ' where ';
      for(var name in req.query){
        if (count == Object.keys(req.query).length){
          if(!isNaN(req.query[name])){
            sql += name + "='" + req.query[name] + "'";
          }else {
            sql += name + "=" + req.query[name]
          }

        }else {
          if(!isNaN(req.query[name])){
            sql += name + "='" + req.query[name] + "'" + " AND ";
          }else {
            sql += name + "=" + req.query[name] + " AND ";
          }
        }
        count++;

      }
    }

    PgOpr(res,sql);
  },
  UserDetail : function (req, res) {
    var sql = "SELECT * FROM user_list ";
    if(req.params.id){
      sql += " where user_id = " + req.params.id
    }
    PgOpr(res,sql);
  },
  UserDelete : function (req, res) {
    var user_id = req.body.id;
    var sql = 'delete from user_list where user_id=' + user_id;
    PgOpr(res,sql);
  },
  UserEdit : function (req, res) {
    if(JSON.stringify(req.body) == "{}"){
      apiConfig.error(res, 1005);
      return;
    }else {
      if(!req.body.user_id || req.body.user_id == ''){
        apiConfig.error(res, 1006);
        return;
      }
      var sql = "update user_list set ";
      var sqlEnd = " where user_id= " + req.body.user_id;
      var count = 1;
      for(var name in req.body){
        if(count == Object.keys(req.body).length){
          sql += name + "='" + req.body[name] + "'";

        }else {
          sql += name + "='" + req.body[name] + "',";
        }
        count++;
      }
      sql += sqlEnd;
    }
    PgOpr(res,sql);
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
    var sql = "SELECT * FROM articles where type = '1' ";
    PgOpr(res,sql);
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
};

module.exports = ApiCtrl;