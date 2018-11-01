<template>
<q-page class="row items-center">
  <iframe
    v-if="!certifiedData"
    :style="{ height: `${deviceHeight}px` }"
    ref="certifyWindow"
    src="http://api.shop-sol.com:8080"></iframe>

  <div v-if="certifiedData" class="col-12">
    <div class="column justify-center ">
      <div class="col-12" text-center>
        <q-icon name="check"
          color="white"
          size="4em"
          class="bg-paleblue" />
        <p class="text-blue">
          <strong>본인인증이 완료되었습니다!</strong>
        </p>
      </div>
    </div>

    <q-btn
      @click="next"
      label="다음"
      color="paleblue"
      class="btn-next full-width" />
  </div>
</q-page>
</template>

<script>
let onCertifyMessage;

export default {
  name: 'SignupCertify',

  data()  {
    return {
      name: '',
      phone: '',
      gender: null,
      verifyCode: '',
      certifiedData: null,
    // certifiedData: '1',
      prevPageQuery: {},
    }
  },

  watch: {
    certifiedData() {

    }
  },

  methods: {
    next()  {
      this.pagePush({
        name: this.$route.query.next,
        query: Object.assign({
          NAME: this.certifiedData.sName,
          MobileNo: this.certifiedData.sMobileNo,
          MobileCo: this.certifiedData.sMobileCo,
          NATIONINFO: this.certifiedData.sNationalInfo,
          BIRTHDATE: this.certifiedData.sBirthDate,
          GENDER: this.certifiedData.sGender,
          DI: this.certifiedData.sDupInfo,
          AUTH_TYPE: this.certifiedData.sAuthType,
          RES_SEQ: this.certifiedData.sResponseNumber,
          REQ_SEQ: this.certifiedData.sRequestNumber,
          sCipherTime: this.certifiedData.sCipherTime,
        }, this.prevPageQuery)
      });
    },

    onCertifyMessage(event) {
      if(event.data.certifiedData)  {
        this.certifiedData = event.data.certifiedData;
      }
    }
  },

  created() {
    StatusBar.show();

    onCertifyMessage = this.onCertifyMessage;

    this.setHeader({
      visible: true,
      title: '본인인증',
      useBackButton: true
    });

    window.addEventListener('message', onCertifyMessage, true);

    this.prevPageQuery = this.$route.query;
  },

  destroyed() {
    window.removeEventListener('message', onCertifyMessage, true);
    onCertifyMessage = null;
  }
}
</script>

<style lang="stylus" scoped>
@import "../css/themes/common.variables.styl"

.q-layout-page {
  padding-bottom: 57px;
}


iframe {
  position absolute
  display block
  top 0
  bottom 0
  width 100%
  border 0
}

.q-icon {
  margin-top: -82px;
  margin-bottom: 30px;
  padding: 14px;
  border-radius: 50%;
}

.btn-next {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 57px;
}
</style>

