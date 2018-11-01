<template>
    <div style="background-color: white;">
<q-page >
  <section class="store-list-wrap">

        <div class="store-list-wrap2">
      <select v-model="selectedStoreSeq">
        <option value=0>매장을 선택하세요.</option>
        <option v-for="(store, index) in stores"
          :key="index"
          :value="store.STORE_SEQ">
          {{store.NAME}}
        </option>
      </select>
    </div>
    

  <div class="month-wrap">
          <button 
            v-if="beforeshow ==true"
            @click="before"
            type="button" class="btn-prev">
            <q-icon name="keyboard_arrow_left" size="1.6rem" />
            이전
          </button>
        {{showdata}}
          <button
            v-if="aftershow ==true"
            @click="after"
            type="button" class="btn-next">
             다음
            <q-icon name="keyboard_arrow_right" size="1.6rem" />
          </button>
        
        <button
            @click="today"
            type="button" class="btn-next">
             오늘
          </button>
        </div>


    <div
      @click="onClickStore(check)"
      v-for="(check, index) in Checkstores"
      :key="index"
      class="store-wrap"
      :style="{ height: `${listItemHeight}px` }">
      <div class="store-contents-wrap">
        

          <div>
            <strong class="name">
              {{check.TITLE}}  
            </strong> 
          </div>


          <div>
            <strong class="마감시간">
              {{check.END_TIME}}  
            </strong> 
          </div>

           <div>
            <strong class="체크여부">
              {{check.CS_SEQ}}  
            </strong> 
          </div>

            <div>
            <strong class="적용시작일자">
              {{check.START_DATE}}  
            </strong> 
          </div>

    
        
    

        </div>
  </div>
  
  <div v-if="memberStore== '1' && showadd == true" 
  style="background-color: blue;"
      @click="addCheck()"
      class="store-wrap"
      :style="{ height: `${listItemHeight}px` }">
     
 </div>
      <!-- <div class="store-contents-wrap">
        <div>
          <div>
            <strong class="name">
              {{store.NAME}}
              <small v-if="!isOwner && store.IS_MANAGER == 1">(매니저)</small>
            </strong>
            <span v-if="!isOwner && store.isEnded">(근무종료)</span>
          </div>
          <div v-if="store.empList">
            
              <q-icon name="person" color="white" />
              <span>{{store.empList.length}}명 중</span>
              <strong class="text-white">{{store.workingEmpList.length}}명</strong>
              <span>근무중</span>
              <small v-if="!isOwner && store.TYPE == 0" class="text-paleblue">(합류대기중)</small>
          
          </div>
          <div v-if="!isOwner">
            <small v-if="store.START">{{store.START | dateFormat('YYYY-MM-DD')}}</small>
            <small>~</small>
            <small v-if="store.END">{{store.END | dateFormat('YYYY-MM-DD')}}</small>
          </div>
        </div>
      </div> -->
    
  </section>

  <!-- <Modal v-model="visibleOwnerModal"
    :no-backdrop-dismiss="false"
    :maximized="true"
    position="bottom">
    <q-list no-border style="padding-top: 0">
      <q-item no-padding>
        <q-btn
          @click="viewDetail()"
          label="매장상세"
          class="full-width"
        />
      </q-item>

      <q-item-separator></q-item-separator>

      <q-item no-padding>
        <q-btn
          @click="viewEmpList(1)"
          label="직원목록"
          class="full-width"
        />
      </q-item>

      <q-item-separator></q-item-separator>

      <q-item no-padding>
        <q-btn
          @click="viewEmpList(0)"
          label="합류요청목록"
          class="full-width"
        />
      </q-item>
    </q-list>

    <div slot="footer">
      <q-btn
        @click="activeOwnerModal(false)"
        label="닫기"
        color="paleblue"
      />
    </div>
  </Modal> -->


</q-page>
</div>
</template>

<script>
import moment from "moment";
import AppLoader from "../components/Loader";
import Store from "../models/store";
import Emp from "../models/emp";
import storeService from "../services/store";

