<template>
<q-page>
  <section class="page-wrap">
    <div class="row items-center logo-wrap" padding-top>
      <div class="col-12" text-center>
        <img src="../assets/imgs/logo_0.png" alt="logo" />
      </div>
    </div>
    <form>
      <q-field label="로그인" class="text-white" margin-top />
      <div>
        <q-input
          v-model.lazy.trim="MobileNo"
          dark
          hide-underline
          color="white"
          maxlength="11"
          type="tel"
          placeholder="휴대폰번호(숫자만)"
          class="input-box" />
      </div>

      <div margin-top padding-bottom>
        <q-input
          @keyup.enter="authorize"
          v-model.lazy.trim="PASSWORD"
          dark
          hide-underline
          no-pass-toggle
          autocomplete="false"
          color="white"
          type="password"
          placeholder="비밀번호"
          class="input-box" />
      </div>

      <div class="checkbox-wrap">
        <label for="is-keep">로그인 유지</label>
        <input id="is-keep" v-model="isKeep" type="checkbox" />
        <div class="checkbox-bg-wrap"></div>
      </div>
    </form>

    <div class="btn-login-wrap">
      <q-btn
        @click="authorize"
        color="white"
        text-color="blue"
        label="로그인"
        size="1.25rem"
        class="btn-login full-width" />
    </div>

    <div class="btn-signup-wrap">
      <q-btn
        @click="pagePush({ name: 'SignupPrivacy' })"
        color="transparent"
        text-color="white"
        label="회원가입"
        size="1.25rem"
        class="full-width"
      />
    </div>

    <div class="btn-find-wrap">
      <q-btn
        @click="pagePush({ name: 'SignupCertify', query: { next: 'UserUpdate2' } })"
        color="transparent"
        label="비밀번호 찾기"
        class="full-width"
      />
    </div>
  </section>
</q-page>
</template>

<script>
import { User } from '../models/user'
import AppLoader from '../components/Loader'

export default {
  name: 'Login',

  data()  {
    return {
      MobileNo: '',
      PASSWORD: '',
      // Dversion :'',
      // Dplatform:'',
      // Dmodel:'',
      isKeep: false
    }
  },

  methods: {
    authorize() {
      AppLoader.visible = true;
     
    //  FCMPlugin.getToken((token) => {
    //   appService.setDeviceToken(token);
    // });
    
      this.$service.user.authorize({
        MobileNo: this.MobileNo,
        PASSWORD: this.PASSWORD,
        Device_Version: device.version,
        Device_Platform: device.platform,
        Device_Model: device.model,
        App_Version : navigator.appInfo.version,
      })
      .then(user => {
        AppLoader.visible = false;

        user.PASSWORD = this.PASSWORD;

        this.clearInfo();
        this.setUser(user);

        // appSerivce.setToken(res.authorize_token);
        this.$service.app.setKeepLogin(this.isKeep);

        this.setBackgroundProcessor({
          name: 'refreshAuthorization',
          process: this.refreshAuthorization,
          interval: 1000 * 60 * 30
        });

        StatusBar.show();

        if(this.isOwner) {
          this.pagePush({ name: 'Main', replace: true });
        } else {
          this.pagePush({ name: 'WorkerMain', replace: true });
        }
      })
      .catch(err => {
        AppLoader.visible = false;
        this.showAlert(err.message || '사용자 정보가 맞지 않습니다! :(');
      });
    },

    keepLogin() {
      if(this.$service.app.isKeepLogin())  {
        this.MobileNo = this.user.MobileNo;
        this.PASSWORD = this.user.PASSWORD;
        this.isKeep = true;

        this.authorize();
      }
    },

    clearInfo() {
      this.MobileNo = '';
      this.PASSWORD = '';
    }
  },

  watch: {},





  beforeCreate() {},
  created() {


    console.log('navigator:',navigator);
    console.log('appVersion:',navigator.appVersion);
    console.log('platform:',navigator.platform);
    console.log('navigator.appInfo:',navigator.appInfo);
    console.log('appInfo.version:',navigator.appInfo.version);
    console.log('device:',device);

    

     this.$service.user.check(
        navigator.appInfo.version,
        navigator.platform,
        navigator.appVersion,
        navigator.userAgent,
        device.version,
        device.platform,
        device.model,
  
      )
      .then(data => {
       
        if(data == null){
        //  console.log("앱 계속 진행");
         //  self.showAlert(data.message);

        }else{
            console.log('navigator.app :',navigator.app);
             console.log('cordova.plugins.market :',cordova.plugins.market);
            
           console.log('스토어 이동 :',data);
            console.log('device.platform :',device.platform);
              console.log('navigator.notification :',navigator.notification);
           // this.showAlert('새로운 버전이 있습니다. 스토어로 이동하여 새로운 버전을 설치하십시오');
          //  //console.log('스토어 이동 :',data);
           navigator.notification.confirm(
		 '새로운 버전이 있습니다 스토어로 이동하여 새로운 버전을 설치하십시오.', // message
		  function(index){
     console.log('index :',index);
	//  console.log('navigator.notification :',navigator.notification);
			
				  // navigator.app.exitApp();
				if(index == 1){
	          if(device.platform == 'iOS'){
              cordova.plugins.market.open('id1408364175')
              
            }else{
              cordova.plugins.market.open('com.wesop.appshopsol')
            }
        }
			
			 
		  },  
		 '알림', // title
     ['확인','취소'] // buttonLabels
     
	);
          
        //  navigator.app.exitApp();
         
          
        }
      })
      .catch(err => {
        console.log('err=',err);
      });

    StatusBar.hide();

    this.removeBackgroundProcessor('refreshAuthorization');

    this.setHeader({ visible: false });
    this.setFooter({ visible: false });

    this.keepLogin();
  },

  beforeMount() {},
  mounted() {},

  beforeUpdate()  {},
  updated() {},

  beforeDestory() {},
  destroyed() {},
}
</script>

