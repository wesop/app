const GENDER = {
  MALE: '1',
  FEMALE: '0',
};

const USER_TYPE = {
  OWNER: '1',
  WORKER: '0'
};

const USER_STATUS = {
  PENDING: 'PENDING',
  ACCEPTED: 'ACCEPTED',
  REJECTED: 'REJECTED',
};

const STORE_STATUS = {
  PENDING: 'PENDING',
  ACCEPTED: 'ACCEPTED',
  REJECTED: 'REJECTED',
};

const AGES = {
  UNDER_TWENTY: '1',
  TWENTY: '2',
  THIRTY: '3',
  FOURTY: '4',
  FIFTY: '5',
  OVER_SIXTY: '6',
};

const SNS = {
  FACEBOOK: 'FACEBOOK',
  KAKAO: 'KAKAO',
  NAVER: 'NAVER',
};

const PUSH_TOPIC = {
  MARKETING: 'marketing'
};

const LOCALE = {
  KR: 'kr',
  CN: 'cn',
  EN: 'en',
};

const EMPLOY_TYPE = {
  TIME: 'T',
  DAY: 'D',
  MONTH: 'M'
};

const DAYS = {
  SUN: 0,
  MON: 1,
  TUE: 2,
  WED: 3,
  THUR: 4,
  FRI: 5,
  SAT: 6,
}

const POLICY = {
  SERVICE: 'SERVICE',
  PRIVATE: 'PRIVATE',
  GEOLOCATION: 'GEOLOCATION',
  MARKETING_ACTIVE: 'MARKETING_ACTIVE',
}

const HOUR = {
  '시': '시'
};

const MIN = {
  '분': '분'
};

const WORKING_STATUS = {
  BEFORE: 'BEFORE',
  PENDING: 'PENDING',
  RESOLVE: 'RESOLVE',
  LATE: 'LATE',
  EARLY: 'EARLY',
  OVER: 'OVER',
  WRONG: 'WRONG',
  ADDED: 'ADDED',
}