export default {
  name: "QRCheck",

  data() {
    return {
      aftershow :false,
      beforeshow :true,
      showdata :'',
     showadd :null,
         selectedStoreSeq: null,
      moreButtons: [],
    //  selectedStore: null,
      visibleOwnerModal: false,
      stores: [],
      waitStores: [],
      workEndedStores: [],
      stores :[],
      Checkstores :[],
      memberStore :'',
    };
  },

  computed: {
   

    listItemHeight() {
      let screenHeight = this.deviceHeight - 86 * 2;
      let itemMinHeight = 180;
      let divideNumber = Math.round(screenHeight / itemMinHeight);
      let height = screenHeight / divideNumber;

      return height;
    }
  },
  watch: {
    selectedStoreSeq() {
      if(this.selectedStoreSeq == '0'){
          this.showadd = false;
      }else{
          this.showadd = true;
      } 
      this.today();
    //  this.selectStore(this.selectedStoreSeq);
      },

         showdata() {
           console.log(this.showdata);
           var today = new Date();
            var selectdata = new Date(this.showdata);  
            selectdata.setDate(selectdata.getDate() + 1);
            if (today > selectdata) {
                this.aftershow =true,
                this.beforeshow = true;
                this.showadd = false;
            } else {
                this.aftershow =false,
                this.beforeshow = true;
                this.showadd = true;
            }
      },

    },
  methods: {
    today(){
// Return today's date and time
var currentTime = new Date()

// returns the month (from 0 to 11)
var month = currentTime.getMonth() + 1
if(month <10)
  month = '0'+month;
// returns the day of the month (from 1 to 31)
var day = currentTime.getDate()

// returns the year (four digits)
var year = currentTime.getFullYear()

// write output MM/dd/yyyy
//document.write(month + "/" + day + "/" + year)
    this.showdata = year+"-"+month+"-"+day;
     this.selectStore(this.selectedStoreSeq);
    },
      before(){



 var currentDate = new Date(this.showdata);
 currentDate.setDate(currentDate.getDate() - 1);
 var day = currentDate.getDate();
var month = currentDate.getMonth() + 1;
var year = currentDate.getFullYear()
if(month <10)
  month = '0'+month;
  if(day <10)
  day = '0'+day;
this.showdata = year+"-"+month+"-"+day;

 this.selectStore(this.selectedStoreSeq);

    },
    after(){
   var currentDate = new Date(this.showdata);
 currentDate.setDate(currentDate.getDate()+ 1);
 var day = currentDate.getDate();
var month = currentDate.getMonth() + 1;

var year = currentDate.getFullYear()
if(month <10)
  month = '0'+month;
  if(day <10)
  day = '0'+day;
this.showdata = year+"-"+month+"-"+day;

 this.selectStore(this.selectedStoreSeq);
    },

       /**
     * 매장 목록 조회
     *
     * @returns {Promise<Store[]>}
     */
    getStores() {
      return storeService.list3(this.user)
        .then(stores => this.stores = stores);
    },

  /**
     * 선택한 매장 데이터 가져오기
     *
     * @returns {Promise<Store[]>}
     */
    getStoreData(store_seq) {
      return storeService.getStoreList(store_seq,this.showdata)
        .then(stores => this.Checkstores = stores);
    },

       /**
     * 매장 선택
     *
     * @param {string} storeSeq
     */
    selectStore(storeSeq) {
     console.log('selectstore',storeSeq);
     //데이터 갱신
        this.getStoreData(storeSeq);
    },

    //새로추가
     addCheck(){
         // console.log('add');
           this.pagePush({
        name: "CheckRegister",
         params: {
            type : 0,
             STORE_SEQ :this.selectedStoreSeq,
        },
      });
        //  this.activeOwnerModal(true);
      },

 /** @param {boolean} activeStatus */
    activeOwnerModal(activeStatus) {
      this.visibleOwnerModal = activeStatus;
    },


    /** 체크데이터 클릭 
     *
     */
    onClickStore(check) {
     console.log('click check data',check);
     if(this.memberStore == 1){
         if(check.CS_SEQ > 0){
          this.pagePush({
        name: "CheckDetail",
        params: {
          check: check,
         
        },
        query: {
          check: check,
        }
      });
     }else{
        var today = new Date();
            var selectdata = new Date(this.showdata);  
            selectdata.setDate(selectdata.getDate() + 1);
            if (today > selectdata) {
              // 과거
                 this.pagePush({
        name: "CheckDetail",
        params: {
          check: check,
         
        },
        query: {
          check: check,
        }
      });
            } else {
              //현재
                 this.pagePush({
        name: "CheckRegister",
        params: {
            type : 1,
          check: check,
        },
        query: {
          check: check,
        }
      });
            }

      
     }
     }else{
        this.pagePush({
        name: "CheckDetail",
        params: {
          check: check,
         
        },
        query: {
          check: check,
        }
      });
     }
    
     
    },

  
  },

  created() {
// Return today's date and time
var currentTime = new Date()

// returns the month (from 0 to 11)
var month = currentTime.getMonth() + 1
if(month <10)
  month = '0'+month;
// returns the day of the month (from 1 to 31)
var day = currentTime.getDate()

// returns the year (four digits)
var year = currentTime.getFullYear()

// write output MM/dd/yyyy
//document.write(month + "/" + day + "/" + year)
    this.showdata = year+"-"+month+"-"+day;
    this.$isBack = false;
if(this.user.STORE == 0){
console.log('직원');
this.memberStore = 0;
}else{
console.log('점장');
this.memberStore =1 ;
}

    this.setHeader({
      visible: true,
      title: `체크목록`,
      useBackButton: false,
    });

      this.getStores()
      .then(() => {
        console.log(this.stores.length);
        if(this.stores.length == 0){
           this.showadd = false;
            return;
        }
        this.selectedStoreSeq = this.stores[0].STORE_SEQ;
      })
      .catch(err => this.showAlert(err.message));
  },

  mounted() {}
};
</script>

<style lang="stylus" scoped>
@import '../css/themes/common.variables.styl';

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

