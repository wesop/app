<template>
<q-page>
  <div class="page-wrap">
    <div class="field required">
      <div class="label">매장선택</div>
      <div class="text">
        <select v-model="selectedStoreSeq">
          <!-- <option>매장을 선택하세요.</option> -->
          <option v-for="(store, index) in stores"
            :key="index"
            :value="store.STORE_SEQ">
            {{store.NAME}}
          </option>
        </select>
      </div>
    </div>

    <div class="field required">
      <div class="label">직원선택</div>
      <div class="text">
        <select v-model="selectedEmpSeq">
          <!-- <option>직원을 선택하세요.</option> -->
          <option v-for="(emp, index) in empList"
            :key="index"
            :value="emp.EMP_SEQ">
            {{decodeURIComponent(emp.EMP_NAME)}}
          </option>
        </select>
      </div>
    </div>

    <div class="field required">
      <div class="label">출근일자</div>
      <div class="text">
        <div @click="showCalendar">
          <input v-model="selectedDate" type="hidden" />
          <span>{{selectedDate}}</span>
        </div>
      </div>
    </div>

    <div class="field required">
      <div class="label">근무일정(출근) 시간</div>
      <div class="text" text-right>
        <select v-model="createdData.start.hour" class="hour">
          <option :value="null">--</option> 
          <option v-for="hourValue in rendered.hours"
            :key="hourValue"
            :value="hourValue">
            {{('' + hourValue).padStart(2, 0)}}
          </option>
        </select>
        <span>:</span>
        <select v-model="createdData.start.min" class="min">
           <option :value="null">--</option> 
          <option v-for="minValue in rendered.mins"
            :key="minValue"
            :value="minValue">
            {{('' + minValue).padStart(2, 0)}}
          </option>
        </select>
      </div>
    </div>

    <div class="field required">
      <div class="label">근무일정(퇴근) 시간</div>
      <div class="text" text-right>
        <select v-model="createdData.end.hour" class="hour">
           <option :value="null">--</option> 
          <option v-for="hourValue in rendered.hours"
            :key="hourValue"
            :value="hourValue">
            {{('' + hourValue).padStart(2, 0)}}
          </option>
        </select>
        <span>:</span>
        <select v-model="createdData.end.min" class="min">
           <option :value="null">--</option>
          <option v-for="minValue in rendered.mins"
            :key="minValue"
            :value="minValue">
            {{('' + minValue).padStart(2, 0)}}
          </option>
        </select>
      </div>
    </div>


     <div class="field required">
      <div class="label">수당포함여부 선택</div>
      <div class="text" style="font-size:80%;">
         &nbsp;&nbsp;<q-radio
        v-model="scheduleType"
          color="paleblue"
          val="9"
          checked-icon="radio_button_checked"
          unchecked-icon="radio_button_unchecked"
          label="기본급 적용(1배)" /> 
           <br>
          &nbsp;&nbsp;<q-radio
        v-model="scheduleType"
          color="paleblue"
          val="8"
          checked-icon="radio_button_checked"
          unchecked-icon="radio_button_unchecked"
          label="초과근무수당 적용(1.5배)" />
           <br>
             &nbsp;&nbsp;<q-radio
        v-model="scheduleType"
          color="paleblue"
          val="7"
          checked-icon="radio_button_checked"
          unchecked-icon="radio_button_unchecked"
          label="야간근무수당 적용(1.5배)" />
           <br>
          &nbsp;&nbsp;<q-radio
        v-model="scheduleType"
          color="paleblue"
          val="6"
          checked-icon="radio_button_checked"
          unchecked-icon="radio_button_unchecked"
          label="초과,야간근무수당 적용(2배)" /> 
      </div>
    </div> 



  </div>

  <q-btn @click="createSchedule"
    label="등록하기"
    color="paleblue"
    class="btn-regist full-width" />

  <CalendarModal
    v-model="visibleCalendar"
    @select="setDate"
  />
</q-page>
</template>

<script>
import storeService from '../services/store'
import managementService from '../services/management'
import scheduleService from '../services/schedule'

