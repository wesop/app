import moment from 'moment'
import scheduleService from './schedule'
import EmpSchedule from '../models/emp-schedule'
import TimeTable from '../models/Timetable'

const TODAY = moment(new Date).format('YYYY-MM-DD');

export default class TimeTableService {
  /**
   * 직원 일정 정보를 기준으로 시간표 생성
   *
   * @param {EmpSchedule[]} empSchedules
   */
  constructor(empSchedules) {
    /** @type {TimeTable[]} */
    this.list = [];

    /**
     * @type {{[x: string]: TimeTable}}
     */
    let timeTables = {};

    empSchedules.forEach(empSch => {
      let empSchDate = empSch.START;
      let { hour, min } = scheduleService.getTimeToHourMin(empSch.WORK_OFF_TIME);

      if(hour >= 24)  {
        hour -= 24;
        empSch.WORK_OFF_TIME = scheduleService.getHourMinToTime(hour, min);
      }

      if(!timeTables[empSchDate])  {
        timeTables[empSchDate] = new TimeTable({
          start: empSch.START,
          end: empSch.END,
          schedules: []
        });
      }

      let timeTable = timeTables[empSchDate];

      timeTable.schedules[Number(empSch.DAY)] = empSch;
    });

    this.dateKeys = Object.keys(timeTables);
    this._index = this.dateKeys.length - 1;
    this.dateKeys.forEach(dateKey => {
      this.list.push(timeTables[dateKey]);
    });

    this._sort();
    this._select(TODAY);
  }

  next()  {
    this.index = this._index + 1;
  }

  prev()  {
    this.index = this._index - 1;
  }

  /** @param {number} value */
  set index(value) {
    if(value < 0) value = 0;
    if(value > this.list.length - 1) value = this.list.length - 1;

    this._index = value;
  }

  get index() { return this._index; }

  get selected()  {
    return this.list[this._index];
  }

  /**
   * Get Timetable index or Date or String Date(YYYY-MM-DD)
   *
   * @param {number | Date | string} arg
   */
  get(arg) {
    if(typeof arg === 'number') {
      return this.list[arg];
    } else {
      let searchDate = arg, result;

      if(arg instanceof Date) {
        searchDate = moment(arg).format('YYYY-MM-DD');
      }

      this.list.some(timeTable => {
        if(searchDate >=  timeTable.start &&
          searchDate <= (timeTable.end || '9999-99-99')) {
          result = timeTable;
          // return true;
        }
      });

      return result;
    }
  }

  /**
   * Add timetable
   *
   * @param {TimeTable} timetable
   */
  add(timetable) {
    this._relocationSchedules(timetable);
    this.list.push(timetable);
    this.dateKeys.push(timetable.start);

    if(this.list.length)  {
      this._sort();
      this._select(timetable.start);
    } else {
      this._index = 0;
    }
  }

  /**
   * (Only future)Update timetable
   *
   * @param {TimeTable} _timetable
   */
  update(_timetable) {
    let timetable = this.get(_timetable.prevStart || _timetable.start);

    timetable.start = _timetable.start;
    timetable.end = _timetable.end;

    this._relocationSchedules(timetable);
    this._sort();
    this._select(timetable.start);
  }

  /**
   * Remove timetable
   *
   * @param {number} index
   */
  delete(index)  {
    this.list = this.list.slice(0, index).concat(this.list.slice(index + 1));
    this.dateKeys = this.dateKeys.slice(0, index).concat(this.dateKeys.slice(index + 1));
    this._select(this.list[index - 1].start);
  }

  isLast()  {
    return this._index === this.list.length - 1;
  }

  isFirst() {
    return this._index === 0;
  }

  isPast()  {
    return this.selected.end < TODAY ? true : false;
  }

  isFuture()  {
    return this.selected.start > TODAY ? true : false;
  }

  isCurrent() {
    return this._index === this._currentIndex;
  }

  _sort() {
    this.list = this.list.sort((a, b) => b.start < a.start).map((timeTable, index) => {
      let nextTimeTable = this.list[index + 1];

      if(nextTimeTable && (timeTable.end == null || timeTable.end == undefined))  {
        let nextTimeTableStart = new Date(nextTimeTable.start);

        nextTimeTableStart.setDate(nextTimeTableStart.getDate() - 1);

        timeTable.end = moment(nextTimeTableStart).format('YYYY-MM-DD');
      }

      return timeTable;
    });
  }

  _select(date) {
    this.list.forEach((timeTable, index) => {
      if(date >= timeTable.start)  {
        if(!timeTable.end || date <= timeTable.end) {
          this._index = index;
        }
      }

      if(TODAY >= timeTable.start)  {
        if(!timeTable.end || TODAY <= timeTable.end) {
          timeTable.isCurrent = true;
          this._currentIndex = index;
        }
      }
    });
  }

  /**
   * Relocation Schedules
   *
   * @param {TimeTable} timetable
   */
  _relocationSchedules(timetable) {
    let schedules = [];

    timetable.schedules.forEach(sch => {
      schedules[sch.DAY] = sch;
    });

    timetable.schedules = schedules;
  }
}
