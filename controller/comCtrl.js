var connectionPool = require('../db/connectionPool');

var comCtrl = {
  systemCtrl : function(req,res){
    // 'SELECT * from user_info'  查询表
    // "select * from user_info where age = '11' " 条件查询
    var pgSql = "select * from user_info where age = '11' and sex = 'f'";

    connectionPool.connect(function (err, client, done) {
      if(err){
        console.log('数据库连接出错',err);
        done();
      }
      client.query(pgSql,function (err,result) {
        if(err) {
          done();// 释放连接（将其返回给连接池）
          console.error('查询出错', err);
        }else {
          done();// 释放连接（将其返回给连接池）
          res.send(result.rows);
        }
      })
    });

  }
};

module.exports = comCtrl;