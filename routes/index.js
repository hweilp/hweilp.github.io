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

// 导入全局中间件
router.use(ComData);


router.use(function (req,res,next){
  next();
});

//webPage
router.get('/', WebPageCtrl.IndexPage);
router.get('/register', WebPageCtrl.RegisterPage);
router.get('/login', WebPageCtrl.LoginWebPage);

// api
router.get('/api/register', ApiCtrl.Register);
router.get('/api/login', ApiCtrl.Login);
router.get('/api/banner', ApiCtrl.GetBannerWeb);
// router.get('/api/personal_recommend', Auth, ApiCtrl.getPersonal);
router.get('/api/personal_recommend', ApiCtrl.getPersonal);
router.get('/api/lastest_release', ApiCtrl.getLastest);
router.get('/api/friendship_link', ApiCtrl.getFriendshipLink);
router.get('/api/technical_label', ApiCtrl.getTechnicalLabel);
router.get('/api/hot_articles', ApiCtrl.getHotArticles);




router.get('*', WebPageCtrl.ErrorPage);


module.exports = router;