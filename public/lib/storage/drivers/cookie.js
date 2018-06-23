const storage = {
  set(key, value, time = 7 * 24 * 60 * 60) {

    //开始 到期 时间
    let now = new Date();
    let exp = new Date(now.getTime() + time * 1000);

    document.cookie = key + "=" + encodeURI(value) + ";expires=" + exp.toGMTString();

    return true
  },

  get(key, refresh = true) {
    let arr, reg = new RegExp("(^| )" + key + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
      return decodeURI(arr[2]);
    else
      return null;
  },

  remove(key) {
    let exp = new Date();
    exp.setTime(exp.getTime() - 1);
    let val = storage.get(key);
    if (val !== null)
      document.cookie = key + "=" + val + ";expires=" + exp.toGMTString();
  }

}

export default storage
