var express = require('express');
var router = express.Router();

router.use(function (req,res,next){
	next();
});


router.get('/', function (req, res, next) {
	res.render('index');
});

// router.all('*', function (req, res, next) {
// 	res.send('web error!!!');
// });

module.exports = router;