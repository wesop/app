<template>
<q-page>
  <div class="detail-wrap">
    <ImageSlider v-model="sliderIndex"
      :height="deviceHeight * .32"
      :images="images.map(row => 'http://api.shop-sol.com/uploads/' + row.IMAGE)" />

    <div class="field">
      <div class="label">매장 이름</div>
      <div class="text">
        {{store.NAME}}
      </div>
    </div>

    <div class="field">
      <div class="label">매장 기본주소</div>
      <div class="text">
        {{store.ADDR1}}
      </div>
      
    </div>

  <div v-if="store.ADDR2" class="field">
      <div class="label">매장 상세주소</div>
      <div class="text">
        {{store.ADDR2}}
      </div>
    </div>

    <div class="field">
      <div class="label">매장 전화번호</div>
      <div class="text">
        {{store.TEL}}
      </div>
    </div>

    <div v-if="isOwner" class="field">
      <div class="label">급여정산일</div>
      <div class="text">
        매달 {{cCalculateDay}}
      </div>
    </div>

    <!-- <div v-if="isOwner" class="field">
      <div class="label">급여지급일</div>
      <div class="text">
        매달 {{cPayDay}}
      </div>
    </div> -->

    <div v-if="!isOwner" class="field">
      <div class="label">나의 직책</div>
      <div class="text">
         {{Number(isManager) ? '매니저' : '직원'}}
      </div>
    </div>

    <div v-if="!isOwner&&show=='1'" class="field">
      <div class="label">근무형태 및 급여</div>
      <div class="text text-paleblue" text-right>
        {{paytypeStr}} / {{pay | currency}}
      </div>
    </div>

    <div v-if="!isOwner" class="field">
      <div class="label">근무시작일</div>
      <div class="text">
        {{start | dateFormat('YYYY.MM.DD')}}
      </div>
    </div>

    <div v-if="!isOwner" class="field">
      <div class="label">근무종료일</div>
      <div v-if="end" class="text">
        {{end | dateFormat('YYYY.MM.DD')}}
      </div>
      <div v-else class="text">
        근무 종료일 미정
      </div>
    </div>

    <div v-if="!isOwner" class="field">
      <div class="label">급여일</div>
      <div class="text text-paleblue" text-right>
        {{payDay}}일
      </div>
    </div>

    <div v-if="isOwner" class="field">
      <div class="label">점장이름</div>
      <div class="text">
        {{decodeURIComponent(user.NAME)}}
      </div>
    </div>

    <div v-if="isOwner" class="field">
      <div class="label">사업장 분류</div>
      <div class="text">
        <span v-if="store.TYPE == 0">5인 미만</span>
        <span v-else>5인 이상</span>
      </div>
      
    </div>

    <div v-if="isOwner" class="field">
      <div class="label">사업자등록번호</div>
      <div class="text">
        {{store.BN}}
      </div>
    </div>

    <div v-if="isOwner" class="field">
      <div class="label">매장 출퇴근QR코드</div>
      <div class="text">
        <img class="qr-img" :src="'http://api.shop-sol.com/' + store.QR" />
      </div>
    </div>
  </div>
</q-page>
</template>

<script>
import Store from "../models/store";
import storeService from "../services/store";

