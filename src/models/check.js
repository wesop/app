export default class Check {
    constructor(check = {
      STORE_SEQ: '',
      TITLE: '',
      LIST: '',
      CS_SEQ: '', 
      CHECK_SEQ: '',
      CREATE_TIME: '',
      UPDATE_TIME: '',
      START_DATE: '',
      END_TIME: '',
    })  {
      this.STORE_SEQ = check.STORE_SEQ;
      this.TITLE = check.TITLE;
      this.LIST = check.LIST;
      this.CS_SEQ = check.CS_SEQ;
      this.CHECK_SEQ = check.CHECK_SEQ;
      this.CREATE_TIME = check.CREATE_TIME;
      this.UPDATE_TIME = check.UPDATE_TIME;
      this.START_DATE = check.START_DATE;
      this.END_TIME = check.END_TIME;
    }
  }
  