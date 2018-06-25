var WebPageCtrl = {
  IndexPage : function (req, res) {
    res.render('page/index')
  },
  RegisterPage : function (req, res) {
    res.render('page/register')
  },
  LoginWebPage : function (req, res) {
    res.render('page/login')
  },


  ErrorPage : function (req,res) {
    res.render('page/error')
  }
};

module.exports = WebPageCtrl;