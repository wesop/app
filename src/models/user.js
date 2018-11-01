import Backbone from 'backbone'
import Location from './location'
import Policy from './policy'
import Store from './store'
import Resume from './resume'
import { GENDER, AGES, USER_STATUS, USER_TYPE } from './public';

class User {
  constructor(user = {
    /** @type {string} */
    MEMBER_SEQ: null,

    /** @type {string} */
    EMAIL: null,

    /** @type {string} */
    PASSWORD: null,

    /** @type {string} */
    PASSWORD_CONFIRM: null,

    /** @type {string} */
    STORE: null,

    /** @type {string} */
    CREATE_TIME: null,

    /** @type {string[]} */
    profileImages: null,

    /** @type {Policy[]} */
    policies: null,

    /** @type {boolean} */
    isKeep: null,

    /** @type {string} */
    status: null,

    /** @type {Location} */
    location: null,

    /** @type {string} */
    ages: null,

    /** @type {string} */
    lastLoginDate: null,

    /** @type {Store[]} */
    stores: null,

    /** @type {Resume[]} */
    resumes: null,


    /** Nice 본인인증 정보 시작 */
    /** @type {string} */
    sCipherTime: null,

    /** @type {string} */
    REQ_SEQ: null,

    /** @type {string} */
    RES_SEQ: null,

    /** @type {string} */
    AUTH_TYPE: null,

    /** @type {string} */
    DI: null,

    /** @type {string} */
    NAME: null,

    /** @type {string} */
    GENDER: null,

    /** @type {string} */
    BIRTHDATE: null,

    /** @type {string} */
    NATIONINFO: null,

    /** @type {string} */
    MobileNo: null,

    /** @type {string} */
    MobileCo: null,
    /** Nice 본인인증 정보 종료 */


      /** @type {string} */
      Device_Version: null,
     

        /** @type {string} */
        Device_Platform: null,
 

      /** @type {string} */
      Device_Model: null,
    
      App_Version : null,
  })  {
    this.MEMBER_SEQ = user.MEMBER_SEQ;
    this.EMAIL = user.EMAIL;
    this.PASSWORD = user.PASSWORD;
    this.PASSWORD_CONFIRM = user.PASSWORD_CONFIRM;
    this.STORE = user.STORE;
    this.CREATE_TIME = user.CREATE_TIME;

    this.profileImages = user.profileImages;
    this.policies = user.policies;
    this.isKeep = user.isKeep;
    this.status = user.status;
    this.location = user.location;
    this.ages = user.ages;
    this.lastLoginDate = user.lastLoginDate;
    this.stores = user.stores;

    this.resumes = user.resumes;

    /** Nice 본인인증 정보 시작 */
    this.sCipherTime = user.sCipherTime;
    this.REQ_SEQ = user.REQ_SEQ;
    this.RES_SEQ = user.RES_SEQ;
    this.AUTH_TYPE = user.AUTH_TYPE;
    this.DI = user.DI;
    this.NAME = user.NAME;
    this.GENDER = user.GENDER;
    this.BIRTHDATE = user.BIRTHDATE;
    this.NATIONINFO = user.NATIONINFO;
    this.MobileNo = user.MobileNo;
    this.MobileCo = user.MobileCo;
    /** Nice 본인인증 정보 종료 */

    this.Device_Version = user.Device_Version;
    this.Device_Platform = user.Device_Platform;
    this.Device_Model = user.Device_Model;
    this.App_Version = user.App_Version;

  }
}

class Worker extends User {
  constructor(args) {
    super(args);

    this.STORE = USER_TYPE.WORKER;
  }
}

class Owner extends User {
  constructor(args) {
    super(args);

    this.STORE = USER_TYPE.OWNER;
  }
}

export {
  User,
  Worker,
  Owner,
}
