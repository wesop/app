<template>
    <div style="background-color: white;">
<q-page >




<div class="detail-wrap">
   
      

    <div class="field">
      <div class="label">체크포인트</div>
      <div class="text">
        {{checkList.TITLE}}
      </div>
    </div>


     <div class="field"   >
      <div class="label">체크리스트</div>
      <div class="text"
       v-for="(list, index) in LIST"
      :key="index">
         {{index+1}}번-{{list}}
      </div>
    </div>



   <div class="field">
      <div class="label">마감시간</div>
      <div class="text">
        {{checkList.END_TIME}}
      </div>
    </div>



      <div class="field">
      <div class="label">체크시작일자</div>
      <div class="text">
        {{checkList.START_DATE}}
      </div>
    </div>

      <div class="field" v-if="checkList.CHECK_TIME">
      <div class="label">확인시간</div>
      <div class="text">
        {{checkList.CHECK_TIME}}
      </div>
    </div>

    <div class="field" v-if="checkList.EMP_NAME">
      <div class="label">확인직원</div>
      <div class="text">
        {{checkList.EMP_NAME}}
      </div>
    </div>

   <div class="field" >
      <div class="label">일일메모</div>
       <q-input
              v-model="checkList.CHECK_TITLE"
              hide-underline
              margin-bottom
              type="text"
            />
    </div>
      


    <div class="btn-area">
    <q-btn
      @click="register"
      :label="'저장'"
      color="paleblue"
      class="btn-write full-width" />
  </div>


</div>
</q-page>
</div>
</template>

<script>
//CHECK_DATE,CHECK_SEQ,,CHECK_TITLE,
//CREATE_TIME,CS_SEQ,
//,START_DATE,UPDATE_TIME
         
import moment from "moment";
import AppLoader from "../components/Loader";
import Store from "../models/store";
import Emp from "../models/emp";
import storeService from "../services/store";

export default {
  name: "QRCheckList",

  data() {
    return {
         LIST : [],
  checkList :null,
    };
  },

  computed: {
   

    
  },
  watch: {
    
    },
  methods: {
    register()  {

 this.showAlert('체크리스트를 수정하시겠습니까?', {
        cancel: '취소',
        confirm: '수정'
      })
      .then(register => {
        if(register)  {
          storeService.CheckListUpdate(this.checkList.CS_SEQ,this.checkList.CHECK_SEQ,this.user.NAME,this.checkList.CHECK_TITLE)
            .then(async (result) => {
              console.log('check:"',result);
          if(result === 'SUCCESS') {
            this.showAlert('정상적으로 수정했습니다!', {
                confirm: '확인'
              })
              .then(() =>  this.back());
          } else  {
            this.showAlert('정보를 다시 확인해수제요!', {
                confirm: '확인'
              })
          }
            })
            .catch(err => { this.showAlert(err.message); });
        }
      });
     
    },
  
  },

  created() {
       console.log('this.user:',this.user);
    this.$isBack = true;

this.checkList = this.$route.params.checkdata;

console.log( 'checklist:',this.checkList);
this.setHeader({
      visible: true,
      title: `체크리스트`,
      useBackButton: true,
    });
   
     var checklist = this.checkList.LIST.split("@");
      for(var i = 0 ; i < checklist.length; i++){
            this.LIST.push(checklist[i]);
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
.store-list-wrap2 {
  margin-bottom: 12px;

  select {
    width: 100%;
    padding: 7px;
    background: #fff;
    background-image: url('../assets/imgs/dropdown_arrow.png');
    background-repeat: no-repeat;
    background-size: 9px 8px;
    background-position-y: center;
    background-position-x: 97%;
    border: 1px solid #95a0b5;
    border-radius: 4px;
    min-height: auto;
    text-align-last: center;
    -webkit-box-align: center;
    font-size: .9rem;
    outline: none;
    appearance: none;

    option {
      text-align-last: center;
    }
  }
}
.store-list-wrap {
  padding: 20px 12px;
  background  : #fff;
  
  .store-wrap {
    position: relative;
    display: inline-block;
    margin-bottom: 12px;
    width: 100%;
    height: 33.33%;
    box-sizing: border-box;
    border-radius: 4px;
    box-shadow: 0 0 3px $gray;

    &:last-child {
      margin-bottom: 0;
    }

    .store-image-wrap {
      position: absolute;
      width: 100%;
      height: 100%;
      // background-color #9db6ca
      background-color: #fff;
      border-radius: 4px;
      overflow: hidden;

      img {
        display: block;
        margin: 0 auto;
        width: auto;
        height: auto;
        min-width: 100%;
        max-width: 100%;
        // max-height: 100%;
      }
    }

    .store-contents-wrap {
      position: relative;
      display: flex;
      padding: 14px 12px;
      width: 100%;
      height: 100%;
      background: -moz-linear-gradient(0deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.6) 50%);
      background: -webkit-linear-gradient(0deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.6) 50%);
      background: linear-gradient(0deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.6) 50%);
      border-radius: 4px;
      box-sizing: border-box;
      font-size: 0.9rem;
      color: #fff;

      .name {
        margin-bottom: 12px;
      }

      &:hover {
        background: rgba(0, 0, 0, 0.4);
      }

      & > div {
        flex: 1;

        strong {
          font-weight: 600;
        }
      }
    }
  }
}
</style>

