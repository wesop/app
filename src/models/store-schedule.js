class StoreSchedule {
  constructor(storeSch = {
    SCH_ID: '',
    EMP_ID: '',
    STORE_NAME: '',
    DATE: '',
    START: '',
    END: '',
    UPDATED_START: '',
    UPDATED_END: '',
    START_YEAR: '',
    START_MONTH: '',
    START_DAY: '',
    START_TIME: '',
    END_YEAR: '',
    END_MONTH: '',
    END_DAY: '',
    END_TIME: '',
    STORE_ID: '',
    EMP_NAME: '',
    STATUS: '',
  }) {
    this.SCH_ID = storeSch.SCH_ID;
    this.EMP_ID = storeSch.EMP_ID;
    this.STORE_NAME = storeSch.STORE_NAME;
    this.DATE = storeSch.DATE;

    /** 출근시간 */
    this.START = storeSch.START;

    /** 퇴근시간 */
    this.END = storeSch.END;

    this.UPDATED_START = storeSch.UPDATED_START;
    this.UPDATED_END = storeSch.UPDATED_END;

    this.START_YEAR = storeSch.START_YEAR;
    this.START_MONTH = storeSch.START_MONTH;
    this.START_DAY = storeSch.START_DAY;
    this.START_TIME = storeSch.START_TIME;

    this.END_YEAR = storeSch.END_YEAR;
    this.END_MONTH = storeSch.END_MONTH;
    this.END_DAY = storeSch.END_DAY;
    this.END_TIME = storeSch.END_TIME;

    this.STORE_ID = storeSch.STORE_ID;

    this.EMP_NAME = storeSch.EMP_NAME;

    /**
     * 0: 이상근태(지각, 조퇴, 출근정보없음, 퇴근정보없음)
     * 1: 이상근태수정
     * 2: 예정근무(출근)일 추가/수정
     * 4: 정상출퇴근
     */
    this.STATUS = storeSch.STATUS;
  }
}

export default StoreSchedule
