var Auth = function(req,res,next){
  var result = {
    code : -1,
    msg : '未登录',
    data : null
  }
  res.send(result);

  // if (!req.session.PLAT_USER || !req.session.PLAT_USER.SESSION_ID) {
  //      // 记录跳转前的地址
  //      if (req.method.toLowerCase() === 'get') {
  //          req.session.PREVENT_PATH = req.url;
  //      }
  //      return res.redirect('/login');
  //  } else {
  //      next();
  //  }

};

module.exports = Auth 