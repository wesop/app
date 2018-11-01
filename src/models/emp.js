export default class Emp {
  constructor(emp = {
    EMP_SEQ: '',
    STORE_SEQ: '',
    MEMBER_SEQ: '',
    IS_MANAGER: '',
    REST_ALLOWANCE: '',
    WEEKEND_ALLOWANCE: '',
    START: '',
    END: '',
    PAY_DAY: '',
    PAY: 0,
    TYPE: '0',
    YEAR: '',
    MONTH: '',
    EMP_NAME: '',
    images: [],
    CREATE_TIME: '',
    PAY_TYPE :'',
    PAY_SHOW :'',
    THREE_ALLOWANCE :'',
    OTHERPAY_SHOW :'',
    CalendarEdit :'',
  }) {
    this.CalendarEdit = emp.CalendarEdit;
    this.OTHERPAY_SHOW = emp.OTHERPAY_SHOW;
    this.PAY_SHOW = emp.PAY_SHOW;
    this.THREE_ALLOWANCE = emp.THREE_ALLOWANCE;
    this.EMP_SEQ = emp.EMP_SEQ;
    this.STORE_SEQ = emp.STORE_SEQ;
    this.MEMBER_SEQ = emp.MEMBER_SEQ;
    this.IS_MANAGER = emp.IS_MANAGER;
    this.REST_ALLOWANCE = emp.REST_ALLOWANCE;
    this.WEEKEND_ALLOWANCE = emp.WEEKEND_ALLOWANCE;
    this.START = emp.START ? emp.START.split(' ')[0] : '';
    this.END = emp.END ? emp.END.split(' ')[0] : '';
    this.PAY_DAY = emp.PAY_DAY;
    this.PAY_TYPE = emp.PAY_TYPE;
    this.PAY = Number(emp.PAY);
    this.TYPE = Number(emp.TYPE);
    this.YEAR = emp.YEAR;
    this.MONTH = emp.MONTH;
    this.EMP_NAME = emp.EMP_NAME;
    this.images = emp.images || [];
    this.CREATE_TIME = emp.CREATE_TIME;
  }
}
