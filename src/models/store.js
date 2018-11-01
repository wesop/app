export default class Store {
  constructor(store = {
    STORE_SEQ: '',
    MEMBER_SEQ: '',
    NAME: '',
    ADDR: '',
    ADDR1: '',
    ADDR2: '',
    TEL: '',
    BN: '',
    TYPE: '',
    LAT: '',
    LONG: '',
    QR: '',
    CALCULATE_DAY: '',
    PAY_DAY: '',
    CLOSE_FLAG: '',
    CATEGORY: '',
    images: [],
    empList: [],
  })  {
    this.STORE_SEQ = store.STORE_SEQ;
    this.MEMBER_SEQ = store.MEMBER_SEQ;
    this.NAME = store.NAME;
    this.ADDR = store.ADDR;
    this.ADDR1 = store.ADDR1;
    this.ADDR2 = store.ADDR2;
    this.TEL = store.TEL;
    this.BN = store.BN;
    this.TYPE = store.TYPE;
    this.LAT = store.LAT;
    this.LONG = store.LONG;
    this.QR = store.QR;
    this.CALCULATE_DAY = store.CALCULATE_DAY;
    this.PAY_DAY = store.PAY_DAY;
    this.CLOSE_FLAG = store.CLOSE_FLAG;
    this.CATEGORY = store.CATEGORY;
    this.images = store.images;
    this.empList = store.empList;
  }
}
