import Vue from 'vue'
import { HttpOptions } from 'vue-resource'

/**
 * @param {string} api
 * @param {string} method
 */
function serviceLogger(api, method) {
  console.debug(`[%s][%s][%s]`, new Date, api, method);
}

/**
 * Error Handler
 *
 * @param {Error} err
 */
function errorHandler(err) {
  console.warn(err);
  throw err;
}

export default {
  api: '',

  /**
   * Http Request
   *
   * @param {string} method get, post, pul, del
   * @param {string} api
   * @param {string} url
   * @param {any} data
   * @param {HttpOptions} options
   *
   * @returns {Promise<{message: string, result?}>}
   */
  request({ method = 'get', api = 'v2', url = '', data = undefined, options = {} }) {
    serviceLogger(api, method);

    return Vue.http[method.toLowerCase()](`${api}/${url}`, data, options)
      .then(res => res.body)
      .then(body => {
        let error;

        if(body instanceof Object)  {
          body = { ...body };

          let message = body.message;
          let result = body.result;

          if (typeof message === 'string')  {
            body.message = message,
            body.result = result;
          } else {
            body.message = 'SUCCESS';
            body.result = message;
          }
        }

        switch (body.message) {
          case 'SUCCESS':
          case 'ALREADY_SUCCESS':
          case 'WORK_ON_SUCCESS':
          case 'WORK_OFF_SUCCESS':
          case 'SCHEDULE_EXIST':
            return body;
          case 'LIST_EMPTY':
          case 'EMPTY_PER_PAYMENT':
          case 'EMPTY_CURRENT_SCHEDULE':
           // throw new Error('데이터가 없습니다.');
            body.result = [];
            break;
          case 'FAIL':
            throw new Error;
          case 'SERVER_ERROR':
            throw new Error('데이터 수신에 문제가 있습니다 :(');
          case 'CONTRACT_END':
            //throw new Error('계약이 종료되어 더이상 출/퇴근을 할 수 없습니다.');
            throw new Error('근무기간이 아닙니다. 출/퇴근을 할 수 없습니다.');
          case 'SCHEDULE_EMPTY':
            throw new Error('오늘은 근무일이 아닙니다.');
          case 'BNEXITS':
            throw new Error('사업자번호가 존재합니다.');
          default:
            error = new Error('데이터 수신에 문제가 있습니다 :(');
        }

        if (body.message && body.message.constructor === Array) {
          body.result = body.message.slice(0);
        }

        if(error) throw error;

        return body;
      })
      .catch(errorHandler);
  }
}
