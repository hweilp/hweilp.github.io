var apiConfig = require('../controller/apiConfig');
var Auth = function(req,res,next){
  console.log(req.cookies)
  if (!req.session.SESSION_ID) {
    if (req.method.toLowerCase() === 'get') {
      if(req.url.indexOf('api') != -1){
        apiConfig.error(res,1001);
      }else {
        req.session.PREVENT_PATH = req.url;
        res.redirect('/login');
      }
    }else {
      apiConfig.error(res,1001)
    }
  } else {
    next();
  }

};

module.exports = Auth 