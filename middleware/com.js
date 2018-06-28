var apiConfig = require('../controller/apiConfig');
var pgPool = require('../db/connectionPool');
var ComData = function(req,res,next){
  res.locals.comData = {
    tel : 18379036732,
    QQ : 122847893
  };
  res.locals.userData = {};

  if(req.session && req.session.SESSION_ID && req.session.SESSION_USERID){
    // 查询用户信息
    pgPool.connect(function (err, client, done) {
      if (err) {
        done();
        next();
      }else {
        var sql = "SELECT user_name,user_id,user_mobile,user_avatar,status from user_list where user_id='"+ req.session.SESSION_USERID +"'";

        client.query(sql, function (err, result) {
          done();
          if (err) {
            next();
            apiConfig.error(res,1010);
          }else {
            if(result.rows.length == 0){
              next();
              apiConfig.error(res,1010);
            }else {
              res.locals.userData =  result.rows[0];
              next();
            }
          }
        })
      }

    })
  }else {
    next();
  }
};

module.exports = ComData;