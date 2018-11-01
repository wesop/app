<template>
    <div style="background-color: white;">
<q-page >

<form>
    <div class="field required">
      <div class="label">체크포인트</div>
      <div class="text">
        <q-input
          v-model="check.TITLE"
          hide-underline
          type="text"
          placeholder="예:주방" />
      </div>
    </div>

    <div class="field required">
      <div class="label">체크리스트</div>
       <div class="text">
        <q-input
          v-model="LISTNAME"
          hide-underline
          type="text"
          placeholder="예:에어컨 끄기" />
      </div>
      <div class="text">
         <q-btn
      @click="add"
      :label="'리스트 추가'"
      color="paleblue"
      class="btn-write full-width" />
        <!-- <button class="btn-add-sch" @click="add">
       리스트 추가
        <q-icon name="add_circle" color="paleblue" size="1.5rem" />
      </button>  -->
    </div>

     
      <div class="text"
       v-for="(list, index) in LIST"
      :key="index"
      >
        {{index+1}}번-{{list}}
        <q-btn
      @click="deletethis(index)"
      :label="'리스트 삭제'"
      color="paleblue"
      class="btn-write full-width" />
      </div>
   


</div>

        <div class="field required">
      <div class="label">마감시간</div>
      <div class="text">
        <select v-model="createdData.start.hour" class="hour">
          <option :value="null">00</option>
          <option v-for="hourValue in rendered.hours"
            :key="hourValue"
            :value="hourValue">
            {{('' + hourValue).padStart(2, 0)}}
          </option>
        </select>
         <span>:</span>
        <select v-model="createdData.start.min" class="min">
          <!-- <option :value="null">분</option> -->
          <option v-for="minValue in rendered.mins"
            :key="minValue"
            :value="minValue">
            {{('' + minValue).padStart(2, 0)}}
          </option>
        </select>
      </div>
    </div>


  </form>

<div class="btn-area">
    <q-btn
      @click="register"
      :label="Number(clickbutton) ? '등록하기' : '수정하기'"
      color="paleblue"
      class="btn-write full-width" />
  </div>


</q-page>
</div>
</template>

<script>
import moment from "moment";
import AppLoader from "../components/Loader";
import Check from "../models/check";
import storeService from "../services/store";
import scheduleService from '../services/schedule'
export default {
  name: "CheckRegister",

  data() {
    return {
      check :null,
       TITLE: null,
       LISTNAME :null,
       LIST :[],
     clickbutton :1,
       rendered: {
        hours: [],
        mins: []
      },
       createdData: {
        start: {
          hour: null,
          min: null
        }
      }
    };
  },

  computed: {
   

    
  },
  watch: {
    
    },
  methods: {
    register()  {

      console.log(this.LIST);
      console.log(this.createdData);
 let startHour = this.createdData.start.hour,
            startMin = this.createdData.start.min,
            startTime = scheduleService.getHourMinToTime(startHour, startMin);
      if(this.clickbutton){

 this.showAlert('체크리스트를 등록하시겠습니까?', {
        cancel: '취소',
        confirm: '등록'
      })
      .then(register => {
        if(register)  {
          storeService.Checkregister(this.check.STORE_SEQ,this.check.TITLE,this.LIST,startTime.toString())
            .then(async (result) => {
              if(result.message == 'SUCCESS'){
                this.showAlert('체크리스트를 등록됐습니다!')
                  .then(() => this.back());
              }else{
                this.showAlert(result.result)
                .then(() => this.back());
              }
           //   console.log('check:"',result);    
            })
            .catch(err => { this.showAlert(err.message); });
        }
      });

      }else{

 this.showAlert('체크리스트를 수정하시겠습니까?', {
        cancel: '취소',
        confirm: '수정'
      })
      .then(register => {
        if(register)  {
          //console.log('this.check:',this.check);
          storeService.CheckUpdate(this.check.CHECK_SEQ,this.check.TITLE,this.LIST,startTime.toString())
            .then(async (check) => {
     
              console.log('check:"',check);
              this.showAlert('체크리스트를 수정됐습니다!')
                .then(() => this.back());
            })
            .catch(err => { this.showAlert(err.message); });
        }
      });

      }
     
    },
add(){
 // console.log(this.check.LISTNAME);
 if(this.LISTNAME == null || this.LISTNAME == "")
  return;
  this.LIST.push(this.LISTNAME);
  this.LISTNAME =null;
},

deletethis(index){
 console.log(index);
 this.LIST.splice(index,1);
},
  
  },

  created() {
    this.$isBack = true;
console.log(this.$route.params);
 if(this.$route.params.type ==  0){
      this.check = new Check;
      this.check.STORE_SEQ = this.$route.params.STORE_SEQ;
      this.setHeader({
      visible: true,
      title: `체크정보등록`,
      useBackButton: true,
      
    });
    this.clickbutton = 1;
    this.createdData.start.min =Number("00");
  
 }else{
    this.check = this.$route.params.check;
    this.setHeader({
      visible: true,
      title: `체크정보수정`,
      useBackButton: true,
    
    });
     this.clickbutton = 0;
     var time = this.check.END_TIME.split(":");
      var checklist = this.check.LIST.split("@");
      for(var i = 0 ; i < checklist.length; i++){
            this.LIST.push(checklist[i]);
      }
     console.log(time[0]);
     console.log(time[1]);
     this.createdData.start.hour =Number(time[0]);
     this.createdData.start.min =Number(time[1]);
 }
   
   

 

    for(let hourValue = 0; hourValue <= 24; hourValue++)  {
      this.rendered.hours.push(hourValue);
    }

    for(let minValue = 0; minValue <= 59; minValue++)  {
      this.rendered.mins.push(minValue);
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

