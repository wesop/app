<template>
<q-page v-show="emp">
  <div class="page-wrap">
    <div class="field">
      <div class="image-wrap huge">
        <img v-if="emp.images.length" :src="'http://api.shop-sol.com/uploads/' + emp.images[0].IMAGE" alt="emp_profile" />
        <img v-else src="../assets/imgs/pserson.png" alt="emp_profile" />
      </div>
      <div class="profile-wrap">
        <div class="text name-wrap">{{decodeURIComponent(emp.EMP_NAME)}}</div>
      </div>
    </div>

    <div v-if="emp.TYPE != 0" class="accepted-wrap">
      <div class="field" v-if="this.user.STORE==='1'">
        <div class="label">직책 및 권한</div>
        <div class="text">
          <q-radio
            v-model="emp.IS_MANAGER"
            unchecked-icon="radio_button_unchecked"
            checked-icon="radio_button_checked"
            color="paleblue"
            val="0"
            label="직원" />
          <q-radio
            v-model="emp.IS_MANAGER"
            unchecked-icon="radio_button_unchecked"
            checked-icon="radio_button_checked"
            color="paleblue"
            val="1"
            label="매니저" />
          <div>
            <small>* 매니저는 매장 직원의 출퇴근 및 급여(선택가능)를 확인할 수 있습니다.</small>
          </div>
        </div>
      </div>

      <div class="field required">
        <div class="label">근무시작 적용일</div>
        <div @click="showCalendar('START')" class="text">
          <input v-show="false" v-model="emp.START" type="text" />
          <span v-if="emp.START">{{emp.START | dateFormat('YYYY년 MM월 DD일')}}</span>
          <span v-else class="text-gray">근무 적용일</span>
        </div>
      </div>

      <div class="field">
        <div class="label">근무 종료일</div>
        <div @click="showCalendar('END')" class="text">
          <input v-show="false" v-model="emp.END" type="text" />
          <span v-if="emp.END">{{emp.END | dateFormat('YYYY년 MM월 DD일')}}</span>
          <span v-else class="text-gray">근무 종료일</span>
        </div>
        <div class="text">
          <div class="checkbox-wrap not-end-wrap">
            <q-checkbox v-model="notEnd"
              true-value="1"
              false-value="0"
              label="근무종료일 없음"
              unchecked-icon="check_box_outline_blank"
              checked-icon="check_box"
              color="paleblue" />
          </div>
        </div>
