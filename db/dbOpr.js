var client = require('./client');

var clientHelper = function (str,value,cb) {
  client.query(str,value,function(err,result){
    if(err) {
      client.end();
      if(!cb){ return err }
      cb("err");
    } else{
      client.end();

      if(!cb && result.rows != undefined){
        return result.rows
      }else if(cb && result.rows != undefined){
        cb(result.rows);
      }else {
        cb();
      }
    }
  });
};

var PG = function(){
  console.log("准备向 localhost postgres 数据库连接...");
};

PG.prototype.getConnection = function () {
  client.connect(function (err) {
    if (err) {
      return console.error('could not connect to postgres', err);
    }
    client.query('SELECT NOW() AS "theTime"', function (err, result) {
      if (err) {
        return console.error('error running query', err);
      }
      console.log("postgres 数据库连接成功...");
    });
  });
};

//查询
//@param tablename 数据表名称 ''
//@param fields 条件字段和值， {}
//@param returnfields 返回字段 []
//@param cb 回调函数
PG.prototype.select = function(tablename,fields,returnfields,cb){
  if(!tablename) return;
  var returnStr = "";
  if(returnfields.length == 0){
    returnStr = '*';
  } else {
    returnStr = returnfields.join(",");
  }
  var str = '';
  var field = [];
  var value = [];
  var count = 0;
  if(fields && fields.length > 0){
    str += "select " + returnStr + " from " + tablename  + " where ";
    for(var i in fields){
      count++;
      field.push(i+"=$"+count);
      value.push(fields[i]);
    }
    str += field.join(" and ");
  }else {
    str = "select " + returnStr + " from " + tablename
  }

  clientHelper(str,value,cb);
};

//增
//@param tablename 数据表名称
//@param fields 更新的字段和值，json格式
//@param cb 回调函数
PG.prototype.save = function(tablename,fields,cb){
  if(!tablename) return;
  var str = "insert into " + tablename + "(";
  var field = [];
  var value = [];
  var num = [];
  var count = 0;
  for(var i in fields){
    count++;
    field.push(i);
    value.push(fields[i]);
    num.push("$"+count);
  }
  str += field.join(",") +") values("+num.join(",")+")";

  // SQL语句 INSERT INTO articles(title,"desc",content,image,href) VALUES ('VUE','值。','值','images/recommend/20180530163501.jpg','https://cn.vuejs.org/v2/guide/')
  clientHelper(str,value,cb);
};

//修改
//@param tablename 数据表名称
//@param fields 更新的字段和值，json格式
//@param mainfields 条件字段和值，json格式
PG.prototype.update = function(tablename,mainfields,fields,cb) {
  if (!tablename) return;
  var str = "update " + tablename + " set ";
  var field = [];
  var value = [];
  var count = 0;
  for (var i in fields) {
    count++;
    field.push(i + "=$" + count);
    value.push(fields[i]);
  }
  str += field.join(",") + " where ";
  field = [];
  for (var j in mainfields) {
    count++;
    field.push(j + "=$" + count);
    value.push(mainfields[j]);
  }
  str += field.join(" and ");

  // var sql = "INSERT INTO user_list(name,password) VALUES ('','')";
  clientHelper(str,value,cb);
};

//删除
//@param tablename 数据表名称
//@param fields 条件字段和值，json格式
//@param cb 回调函数
PG.prototype.remove = function(tablename,fields,cb){
  if(!tablename) return;
  var str = "delete from "+tablename+" where ";
  var field = [];
  var value = [];
  var count = 0;
  for(var i in fields){
    count++;
    field.push(i+"=$" +count);
    value.push(fields[i]);
  }
  str += field.join(" and ");
  clientHelper(str,value,cb);
};

module.exports = new PG;