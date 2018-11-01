import _ from 'underscore'
import moment from 'moment'
import Emp from '../models/emp'
import EmpSchedule from '../models/emp-schedule'
import StoreSchedule from '../models/store-schedule'
import { WORKING_STATUS } from '../models/public'
import TimeTableService from './timetable'
import Store from '../models/store'

/**
 * @typedef EmpMonthSchedule
 * @prop {string} schDate
 * @prop {string} EMP_SCH_SEQ
 * @prop {string} EMP_SEQ
 * @prop {string} ATTENDANCE_TIME HH:mm
 * @prop {string} WORK_OFF_TIME HH:mm
 * @prop {string} DAY 0~6
 * @prop {string} DATE YYYY-MM-DD
 * @prop {string} EMP_NAME
 * @prop {string} END HH:mm:ss
 * @prop {string} END_DAY
 * @prop {string} END_MONTH
 * @prop {string} END_TIME
 * @prop {string} END_YEAR
 * @prop {string} SCH_ID
 * @prop {string} START HH:mm:ss
 * @prop {string} START_DAY
 * @prop {string} START_MONTH
 * @prop {string} START_TIME
 * @prop {string} START_YEAR
 * @prop {string} STATUS
 * @prop {string} STORE_ID
 * @prop {string} STORE_NAME
 * @prop {boolean} IS_FUTURE
 * @prop {boolean} IS_PAST
 * @prop {string} UPDATED_END HH:mm:ss
 * @prop {string} UPDATED_START HH:mm:ss
 * @prop {string} CHANGE_END HH:mm:ss
 * @prop {string} CHANGE_START HH:mm:ss
 * @prop {string} status Schedule Status(지각, 결근, 조퇴 등)
 */

 /**
  * 야간근로 수당 계산을 위한 상수값
  */
const NIGHT_TIME = {
  H24: {
    START: '22:00',
    END: '30:00'
  },

  H12: {
    START: '00:00',
    END: '06:00'
  }
}

const TODAY = moment(new Date).format('YYYY-MM-DD');