<q-item-separator></q-item-separator>

        <!-- <div v-if="type == '0'">
          <div class="label">근무 일정</div>
          <div class="text">
            <div v-for="(sch, index) in sortedEmpSchedules"
              :key="index"
              class="schedule-wrap">
              <div class="day-wrap">{{sch.DAY | localeText('DAYS')}}</div>
              <div class="time-wrap">
                <span>{{sch.ATTENDANCE_TIME}}</span>
                <span>~</span>
                <span>{{sch.WORK_OFF_TIME}}</span>
              </div>
              <button @click="removeEmpSchedule(sch, index)" type="button" class="btn-remove-schedule">삭제</button>
              <button @click="editEmpSchedule(sch)" type="button" class="btn-edit-schedule">변경</button>
            </div>
            <button @click="createEmpSchedule" class="btn-add-sch">추가</button>
          </div>
        </div> -->
      </div>
        
        
         <div v-if="this.user.STORE==='1'" class="field"> 
          <div class="label">
           직원급여  노출여부
        </div>
         <div class="text">
          <div class="checkbox-wrap">
              <q-checkbox 
               v-model="emp.PAY_SHOW"
              true-value="1"
              false-value="0"
              label="선택시 본인급여 확인가능"
              unchecked-icon="check_box_outline_blank"
              checked-icon="check_box"
              color="paleblue" />
          </div>
        </div>
        
        </div> 


            <div v-if="this.user.STORE==='1' && ismanager == '1'" class="field"> 
          <div class="label">
           [매니저인 경우] 타직원급여 노출여부
        </div>
         <div class="text">
          <div class="checkbox-wrap">
                <q-checkbox v-if="ischecked =='0'"
               v-model="emp.OTHERPAY_SHOW"
              readonly
              true-value="1"
              false-value="0"
              label="선택시 타직원 급여 확인가능"
              unchecked-icon="check_box_outline_blank"
              checked-icon="check_box"
              color="paleblue" />
               <q-checkbox v-if="ischecked =='1'"
               v-model="emp.OTHERPAY_SHOW"
              true-value="1"
              false-value="0"
              label="선택시 타직원 급여 확인가능"
              unchecked-icon="check_box_outline_blank"
              checked-icon="check_box"
              color="paleblue" />
           
          </div>
        </div>
        
        </div> 


   <div v-if="this.user.STORE==='1' && ismanager == '1'" class="field"> 
          <div class="label">
           [매니저인 경우] 일정수정 권한
          </div>

         <div class="text">
          <div class="checkbox-wrap">
               <q-checkbox 
               v-model="emp.CalendarEdit"
              true-value="1"
              false-value="0"
              label="선택시 직원 일정 수정가능"
              unchecked-icon="check_box_outline_blank"
              checked-icon="check_box"
              color="paleblue" />  
          </div>
        </div>
        
  </div> 


       
         <div class="field">
        <div class="label">
          급여적용
        </div>
        <div class="text">
          <div class="checkbox-wrap">
          <!-- <q-checkbox v-if="storefivetype === '0'"
            v-model="emp.THREE_ALLOWANCE"
              readonly
              true-value="1"
              false-value="0"
              label="3대 수당"
              unchecked-icon="radio_button_unchecked"
              checked-icon="radio_button_checked"
              color="paleblue"
            /> -->
          <q-checkbox v-if="storefivetype === '1'"
            v-model="emp.THREE_ALLOWANCE"
              true-value="1"
              false-value="0"
              label="3대 수당"
              unchecked-icon="radio_button_unchecked"
              checked-icon="radio_button_checked"
              color="paleblue"
            /> 
            <small  v-if="storefivetype === '1'" @click="showHelpModal('3대 수당')">* 3대 수당이란?</small>
            
          </div>
          
        </div>
        
        <div class="text">
          <div class="checkbox-wrap">
             <q-checkbox
              v-model="emp.REST_ALLOWANCE"
              true-value="1"
              false-value="0"
              label="휴게시간"
              unchecked-icon="radio_button_unchecked"
              checked-icon="radio_button_checked"
              color="paleblue" /> 
            <small @click="showHelpModal('휴게시간')">* 휴게시간이란?</small>
          </div>
        </div>
        <div class="text">
          <div class="checkbox-wrap">
             <q-checkbox 
             v-model="emp.WEEKEND_ALLOWANCE"
              true-value="1"
              false-value="0"
              label="주휴수당"
              unchecked-icon="radio_button_unchecked"
              checked-icon="radio_button_checked"
              color="paleblue"
            /> 
              <small @click="showHelpModal('주휴수당')">* 주휴수당이란?</small> 
          </div>
        </div>
        
        <!-- <q-item-separator></q-item-separator> -->
</div>
       
           <!-- <div  v-if="this.user.STORE==='1' || ismanager == '1'"  class="field"> -->
             <div  class="field">
          <div>
            <small>* 2018년 최저시급은 <span class="text-em">7,530원</span> 입니다.</small><br>
          </div>

          <div class="text-paleblue pay-input-wrap" text-right>
            <select v-model="emp.PAY_TYPE" readonly="readonly">
              <option value="0" selected>시급</option>
             <option value="1">일급</option> 
             <option value="2">월급</option> 
            </select>
            <input v-model="emp.PAY"
              text-right
              min="7530"
              color="paleblue"
              type="number"
              maxlength="7"
              placeholder="급여" />
            <span>원</span>
          </div>

        </div>

      

      <div class="field">
        <div class="label">급여지급일</div>
        <div class="text text-paleblue" text-right>
          <span>매월 </span>
          <input v-model="emp.PAY_DAY"
            text-right
            type="number"
            max="31"
            min="1"
            maxlength="2"
            placeholder="급여" />
          <span>일</span>
        </div>
      </div>
    </div>
 </div>
  <q-btn
    @click="update"
    v-if="emp.TYPE"
    label="직원정보 수정하기"
    color="paleblue"
    class="btn-update full-width" />

  <CalendarModal
    v-model="visibleCalendar"
    @select="setDate"
  />

  <EmployeeScheduleAddModal v-model="visibleScheduleAdd"
    :scheduleData="selectedSch"
    @set="setSchedule" />

  <HelpSalaryModal v-model="visibleHelp" :title="helpTitle" />
