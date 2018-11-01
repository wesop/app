export class CertifiedData {
  constructor({
    sCipherTime = '',
    sRequestNumber = '',
    sResponseNumber = '',
    sAuthType = '',
    sName = '',
    sDupInfo = '',
    sConnInfo = '',
    sBirthDate = '',
    sGender = '',
    sNationalInfo = '',
    sMobileNo = '',
    sMobileCo = '',
  }) {
    /**
     * 복호화한 시간 (YYMMDDHHMMSS)
     * @type {string}
     */
    this.sCipherTime = sCipherTime || '';

    /**
     * 요청 번호
     * @type {string}
     */
    this.sRequestNumber = sRequestNumber || '';

    /**
     * NICE응답 번호
     * @type {string}
     */
    this.sResponseNumber = sResponseNumber || '';

    /**
     * 인증수단
     * @type {string}
     */
    this.sAuthType = sAuthType || '';

    /**
     * 성명
     * @type {string}
     */
    this.sName = sName || '';

    /**
     * 중복가입 확인값(DI)
     * @type {string}
     */
    this.sDupInfo = sDupInfo || '';

    /**
     * 연계정보 확인값(CI)
     * @type {string}
     */
    this.sConnInfo = sConnInfo || '';

    /**
     * 생년월일(YYYYMMDD)
     * @type {string}
     */
    this.sBirthDate = sBirthDate || '';

    /**
     * 성별
     * @type {string}
     */
    this.sGender = sGender || '';

    /**
     * 내/외국인정보
     * @type {string}
     */
    this.sNationalInfo = sNationalInfo || '';

    /**
     * 휴대폰번호
     * @type {string}
     */
    this.sMobileNo = sMobileNo || '';

    /**
     * 통신사
     * @type {string}
     */
    this.sMobileCo = sMobileCo || '';
  }
}
