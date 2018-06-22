// 数据库配置
var config = {
  user:"postgres",
  database:"postgres",
  password:"root",
  host:'localhost',
  port:5432,
  // 扩展属性
  max:20, // 连接池最大连接数
  idleTimeoutMillis:3000 // 连接最大空闲时间 3s
};

module.exports = config;