</q-page>
</template>

<script>
import empService from '../services/emp'
import scheduleService from '../services/schedule'
import Emp from '../models/emp'
import EmpSchedule from '../models/emp-schedule'

export default {
  name: 'EmployeeModify',

  data()  {
    return {
      storeSeq: '',
      empSeq: '',
   
      /** @type {Emp} */
      emp: null,
ismanager :'0',
ischecked :'0',
      /** @type {EmpSchedule[]} */
      empSchedules: [],
storefivetype : null,
      /**
       * 직원 목록 유형(1: 합류된 직원, 0: 합류요청한 직원)
       * @type {string}
       */
      type: null,

      /**
       * 근무 종료일 설정 플래그(0: 설정, 1: 비설정)
       */
      notEnd: '0',

      disabled: [],

      visibleCalendar: false,
      calendarFlag: null,

      visibleTimeInput: false,
      selectedSch: null,
      timeFlag: null,

      visibleScheduleAdd: false,

      visibleHelp: false,
      helpTitle: null
    }
  },

  watch: {
    'emp.PAY': function(payValue, beforePayValue) {
      if(payValue.length > 7)  {
        this.emp.PAY = beforePayValue;
      }
    },

    'emp.PAY_DAY': function(payDayValue, beforePayDayValue) {
      if(payDayValue.length > 2)  {
        this.emp.PAY_DAY = beforePayDayValue;
      }
    },
      'emp.PAY_SHOW' : function(payDayValue, beforePayDayValue) {
      console.log(payDayValue);
       console.log(beforePayDayValue);
       
        if(payDayValue == '1'){
            this.ischecked ='1';
      }else{
          this.ischecked ='0';
          this.emp.OTHERPAY_SHOW = '0';
      }
    },

     'emp.IS_MANAGER': function(payDayValue, beforePayDayValue) {
      console.log(payDayValue);
      if(payDayValue == '1'){
this.ismanager = '1';
      }else{
this.ismanager = '0';
      }

     //  console.log(beforePayDayValue);
    },

    visibleScheduleAdd()  {
      if(this.visibleScheduleAdd === false) {
        this.selectedSch = null;
      }
    },

    notEnd()  {
      if(this.notEnd == '1')  {
        this.emp.END = null;
      }
    },

    'emp.END': function(end, beforeEnd) {
      if(end) {
        this.notEnd = '0'
      }
    }
  },

  computed: {
    sortedEmpSchedules()  {
      return this.empSchedules.sort((a, b) => a.DAY - b.DAY);
    }
  },

  methods: {
    /**
     * 직원 정보 조회
     *
     * @returns {Promise<Emp>}
     */
    getEmp()  {
      return empService.get(this.empSeq);
    },

    /**
     * 직원 정보 조회
     *
     * @returns {Promise<EmpSchedule[]>}
     */
    getEmpSchedules()  {
      return empService.getSchedules(this.empSeq);
    },

    /**
     * 직원 일정 생성
     */
    createEmpSchedule() {
      if(this.empSchedules.length >= 7) return;

      let sch = new EmpSchedule;

      sch.EMP_SEQ = this.empSeq;

      // this.selectedSch = sch;
      this.visibleScheduleAdd = true;
    },

    /**
     * 직원 일정 설정
     *
     * @param {number[]} days
     * @param {string} startTime HH:mm
     * @param {string} endTime HH:mm
     */
    setSchedule(days, startTime, endTime) {
      let selectedSch = this.selectedSch;

      if(selectedSch) {
        /**
         * 이미 추가된 일정(혹은 추가될 일정)이 수정 경우의 코드
         */
        selectedSch.DAY = days[0];
        selectedSch.ATTENDANCE_TIME = startTime;
        selectedSch.WORK_OFF_TIME = endTime;
      } else {
        /**
         * EMP_SCH_SEQ 값이 -1이고 DAY값이 null 이면 새로 추가할 일정
         */

        days.forEach(day => {
          let sch = new EmpSchedule;

          sch.EMP_SEQ = this.empSeq;

          sch.DAY = day;
          sch.ATTENDANCE_TIME = startTime;
          sch.WORK_OFF_TIME = endTime;

          this.empSchedules.push(sch);
        });
      }

      this.selectedSch = null;
    },

    /**
     * 기존 일정 정보 수정
     *
     * @param {EmpSchedule} empSch
     */
    editEmpSchedule(empSch) {
      this.selectedSch = empSch;
      this.visibleScheduleAdd = true;
    },

    /**
     * 직원 일정 삭제
     *
     * @param {EmpSchedule} empSch
     * @param {number} index
     */
    removeEmpSchedule(empSch, index) {
      if(empSch.EMP_SCH_SEQ != undefined && empSch.EMP_SCH_SEQ != null && empSch.EMP_SCH_SEQ != -1) {
        /**
         * empSch.EMP_SCH_SEQ가 있을 경우에는 USE_FLAG를 '0'으로 변경
         */
        empSch.USE_FLAG = '0'
      } else {
        /**
         * empSch.EMP_SCH_SEQ가 없는 경우에는 배열에서 제거
         */
        this.empSchedules = this.empSchedules.slice(0, index).concat(this.empSchedules.slice(index + 1));
      }
    },

    /**
     * 직원 정보 수정
     */
    update()  {
      empService.update(this.emp)
        .then(() => {
          // if(this.type == 0)  {
          //   this.updateSchedules()
          // }
        })
        .then(() => {
          this.showAlert('직원 정보를 수정했습니다.')
            .then(() => this.back());
        })
        .catch(err => this.showAlert(err.message));
    },

    /**  
     * 직원 일정 정보 수정
     */
    updateSchedules()  {
      /** @type {EmpSchedule[]} */
      let empSchedules = this.empSchedules;

      empSchedules.forEach(empSch => {
        empSch.START = this.emp.START.split(/\s/)[0];
        empSch.END = null;

        if(empSch.ATTENDANCE_TIME > empSch.WORK_OFF_TIME) {
          let { hour, min } = scheduleService.getTimeToHourMin(empSch.WORK_OFF_TIME);

          hour += 24;

          empSch.WORK_OFF_TIME = scheduleService.getHourMinToTime(hour, min);
        }
      });

      return empService.updateSchedules(this.empSchedules);
    },

    /**
     * @param {string} flag 근무 시작/종료 구분값('START', 'END')
     */
    showCalendar(flag)  {
      this.calendarFlag = flag;
      this.visibleCalendar = true;
    },

    /**
     * @param {Date} date
     */
    setDate(date)  {
      this.emp[this.calendarFlag] = date;
    },

    /**
     * 도움말 보기
     *
     * @param {string} helpTitle
     */
    showHelpModal(helpTitle) {
      this.visibleHelp = true;
      this.helpTitle = helpTitle;
    }
  },

  created() {
    this.empSeq = this.$route.params.id;
    this.emp = this.$route.query.emp;
    this.type = this.$route.query.type;
    this.storeSeq = this.$route.query.storeSeq;
    this.empSchedules = [];

    
 console.log('this.user:',this.user);
  console.log('M this.emp"',this.emp);
  console.log('M query.emp"',this.$route.query.emp);

    this.storefivetype = this.$route.query.storefivetype;
    
    //this.emp.START
   // this.emp.PAY_TYPE = 0;

    if(!this.emp.END)  {
      this.notEnd = '1'
    }

    if(!this.emp.PAY_DAY) {
      this.user.stores.some(store => {
        if(store.STORE_SEQ == this.storeSeq) {
          this.emp.PAY_DAY = store.PAY_DAY;
          return true;
        }
      });
    }

    // this.getEmp()
    //   .then(emp => this.emp = new Emp(emp))
    //   .then(this.getEmpSchedules)
    this.getEmpSchedules()
      .then(empSchedules => {
        this.empSchedules = [];

        empSchedules = empSchedules.sort((a, b) => b.EMP_SCH_SEQ - a.EMP_SCH_SEQ);

        empSchedules.some((empSch, index) => {
          let pushedEmpSch = this.empSchedules[index - 1];

          if(pushedEmpSch && pushedEmpSch.REG_DATE !== empSch.REG_DATE) {
            return true;
          }

          let { hour, min } = scheduleService.getTimeToHourMin(empSch.WORK_OFF_TIME);

          if(hour >= 24)  {
            hour -= 24;
            empSch.WORK_OFF_TIME = scheduleService.getHourMinToTime(hour, min);
          }

          this.empSchedules.push(empSch);
        });
      })
      .catch(err => this.showAlert(err.message));

    this.setHeader({
      visible: true,
      title: '직원정보 수정',
      useBackButton: true
    });

  if(!this.emp.PAY_TYPE){
    this.emp.PAY_TYPE = '0';
  }
  }
}
</script>

