import VueResource, { Http, HttpOptions, HttpResponse } from 'vue-resource'
import moment from 'moment'

const APP_NAME = 'Shopsol'

export default ({ Vue }) => {
  let requestURL = '';

  Vue.use(VueResource)

  if (process.env.NODE_ENV !== 'development') {
    console.debug = console.warn = console.table = function () { };
    // requestURL = 'http://10.40.101.200:3000/';
    // requestURL = 'http://192.168.0.2:3000/';
    // requestURL = 'http://13.209.3.118/';
    requestURL = 'http://api.shop-sol.com/';
    // requestURL = 'http://10.40.50.44:3000/';
  }

  console.debug('DEV_MODE: %s', process.env.NODE_ENV);

  /** @type {Http} */
  let http = Vue.http;

  http.interceptors.push(
    /**
     * @param {HttpOptions} req
     * @param {Function} next
     */
    (req, next) => {
      // AppLoader.visible = true;

      let reqDate = moment(new Date).format('YYYY-MM-DD HH:mm:ss');
      // let authorizeToken = localStorage.getItem(CONSTANT.AUTHORIZE_TOKEN);

      req.url = requestURL + 'api/' + req.url;
      // req.url = 'https://shopsol-test.herokuapp.com/api/v1/' + req.url;

      // if (authorizeToken) {
        // req.headers.set('Authorization', `Bearer ${authorizeToken}`);
      // }

      console.debug(`------------------------------------ Request ------------------------------------`);
      console.debug(`[${APP_NAME}][Request][%s] url > %s`, reqDate, req.url);
      console.debug(`[${APP_NAME}][Request][%s] parmas >`, reqDate);
      console.table(req.body);
      console.table(req.params);

      // setTimeout(() => {
        // AppLoader.visible = false;
      // }, 1000 * 10);

      next(
        /** @param {HttpResponse} res */
        res => {
          // AppLoader.visible = false;

          let resDate = moment(new Date).format('YYYY-MM-DD HH:mm:ss');
          let level = 'debug';

          switch (Math.floor(res.status / 100)) {
            case 4:
            case 5:
              level = 'warn';
              break;
          }

          console[level](`------------------------------------ Response ------------------------------------`);
          console[level](`[${APP_NAME}][Response][%s] status > %s`, resDate, res.status);
          console[level](`[${APP_NAME}][Response][%s] body >`, resDate);
          console.table(res.body);
        }
      );
    }
  );
}
