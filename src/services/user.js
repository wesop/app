import service from './service'
import { ValidatorControl, ValidatorControls, Validators } from './validator'
import { User } from '../models/user'
import appService from './app'

service.api = 'user'

export default {
  /**
   * 버전체크
   *
   * @param {User} user
   * @returns {Promise<User>}
   */
  check(appinfoversion,paltform,appversion,userAgent,Dversion,Dplatform,Dmodel) {
    return ValidatorControls(
    )
    .then(() => service.request({
      method: 'post',
      url: 'auth/checkApp',
      data: {
        appinfoversion: appinfoversion,
        paltform: paltform,
        appversion:appversion,
        userAgent,userAgent,
        Dversion :Dversion,
        Dplatform:Dplatform,
        Dmodel:Dmodel,
      }
    }))
    .then(body => body.result)
    .catch(err => { throw err });
  },
 
 
 
  /**
   * 사용자 인증
   *
   * @param {User} user
   * @returns {Promise<User>}
   */
  authorize(user) {
    return ValidatorControls(
      {
        value: user.MobileNo,
        validatorFns: [ Validators.required, Validators.cellPhone ],
        errorMessage: '휴대폰번호를 정확히 입력해주세요 :)'
      },
      {
        value: user.PASSWORD,
        validatorFns: [Validators.required],
        errorMessage: '패스워드를 정확히 입력해주세요 :)'
      }
    )
    .then(() => service.request({
      method: 'post',
      url: 'auth/signin',
      data: {
        MobileNo: user.MobileNo,
        PASSWORD: user.PASSWORD,
        DEVICE_TOKEN: appService.getDeviceToken(),
        Device_Version: user.Device_Version,
        Device_Platform: user.Device_Platform,
        Device_Model: user.Device_Model,
        App_Version:  user.App_Version
      }
    }))
    .then(body => body.result)
    .catch(err => { throw err });
  },

  /**
   * 회원가입
   *
   * @param {User} user
   */
  signup(user)  {
    return ValidatorControls(
      {
        value: user.EMAIL,
        validatorFns: [Validators.required, Validators.email],
        errorMessage: '이메일을 정확히 입력해주세요 :)'
      },
      {
        value: user.MobileNo,
        validatorFns: [Validators.required],
        errorMessage: '본인인증 후 가입을 진행해주세요.'
      },
      {
        value: user.PASSWORD,
        validatorFns: [Validators.required, Validators.password, Validators.range(8, 20)],
        errorMessage: '패스워드를 정확히 입력해주세요 :)'
      },
      {
        value: user.PASSWORD_CONFIRM,
        validatorFns: [Validators.required, Validators.equal(user.PASSWORD)],
        errorMessage: '패스워드와 동일하게 입력해주세요 :)'
      }
    )
    .then(() => service.request({
      method: 'post',
   
      url: 'auth/signup',
      data: {
        EMAIL: user.EMAIL,
        PASSWORD: user.PASSWORD,
        STORE: user.STORE,
        sCipherTime: user.sCipherTime,
        REQ_SEQ: user.REQ_SEQ,
        RES_SEQ: user.RES_SEQ,
        AUTH_TYPE: user.AUTH_TYPE,
        DI: user.DI,
        NAME: user.NAME,
        GENDER: user.GENDER,
        BIRTHDATE: user.BIRTHDATE,
        NATIONINFO: user.NATIONINFO,
        MobileNo: user.MobileNo,
        MobileCo: user.MobileCo,
        DEVICE_TOKEN: appService.getDeviceToken()
      }
    }))
    .then(body => {
      if (body.message === 'ALREADY_SUCCESS')  {
        throw new Error('이미 가입된 휴대폰 번호입니다!');
      }
    })
    .catch(err => { throw err });
  },

  /**
   * 비밀번호 찾기(초기화)
   *
   * @param {User} user
   *
   * @return {Promise<User>}
   */
  find(user)  {
    return service.request({
      method: 'post',
      url: 'auth/find',
      data: {
        NAME: user.NAME,
        MobileNo: user.MobileNo
      }
    })
    .then(body => body.result)
    .catch(err => { throw err });
  },
  //비밀번호 변경
  changepwd(user){
    return ValidatorControl({
      value: user.EMAIL,
      validatorFns: [Validators.required, Validators.email],
      errorMessage: '이메일을 정확히 입력해주세요 :)'
    })
    .then(() => ValidatorControl({
      value: user.PASSWORD,
      validatorFns: [Validators.required, Validators.password, Validators.range(8, 20)],
      errorMessage: '패스워드를 정확히 입력해주세요 :)'
    }))
    .then(() => ValidatorControl({
      value: user.PASSWORD_CONFIRM,
      validatorFns: [Validators.required, Validators.equal(user.PASSWORD)],
      errorMessage: '패스워드와 동일하게 입력해주세요 :)'
    }))
    .then(() => service.request({
      method: 'post',
      url: 'member/changepwd',
      data: {
        EMAIL: user.EMAIL,
        PASSWORD: user.PASSWORD,
        MobileNo: user.MobileNo,
      }
    }))
    .then(body => body.result)
    .catch(err => { throw err });
  },
  /**
   * 개인정보수정
   *
   * @param {User} user
   *
   * @return {Promise<User>}
   */
  update(user)  {
    return ValidatorControl({
        value: user.EMAIL,
        validatorFns: [Validators.required, Validators.email],
        errorMessage: '이메일을 정확히 입력해주세요 :)'
      })
      .then(() => ValidatorControl({
        value: user.PASSWORD,
        validatorFns: [Validators.required, Validators.password, Validators.range(8, 20)],
        errorMessage: '패스워드를 정확히 입력해주세요 :)'
      }))
      .then(() => ValidatorControl({
        value: user.PASSWORD_CONFIRM,
        validatorFns: [Validators.required, Validators.equal(user.PASSWORD)],
        errorMessage: '패스워드와 동일하게 입력해주세요 :)'
      }))
      .then(() => service.request({
        method: 'put',
        url: 'member/update',
        data: {
          EMAIL: user.EMAIL,
          PASSWORD: user.PASSWORD,
          STORE: user.STORE,
          sCipherTime: user.sCipherTime,
          REQ_SEQ: user.REQ_SEQ,
          RES_SEQ: user.RES_SEQ,
          AUTH_TYPE: user.AUTH_TYPE,
          DI: user.DI,
          NAME: user.NAME,
          GENDER: user.GENDER,
          BIRTHDATE: user.BIRTHDATE,
          NATIONINFO: user.NATIONINFO,
          MobileNo: user.MobileNo,
          MobileCo: user.MobileCo,
        }
      }))
      .then(body => body.result)
      .catch(err => { throw err });
  },

  /**
   * 프로필 이미지 추가
   *
   * @param {string} imageUri
   * @param {string} memberSeq
   * @param {string} os
   *
   * @returns {Promise<{ META_SEQ: string, IMAGE: string }[]>}
   */
  addProfileImage(imageUri, memberSeq, os) {
    if(os !== 'ios')  {
      return fetch(imageUri)
        .then(res => {
          return res.arrayBuffer()
            .then(buf => {
              let u8arr = new Uint8Array(buf),
                fd = new FormData,
                blob = new Blob([u8arr], { type: 'image/jpeg' });

              fd.append('userfile', blob, 'image.jpeg');
              fd.append('MEMBER_SEQ', memberSeq);

              return service.request({
                  url: 'member/add_profile_image',
                  method: 'post',
                  data: fd
                })
                .then(body => body.result)
                .catch(err => { throw err });
            })
            .catch(err => { throw err });
        })
        .catch(err => { throw err });
    } else {
      const uri = 'http://api.shop-sol.com/api/v1/member/add_profile_image';
      const options = new FileUploadOptions;

      options.fileKey = 'userfile';
      options.fileName = 'image.jpeg';
      options.mimeType = 'image/jpeg';
      options.params = { MEMBER_SEQ: memberSeq };

      return new Promise((resolve, reject) => {
        const ft = new FileTransfer();
        const success = (res) => { resolve(JSON.parse(res.response).result); };
        const fail = (err) => { reject(err); };

        ft.upload(imageUri, uri, success, fail, options);
      });
    }
  },

  /**
   * 프로필 이미지 삭제
   *
   * @param {string} metaSeq
   */
  removeProfileImage(metaSeq) {
    return service.request({
        method: 'post',
        url: `member/remove_profile_image`,
        data: {
          META_SEQ: metaSeq
        }
      })
      .then(body => body.result)
      .catch(err => { throw err });
  }
}
