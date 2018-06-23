const storage = {
  set(key, value, time = 7 * 24 * 60 * 60) {

    //开始 持续 时间
    let now = new Date();

    let duration = time * 1000;

    let target = {
      data: value,
      beginTime: now,
      duration: duration
    };

    localStorage.setItem(key, JSON.stringify(target));

    return true

  },

  get(key, refresh = true) {
    let data = localStorage.getItem(key);

    if (!data) {
      return null
    }

    let dataObj = JSON.parse(data);

    let beginTime = new Date(dataObj.beginTime);
    let duration = dataObj.duration;

    //内容已超时
    if (new Date().getTime() - duration > beginTime.getTime()) {
      storage.remove(key)
      return null;
    }

    if (refresh) {
      storage.set(key, dataObj.data, duration / 1000)
    }

    return dataObj.data
  },

  remove(key) {
    localStorage.removeItem(key);
  },
  removeAll(){
    localStorage.clear();
  }

}

export default storage
