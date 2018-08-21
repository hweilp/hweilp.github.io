var express = require("express")          //引入express模块
var app = express()  //返回对象
var path = require("path")
var logger = require('morgan')
app.use(logger('dev')) //设置为开发者模式，显示日志
var favicon = require('serve-favicon')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var session = require('express-session')
var RedisStore = require('connect-redis')(session)

// 使用 session 中间件
app.use(cookieParser())
var redisConfig = {
  host: '127.0.0.1',
  port: '6379',
  pass: "",
  db: 1,
  ttl: 1800,
  logErrors: true
}
app.use(session({
  secret: 'secret', // 对session id 相关的cookie 进行签名
  resave: true,
  rolling: true,
  saveUninitialized: false, // 是否保存未初始化的会话
  name: "SESSION_ID", // 设置 session 名
  store: new RedisStore(redisConfig),
  cookie: {
    maxAge : 1000  * 60 * 60 * 2  // 设置 session 的有效时间，单位毫秒 毫秒 * 秒 * 分 * 时 1000  * 60 * 60 * 2 两小时
  }
}))

require('babel-register')

app.use(express.static(__dirname + "/public"))    //设置静态资源路径

// view engine setup
app.set('views', path.join(__dirname, '/public/views')) // 配置页面路径
app.engine('.html', require('ejs').__express)
app.set('view engine', 'html') // 配置文件后缀名

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))



var router = require('./routes')

app.use('/', router)

app.listen(8081,function () {
  console.log('服务已启动 端口8081!!!')
})