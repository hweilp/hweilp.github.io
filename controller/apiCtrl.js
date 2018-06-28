var apiConfig = require('./apiConfig');
var pgPool = require('../db/connectionPool');
var PgOpr = require('../db/dbOpr');
var fs = require('fs');


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
    if(JSON.stringify(req.body) == "{}"){
      apiConfig.error(res, 1005);
      return;
    }else {
      var userName = req.body.user_name;
      var password = req.body.password;
      pgPool.connect(function (err, client, done) {
        if (err) {
          res.send(err);
          return console.log('数据库连接出错', err);
        }
        var sql = "SELECT user_name,user_id,user_mobile,user_avatar,status from user_list where user_name='"+userName+"' and password='"+password +"'";
        console.log(sql);
        client.query(sql, function (err, result) {
          if (err) {
            apiConfig.error(res,1010)
          }else {
            if(result.rows.length == 0){
              apiConfig.error(res,1010);
              return;
            }
            var dataBase = result.rows[0];
            req.session.SESSION_ID = Date.now().toString() + dataBase.user_id;
            req.session.SESSION_USERID = dataBase.user_id;
            apiConfig.success(res,2000,dataBase)
          }
        })
      })
    }

  },
  LoginOut:function (req,res) {
    delete req.session.SESSION_ID;
    delete req.session.SESSION_USERID;
    res.clearCookie('SESSION_ID');
    req.session.destroy();
    res.redirect('/');
  },

  UserList: function (req,res) {
    var sql = "SELECT * FROM user_list ";
    if(JSON.stringify(req.query) !== "{}"){
      // sql += " where user_id = " + req.query.id;
      var count = 1;
      sql += ' where ';
      for(var name in req.query){
        if (count == Object.keys(req.query).length){
          sql += name + "='" + req.query[name] + "'";
        }else {
          sql += name + "='" + req.query[name] + "'" + " AND ";
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
    var hostPort = req.headers.origin;

    if(JSON.stringify(req.body) == "{}"){
      apiConfig.error(res, 1005);
      return;
    }else {
      if(!req.body.user_id || req.body.user_id == ''){
        apiConfig.error(res, 1006);
        return;
      }

      if(typeof req.file == "undefined"){
        console.log(2)
        for(var name in req.body){
          if(req.body[name] == 'undefined'){
            delete req.body[name];
          }
        }

        var params = req.body;
        var sql = "update user_list set ";
        var sqlEnd = " where user_id=" + req.body.user_id;
        var count = 1;
        for(var name in params){
          if(count == Object.keys(params).length){
            sql += name + "='" + params[name] + "'";
          }else {
            sql += name + "='" + params[name] + "',";
          }
          count++;
        }
        sql += sqlEnd;
        PgOpr(res,sql);
      }else {
        //获得文件的临时路径
        var tmp_path = req.file.path;

        // 指定文件上传后的目录
        var target_path = './public/upload/' + req.file.filename;

        // 移动文件
        fs.rename(tmp_path, target_path, function(err) {
          if (err) throw err;
          // 删除临时文件夹文件,
          fs.unlink(tmp_path, function () {
            if (err) throw err;

            var params = req.body;
            params.user_avatar = hostPort + "/" + req.file.path;
            var sql = "update user_list set ";
            var sqlEnd = " where user_id=" + req.body.user_id;
            var count = 1;
            for(var name in params){
              if(count == Object.keys(params).length){
                sql += name + "='" + params[name] + "'";
              }else {
                sql += name + "='" + params[name] + "',";
              }
              count++;
            }
            sql += sqlEnd;
            PgOpr(res,sql);
          });
        })
      }


    }
  },


  FileUpload: function (req, res) {

    var hostPort = req.headers.origin;
    if(!req.body.user_id || req.body.user_id == ''){
      apiConfig.error(res,1005);
      return;
    }

    //获得文件的临时路径
    var tmp_path = req.file.path;

    // 指定文件上传后的目录
    var target_path = './public/upload/' + req.file.filename;

    // 移动文件
    fs.rename(tmp_path, target_path, function(err) {
      if (err) throw err;
      // 删除临时文件夹文件,
      fs.unlink(tmp_path, function () {
        if (err) throw err;

        var sql = "update user_list set user_avatar='" + hostPort + "/" + req.file.path + "'";
        var sqlEnd = " where user_id=" + req.body.user_id;
        sql += sqlEnd;

        var fileInfo = {
          path : req.file.path,
          filename : req.file.filename,
          size : req.file.size,
          mimeType : req.file.mimetype,
          allPath : hostPort + '/' + req.file.path
        };
        PgOpr(res,sql,fileInfo);
      });
    })

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