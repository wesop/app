import moment from 'moment'

import service from './service'
import scheduleService from '../services/schedule'
import { ValidatorControl, Validators } from './validator'
import Emp from '../models/emp'
import EmpSchedule from '../models/emp-schedule'

/**
 * @typedef PayData
 * @property {number} pay
 * @property {number} payment
 * @property {string} start HH:mm:ss
 * @property {string} end HH:mm:ss
 * @property {string} case 'A' | 'B' | 'D'
 * @property {number} day_payment
 * @property {number} night_payment
 * @property {number} basic_payment
 * @property {number} miner_payment
 */

service.api = 'emp'

export default {
  /**
   * Request Join
   *
   * @param {string} storeSeq
   *
   * @returns {Promise<boolean>}
   */
  requestJoin(storeSeq) {
    return service
      .request({
        method: 'post',
        url: `employee/request_join`,
        data: { STORE_SEQ: storeSeq }
      })
      .then(body => body)
      .catch(err => {
        throw err;
      });
  },

  /**
   * Allow Join
   *
   * @param {string} storeSeq
   * @param {string} empSeq
   *
   * @returns {Promise<boolean>}
   */
  allowJoin(storeSeq, empSeq) {
    return service
      .request({
        method: 'post',
        url: `employee/allow_join`,
        data: { STORE_SEQ: storeSeq, EMP_SEQ: empSeq }
      })
      .then(body => body)
      .catch(err => {
        throw err;
      });
  },

  /**
   * Reject Join
   *
   * @param {string} storeSeq
   * @param {string} empSeq
   *
   * @returns {Promise<boolean>}
   */
  rejectJoin(storeSeq, empSeq) {
    return service
      .request({
        method: 'post',
        url: `employee/reject_join`,
        data: { STORE_SEQ: storeSeq, EMP_SEQ: empSeq }
      })
      .then(body => body)
      .catch(err => {
        throw err;
      });
  },
  getEmpStackpay( empSeq,day,store) {
    return service
      .request({
        method: 'post',
        url: `employee/getEmpStackpay`,
        data: {  EMP_SEQ: empSeq ,STORE_SEQ: store ,DAY: day }
      })
      .then(body => body.result)
      .catch(err => {
        throw err;
      });
  },
  
  /**
   * 직원 정보 조회
   *
   * @param {string} empSeq
   *
   * @returns {Promise<Emp>}
   */
  get(empSeq) {
    return service
      .request({
        method: 'get',
        url: `employee/get?EMP_SEQ=${empSeq}`
      })
      .then(body => body.result)
      .catch(err => {
        throw err;
      });
  },
  get2(empSeq) {
    return service
      .request({
        method: 'get',
        url: `employee/get2?EMP_SEQ=${empSeq}`
      })
      .then(body => body.result)
      .catch(err => {
        throw err;
      });
  },

  /**
   * 직원 일정 정보 조회
   *
   * @param {string} empSeq
   * @param {Date} date default: new Date
   *
   * @returns {Promise<EmpSchedule[]>}
   */
  getSchedules(empSeq, date = new Date) {
    return service
      .request({
        method: 'get',
        url: `employee/get_schedules?EMP_SEQ=${empSeq}&YEAR=${date.getFullYear()}&MONTH=${moment(date).format('MM')}`
      })
      .then(body => body.result)
      .catch(err => {
        throw err;
      });
  },

  /**
   * 직원의 자신의 일정 정보 조회
   *
   * @param {Date} date default new Date
   *
   * @returns {Promise<{ EMP_SEQ: string, EMP_SCH_SEQ: string, STORE_SEQ: string, START: string, END: string, TYPE: string, DAY: string, ATTENDACNE_TIME: string, WORK_OFF_TIME: string, REG_DATE: string }[]>}
   */
  getMySchedules(date = new Date) {
    return service
      .request({
        method: 'get',
        url: `employee/get_my_schedules?YEAR=${date.getFullYear()}&MONTH=${moment(date).format('MM')}`
      })
      .then(body => body.result)
      .catch(err => {
        throw err;
      });
  },

  /**
   * 직원 정보 수정
   *
   * @param {Emp} emp
   *
   * @returns {Promise<boolean>}
   */
  update(emp) {
    return ValidatorControl({
      value: emp.PAY,
      validatorFns: [ Validators.required ],
      errorMessage: '급여를 설정해주세요'
    })
    .then(() => ValidatorControl({
      value: emp.PAY_DAY,
      validatorFns: [ Validators.required ],
      errorMessage: '급여지급일을 설정해주세요.'
    }))
    .then(() => service
      .request({
        method: 'put',
        url: `employee/update`,
        data: emp
      }))
      .then(body => body)
      .catch(err => {
        throw err;
      });
  },

  /**
   * 직원 일정 정보 수정
   *
   * @param {EmpSchedule[]} empSchedules
   *
   * @returns {Promise<boolean>}
   */
  updateSchedules(_empSchedules) {
    if (!_empSchedules.length) return;

    let empSchedules = [];

    _empSchedules.forEach(sch => {
      if(sch)  {
        empSchedules.push(sch);
      }
    });

    return service
      .request({
        method: 'post',
        url: `employee/update_emp_schedules`,
        data: empSchedules
      })
      .then(body => body)
      .catch(err => {
        throw err;
      });
  },
  getOneWeekSum(empSeq) {
    return service.request({
        method: 'get',
        url: `PayMents/week_lists?EMP_SEQ=${empSeq}`
      })
      .then(body => body.result)
      .catch(err => {
        throw err;
      });
  },
  /**
   * 급여 조회
   *
   * @param {string} storeSeq
   * @param {string} empSeq
   * @param {Date} date
   *
   * @returns {Promise<{ [date: string]: PayData }>}
   */
  getPayDatas(storeSeq, empSeq, date) {
    let year = date.getFullYear(),
      month = (date.getMonth() + 1 + '').padStart(2, '0');

    return service.request({
        method: 'get',
        url: `PayMents/month_lists?STORE_ID=${storeSeq}&EMP_ID=${empSeq}&YEAR=${year}&MONTH=${month}`
      })
      .then(body => body.result)
      .catch(err => {
        throw err;
      });
  }
};
