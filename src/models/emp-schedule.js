class EmpSchedule {
  /**
   * @param {EmpSchedule} empSchedule
   */
  constructor(empSchedule = {}) {
    /** @type {number | string} */
    this.EMP_SCH_SEQ = empSchedule.EMP_SCH_SEQ || -1;

    /** @type {number | string} */
    this.EMP_SEQ = empSchedule.EMP_SEQ;

    /**
     * 0 ~ 6 (일 ~ 토)
     * @type {number | string}
     */
    this.DAY = empSchedule.DAY;

    /**
     * HH:mm
     * @type {string}
     */
    this.ATTENDANCE_TIME = empSchedule.ATTENDANCE_TIME;

    /**
     * HH:mm
     * @type {string}
     */
    this.WORK_OFF_TIME = empSchedule.WORK_OFF_TIME;

    /**
     * 0: 사용하지 않는 일정(삭제용 플래그), 1: 사용 중 혹은 사용할 일정
     * @type {number | string}
     */
    this.USE_FLAG = empSchedule.USE_FLAG || '1';

    /**
     * YYYY-MM-DD
     * @type {string}
     */
    this.REG_DATE = empSchedule.REG_DATE;

    /**
     * YYYY-MM-DD
     * @type {string}
     */
    this.START = empSchedule.START;

    /**
     * YYYY-MM-DD
     * @type {string}
     */
    this.END = empSchedule.END;
  }
}

class RenderedDaySchedule {
  constructor() {
    /** @type {number} */
    this.day;

    /** @type {number} */
    this.top;

    /** @type {number} */
    this.height;
  }
}

class RenderedEmpWeekSchedule {
  constructor() {
    /** @type {RenderedDaySchedule} */
    this.daySchedule;
  }
}

export default EmpSchedule

export { RenderedDaySchedule, RenderedEmpWeekSchedule };
