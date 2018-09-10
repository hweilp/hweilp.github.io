var apiConfig = {
  results : {
    code : 2000,
    data : {},
    msg : '成功'
  },
  successTips : {
    com : {
      successCode : 2000,
      msg : '成功'
    },
    register : {
      successCode : 2001,
      msg : '注册成功'
    },
    login : {
      successCode : 2002,
      msg : '登录成功'
    }
  },
  errTips : {
    dataBase : {
      errCode:1000,
      code : 400,
      msg:'数据库连接失败'
    },
    acPwErr : {
      errCode:1010,
      code : 4000,
      msg:'账号或密码错误'
    },
    noAuth : {
      errCode:1001,
      code : 4001,
      msg : '未登录'
    },
    notFind : {
      errCode:1002,
      code : 4004,
      msg : '服务器错误'
    },
    errMethod : {
      errCode : 1003,
      code : 4005,
      msg : '请求方法错误'
    },
    outTime : {
      errCode : 1004,
      code : 4008,
      msg : "请求超时"
    },
    noParams : {
      errCode : 1005,
      code : 4000,
      msg : '请输入参数'
    },
    params : {
      errCode : 1006,
      code : 4000,
      msg : '请输入正确的参数'
    },
    userName :{
      errCode : 1007,
      code : 4000,
      msg : '请输入用户名'
    },
    repeatUserName : {
      errCode : 1008,
      code : 4000,
      msg : '用户名重复'
    },
    password : {
      errCode : 1009,
      code : 4000,
      msg : '请输入密码'
    }
  },

  success: function (res,successCode,dataBase) {
    //params  res 请求返回 successCode(number) 成功代码 dataBase 数据库数据

    // 设定默认返回数据
    apiConfig.results.data = {};
    apiConfig.results.msg = apiConfig.successTips.com.msg;
    if(successCode){
      for(var name in apiConfig.successTips){
        if(successCode == apiConfig.successTips[name].successCode){
          apiConfig.results.code = apiConfig.successTips[name].successCode;
          apiConfig.results.msg = apiConfig.successTips[name].msg;
        }
      }
    }
    if(dataBase){
      apiConfig.results.data = dataBase;
    }
    res.status(200);
    res.send(apiConfig.results);
  },

  error : function (res, errCode, err) {
    //params  res 请求返回 errCode(number) 错误代码 err 数据库连接错误

    // 设定默认返回数据
    apiConfig.results.data = {};
    apiConfig.results.msg = apiConfig.errTips.notFind.msg;
    apiConfig.results.code = apiConfig.errTips.notFind.code;

    if(errCode){
      for(var name in apiConfig.errTips){
        if(errCode == apiConfig.errTips[name].errCode){
          apiConfig.results.code = apiConfig.errTips[name].code;
          apiConfig.results.msg = apiConfig.errTips[name].msg;
        }
      }
    }
    if (err.routine === '_bt_check_unique') {
      if (err.detail.indexOf('user_mobile') !== -1) {
        apiConfig.results.msg = '手机号重复'
      }
    }
    res.status(200);
    res.send(apiConfig.results);
  }
};

module.exports = apiConfig;