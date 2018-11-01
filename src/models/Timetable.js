import EmpSchedule from './emp-schedule'

export default class TimeTable {
  /**
   * @param {TimeTable} timeTable
   */
  constructor(timeTable = {}) {
    /** @type {string | Date} */
    this.start = timeTable.start;

    /** @type {string | Date} */
    this.end = timeTable.end;

    /**
     * 0(일) ~ 6(토) 까지의 index가 있고 빈 요일은 undefined로 채워짐
     * @type {EmpSchedule[]}
     */
    this.schedules = timeTable.schedules || [];

    /**
     * 현재 시간표 여부
     * @type {boolean}
     */
    this.isCurrent = false;
  }
}