export default {
  name: 'ScheduleRegist',

  data()  {
    return {
      selectedStoreSeq: null,
      stores: [],
      selectedDate: '',

      scheduleType :'9',
      selectedEmpSeq: null,
      empList: [],

      visibleCalendar: false,

      rendered: {
        hours: [],
        mins: []
      },

      createdData: {
        start: {
          hour: null,
          min: null
        },
        end: {
          hour: null,
          min: null
        }
      }
    }
  },

  watch: {
    selectedStoreSeq()  {
      this.getEmpList()
        .catch(err => this.showAlert(err.message));
    }
  },

  computed: {
    selectedStore() {
      let store = {};

      this.stores.some(_store => {
        if(_store.STORE_SEQ === this.selectedStoreSeq) {
          store = _store;

          return true;
        }
      });

      return store;
    },

    selectedEmp() {
      let emp = {};

      this.empList.some(_emp => {
        if(_emp.EMP_SEQ === this.selectedEmpSeq) {
          emp = _emp;

          return true;
        }
      });

      return emp;
    },
  },

  methods: {
    getEmpList()  {
      this.empList = [];

      return storeService.getEmpList(this.selectedStoreSeq)
        .then(empList => {
          this.empList = empList;

          if(empList.length)  this.selectedEmpSeq = empList[0].EMP_SEQ;
        });
    },

    showCalendar()  {
      this.visibleCalendar = true;
    },

    /**
     * @param {Date} date
     */
    setDate(date)  {
      this.selectedDate = date;
    },

    checkHourValue(value)  {
      if(typeof value === 'number' && value >= 0 && value <= 24)  return true;
      return false;
    },

    checkMinValue(value)  {
      if(typeof value === 'number' && value >= 0 && value <= 59)  return true;
      return false;
    },

    createSchedule()  {
      this.showAlert('일정을 등록하시겠습니까?', {
        cancel: '취소',
        confirm: '등록'
      })
      .then(create => {
        if(create)  {
          let startHour = this.createdData.start.hour,
            startMin = this.createdData.start.min,
            endHour = this.createdData.end.hour,
            endMin = this.createdData.end.min,
            startTime = scheduleService.getHourMinToTime(startHour, startMin),
            endTime = scheduleService.getHourMinToTime(endHour, endMin);

          if(!this.checkHourValue(startHour)
            || !this.checkMinValue(startMin)
            || !this.checkHourValue(endHour)
            || !this.checkMinValue(endMin)) {
            setTimeout(() => { this.showAlert('근무일정시간을 정확히 입력해주세요.'); }, 0)
            return;
          }

          if(scheduleService.getDifferentTime(startTime, endTime) <= 0) {
            endTime = scheduleService.getHourMinToTime(endHour + 24, endMin);
          }

          managementService.createSchedule( 
            this.selectedStoreSeq,
            this.selectedEmpSeq,
            this.selectedEmp.EMP_NAME,
            this.selectedStore.NAME,
            this.selectedDate,
            startTime,
            endTime,
            this.scheduleType,
            '3',
          )
          .then(body => {
           if( body.message =='ALREADY_SUCCESS' ){
              this.showAlert('이미 등록된 일정이 있습니다.')             
           }else if(body.message =='SUCCESS' ){
               this.showAlert('등록을 완료했습니다!')
              .then(() => this.back());
           }else{
              this.showAlert('등록 실패. 정보를 다시확인해주세요.')
           }
           
          })
          .catch(err => this.showAlert(err.message));
        }
      });
    }
  },

  created() {
//     this.createdData.start.min =Number("00");
//      this.createdData.end.min =Number("00");

//  this.createdData.start.hour =Number("00");
//      this.createdData.end.hour =Number("00");

    let query = this.$route.query;

    this.selectedStoreSeq = query.selectedStoreSeq;
    this.stores = query.stores;
    this.selectedDate = query.selectedDate;

    for(let hourValue = 0; hourValue <= 24; hourValue++)  {
      this.rendered.hours.push(hourValue);
    }

    for(let minValue = 0; minValue <= 59; minValue++)  {
      this.rendered.mins.push(minValue);
    }

    this.setHeader({
      visible: true,
      title: '일정 등록',
      useBackButton: true,
      buttons: []
    });
  }
}
</script>

<style lang="stylus" scoped>
@import "../css/themes/common.variables.styl"

.page-wrap {
  padding: 20px 12px;
  color: $darkblue;
}

select {
  width: 100%;
  padding: 0 0;
  background-color: #fff;
  background-image: url('../assets/imgs/dropdown_arrow.png');
  background-repeat: no-repeat;
  background-size: 9px 8px;
  background-position-y: center;
  background-position-x: 97%;
  appearance: none;
  border: 0;
  min-height: auto;
  outline: none;
  color: $darkblue;
}

.hour, .min {
  width: auto;
  background: none;
  border: 0;
  appearance: none;
  font-family: 'NanumSquare';
  color: $gray;
}

.schedule-wrap
  font-size 1rem

.btn-regist {
  position: fixed;
  bottom: 0;
  height: 58px;
  z-index: 5999;
}

</style>
