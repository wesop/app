import service from './service'
import CONSTANT from '../models/constant'
import AppLoader from '../components/Loader'

service.api = 'app'

export default {
  setToken(token) {
    localStorage.setItem(CONSTANT.AUTHORIZE_TOKEN, token);
  },

  setDeviceToken(token) {
    localStorage.setItem(CONSTANT.DEVICE_TOKEN, token);
  },

  getDeviceToken() {
    return localStorage.getItem(CONSTANT.DEVICE_TOKEN) || '';
  },

  setKeepLogin(isKeep) {
    localStorage.setItem(CONSTANT.IS_KEEP, isKeep);
  },

  isKeepLogin() {
    return JSON.parse(localStorage.getItem(CONSTANT.IS_KEEP) || 'false');
  },

  loader: {
    show()  {
      AppLoader.visible = true;

      setTimeout(() => {
        this.hide();
      }, 10 * 1000);
    },

    hide()  {
      AppLoader.visible = false;
    }
  },
}
