import Vue from 'vue'
import { Http, HttpOptions, HttpResponse } from 'vue-resource'
import moment from 'moment'

import service from './service'
import { ValidatorControl, Validators } from './validator'
import Store from '../models/store'
import StoreSchedule from '../models/store-schedule'
import Emp from '../models/emp'

service.api = 'management'

const managementService = {
  /**
   * 년/월별 매장의 일정 조회
   *
   * @param {string} storeSeq
   * @param {number} year
   * @param {number} month
   *
   * @returns {Promise<StoreSchedule[]>}
   */
  getStoreSchedules(storeSeq, year, month) {
    return service.request({
      url: `management/month_lists?STORE_ID=${storeSeq}&YEAR=${year}&MONTH=${month}`,
    })
    .then(body => body.result)
    .catch(err => { throw err });
  },

  /**
   * 년/월별 직원의 일정 조회
   *
   * @param {string} storeSeq
   * @param {string} empSeq
   * @param {number} year
   * @param {number} month
   *
   * @returns {Promise<StoreSchedule[]>}
   */
  getEmpSchedules(storeSeq, empSeq, year, month) {
    return service.request({
      url: `management/per_month_lists?STORE_ID=${storeSeq}&EMP_ID=${empSeq}&YEAR=${year}&MONTH=${month}`,
    })
    .then(body => body.result)
    .catch(err => { throw err });
  },

  /**
   * (점장 API) 출근한 시간과 퇴근한 시간 강제 업데이트
   *
   * @param {string} storeSeq 매장 아이디
   * @param {string} schId   직원의 해당한 날의 스케쥴 아이디
   * @param {string} empSeq   직원 아이디
   * @param {string} year     연도 (YY)
   * @param {string} month    월 (mm)
   * @param {string} start Changed attendance time (hh:ii:ss)
   * @param {string} end Changed work off time (hh:ii:ss)
   * @param {string} type 0: QR 수정, 1: 출퇴근 시간 수정
   *
   * @returns {Promise<any>}
   */
  updateAttendanceWorkOffTime(storeSeq, schId, empSeq, year, month, start, end, type,status) {
    return service.request({
      method: 'post',
      url: `management/update`,
      data: {
        STORE_ID: storeSeq,
        SCH_ID: schId,
        EMP_ID: empSeq,
        YEAR: year,
        MONTH: month,
        START: start,
        END: end,
        TYPE: type,
       STATUS: status,
      },
    })
    .then(body => body)
    .catch(err => { throw err });
  },

  /**
   * (점장 API) 예정 출근일 생성하기
   *
   * @param {string} storeSeq 매장 아이디
   * @param {string} empSeq   직원 아이디
   * @param {string} empName   직원 이름
   * @param {string} storeName   매장 이름
   * @param {Date} date     년-월-일
   * @param {string} start 출근 시간(hh:ii:ss)
   * @param {string} end 퇴근 시간(hh:ii:ss)
   *
   * @returns {Promise<any>}
   */
  createSchedule(storeSeq, empSeq, empName, storeName, date, start, end,scheduletype,TYPE) {
    return service.request({
      method: 'post',
      url: `management/schedule_create`,
      data: {
        STORE_ID: storeSeq,
        EMP_ID: empSeq,
        EMP_NAME: empName,
        STORE_NAME: storeName,
        DATE: moment(date).format('YYYY-MM-DD'),
        START: start,
        END: end || '',
        SCHEDULETYPE: scheduletype || '0',
        TYPE : TYPE || '0'
      },
    })
    .then(body => body)
    .catch(err => { throw err });
  },

  /**
   * (점장 API) 예정 출근일 수정하기
   *
   * @param {string} storeSeq 매장 아이디
   * @param {string} schId   일정 아이디
   * @param {Date} date     년-월-일
   * @param {string} start 출근 시간(hh:ii:ss)
   * @param {string} end 퇴근 시간(hh:ii:ss)
   *
   * @returns {Promise<any>}
   */
  updateSchedule(storeSeq, schId, date, start, end) {
    return service.request({
      method: 'post',
      url: `management/schedule_update`,
      data: {
        STORE_ID: storeSeq,
        SCH_ID: schId,
        DATE: moment(date).format('YYYY-MM-DD'),
        START: start,
        END: end
      },
    })
    .then(body => body.result)
    .catch(err => { throw err });
  },
}

export default managementService;
