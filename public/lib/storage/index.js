import cookie from './drivers/cookie'
import localStorage from './drivers/localStorage'


let storage = {}


//判断本地存储容器  localStorage > cookie
function checkDriver() {
  if (window.Storage && window.localStorage && window.localStorage instanceof Storage) {
    // ....
    storage.driver = localStorage;
    Object.assign(storage, localStorage);
    return;
  }

  if (window.navigator.cookieEnabled) {
    storage.driver = cookie;
    Object.assign(storage, cookie);
    return;
  }

  return new Error('没有合适的本地存储介质');

}

checkDriver();

export default storage

