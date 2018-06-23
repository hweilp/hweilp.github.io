var WebPageCtor = {
	IndexWebPage : function(req,res,next){
		res.render('index');
	},
	LoginWebPage : function(req,res,next){
		res.render('login');
	},
	ErrorPage : function (req, res, next) {
		res.render('error');
	}	
}

module.exports = WebPageCtor;