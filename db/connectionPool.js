// 连接池配置
var pg = require('pg');
var config = require('./dbConfig');

var pgPool =  new pg.Pool(config); // 创建连接池

module.exports = pgPool;

// pgPool.connect(function (err, client, done) {
//   if(err){
//     return console.log('数据库连接出错',err);
//   }
//
//   client.query('SELECT * FROM user_list',function (err,result) {
//     done();// 释放连接（将其返回给连接池）
//     if(err) {
//       return console.error('查询出错', err);
//     }else {
//       console.log(result.rows); //output: Hello World
//       return result.rows
//     }
//   })
// });


