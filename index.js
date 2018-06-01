var express = require("express");          //引入express模块
var app = express();  //返回对象
var path = require("path");
var logger = require('morgan');
app.use(logger('dev')); //设置为开发者模式，显示日志
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

app.use(express.static(__dirname + "/public"));    //设置静态资源路径

// view engine setup
app.set('views', path.join(__dirname, '/public/views'));
app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());



var router = require('./routes');

app.use('/', router);

app.listen(8081);