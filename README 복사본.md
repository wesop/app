# Quasar App
---
 "dependencies": {
    "crypto-js": "^3.1.9-1",
  },
  cordova
    "dependencies": { "cordova-plugin-add-swift-support": "^1.7.2",
     "cordova-plugin-dialogs": "^2.0.1",
    "cordova-plugin-market": "git+https://github.com/xmartlabs/cordova-plugin-market.git",
  },
  "plugins": {
       "cordova-plugin-dialogs": {},
      "cordova-plugin-market": {}
    }
## 필수 설치 항목

* Node.js (최소 9.x 이상)

**Node.js** 설치 후 터미널을 열고 아래 커맨드 실행

```
npm install -g cordova@8.0.0 @vue/cli quasar-cli@0.15.14
src-cordova/ 디렉토리에 www 폴더생성
src-cordova/www  폴더는 **반드시** 있어야 함
```
---


## Command

* npm start : Quasar 개발 모드
    * Cordova mode : 브라우저
    * Theme : iOS
* npm build : Quasar 개발 빌드
* quasar build -m cordova -T (ios | android) -t ios : Quasar 배포 빌드

---

## 유의사항

* 메인 탭 메뉴 진입 화면들은 `created()`에 `this.$isBack = false` 코드를 넣어야함.
* `pages/` 의 컴포넌트에는 되도록이면 `created()`에 `this.setHeader({ ... })`, `this.setFooter({ ... })` 코드를 넣는 것을 권장함.
    * `setHeader` 의 파라미터중 `buttons`는 **뒤로가기 버튼만** 사용 한다면 빈배열로 설정할 것
        * 예) `setHeader({ buttons: [], useBackButton: true })`

---

## http 통신 가이드

* `src/services`에 서비스 `js` 파일 만들기
    * 만든 `js` 파일에서 `src/services/service.js`를 `import`
    * 서버 통신은 `service.request` 메소드를 통해 가능
    * 작업 후 `src/services/index.js` 에 만든 `js` 파일을 `import` 후 추가

```
// services/test.js
import service from './service'

export default {
  testReqeust(message)  {
    return service.request({
      method: 'get',
      url: 'test',
      api: 'v1',
      data: {
        message: message
      }
    })
    .then(res => res.body)
    .catch(err => {
      throw err;
    });
  }
}

// services/index.js

import test from './test'

export default {
  test
}
```

작성한 서비스를 컴포넌트에서 사용하려면,

```
// *.vue (아무 vue 파일에서)

export default {
  ...,

  methods: {
	this.$service.test.testReqeust('Hello Shopsol')
	  .then(res => { ... })
	  .catch(err => this.showAlert(err.message));
  }
}
```

`services`에서 서비스를 생성하지 않고 컴포넌트에서 직접 구현하고 싶다면,

```
// *.vue (아무 vue 파일에서)

export default {
  ...,

  methods: {
    ...,
    test()  {
      this.$http.get('/test?message=test')
        .then((res) => {

        })
        .catch((err) => {

        });

      this.$http.post('/test', { message: 'test' })
        .then((res) => {

        })
        .catch((err) => {

        });
    }
  }
}

```

---

## 빌드
빌드 전 해야할 작업

* `package.json`에서 `version` 버전 수정
* `src-cordova/www` 디렉토리 안의 파일들을 전부 삭제
    * `src-cordova/www` 디렉토리는 **반드시** 있어야 함

### 안드로이드(Android) 빌드 방법
* `npm run android:build` 를 실행
* 빌드 완료 후 Android Studio를 실행하고 `src-cordova/platforms/android` 열기
* `AndroidManifest.xml` 파일을 열고 `android:versionCode` 값을 아래와 같이 수정
    * `android:versionCode=100xx` -> `android:versionCode=1000xx`
* Android Stuido 메뉴에서 **Build**-**Generate Signed APK** 클릭
* 인증서는 `src-cordova/shopsol.jks`를 선택
     * 인증서 암호 `wesop1234`
* **Build Type**는 **release** 선택
* **Signature Versions**는 **v1** 선택

---

### iOS 빌드 방법
* `npm run ios:build` 를 실행
* 빌드 완료 후 XCode를 실행하고 `src-cordova/platforms/ios` 열기
* 프로젝트의 **General** 탭에서 `Version` 과 `Build` 를 알맞게 입력
* 프로젝트의 **Info** 탭에서 위치 및 카메라, 사진 앨범 권한에 대한 설명이 제대로 들어가 있나 확인
     * 제대로 들어가있지 않을 경우 `src-cordova/샵솔-Info.plist`를 열고 `NS`가 붙은 값들을 참고하여 작성
* **Product**-**Archive** 선택, 완료 되면 앱스토어에 업로드 진행
