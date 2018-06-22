// 使用客户端连接
var pg = require('pg');
var config = require('./dbConfig');
var conString = "postgres://" + config.user + ":" + config.password + "@" + config.host + "/" + config.database;
var client = new pg.Client(conString);


module.exports = client;

// client.connect(function(err) {
//   if(err) {
//     client.end();
//     return console.error('连接postgreSQL数据库失败', err);
//   }
//   client.query('SELECT * from user_info', function(err, data) {
//     if(err) {
//       client.end();
//       return console.error('查询失败', err);
//     }else{
//       console.log('成功data.rows ---',data.rows);
//       client.end();
//       return JSON.stringify(data.rows);
//     }
//
//   });
//
// });

