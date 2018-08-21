var express = require('express');
var router = express.Router();
var WebPageCtrl = require('../controller/WebPageCtrl');
var ApiCtrl = require('../controller/ApiCtrl');


/*
 * 中间件
 * */
// let {ComData, Auth} = require("../middleware");
var ComData = require('../middleware/com');
var Auth = require('../middleware/auth');
var UploadMidd = require('../middleware/multer');

// 导入全局中间件
router.use(ComData);


router.use(function (req,res,next){
  next();
});

//设置跨域访问
router.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    next();
});


//webPage
router.get('/', WebPageCtrl.IndexPage);
router.get('/register', WebPageCtrl.RegisterPage);
router.get('/login', WebPageCtrl.LoginWebPage);
router.get('/user/list', WebPageCtrl.UserListPage);
router.get('/user/detail',WebPageCtrl.UserDetailPage);
router.get('/upload', WebPageCtrl.UploadPage);

// api
router.post('/api/register', ApiCtrl.Register);
router.post('/api/login', ApiCtrl.Login);
router.get('/api/loginOut', ApiCtrl.LoginOut);
router.get('/api/user/list', Auth, ApiCtrl.UserList);
router.get('/api/user/detail/:id', Auth,  ApiCtrl.UserDetail);
router.post('/api/user/delete',Auth,  ApiCtrl.UserDelete);
router.post('/api/user/edit',Auth, UploadMidd.single('file'), ApiCtrl.UserEdit);

router.post('/api/upload', UploadMidd.single('file'),  ApiCtrl.FileUpload);

router.get('/api/banner', ApiCtrl.GetBannerWeb);
// router.get('/api/personal_recommend', Auth, ApiCtrl.getPersonal);
router.get('/api/personal_recommend', ApiCtrl.getPersonal);
router.get('/api/lastest_release', ApiCtrl.getLastest);
router.get('/api/friendship_link', ApiCtrl.getFriendshipLink);
router.get('/api/technical_label', ApiCtrl.getTechnicalLabel);
router.get('/api/hot_articles', ApiCtrl.getHotArticles);




router.get('*', WebPageCtrl.ErrorPage);


module.exports = router;