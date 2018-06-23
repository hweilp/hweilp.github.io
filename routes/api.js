var express = require('express');
var router = express.Router();
var WebPageCtor = require('../controller/WebPageCtor');
var ApiCtor = require('../controller/ApiCtor');

/*
 * 中间件
 * */
let {ComData, Auth} = require("../middleware");

// 导入全局中间件
router.use(ComData);


router.use(function (req,res,next){   
    next();
})

//webPage
router.get('/', WebPageCtor.IndexWebPage);
router.get('/login', WebPageCtor.LoginWebPage);

// api
router.get('/banner', ApiCtor.GetBannerWeb);
router.get('/personal_recommend', Auth, ApiCtor.getPersonal);
router.get('/lastest_release', ApiCtor.getLastest);
router.get('/friendship_link', ApiCtor.getFriendshipLink);
router.get('/technical_label', ApiCtor.getTechnicalLabel);
router.get('/hot_articles', ApiCtor.getHotArticles);




router.get('*', WebPageCtor.ErrorPage);


module.exports = router;