<style lang="stylus" scoped>
@import "../css/themes/common.variables.styl"

.q-layout-page {
  background-image: url("../assets/imgs/bg_login.jpg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: auto 100%;

  .page-wrap {
    position: absolute;
    width: 100%;
    bottom: 0;
    top: 0;
    overflow-y: auto;
  }

  @media only screen and (min-width: 767px) and (orientation: landscape) {
    background-size: 100% auto;
    background-position: center 10%;
  }

  @media screen and (min-aspect-ratio: 10/13) {
    background-size: 100% auto;
    background-position: center top;
  }
}

.logo-wrap {
  margin-top: 116px;
  margin-bottom: 56px;

  img {
    width: 214px;
  }

  @media only screen and (max-height: 568px) {
    margin-top: 81px;
    margin-bottom: 21px;

    img {
      width: 179px;
    }
  }
}

.input-box {
  padding: .5em;
  border: 1px solid rgba(255,255,255,0.3);
}

.checkbox-wrap {
  position: relative;
  margin: .5em 0;
  padding-left: 24px;
  line-height: 14px;

  label {
    font-size: .9rem;
    color: #fff;
  }

  input[type="checkbox"] {
    display: none;

    & + .checkbox-bg-wrap {
      background: none;
    }

    &:checked + .checkbox-bg-wrap {
      background-image: url("../assets/imgs/check-on.png");
      background-repeat: no-repeat;
      background-size: 16px;
      border: 0;
    }
  }

  .checkbox-bg-wrap {
    position: absolute;
    display: inline-block;
    top: 0;
    left: 0;
    width: 16px;
    height: 16px;
    border: 1px solid #fff;
    box-sizing: border-box;
  }
}

.btn-login-wrap {
  margin-top: 1em;

  .btn-login {
    font-weight: 600;
  }
}

.btn-signup-wrap {
  margin-top .5em

  button {
    border: 1px solid #fff;
  }
}

.btn-find-wrap {
  margin-top .5em
}
</style>
