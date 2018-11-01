import moment from 'moment'
import { User } from '../models/user'
import Check  from '../models/check'
import Store from '../models/store'
import service from './service'
import { ValidatorControl, Validators } from './validator'
import Emp from '../models/emp';
import appService from './app'
service.api = 'store'
service.api = 'check'

const storeService = {
  /**
   * Get stores
   *
   * @param {User} user
   *
   * @returns {Promise<Store[]>}
   */
  list(user) {
    return service.request({
        url: `store/list?STORE=${user.STORE}`
      })
      .then(body => body.result)
      .catch(err => {
        throw err;
      });
  },
  
  list3(user) {
    return service.request({
        url: `store/list3?STORE=${user.STORE}`
      })
      .then(body => body.result)
      .catch(err => {
        throw err;
      });
  },
  
  CheckListUpdate(CS_SEQ,CHECK_SEQ,NAME,CHECK_TITLE) {
    return service.request({
      method: 'post',
        url: `store/CheckListUpdate`,
        data: {
          CHECK_SEQ : CHECK_SEQ,
          NAME: NAME,
          CHECK_TITLE: CHECK_TITLE,
          CS_SEQ :CS_SEQ || '0'
        }
      })
      .then(body => body.result)
      .catch(err => {
        throw err;
      });
  },

  CheckUpdate(check_seq,TITLE,LIST,createdData) {
    return service.request({
      method: 'post',
        url: `store/CheckUpdate`,
        data: {
          CHECK_SEQ : check_seq,
          TITLE: TITLE,
          LIST: LIST,
          createdData: createdData,
        }
      })
      .then(body => body.result)
      .catch(err => {
        throw err;
      });
  },

  Checkregister(store,TITLE,LIST,createdData) {
    return  service.request({
      method: 'post',
        url: `store/CheckRegister`,
        data: {
          STORE_SEQ : store,
          TITLE: TITLE,
          LIST: LIST,
          createdData: createdData,
        }
  //    }))
    })
      .then(body => body)
      .catch(err => {
        throw err;
      });
  },

  getStoreList(store_seq,showdata) {
    return service.request({
        url: `store/Checklist?STORE=${store_seq}&DATE=${showdata}`
      })
      .then(body => body.result)
      .catch(err => {
        throw err;
      });
  },
  
  /**
   * Get Store
   *
   * @param {string} storeSeq
   *
   * @returns {Promise<Store>}
   */
  get(storeSeq) {
    return service
      .request({
        url: `store/get?STORE_SEQ=${storeSeq}`
      })
      .then(body => body.result)
      .catch(err => {
        throw err;
      });
  },

  /**
   * Get Store Images
   *
   * @param {string} storeSeq
   *
   * @returns {Promise<string[]>}
   */
  getStoreImages(storeSeq) {
    return service
      .request({
        url: `store/images?STORE_SEQ=${storeSeq}`
      })
      .then(body => body.result)
      .catch(err => {
        throw err;
      });
  },

  /**
   * Register Store
   *
   * @param {Store} store
   *
   * @returns {Promise<any>}
   */
  register(store) {
    return ValidatorControl({
        value: store.NAME,
        validatorFns: [ Validators.range(1, 18) ],
        errorMessage: '매장명은 최대 18자로 입력해주세요.'
      })
      .then(() => ValidatorControl({
        value: store.ADDR1,
        validatorFns: [ Validators.required ],
        errorMessage: '매장 기본주소를 입력해주세요.'
      }))
      // .then(() => ValidatorControl({
      //   value: store.ADDR2,
      //   validatorFns: [ Validators.required ],
      //   errorMessage: '매장 상세주소를 입력해주세요.'
      // }))
      .then(() => ValidatorControl({
        value: store.TEL,
        validatorFns: [ Validators.range(7, 12) ],
        errorMessage: '매장 전화번호 형식이 맞지않습니다.'
      }))
      .then(() => ValidatorControl({
        value: store.CALCULATE_DAY,
        validatorFns: [ Validators.required ],
        errorMessage: '급여정산일을 설정해주세요'
      }))
      // .then(() => ValidatorControl({
      //   value: store.PAY_DAY,
      //   validatorFns: [ Validators.required ],
      //   errorMessage: '급여지급일을 설정해주세요'
      // }))
      .then(() => ValidatorControl({
        value: store.TYPE,
        validatorFns: [ Validators.required ],
        errorMessage: '사업장 규모를 설정해주세요'
      }))
      .then(() => ValidatorControl({
        value: store.BN,
        validatorFns: [ Validators.range(10, 10) ],
        errorMessage: '사업자등록번호 형식이 맞지않습니다'
      }))
      .then(() => service.request({
        method: 'post',
        url: `store/insert`,
        data: store
      }))
      .then(body => body)
      .catch(err => { throw err; });
  },

  /**
   * Update Store
   *
   * @param {Store} store
   *
   * @returns {Promise<any>}
   */
  update(store) {
    return service
      .request({
        method: 'put',
        url: `store/update`,
        data: {
          STORE_SEQ: store.STORE_SEQ,
          NAME: store.NAME,
          ZIPCODE: store.ZIPCODE,
          ADDR1: store.ADDR1,
          ADDR2: store.ADDR2,
          TEL: store.TEL,
          //BN: store.BN,
          TYPE: store.TYPE,
          LAT: store.LAT,
          LONG: store.LONG,
          QR: store.QR,
          CALCULATE_DAY: store.CALCULATE_DAY,
          PAY_DAY: store.PAY_DAY,
        }
      })
      .then(body => body)
      .catch(err => {
        throw err;
      });
  },

  /**
   * 오늘 체크인 한 매장코드(STORE_SEQ) 목록 가져오기
   *
   * @returns {string[]}
   */
  getTodayCheckInFinishStoreSeqList() {
    let today = new Date;

    return JSON.parse(localStorage.getItem('CHECK_IN_FINISH_LIST') || '{}')[moment(today).format('YYYYMMDD')] || [];
  },

  /**
   * 오늘 체크아웃 한 매장코드(STORE_SEQ) 목록 가져오기
   *
   * @returns {string[]}
   */
  getTodayCheckOutFinishStoreSeqList() {
    let today = new Date;

    return JSON.parse(localStorage.getItem('CHECK_OUT_FINISH_LIST') || '{}')[moment(today).format('YYYYMMDD')] || [];
  },

  /**
   * 오늘 체크인 한 매장 저장
   *
   * @param {string} storeSeq
   */
  setTodayCheckInFinishStoreSeq(storeSeq) {
    let today = new Date(),
      checkInFinishList = JSON.parse(localStorage.getItem('CHECK_IN_FINISH_LIST') || '{}'),
      storeSeqList = checkInFinishList[moment(today).format('YYYYMMDD')] || [];

    storeSeqList.push(storeSeq);

    checkInFinishList[moment(today).format('YYYYMMDD')] = storeSeqList;

    localStorage.setItem('CHECK_IN_FINISH_LIST', JSON.stringify(checkInFinishList));
  },

  /**
   * 오늘 체크아웃 한 매장 저장
   *
   * @param {string} storeSeq
   * @param {string} date
   */
  setTodayCheckOutFinishStoreSeq(storeSeq, date) {
    let today = new Date(),
      checkInFinishList = JSON.parse(localStorage.getItem('CHECK_OUT_FINISH_LIST') || '{}'),
      storeSeqList = checkInFinishList[moment(today).format('YYYYMMDD')] || [];

    storeSeqList.push({ STORE_SEQ: storeSeq, date });

    checkInFinishList[moment(today).format('YYYYMMDD')] = storeSeqList;

    localStorage.setItem('CHECK_OUT_FINISH_LIST', JSON.stringify(checkInFinishList));
  },
  
  checklist(storeSeq, LAT, LONG) {
    return service
    .request({
      method: 'post',
      url: `StoreAuth/checklist`,
      options: {
        headers: {
          'Content-Type': 'application/json',
          'cache-control': 'no-cache'
        }
      },
      data: {
        STORE_ID: storeSeq,
        LAT: LAT,
        LONG: LONG
      }
    })
    .then(body => {
      return body;
    })
    .catch(err => {
      console.warn(err);
      throw err;
    });
  },
  /**
   * 출근
   *
   * @param {string} storeSeq
   * @param {string} LAT
   * @param {string} LONG
   * @param {Date} date
   * @param {string} empSeq
   *
   * @returns {Promise<string>}
   */
  checkIn(storeSeq, LAT, LONG, date, empSeq) {
    return service
      .request({
        method: 'post',
//        api: 'test',
        url: `StoreAuth/attendance`,
        options: {
          headers: {
            'Content-Type': 'application/json',
            'cache-control': 'no-cache'
          }
        },
        data: {
          STORE_ID: storeSeq,
          LAT: LAT,
          LONG: LONG,
          DATE: moment(date).format('YYYY-MM-DD HH:mm') + ':00',
          EMP_ID: empSeq
        }
      })
      .then(body => {
        this.setTodayCheckInFinishStoreSeq(storeSeq);

        return body;
      })
      .catch(err => {
        console.warn(err);
        throw err;
      });
  },

  /**
   * 퇴근
   *
   * @param {string} storeSeq
   * @param {string} LAT
   * @param {string} LONG
   * @param {Date} date
   * @param {string} empSeq
   *
   * @returns {Promise<string>}
   */
  checkOut(storeSeq, LAT, LONG, date, empSeq) {
    let strDate = moment(date).format('YYYY-MM-DD HH:mm') + ':00';

    return service
      .request({
        method: 'post',
        url: `StoreAuth/work_off`,
        data: {
          STORE_ID: storeSeq,
          LAT: LAT,
          LONG: LONG,
          DATE: strDate,
          EMP_ID: empSeq
        }
      })
      .then(body => {
        this.setTodayCheckOutFinishStoreSeq(storeSeq, strDate);

        return body.message;
      })
      .catch(err => {
        throw err;
      });
  },

  /**
   * @typedef Params
   * @prop {string} text
   * @prop {Object} position
   *
   * @param {Params} args
   *
   * @returns {Promise<Store[]>}
   */
  search({ text, position }) {
    let value, valueType;

    // if (Validators.type(String)(text)) {
    // value = text;
    // valueType = 'text';
    // } else if (Validators.type(Object)(text)) {
    // value = position;
    // valueType = 'position';
    // }

    if (Validators.min(1)(text))
      throw new Error('검색어를 두 글자 이상 입력하세요.');

    return service
      .request({
        method: 'get',
        url: `store/find?value=${text}`
      })
      .then(body => body.result)
      .catch(err => {
        throw err;
      });
  },

  /**
   * 매장 스케줄 가져오기
   *
   * @param {string} storeSeq
   * @param {number | string} year
   * @param {number | string} month
   */
  getSchedules(storeSeq, year, month) {
    let today = new Date();

    if (isNaN(Number(year))) year = today.getFullYear();
    if (isNaN(Number(month))) month = today.getMonth() + 1;

    return service
      .request({
        method: 'get',
        url: `management/month_lists?STORE_ID=${storeSeq}&YEAR=${year}&MONTH=${month}`
      })
      .then(body => body.result)
      .catch(err => {
        throw err;
      });
  },

  /**
   * 매장 근무 직원 목록 가져오기
   *
   * @param {string} storeSeq
   *
   * @returns {Promise<Emp[]>}
   */
  getEmpList(storeSeq) {
    return service
      .request({
        method: 'get',
        url: `store/get_emp_workinglist?STORE_SEQ=${storeSeq}`
      })
      .then(body => body.result)
      .catch(err => {
        throw err;
      });
  },

    /**
   * 매장 종료 직원 목록 가져오기
   *
   * @param {string} storeSeq
   *
   * @returns {Promise<Emp[]>}
   */
  getEmpEndList(storeSeq) {
    return service
      .request({
        method: 'get',
        url: `store/get_emp_endlist?STORE_SEQ=${storeSeq}`
      })
      .then(body => body.result)
      .catch(err => {
        throw err;
      });
  },

  
  getEmpSize(storeSeq) {
    return service
      .request({
        method: 'get',
        url: `store/get_emp_size?STORE_SEQ=${storeSeq}`
      })
      .then(body => body.result)
      .catch(err => {
        throw err;
      });
  },
  /**
   * 합류 요청대기 직원 목록 가져오기
   *
   * @param {string} storeSeq
   *
   * @returns {Promise<Emp[]>}
   */
  getWaitEmpList(storeSeq) {
   // storeSeq.TOEKN = appService.getDeviceToken();
    return service
      .request({
        method: 'get',
        url: `store/get_wait_emp_list?STORE_SEQ=${storeSeq}`
      })
      .then(body => body.result)
      .catch(err => {
        throw err;
      });
  },
  getWorkingEmpTotalPay(storeSeq) {
    return service.request({
      method: 'get',
      url: `store/get_working_emp_totalpay?STORE_SEQ=${storeSeq}`
    })
    .then(body => body.result)
    .catch(err => { throw err; });
  },

  getWorkingEmpStackedPay(storeSeq) {
    return service.request({
      method: 'get',
      url: `store/get_working_emp_stackedpay?STORE_SEQ=${storeSeq}`
    })
    .then(body => body.result)
    .catch(err => { throw err; });
  },


  /**
   * 현재 근무중인 직원 조회
   *
   * @param {string} storeSeq
   *
   * @returns {Promise<{ EMP_ID: string, EMP_NAME: string }[]>}
   */
  getWorkingEmpList(storeSeq) {
    return service.request({
      method: 'get',
      url: `store/get_working_emp_list?STORE_SEQ=${storeSeq}`
    })
    .then(body => body.result)
    .catch(err => { throw err; });
  },

  /**
   * 매장 이미지 삭제
   *
   * @param {string} storeSeq
   * @param {string} imageSeq
   *
   * @returns {Promise<boolean>}
   */
  removeImage(storeSeq, imageSeq)  {
    return service.request({
      method: 'post',
      url: `store/remove_image`,
      data: {
        STORE_SEQ: storeSeq,
        IMAGE_SEQ: imageSeq
      }
    })
    .then(body => body)
    .catch(err => { throw err });
  },

  /**
   * 매장 이미지 등록
   *
   * @param {string} storeSeq
   * @param {string} imageUri
   *
   * @returns {Promise<{ IMAGE_SEQ: string, IMAGE: string }[]>}
   */
  addImage(storeSeq, imageUri)  {
    return fetch(imageUri)
      .then(res => {
        return res.arrayBuffer()
          .then(buf => {
            let u8arr = new Uint8Array(buf),
              fd = new FormData,
              blob = new Blob([u8arr], { type: 'image/jpeg' });

            fd.append('userfile', blob, 'image.jpeg');
            fd.append('STORE_SEQ', storeSeq);

            return service.request({
              url: 'store/add_image',
              method: 'post',
              data: fd
            })
            .then(body => body.result)
            .catch(err => { throw err });
          });
      })
      .catch(err => { throw err });
  }
};

export default storeService;
