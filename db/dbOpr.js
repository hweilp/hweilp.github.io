var pgPool = require('../db/connectionPool');
var apiConfig = require('../controller/apiConfig');

// 数据库操作函数
var PgOpr = function (res,sql,oprCode) {
  // params res response 请求返回函数  sql postgres数据库查询语句 oprCode 操作代码

  pgPool.connect(function (err, client, done) {
    if(err){
      res.send(err);
      return console.log('数据库连接出错',err);
    }
    client.query(sql,function (err,result) {
      if(err) {
        // console.log(err);
        if(err.detail.indexOf('user_name') != -1 && err.routine.indexOf('unique')){
          apiConfig.error(res,1008);
        }else {
          apiConfig.error(res);
        }
        done(); // 释放连接（将其返回给连接池）
      }else {
        // console.log(result);
        if(oprCode){
          // 特别操作 根据对数据库操作 确定返回数据
          if(oprCode == 'register'){
            apiConfig.success(res,2001);
          }
        }else{
          // result.command 操作类型 select 查询 INSERT 添加数据
          if(result.command == 'SELECT'){
            var dataBase = {
              list : result.rows,
              page : {}
            };
            apiConfig.success(res,2000,dataBase);
          }else {
            apiConfig.success(res,2000);
          }

        }
        done();
      }
    })
  });
};

module.exports = PgOpr;