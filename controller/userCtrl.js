var connectionPool = require('../db/connectionPool');

var userCtrl = {
  register : function(req,res){

    var pgSql = "select * from user_info where age = '11' ";

    connectionPool.connect(function (err, client, done) {
      if(err){
        console.log('数据库连接出错',err);
        done();
      }
      client.query(pgSql,function (err,result) {
        if(err) {
          done();// 释放连接（将其返回给连接池）
          console.error('添加出错', err);
        }else {
          done();// 释放连接（将其返回给连接池）
          res.send(result.rows);
        }
      })
    });

  }
};

module.exports = userCtrl;