<style lang="stylus" scoped>
@import "../css/themes/common.variables.styl"

.page-wrap {
  padding: 20px 23px 0;
  color: $darkblue;
}

.image-wrap {
  display: inline-block;
}

&.profile-wrap {
  display: inline-block;
  line-height: 55px;
  vertical-align: top;
  font-size: 1rem;

  .name-wrap {
    margin-top: 8px;
    margin-bottom: 10px;
    font-size: 1.5rem;
    font-weight: 600;
    color: $darkblue;
  }

  .period-wrap {
    margin-top: 10px;
    font-size: .7rem;
  }
}

.checkbox-wrap {
  margin-bottom: .5em;

  small {
    vertical-align: middle;
  }

  &.not-end-wrap {
    margin-top: 4px;
    font-size: 0.9rem;
  }
}

input {
  padding: 0;
  border: 0;
  color: $paleblue;
  outline: none;
}

.schedule-wrap
  font-size 1rem

.btn-add-sch {
  width: 100%;
  background-color: #9db6ca;
  border: 0;
  line-height: 44px;
  font-size: 1rem;
  color: #fff;
}

.schedule-wrap {
  clear: both;
  margin: .7em 0;

  .day-wrap {
    display: inline-block;
    margin-right: 9px;
    width: 34px;
    height: 34px;
    background: $paleblue;
    text-align: center;
    line-height: 34px;
    border-radius: 50%;
    color: #fff;
  }

  .time-wrap {
    display: inline-block;
    vertical-align: middle;
    font-size: 1.2rem;
  }

  button {
    float: right;
    padding: 0 12px;
    height: 33px;
    border: 0;
    border-radius: 2px;
    font-size: .9rem;
    color: #fff;

    &.btn-edit-schedule {
      margin-right: 5px;
      background-color: $paleblue;
    }

    &.btn-remove-schedule {
      background-color: $em;
    }
  }
}

.q-radio {
  float: left;
  width: 50%;
}

.btn-update {
  position: fixed;
  bottom: 0;
  height: 58px;
  z-index: 5999;
}

.pay-input-wrap {
  position: relative;

  select {
    position: absolute;
    left: 0;
    border: 0;
    background: none;
    color: $paleblue;
    -webkit-appearance: none;
    outline: none;
  }
}
</style>