export default {
  name: "StoreDetail",

  data() {
    return {
      show:'',
      store: null,
      moreButtons: [],
      sliderIndex: 0,
      images: [],

      /** Owner do not use */
      empSeq: null,
      start: null,
      end: null,
      pay: null,
      isManager: 0,
      payDay: null,
      payType:null,
      paytypeStr :'',
    };
  },

  computed: {
    cCalculateDay() {
      const calculateDay = this.store.CALCULATE_DAY;

      return calculateDay == 1 ? '말일' : calculateDay ? Number(calculateDay) - 1 + '일' : '미설정';
    },

    cPayDay() {
      const payDay = this.store.PAY_DAY;

      return payDay ? Number(payDay) + '일' : '미설정'
    }
  },

  watch: {
    storeType(prev, current) {
      this.storeType = prev;
    }
  },

  methods: {
    getStore() {
      return storeService
        .get(this.store.STORE_SEQ)
        .then(store => (this.store = store))
        .catch(err => this.showAlert(err.message));
    },

    viewEmployees() {
      console.log('S D',this.store);
      this.pagePush({
        name: "EmployeeList",
        params: {
          storeId: this.store.STORE_SEQ
        },
        query: {
          store: this.store,
           storefivetype: this.store.TYPE,
          type: 1
        }
      });
    },

    modify() {
      this.pagePush({
        name: "StoreModify",
        params: {
          id: this.store.STORE_SEQ
        },
        query: {
          store: this.store,
          images: this.images
        }
      });
    },
    showSchedule() {
      this.pagePush({
        name: "EmpStoreDetail",
        params: {
          id: this.empSeq
        },
        query: {
          storeSeq: this.store.STORE_SEQ,
          start: this.start,
          end: this.end,
          isManager :this.$route.query.isManager,
          images :this.$route.query.images,
          payDay:this.$route.query.payDay,
          pay:this.$route.query.pay,
          payType:this.$route.query.payType,
          payShow:this.$route.query.payShow,
        }
      });
    },
    showPay() {
      this.pagePush({
        name: "EmployeePay",
        params: {
          id: this.empSeq
        },
        query: {
          storeSeq: this.store.STORE_SEQ,
        }
      });
    }
  },

  created() {
   this.show =  this.$route.query.payShow;
    this.store = new Store();
    this.store.STORE_SEQ = this.$route.params.id;
    this.images = this.$route.query.images;

    this.getStore();
console.log( 'route:',this.$route);
console.log( 'isOwner:',this.isOwner);
console.log( 'store:',this.store);
    if (this.isOwner) {
      this.moreButtons = [
        // {
        //   label: "직원목록",
        //   icon: "list",
        //   color: "blue",
        //   click: this.viewEmployees
        // },
        {
          label: "수정하기",
          icon: "mode edit",
          color: "blue",
          click: this.modify
        }
      ];

          this.setHeader({
      visible: true,
      title: `${this.isOwner ? "매장" : "일터"}상세`,
      useBackButton: true,
      more: {
        use: true,
        buttons: this.moreButtons
      }
    });
    } else {
      
      this.empSeq = this.$route.query.empSeq;
      this.start = this.$route.query.start;
      this.end = this.$route.query.end;
      this.pay = this.$route.query.pay;
      this.isManager = this.$route.query.isManager;
      this.payDay = this.$route.query.payDay;
       this.payType = this.$route.query.payType;


if(this.payType == '2'){
  this.paytypeStr = '월급';
}else if(this.payType == '1'){
  this.paytypeStr = '일급';
}else{
  this.paytypeStr = '시급';
}
  if(this.$route.query.payShow == '1') {
   this.moreButtons = [
        { label: "급여정보", icon: "attach money", click: this.showPay },
        {   label: "일정 정보", icon: "schedule", click: this.showSchedule }
      ];
       this.setHeader({
      visible: true,
      title: `${this.isOwner ? "매장" : "일터"}상세`,
      useBackButton: true,
      more: {
        use: true,
        buttons: this.moreButtons
      }
    });
    }else{
       this.moreButtons = [
       {   label: "일정 정보", icon: "schedule", click: this.showSchedule }
      ];
   this.setHeader({
      visible: true,
      title: `${this.isOwner ? "매장" : "일터"}상세`,
      useBackButton: true,
       more: {
        use: true,
        buttons: this.moreButtons
      }
    });
    }

     
    }




if(this.isManager == '0'){
 console.log( '직원:',this.isManager);
}else{
 console.log( '매니저:',this.isManager);
}
   
  },

  mounted() {}
};
</script>

<style lang="stylus" scoped>
@import '../css/themes/common.variables.styl';

.q-layout-page {
  position: relative;

  .detail-wrap {
    position: relative;
    color: $darkblue;

    .div {
      padding: 0.8em 0.7em 0;
    }
  }
}

.field {
  margin: 0.7em 0.5em;
  padding-bottom: 0.5em;
}

.qr-img {
  display: block;
  margin: 0 auto;
  width: 200px;
  height: auto;
}
</style>