const scheduleService = {
  /**
   * 직원의 월 일정표 생성
   *
   * @param {Date} date
   * @param {Emp} emp
   * @param {TimeTableService} timeTableService
   */
  createEmpMonthSchedule(date, emp, timeTableService) {
    date.setHours(0, 0, 0, 0);

    /**
     * 직원의 월 일정 Data <일자(1~30(,31,28,29), 월-일자별 일정>
     *
     * @type {Map<number, EmpMonthSchedule>}
     */
    let empMonthSchedules = new Map();

    let year = date.getFullYear();
    let month = date.getMonth();

    let workStartDate = moment(emp.START).toDate();
    let workStartYear = workStartDate.getFullYear();
    let workStartMonth = workStartDate.getMonth();
    let workStartDay = workStartDate.getDate();

    let workEndDate = moment(emp.END || '2099-01-01').toDate();
    let workEndYear = workEndDate.getFullYear();
    let workEndMonth = workEndDate.getMonth();
    let workEndDay = workEndDate.getDate();

    if (year >= workStartYear && year <= workEndYear) {
      if(year === workStartYear && month < workStartMonth)  return;
      if(year === workEndYear && month > workEndMonth)  return;

      let startDay = 1;
      let endDay = 31;

      if (!this.getDifferentMonth(month, workStartMonth)) {
        startDay = workStartDay;
      }

      if (!this.getDifferentMonth(month, workEndMonth)) {
        endDay = workEndDay;
      }

      /**
       * 직원의 일자별 시간표 <요일(0~6), 일별 시간표>
       *
       * @type {Map<string, EmpSchedule[]>}
       */
      // let dayEmpSchedules = new Map();

      // timeTables.forEach(timeTable => {
      //   timeTable.schedules.forEach(empSch => {
      //     let dayEmpSchedule = dayEmpSchedules.get(empSch.DAY) || [];

      //     if(!dayEmpSchedule.length)  dayEmpSchedules.set(empSch.DAY, dayEmpSchedule);

      //     dayEmpSchedule.push(empSch);
      //   });
      // });

      /**
       * 해당 월의 출근 시간표를 요일에 매칭하여 넣어둠
       */
      // empSchedules.forEach(empSch => {
      //   let dayEmpSchedule = dayEmpSchedules.get(empSch.DAY) || [];

      //   if(!dayEmpSchedule.length)  dayEmpSchedules.set(empSch.DAY, dayEmpSchedule);

      //   dayEmpSchedule.push(empSch);
      // });

      for (let day = startDay; day <= endDay; day++) {
        let tmpDate = new Date(year, month, day);

        if (tmpDate.getMonth() != month) break;

        let strTmpDate = moment(tmpDate).format('YYYY-MM-DD');
        /** 요일(0 ~ 6) */
        let dayOfWeek = tmpDate.getDay() + '';

        /** @type {EmpSchedule} */
        let dayEmpSchedule = null;

        // let dayEmpSchList = (dayEmpSchedules.get(dayOfWeek) || []);
        let timeTable = timeTableService.get(strTmpDate);

        if(timeTable) {
          timeTable.schedules.some(empSch => {
            if (empSch.DAY == dayOfWeek &&
              strTmpDate >= empSch.START) {
              dayEmpSchedule = empSch;
            }
          });
        }

        /** @type {EmpMonthSchedule} */
        let empMonthSchedule = {
          schDate: day,
          ATTENDANCE_TIME: null,
          WORK_OFF_TIME: null,
          DAY: dayOfWeek,
          DATE: null,
          EMP_SEQ: emp.EMP_SEQ,
          EMP_NAME: null,
          END: null,
          END_DAY: null,
          END_MONTH: null,
          END_TIME: null,
          END_YEAR: null,
          SCH_ID: null,
          START: null,
          START_DAY: null,
          START_MONTH: null,
          START_TIME: null,
          START_YEAR: null,
          STATUS: null,
          STORE_ID: emp.STORE_SEQ,
          STORE_NAME: null,
          IS_FUTURE: strTmpDate > TODAY,
          IS_PAST: strTmpDate < TODAY,
          UPDATED_END: null,
          UPDATED_START: null,
          CHANGE_END: null,
          CHANGE_START: null,
          status: []
        };

        if (dayEmpSchedule) {
          empMonthSchedule.schDate = day;
          empMonthSchedule.ATTENDANCE_TIME = dayEmpSchedule.ATTENDANCE_TIME;
          empMonthSchedule.WORK_OFF_TIME = dayEmpSchedule.WORK_OFF_TIME;
        }

        empMonthSchedules.set(day, empMonthSchedule);
      }
    }

    return empMonthSchedules;
  },

  /**
   * 작성된 일정(출퇴근으로 기록된)을 직원의 월 일정표와 병합
   *
   * @param {StoreSchedule[]} writtenSchedules
   * @param {Map<string, EmpMonthSchedule>} empMonthSchedules
   */
  mergeWrittenSchedule(writtenSchedules, empMonthSchedules) {
    writtenSchedules.forEach(sch => {
      let day = moment(sch.DATE).toDate().getDate();
      let empMonthSchedule = empMonthSchedules.get(day);

      if (empMonthSchedule) {
        empMonthSchedule.DATE = sch.DATE;
        empMonthSchedule.END = sch.END && sch.END.split(':').slice(0, 2).join(':');

        empMonthSchedule.END_DAY = sch.END_DAY;
        empMonthSchedule.END_MONTH = sch.END_MONTH;
        empMonthSchedule.END_TIME = sch.END_TIME && sch.END_TIME.split(':').slice(0, 2).join(':');

        empMonthSchedule.END_YEAR = sch.END_YEAR;
        empMonthSchedule.SCH_ID = sch.SCH_ID;
        empMonthSchedule.START = sch.START && sch.START.split(':').slice(0, 2).join(':');

        empMonthSchedule.START_DAY = sch.START_DAY;
        empMonthSchedule.START_MONTH = sch.START_MONTH;
        empMonthSchedule.START_TIME = sch.START_TIME && sch.START_TIME.split(':').slice(0, 2).join(':');

        empMonthSchedule.START_YEAR = sch.START_YEAR;
        empMonthSchedule.STATUS = sch.STATUS;
        empMonthSchedule.STORE_NAME = sch.STORE_NAME;

        empMonthSchedule.UPDATED_END = sch.UPDATED_END && sch.UPDATED_END.split(':').slice(0, 2).join(':');
        empMonthSchedule.UPDATED_START = sch.UPDATED_START && sch.UPDATED_START.split(':').slice(0, 2).join(':');

        empMonthSchedule.CHANGE_END = sch.CHANGE_END && sch.CHANGE_END.split(':').slice(0, 2).join(':');
        empMonthSchedule.CHANGE_START = sch.CHANGE_START && sch.CHANGE_START.split(':').slice(0, 2).join(':');
      }
    });
  },

  /**
   * 년도 비교
   *
   * @param {number} year1
   * @param {number} year2
   */
  getDifferentYear(year1, year2) {
    return year2 - year1;
  },

  /**
   * 월 비교
   *
   * @param {number} month1
   * @param {number} month2
   */
  getDifferentMonth(month1, month2) {
    return month2 - month1;
  },

  /**
   * 시차 계산(초로 반환, 양수값: 기준시간보다 늦은 시간, 음수값: 기준시간보다 빠른시간)
   *
   * @param {string} time1 기준 시간(HH:mm)
   * @param {string} time2 시차를 알기 위한 시간(HH:mm)
   *
   * @returns {number}
   */
  getDifferentTime(time1, time2) {
    if (!time1) time1 = '00:00';
    if (!time2) time2 = '00:00';

    let splitTime1 = time1.split(':').map(Number);
    let splitTime2 = time2.split(':').map(Number);

    let time1Hour = splitTime1[0] * 60 * 60,
      time1Min = splitTime1[1] * 60,
      time2Hour = splitTime2[0] * 60 * 60,
      time2Min = splitTime2[1] * 60;

    return time2Hour + time2Min - (time1Hour + time1Min);
  },

  /**
   * 시간을 초로 변환
   *
   * @param {number} hour
   */
  hourToSeconds(hour) {
    return hour * 60 * 60;
  },

  /**
   * 두 날짜의 년월일이 같은지 비교
   *
   * @param {Date} date1
   * @param {Date} date2
   */
  isEqualDate(date1, date2) {
    let _date1 = new Date(date1).setHours(0, 0, 0, 0);
    let _date2 = new Date(date2).setHours(0, 0, 0, 0);

    return _date1 == _date2;
  },

  /**
   * 시간(HH:mm)을 시, 분으로 반환
   *
   * @param {number} time HH:mm
   *
   * @returns {{ hour: number, min: number }}
   */
  getTimeToHourMin(time) {
    let split = (time || '00:00').split(':').map(Number);

    return { hour: split[0], min: split[1] };
  },

  /**
   * 시, 분을 시간(HH:mm)으로 반환
   *
   * @param {number} hour
   * @param {number} min
   *
   * @returns {string}
   */
  getHourMinToTime(hour, min)  {
    return `${(hour + '').padStart(2, 0)}:${(min + '').padStart(2, 0)}`;
  },

  /**
   * 시간 더하기
   *
   * @param {string} time 시간(HH:mm)
   * @param {number} addedHour 더할 시간
   */
  addHour(time, addedHour) {
    let { hour, min } = this.getTimeToHourMin(time);

    hour += addedHour;

    return this.getHourMinToTime(hour, min);
  },

  /**
   * 일 더하기
   *
   * @param {Date | string} date
   * @param {number} addedDate
   * @param {string} format
   */
  addDate({ date, addedDate, format }) {
    date = moment(date).toDate();

    date.setDate(date.getDate() + addedDate);

    return typeof format === 'string' ? moment(date).format(format) : date;
  },

  /**
   * 렌더될 스케줄에 status(지각, 근무중, 근무예졍, 퇴근) 설정
   *
   * @param {EmpMonthSchedule} renderedSchedule
   * @param {Date} date
   */
  setRenderedScheduleStatus(renderedSchedule, date) {
    let today = new Date();
    let todayTime = `${today.getHours()}:${today.getMinutes()}`;


    let attendanceTime = renderedSchedule.CHANGE_START || renderedSchedule.ATTENDANCE_TIME,
      workOffTime = renderedSchedule.CHANGE_END || renderedSchedule.WORK_OFF_TIME,
      updatedAttendanceTime = renderedSchedule.UPDATED_START,
      updatedWorkOffTime = renderedSchedule.UPDATED_END,
      realAttendanceTime = renderedSchedule.START_TIME,
      realWorkOffTime = renderedSchedule.END_TIME,
      workOffDate;

    if (renderedSchedule.STATUS == '2'
      || (attendanceTime == null
      && workOffTime == null)) {
      attendanceTime = renderedSchedule.CHANGE_START || renderedSchedule.START;
      workOffTime = renderedSchedule.CHANGE_END || renderedSchedule.END;
    }

    if (workOffTime !== null && workOffTime !== undefined) {
      let workOffTimeSplit = workOffTime.split(':');

      workOffDate = new Date(date);
      workOffDate.setHours(workOffTimeSplit[0], workOffTimeSplit[1]);
    }

    if (realAttendanceTime
      && scheduleService.getDifferentTime(attendanceTime, realAttendanceTime) > 0) {
      console.warn('realAttendanceTime is late than attendanceTime', attendanceTime, realAttendanceTime);
      renderedSchedule.status.push(WORKING_STATUS.LATE);
    } else if (updatedAttendanceTime
      && scheduleService.getDifferentTime(attendanceTime, updatedAttendanceTime) > 0) {
      console.warn('updatedAttendanceTime is late than attendanceTime', attendanceTime, updatedAttendanceTime);
      renderedSchedule.status.push(WORKING_STATUS.LATE);
    } else {
      let lateIndex = renderedSchedule.status.indexOf(WORKING_STATUS.LATE);

      renderedSchedule.status = renderedSchedule.status.slice(0, lateIndex).concat(renderedSchedule.status.slice(lateIndex + 1));
    }

    if ((scheduleService.isEqualDate(date, today)
      && scheduleService.getDifferentTime(attendanceTime, todayTime) >= 0)
      && (renderedSchedule.SCH_ID === null || renderedSchedule.DATE === undefined)) {
      if(scheduleService.getDifferentTime(workOffTime, todayTime) <= 0) {
        console.warn('SCH_ID is null, Not over work off time.');
        renderedSchedule.status.push(WORKING_STATUS.LATE);
      } else {
        console.warn('SCH_ID is null, Over Work off time');
        renderedSchedule.status.push(WORKING_STATUS.WRONG);
      }
    }

    if (realWorkOffTime
      && scheduleService.getDifferentTime(workOffTime, realWorkOffTime) < 0) {
      console.warn('realWorkOffTime is early than workOffTime');
      renderedSchedule.status.push(WORKING_STATUS.EARLY);
      renderedSchedule.status.push(WORKING_STATUS.RESOLVE);
    } else if (updatedWorkOffTime
      && scheduleService.getDifferentTime(workOffTime, updatedWorkOffTime) < 0) {
      console.warn('updatedWorkOffTime is early than workOffTime');
      renderedSchedule.status.push(WORKING_STATUS.EARLY);
      renderedSchedule.status.push(WORKING_STATUS.RESOLVE);
    } else {
      let lateIndex = renderedSchedule.status.indexOf(WORKING_STATUS.EARLY);

      renderedSchedule.status = renderedSchedule.status.slice(0, lateIndex).concat(renderedSchedule.status.slice(lateIndex + 1));
    }

    if (updatedWorkOffTime
      && scheduleService.getDifferentTime(workOffTime, updatedWorkOffTime) >= scheduleService.hourToSeconds(1)) {
      console.warn('updatedWorkOffTime is late on 1 hours than workOffTime');
      // renderedSchedule.status.push(WORKING_STATUS.OVER);
      // renderedSchedule.status.push(WORKING_STATUS.RESOLVE);
    } else if (realWorkOffTime
      && scheduleService.getDifferentTime(workOffTime, realWorkOffTime) >= scheduleService.hourToSeconds(1)) {
      console.warn('realWorkOffTime is late on 1 hours than workOffTime');
      // renderedSchedule.status.push(WORKING_STATUS.OVER);
      // renderedSchedule.status.push(WORKING_STATUS.RESOLVE);
    }

    if (date <= today
      && scheduleService.getDifferentTime(workOffTime, todayTime) > 0
      && (updatedWorkOffTime === null || realWorkOffTime === null)) {
      console.warn('realWorkOffTime is null and updatedWorkOffTime is null');
      // renderedSchedule.status.push(WORKING_STATUS.WRONG);
    }

    // if (scheduleService.isEqualDate(date, today)
    //   && (scheduleService.getDifferentTime(attendanceTime, todayTime) >= 0
    //     && scheduleService.getDifferentTime(workOffTime, todayTime) <= 0
    //     && renderedSchedule.SCH_ID !== null
    //   )
    //   || renderedSchedule.SCH_ID !== null
    // ) {
    //   renderedSchedule.status.push(WORKING_STATUS.PENDING);
    // }

    if (renderedSchedule.SCH_ID !== null
        && renderedSchedule.START_TIME !== null
        && renderedSchedule.END_TIME === null
        && workOffDate > today)  {
      renderedSchedule.status.push(WORKING_STATUS.PENDING);
    }

    if (workOffDate < today) {
      if ((realAttendanceTime == null && updatedAttendanceTime == null)
        && (realWorkOffTime == null && updatedWorkOffTime == null)) {
        console.warn('Has not any attendance time and work off time');
        renderedSchedule.status.push(WORKING_STATUS.WRONG);
      }

      if(renderedSchedule.status.indexOf(WORKING_STATUS.RESOLVE) === -1
        && renderedSchedule.status.indexOf(WORKING_STATUS.WRONG) === -1) {
        /**
         * 퇴근 조건에서 결근이 아니라면 퇴근 상태를 추가
         */
        renderedSchedule.status.push(WORKING_STATUS.RESOLVE);
      }
    }

    if ((scheduleService.isEqualDate(date, today)
      && scheduleService.getDifferentTime(attendanceTime, todayTime) < 0
      && renderedSchedule.START == null
      && renderedSchedule.UPDATED_START == null)
      || today < date) {
      renderedSchedule.status.push(WORKING_STATUS.BEFORE);
    }

    renderedSchedule.status = _.uniq(renderedSchedule.status);
  },

  /**
   * 일정 기반 예상 급여 계산(오직 시급만)
   *
   * @param {Emp} emp 직원정보
   * @param {string | number} calculateDay 급여정산일
   *
   * @returns {number}
   */
  getExpectedStackedPay(emp, calculateDay) {
    let result = 0;

    let today = new Date,
      start = new Date(emp.START.replace(/\s/g, 'T')), // 근무시작일
      end = new Date((emp.END || '2099-01-01').replace(/\s/g, 'T')), // 근무중료일
      // payDay = Number(emp.PAY_DAY), // 급여일
      payDay = Number(calculateDay - 1), // 급여정산일
      payDate = new Date, // 급여날짜
      pay = Number(emp.PAY) / 60;  // 급여

    payDate.setDate(payDay);

    let calcStart,  // 월급 계산 시작일
      calcEnd;    // 월급 계산 종료일

    if (scheduleService.getDifferentYear(start.getFullYear(), today.getFullYear()) == 0
      && scheduleService.getDifferentMonth(start.getMonth(), today.getMonth()) == 0) {
      calcStart = start;
    } else {
      calcStart = new Date();
      calcStart.setMonth(today.getMonth() - 1);
      calcStart.setDate(payDay);
    }

    if(payDate.getTime() < calcStart.getTime()) {
      payDate.setMonth(payDate.getMonth() + 1);
    }

    if(end < today || end < payDate) {
      calcEnd = end;
    } else {
      calcEnd = payDate;
    }

    /** @type {TimeTableService} */
    let timeTableService = emp.timeTableService;

    let indexDate = new Date(calcStart);

    calcStart.setHours(0, 0, 0, 0);
    calcEnd.setHours(0, 0, 0, 0);
    indexDate.setHours(0, 0, 0, 0);

    for(let startDate = calcStart.getDate(); indexDate <= calcEnd; startDate++) {
      indexDate = new Date(calcStart);
      indexDate.setHours(0, 0, 0, 0);
      indexDate.setDate(startDate);

      let day = indexDate.getDay();
      let timetable = timeTableService.get(indexDate);

      if(timetable && timetable.schedules[day])  {
        let attendanceTime  = timetable.schedules[day].ATTENDANCE_TIME,
          workOffTime = timetable.schedules[day].WORK_OFF_TIME;

        if(scheduleService.getDifferentTime(attendanceTime, workOffTime) < 0) {
          workOffTime = this.addHour(workOffTime, 24);
        }

        /**
         * 총 근무시간(초)
         */
        let workingTimePerDay = scheduleService.getDifferentTime(attendanceTime, workOffTime);

        /**
         * TODO : 휴게시간 보정
         */
        // if(workingTimePerDay >= (8 * 3600))  {
        //   workingTimePerDay -= 3600;
        // } else if(workingTimePerDay >= (4 * 3600))  {
        //   workingTimePerDay -= 1800;
        // }

        /**
         * 초과근무 시간(초, 음수면 0)
         */
        let overTime = workingTimePerDay - (8 * 3600);
        overTime < 0 ? overTime = 0 : void 0;

        /** 야간근로시간(22~30시, 초) */
        let nightTime = this.getNightTime(attendanceTime, workOffTime);

        /**
         * TODO: 초과근무 야근근로수당 넣어야함
         */
        result += ((workingTimePerDay - (overTime + nightTime)) / 60 * pay);
        result += ((overTime + nightTime) / 60 * (pay * 1.5));
      }
    }

    return result;
  },

  /**
   * 야근 근로시간 구하기(초)
   *
   * @param {string} attendanceTime HH:mm
   * @param {string} workOffTime HH:mm
   */
  getNightTime(attendanceTime, workOffTime)  {
    let nightTime = 0;
    let nightTimeStart;
    let nightTimeEnd;

    if(this.getDifferentTime(workOffTime, NIGHT_TIME.H24.END) >= 0
      || this.getDifferentTime(workOffTime, NIGHT_TIME.H12.END) >= 0) {

      if(this.getDifferentTime(NIGHT_TIME.H24.START, attendanceTime) >= 0
        && this.getDifferentTime(NIGHT_TIME.H24.END, attendanceTime) <= 0) {
        nightTimeEnd = workOffTime;
        nightTimeStart = attendanceTime;
      }

      if(this.getDifferentTime(NIGHT_TIME.H12.START, attendanceTime) >= 0
        && this.getDifferentTime(NIGHT_TIME.H12.END, attendanceTime) <= 0) {
        nightTimeEnd = workOffTime;
        nightTimeStart = attendanceTime;
      }
    }

    nightTime = scheduleService.getDifferentTime(nightTimeStart, nightTimeEnd);
    nightTime < 0 ? nightTime = 0 : void 0;

    return nightTime;
  },

  /**
   * @param {HTMLElement} el
   */
  makeStatusInCalendar(el)  {
    _.each(el.querySelectorAll(`.fc-content-skeleton td[data-date]`), (td) => {
      let statusWrap = document.createElement('div');

      statusWrap.classList.add('status-wrap');

      statusWrap.innerHTML += `
        <div class="ADDED"></div>
        <div class="WRONG"></div>
        <div class="LATE EARLY OVER"></div>
      `;

      td.appendChild(statusWrap);
    });
  },

  /**
   * @param {Store} store
   * @param {Emp} emp
   */
  isContractEnd(emp) {

  }
};

export default scheduleService
