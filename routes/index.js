var express = require('express');
var router = express.Router();

var ComData = require('../controller/comCtrl');
var PageCtrl = require('../controller/pageCtrl');

router.use(function (req,res,next){
	next();
});


// page

router.get('/',PageCtrl.IndexPage);
router.get('/login',PageCtrl.Login);
router.get('/register',PageCtrl.Register);


// api
router.get('/system',ComData.systemCtrl);

// router.all('*', function (req, res, next) {
// 	res.send('web error!!!');
// });

module.exports = router;