const CODE_TABLE = {
  'GENDER': {
    'MALE': { kr: '남자', cn: '', en: '' },
    'M': { kr: '남자', cn: '', en: '' },

    'FEMALE': { kr: '여자', cn: '', en: '' },
    'F': { kr: '여자', cn: '', en: '' },

    'ALL': { kr: '무관', cn: '', en: '' },
    'A': { kr: '무관', cn: '', en: '' },
  },

  'USER_TYPE': {
    'OWNER': { kr: '점장', cn: '', en: '' },
    'WORKER': { kr: '알바생', cn: '', en: '' },
  },

  'USER_STATUS': {
    'PENDING': { kr: '대기중', cn: '', en: '' },
    'ACCEPTED': { kr: '승인', cn: '', en: '' },
    'REJECTED': { kr: '거절', cn: '', en: '' },
  },

  'STORE_STATUS': {
    'PENDING': { kr: '대기중', cn: '', en: '' },
    'ACCEPTED': { kr: '승인', cn: '', en: '' },
    'REJECTED': { kr: '거절', cn: '', en: '' },
  },

  'AGES': {
    'UNDER_TWENTY': { kr: '20대 미만', cn: '', en: '' },
    '1': { kr: '20대 미만', cn: '', en: '' },

    'TWENTY': { kr: '20대', cn: '', en: '' },
    '2': { kr: '20대', cn: '', en: '' },

    'THIRTY': { kr: '30대', cn: '', en: '' },
    '3': { kr: '30대', cn: '', en: '' },

    'FOURTY': { kr: '40대', cn: '', en: '' },
    '4': { kr: '40대', cn: '', en: '' },

    'FIFTY': { kr: '50대', cn: '', en: '' },
    '5': { kr: '50대', cn: '', en: '' },

    'OVER_SIXTY': { kr: '60대 이상', cn: '', en: '' },
    '6': { kr: '60대 이상', cn: '', en: '' },

    'ALL': { kr: '무관', cn: '', en: '' },
    'A': { kr: '무관', cn: '', en: '' },
  },

  'SNS': {
    'FACEBOOK': { kr: '페이스북', cn: '', en: '' },
    'KAKAO': { kr: '카카오', cn: '', en: '' },
    'NAVER': { kr: '네이버', cn: '', en: '' },
    'GOOGLE': { kr: '구글', cn: '', en: '' },
    'WECHAT': { kr: '위챗', cn: '', en: '' },
  },

  'EMPLOY_TYPE': {
    'TIME': { kr: '시급', cn: '', en: '' },
    'DAY': { kr: '월급', cn: '', en: '' },
    'MONTH': { kr: '직급', cn: '', en: '' },
  },

  'DAYS': {
    'SUN': { kr: '일', cn: '', en: 'SUN' },
    '0': { kr: '일', cn: '', en: 'SUN' },
    'MON': { kr: '월', cn: '', en: 'MON' },
    '1': { kr: '월', cn: '', en: 'MON' },
    'TUE': { kr: '화', cn: '', en: 'TUE' },
    '2': { kr: '화', cn: '', en: 'TUE' },
    'WED': { kr: '수', cn: '', en: 'WED' },
    '3': { kr: '수', cn: '', en: 'WED' },
    'THUR': { kr: '목', cn: '', en: 'THUR' },
    '4': { kr: '목', cn: '', en: 'THUR' },
    'FRI': { kr: '금', cn: '', en: 'FRI' },
    '5': { kr: '금', cn: '', en: 'FRI' },
    'SAT': { kr: '토', cn: '', en: 'SAT' },
    '6': { kr: '토', cn: '', en: 'SAT' },
  },

  'POLICY': {
    'SERVICE': { kr: '서비스 이용악관', cn: '', en: '' },
    'PRIVATE': { kr: '개인정보 수집', cn: '', en: '' },
    'GEOLOCATION': { kr: '위치정보 수집', cn: '', en: '' },
    'MARKETING_ACTIVE': { kr: '마케팅 활용', cn: '', en: '' },
  },

  HOUR: {
    '시': { kr: '시', cn: '', en: '' },
  },

  MIN: {
    '분': { kr: '분', cn: '', en: '' },
  },

  WORKING_STATUS: {
    BEFORE: { kr: '출근예정', cn: '', en: '' },
    PENDING: { kr: '근무중', cn: '', en: '' },
    RESOLVE: { kr: '퇴근', cn: '', en: '' },
    LATE: { kr: '지각', cn: '', en: '' },
    EARLY: { kr: '조퇴', cn: '', en: '' },
    OVER: { kr: '초과', cn: '', en: '' },
    WRONG: { kr: '결근', cn: '', en: '' },
    ADDED: { kr: '추가일정', cn: '', en: '' },
  },

  MESSAGE: {
    INVALID: {
      AUTHORIZE: { kr: '사용자 정보가 맞지 않습니다! :(', cn: '', en: '' },
      EMAIL: { kr: '이메일을 정확히 입력해주세요 :)', cn: '', en: '' },
      PASSWORD: { kr: '패스워드을 정확히 입력해주세요 :)', cn: '', en: '' },
      TIME: { kr: '출/퇴근 시간을 확인해주세요.', cn: '', en: '' }
    },

    SIGNUP: {
      ALREADY: { kr: '이미 가입하신 번호입니다!', cn: '', en: '' },
      COMPLETE: { kr: '축하드립니다! 회원으로 등록되셨습니다 :)', cn: '', en: '' }
    },

    STORE: {
      HAS_NOT: { kr: '먼저 자신의 매장을 등록해주세요!', cn: '', en: '' },
      COMPLETE_REGISTER: { kr: '매장이 등록됐습니다!', cn: '', en: '' },
      COMPLETE_UPDATE: { kr: '매장정보를 수정했습니다!', cn: '', en: '' }
    },

    EMPLOYEE: {
      COMPLETE_UPDATE: { kr: '직원 정보를 수정했습니다.', cn: '', en: '' }
    },

    JOIN_REQUEST: {
      CONFIRM: { kr: '합류 요청을 승인하시겠습니까?', cn: '', en: '' },
      COMPLETE: { kr: '매장에 합류 요청했습니다.', cn: '', en: '' },
      ACCEPT: { kr: '처리 완료됐습니다. 나머지 정보를 이어서 작성합니다.', cn: '', en: '' },
      REJECT: { kr: '합류 요청을 거절하시겠습니까?', cn: '', en: '' }
    },

    SCHEDULE: {
      CONFIRM_REGISTER: { kr: '일정을 등록하시겠습니까?', cn: '', en: '' }
    },

    QR: {

    },

    PICTURE: {
      CONFIRM_REGISTER: { kr: '사진을 등록하시겠습니까?', cn: '', en: '' }
    },

    APP: {
      CONFIRM_LOGOUT: { kr: '로그아웃 하시겠습니까?', cn: '', en: '' },
      COMING_SOON: { kr: '준비중입니다.', cn: '', en: '' }
    }
  }
};
CODE_TABLE.DAYS
export {
  GENDER,
  USER_TYPE,
  USER_STATUS,
  STORE_STATUS,
  AGES,
  SNS,
  PUSH_TOPIC,
  LOCALE,
  DAYS,
  HOUR,
  MIN,
  WORKING_STATUS,
  POLICY,
  CODE_TABLE,
}
