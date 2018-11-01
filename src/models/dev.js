import { User, Worker, Owner } from './user';
import { USER_STATUS, AGES } from './public';
import Policy from './policy';
import Location from './location';

var users = [
  new Worker({
    name: '박보영',
    email: 'pby@wesop.com',
    phone: '010-1234-5678',
    gender: 'F',
    profileImages: [ '../assets/imgs/test.png' ],
    policies: [
      new Policy('서비스 이용약관', true),
      new Policy('개인정보 수집', true),
      new Policy('위치정보 수집', true),
      new Policy('마케팅 활용', true),
    ],
    password: '1234',
    isRemeber: false,
    status: USER_STATUS.ACCEPTED,
    location: new Location({
      latitude: 37.379518,
      longitude: 126.9742595
    }),
    ages: AGES.TWENTY,
  }),

  new Worker({
    name: '이규덕',
    email: 'toaonly@wesop.com',
    phone: '010-1234-5679',
    gender: 'W',
    profileImages: ['https://scontent-icn1-1.xx.fbcdn.net/v/t1.0-9/23559582_1739157896392759_6321543421739433681_n.jpg?_nc_cat=0&oh=c4c487f25fc708e4363d5dd30a86bd35&oe=5B46AF20'],
    policies: [
      new Policy('서비스 이용약관', true),
      new Policy('개인정보 수집', true),
      new Policy('위치정보 수집', true),
      new Policy('마케팅 활용', true),
    ],
    password: '1234',
    isRemeber: false,
    status: USER_STATUS.ACCEPTED,
    location: new Location({
      latitude: 37.379518,
      longitude: 126.9742595
    }),
    ages: AGES.TWENTY,
  }),

  new Owner({
    name: '김규한',
    email: 'kyuhankim@wesop.com',
    phone: '010-1234-5670',
    gender: 'W',
    profileImages: ['https://pbs.twimg.com/profile_images/824716853989744640/8Fcd0bji_400x400.jpg'],
    policies: [
      new Policy('서비스 이용약관', true),
      new Policy('개인정보 수집', true),
      new Policy('위치정보 수집', true),
      new Policy('마케팅 활용', true),
    ],
    password: '1234',
    isRemeber: false,
    status: USER_STATUS.ACCEPTED,
    location: new Location({
      latitude: 37.379518,
      longitude: 126.9742595
    }),
    ages: AGES.THIRTY,
  }),
];

export {
  users,
}
