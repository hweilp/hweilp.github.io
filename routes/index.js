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
router.get('/banner', ApiCtrl.GetBannerWeb);
router.get('/personal_recommend', Auth, ApiCtrl.getPersonal);
router.get('/lastest_release', ApiCtrl.getLastest);
router.get('/friendship_link', ApiCtrl.getFriendshipLink);
router.get('/technical_label', ApiCtrl.getTechnicalLabel);
router.get('/hot_articles', ApiCtrl.getHotArticles);




router.get('*', WebPageCtrl.ErrorPage);


module.exports = router;