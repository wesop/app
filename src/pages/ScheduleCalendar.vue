<template>
<q-page>
  <section class="page-wrap">
    <div class="store-list-wrap">
      <select v-model="selectedStoreSeq">
        <!-- <option>매장을 선택하세요.</option> -->
        <option v-for="(store, index) in stores"
          :key="index"
          :value="store.STORE_SEQ">
          {{store.NAME}}
        </option>
      </select>
    </div>

    <div class="calendar-wrap">
      <header class="calendar-header">
        <q-btn
          @click="renderCalendar(-1)"
          icon="keyboard arrow left"
          color="white"
          size="1.425rem"
          class="text-darkblue" />

        <span>{{ calendarDate | dateFormat('YYYY년 M월') }}</span>

        <q-btn
          @click="renderCalendar(1)"
          icon="keyboard arrow right"
          color="white"
          size="1.425rem"
          class="text-darkblue" />

        <q-btn @click="showGuide = true"
          icon-right="info_outline"
          text-color="blue"
          class="btn-guide" />

        <!-- <q-btn
          @click="renderCalendar(0)"
          label="Today"
          color="black"
          class="today" /> -->
      </header>

      <full-calendar
        v-if="config"
        ref="calendar"
        :config="config"
        :header="false"
        :defaultView="'month'"
        :editable="false"
        :selectable="true">
      </full-calendar>
    </div>

    <div class="day-schedule-list-wrap">
      <div v-for="(schedule, index) in renderedSchedules"
        :key="index"
        class="field">
        <div>
          <div class="image-wrap">
            <img v-if="schedule.images && schedule.images.length" :src="'http://api.shop-sol.com/uploads/' + schedule.images[0].IMAGE" alt="emp_profile" >
            <img v-else src="../assets/imgs/pserson.png" alt="emp_profile" />
          </div>
          <div class="profile-wrap">
            <div class="text name-wrap">
              <span class="name">{{decodeURIComponent(schedule.EMP_NAME)}}</span>
              <button v-for="status in schedule.status"
                :key="status"
                type="button"
                :class="'status ' + status">
                {{status | localeText('WORKING_STATUS') }}
              </button>
            </div>
            <div class="text time-wrap text-gray">
              <span>
                 {{(schedule.START || schedule.ATTENDANCE_TIME) | convertOver24Hour}}
                ~
                {{(schedule.END || schedule.WORK_OFF_TIME) | convertOver24Hour}}
              </span>
              <span v-if="schedule.CHANGE_START">
                <q-icon name="arrow_forward" size=".75rem" />
                {{schedule.CHANGE_START | convertOver24Hour}}
                ~
                {{schedule.CHANGE_END | convertOver24Hour}}
              </span>

              <div class="text-paleblue">
                <span v-if="schedule.START_TIME">
                  {{schedule.START_TIME | convertOver24Hour}}
                </span>
                <span v-else>미출근</span>
                <span>~</span>
                <span v-if="schedule.END_TIME">
                  {{schedule.END_TIME | convertOver24Hour}}
                </span>
                <span v-else>미퇴근</span>

                <span v-if="schedule.UPDATED_START" class="text-paleblue">
                  <q-icon name="arrow_forward" size=".75rem" />
                  {{(schedule.UPDATED_START) | convertOver24Hour}} ~
                  {{(schedule.UPDATED_END) | convertOver24Hour}}
                </span>
              </div>

            </div>
          </div>
        </div>

        <div style="background:#4f95c3;"  class="btn-more-wrap">
          <!-- <button v-if="!schedule.IS_FUTURE" @click="setNormalAttendanceTime(schedule)">
            <q-icon name="alarm" />
            정상출근
          </button>
          <button v-if="!schedule.IS_FUTURE" @click="setNormalWorkOffTime(schedule)">
            <q-icon name="alarm" />
            정상퇴근
          </button> -->
          <button  @click="visibleScheduleEditModal1 = true; selectedSchedule = schedule;">
            <q-icon name="edit" />
            출퇴근시간 수정
          </button>
          <button @click="visibleScheduleEditModal2 = true; selectedSchedule = schedule;">
            <q-icon name="edit" />
            근무일정 수정
          </button>
        </div>
      </div>
    </div>
  </section>

  <ScheduleEditModal v-if="selectedSchedule"
    v-model="visibleScheduleEditModal1"
    :schedule="selectedSchedule"
    @requestUpdate="requestUpdate" />

      <ScheduleEditModal2 v-if="selectedSchedule"
    v-model="visibleScheduleEditModal2"
    :schedule="selectedSchedule"
    @requestUpdate="requestUpdate" />

  <CalendarGuideModal v-model="showGuide" />
</q-page>
</template>

<script>
import _ from 'underscore'
import moment, { Moment } from 'moment'
import ScheduleEditModal from '../components/ScheduleEditModal.vue'
import ScheduleEditModal2 from '../components/ScheduleEditModal2.vue'
import Store from '../models/store'
import StoreSchedule from '../models/store-schedule'
import Emp from '../models/emp'
import EmpSchedule from '../models/emp-schedule'
import storeService from '../services/store'
import managementService from '../services/management'
import empService from '../services/emp'
import scheduleService from '../services/schedule'
import TimeTableService from '../services/timetable'

export default {
  name: 'ScheduleCalendar',

  data()  {
    return {
      selectedStoreSeq: null,
      stores: [],
      storeSchedules: [],
      empList: null,
      empListSchedules: null,

      calendar: null,
      defaultDate: new Date,
      calendarDate: null,
      config: null,

      renderedSchedules: [],
      renderedSchedulesMap: {},
      selectedDate: new Date,
      selectedSchedule: null,
      visibleScheduleEditModal1: false,
      visibleScheduleEditModal2: false,
      showGuide: false,
      moreButtons: [],
      today: new Date,
    }
  },

  watch: {
    selectedStoreSeq() {
      this.selectStore(this.selectedStoreSeq);
    },

    selectedDate(current, before)  {
      /**
       * OPTIMIZE
       * vue-full-calendar 의 getDate를 사용할 경우 UTC가 +0900이 되어버림
       */
      // this.selectedDate.setHours(this.selectedDate.getHours() - 9);
      // this.selectedDate.setHours(0, 0, 0, 0);

      if(scheduleService.getDifferentMonth(current.getMonth(), before.getMonth()))  this.selectStore(this.selectedStoreSeq);
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
  },

  methods: {
    /**
     * 매장 목록 조회
     *
     * @returns {Promise<Store[]>}
     */
    getStores() {
      return storeService.list(this.user)
        .then(stores => 
       // console.log('stores=====',stores),
        this.stores = stores);
    },

    /**
     * 매장 선택
     *
     * @param {string} storeSeq
     */
    selectStore(storeSeq) {
      // /** @type {Date} */
      let selectedDate = this.selectedDate;

      // if(scheduleService.getDifferentMonth(selectedDate.getMonth(), this.today.getMonth()))  this.renderCalendar(0);

      this.getStoreSchedules(selectedDate.getFullYear(), selectedDate.getMonth() + 1)
        .then(this.getEmpList())
        .catch(err => this.showAlert(err.message));
    },

    /**
     * 매장의 선택된 년/월 일정 가져오기
     *
     * @param {number} year
     * @param {number} month
     */
    getStoreSchedules(year, month) {
      this.storeSchedules = new Map;

      return managementService.getStoreSchedules(this.selectedStoreSeq, year, month)
        .then(storeSchedules => {
          storeSchedules.forEach(sch => {
            let empSeq = sch.EMP_ID;
            let schList = this.storeSchedules.get(empSeq) || [];

            schList.push(sch);

            this.storeSchedules.set(empSeq, schList);
          });
        });
    },

    getEmpList()  {
      this.empList = new Map;

      return storeService.getEmpList(this.selectedStoreSeq)
        .then(empList => {
          empList.forEach(emp => {
            this.empList.set(emp.EMP_SEQ, emp);
          });

          return this.getEmpListSchedules();
        });
    },

    getEmpListSchedules() {
      this.$service.app.loader.show();

      let queueGetSchedule = [];

      this.empListSchedules = new Map;

      this.empList.forEach(emp => {
        queueGetSchedule.push(empService.getSchedules(emp.EMP_SEQ, this.selectedDate));
      });

      Promise.all(queueGetSchedule)
        .then(empListSchedules => {
          let empMonthSchedulesList = [];

          empListSchedules.forEach(empSchedules => {
            if(empSchedules.length) {
              let empSeq = empSchedules[0].EMP_SEQ;
              let timeTableService = new TimeTableService(empSchedules);
              let empMonthSchedules = scheduleService.createEmpMonthSchedule(
                this.selectedDate,
                this.empList.get(empSeq),
                timeTableService
              );
              let writtenSchedules = this.storeSchedules.get(empSeq) || [];

              scheduleService.mergeWrittenSchedule(writtenSchedules, empMonthSchedules);

              this.empListSchedules.set(
                empSeq,
                empMonthSchedules
              );

              // empMonthSchedulesList.push(empMonthSchedules);
            }
          });

          this.makeRenderedSchedulesMap();
          this.selectDate(this.selectedDate);
          // this.renderMarkInCalendar();
        })
        .catch(err => {
          console.warn(err);
          this.showAlert(err.message)
        })
        .then(this.$service.app.loader.hide);
    },

    /**
     * 선택된 날짜의 년/월 기준으로 렌더될 일정 목록 생성
     */
    makeRenderedSchedulesMap() {
      let renderedDate = new Date(this.selectedDate),
        renderedMonth = renderedDate.getMonth(),
        indexDate = 1,
        resultMap = {};

      renderedDate.setDate(indexDate);

      while(renderedDate.getMonth() == renderedMonth) {
        let dateKey = moment(renderedDate).format('YYYY-MM-DD');

        resultMap[dateKey] = this.getRenderedSchedules(renderedDate);

        this.renderMarkInCalendar(dateKey, resultMap[dateKey]);

        renderedDate.setDate(++indexDate);
      }

      this.renderedSchedulesMap = resultMap;
    },

    /**
     * @param {string} date YYYY-MM-DD 형식
     * @param {EmpMonthSchedules[]} renderedSchedules
     */
    renderMarkInCalendar(date, renderedSchedules)  {
      let calendarDay = this.$el.querySelector(`.fc-content-skeleton td[data-date="${date}"]`);

      /** @type {HTMLDivElement} */
      let statusWrap = calendarDay.querySelector(`.status-wrap`);

      renderedSchedules.forEach(renderedSchedule => {
        renderedSchedule.status.forEach(status => {
          if(!statusWrap.classList.contains(status) && status !== 'BEFORE' && status !== 'RESOLVE')  {
            statusWrap.classList.add(status);
          }
        });

        if(renderedSchedule.STATUS === '2' ||
          renderedSchedule.CHANGE_START ||
          renderedSchedule.CHANGE_END) {
          // 임의로 추가된 일정인 경우
          statusWrap.classList.add('ADDED');
        }

        if(renderedSchedule.UPDATED_START ||
          renderedSchedule.UPDATED_END)  {
          // QR 수정인 경우
          calendarDay.classList.add('UPDATED');
        }
      });
    },

    /**
     * @param {Date} selectedDate
     */
    selectDate(selectedDate) {
      this.renderedSchedules = this.renderedSchedulesMap[moment(selectedDate).format('YYYY-MM-DD')];
    },

    /**
     * 해당 날짜의 렌더될 스케줄 목록 가져오기
     *
     * @param {Date} date
     */
    getRenderedSchedules(date)  {
      /** @type {Emp[]} */
      let empList = this.empList;

      if(!empList) return [];

      /** @type {Map<string, any[]>} */
      let empListSchedules = this.empListSchedules;

      if(!empListSchedules.size)  return [];

      date.setHours(0, 0, 0, 0);

      let day = date.getDate(),
        renderedSchedules = [];

      empList.forEach(emp => {
        let empMonthSchedules = empListSchedules.get(emp.EMP_SEQ);
         if(!empMonthSchedules) return [];
        let empDaySchedule = empMonthSchedules.get(day);

        /**
         * 선택된 날짜의 스케줄이 존재하고 그 스케줄에 출근시간과 퇴근시간이 있거나
         * 혹은 추가된 출근시간과 퇴근시간이 있으면 렌더 스케줄 목록에 추가함
         */
        if(empDaySchedule
          && ((empDaySchedule.ATTENDANCE_TIME && empDaySchedule.WORK_OFF_TIME)
            || (empDaySchedule.START && empDaySchedule.END)))  {
          let renderedSchedule = {
            ...empDaySchedule,
            EMP_NAME: emp.EMP_NAME,
            images: emp.images
          };

          scheduleService.setRenderedScheduleStatus(renderedSchedule, date);

          renderedSchedules.push(renderedSchedule);
        }
      });

      return renderedSchedules;
    },

    /**
     * 일정 수정
     *
     * @param {{ start, end }} updatedSchedule
     */
    requestUpdate(updatedSchedule) {
      let selectedSchedule = this.selectedSchedule;
console.log('update_TYPE:',updatedSchedule.TYPE);
console.log('update_STATUS:',updatedSchedule.STATUS);
      if(selectedSchedule.SCH_ID) {
        // if(this.selectedDate > this.today)  {
        //   // return managementService.updateSchedule(
        //   //   selectedSchedule.STORE_ID,
        //   //   selectedSchedule.SCH_ID,
        //   //   this.selectedDate,
        //   //   updatedSchedule.start,
        //   //   updatedSchedule.end
        //   // )
        //   return managementService.updateAttendanceWorkOffTime(
        //     selectedSchedule.STORE_ID,
        //     selectedSchedule.SCH_ID,
        //     selectedSchedule.EMP_SEQ,
        //     selectedSchedule.YEAR,
        //     selectedSchedule.MONTH,
        //     updatedSchedule.start,
        //     updatedSchedule.end,
        //     '1',
        //   )
        //   .then(() => {
        //     this.showAlert('예정 출/퇴근 시간이 수정 됐습니다.');
        //     this.selectStore(selectedSchedule.STORE_ID);
        //   })
        //   .catch(err => this.showAlert(err.message));
        // } else {
          // 0 :QR코드 수정 1 :스케쥴 일정 수정
          if(updatedSchedule.TYPE == '1')  {
return managementService.updateAttendanceWorkOffTime(
            selectedSchedule.STORE_ID,
            selectedSchedule.SCH_ID,
            selectedSchedule.EMP_SEQ,
            selectedSchedule.YEAR,
            selectedSchedule.MONTH,
            updatedSchedule.start,
            updatedSchedule.end,
            '1',
            updatedSchedule.STATUS,
          )
          .then(() => {
            this.showAlert('일정수정완료하였습니다.');
            this.selectStore(selectedSchedule.STORE_ID);
          })
          .catch(err => this.showAlert(err.message));
          }else{
            //// 0 :QR코드 수정 1 :스케쥴 일정 수정
return managementService.updateAttendanceWorkOffTime(
            selectedSchedule.STORE_ID,
            selectedSchedule.SCH_ID,
            selectedSchedule.EMP_SEQ,
            selectedSchedule.YEAR,
            selectedSchedule.MONTH,
            updatedSchedule.start,
            updatedSchedule.end,
            '0',
            '0'
            
          )
          .then(() => {
            this.showAlert('QR수정완료하였습니다.');
            this.selectStore(selectedSchedule.STORE_ID);
          })
          .catch(err => this.showAlert(err.message));
          }
          
     //   }
      } else {
      
         if(updatedSchedule.TYPE == '1')  {
           //일정수정
           return managementService.createSchedule(
          selectedSchedule.STORE_ID,
          selectedSchedule.EMP_SEQ,
          selectedSchedule.EMP_NAME,
          this.selectedStore.NAME,
          this.selectedDate,
          updatedSchedule.start,
          updatedSchedule.end,
           updatedSchedule.STATUS,
            '1',
        )
        .then(() => {
            this.showAlert('일정수정완료하였습니다.');
            this.selectStore(selectedSchedule.STORE_ID);
          })
          .catch(err => this.showAlert(err.message));
         }else if(updatedSchedule.TYPE == '0') {
           //qr수정
           return managementService.createSchedule(
          selectedSchedule.STORE_ID,
          selectedSchedule.EMP_SEQ,
          selectedSchedule.EMP_NAME,
          this.selectedStore.NAME,
          this.selectedDate,
          updatedSchedule.start,
          updatedSchedule.end,
        )
        .then(() => {
            this.showAlert('QR수정완료하였습니다.');
            this.selectStore(selectedSchedule.STORE_ID);
          })
          .catch(err => this.showAlert(err.message));
         }
        //  else{
        //    //일정추가
        //    return managementService.createSchedule(
        //   selectedSchedule.STORE_ID,
        //   selectedSchedule.EMP_SEQ,
        //   selectedSchedule.EMP_NAME,
        //   this.selectedStore.NAME,
        //   this.selectedDate,
        //   updatedSchedule.start,
        //   updatedSchedule.end,
        //   '2',
        // )
        // .then(schId => {
        //   this.selectStore(selectedSchedule.STORE_ID);
        //   selectedSchedule.SCH_ID = schId;

        //   // this.requestUpdate(updatedSchedule);
        // })
        // .catch(err => this.showAlert(err.message));
        //  }
        
      }
    },

    viewRender(view, element) {
      let self = this,
        $today = $(element).find('.fc-content-skeleton td[data-date].fc-today');

      this.calendar = this.$refs.calendar;
      this.calendarDate = this.calendar.fireMethod('getDate');
      this.selectedDate = this.calendarDate.toDate();

      scheduleService.makeStatusInCalendar(element.get(0));

      let $days = $(element)
        .find('.fc-content-skeleton td[data-date]')
          .click(function()  {
            /**
             * FIXME: dayClick이 정상적으로 바인딩 되지 않아서 임시로 이 곳에 click 이벤트 바인딩
             */
            let date = $(this).data('date');

            $('.selected').removeClass('selected');
            $(`[data-date="${date}"]`).addClass('selected');

            self.selectedDate = new Date(date);

            self.selectDate(self.selectedDate);
          });

      if($today.length)  {
        $today.trigger('click');
      } else {
        $days.eq(0).trigger('click');
      }

      // this.selectDate();
    },

    /**
     * 월별 캘린더 렌더
     *
     * @param {number} month
     */
    renderCalendar(month) {
      switch(month) {
        case -1:
          this.calendar.fireMethod('prev');
          break;
        case 1:
          this.calendar.fireMethod('next');
          break;
        case 0:
          this.calendar.fireMethod('today');
          break;
      }

      this.calendarDate = this.calendar.fireMethod('getDate');
    },

    registSchedule()  {
      this.pagePush({
        name: 'ScheduleRegist',
        query: {
          selectedStoreSeq: this.selectedStoreSeq,
          stores: this.stores,
          selectedDate: this.selectedDate
        }
      });
    },

    /**
     * @param {any} schedule
     */
    setNormalAttendanceTime(schedule) {
      let start, end;

      start = schedule.CHANGE_START || schedule.ATTENDANCE_TIME || schedule.START;
      end = schedule.UPDATED_END || schedule.END_TIME;

      this.selectedSchedule = schedule;

      this.requestUpdate({ start, end });
    },

    /**
     * @param {any} schedule
     */
    setNormalWorkOffTime(schedule) {
      let start, end;

      start = schedule.UPDATED_START || schedule.START_TIME;
      end = schedule.CHANGE_END || schedule.WORK_OFF_TIME || schedule.END;

      this.selectedSchedule = schedule;

      this.requestUpdate({ start, end });
    },
  },

  components: {
    ScheduleEditModal,
     ScheduleEditModal2
  },

  created() {
    let more;

    if(this.isOwner)  {
      more = {
        use: true,
        buttons: [
          {
            icon: 'add',
            label: '일정추가',
            click: () => {
              this.registSchedule();
            }
          }
        ]
      };
    }

    this.setHeader({
      visible: true,
      title: this.isOwner ? '근무일정' : '나의 일정',
      buttons: [],
      more
    });

    this.config = {
      locale: 'ko',
      defaultDate: this.defaultDate,
      eventLimit: true,
      showNonCurrentDates: false,
      height: 'auto',
      viewRender: this.viewRender,
    };

    this.defaultDate = new Date;

    this.getStores()
      .then(() => {
         console.log('this.stores====',this.stores);
         if(this.stores.length == 0){
           return;
         }
        this.selectedStoreSeq = this.stores[0].STORE_SEQ;
      })
      .catch(err => this.showAlert(err.message));
  },

  mounted() {

  }
}
</script>

<style lang="stylus" scoped>
@import "../css/themes/common.variables.styl"

.page-wrap {
  padding: 12px 20px;
}

.store-list-wrap {
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

.calendar-wrap {
  background  : #fff;
  margin-bottom: 12px;
  padding: 0;
  border-radius: 4px;
  box-shadow: 0 0 4px $gray;

  .calendar-header {
    clear both
    position relative
    padding 0
    border-bottom 2px solid $paleblue;
    text-align center
    color: $darkblue;

    button.q-btn {
      padding 0
      height 42px
      min-height  auto
      border-radius 0
    }

    span {
      font-size 1rem
    }

    button.q-btn.today {
      position absolute
      padding 0 16px
      right 0
    }

    .btn-guide {
      position: absolute;
      top: 0;
      right: 16px;
    }
  }
}

.day-schedule-list-wrap {
  position: relative;
  z-index: 1;
background  : #fff;
  .field {
    position: relative;
    height: auto;
    clear: both;

    .image-wrap {
      display: inline-block;
    }

    .profile-wrap {
      display: inline-block;
      vertical-align: top;
      font-size: 1rem;

      .name-wrap {
        margin-top: 2px;
        margin-bottom: 4px;
        font-size: .9rem;
        font-weight: 600;
        color: $darkblue;

        .name {
          margin-right: 10px;
        }

        .status {
          display: inline-block;
          margin-right: 4px;
          padding: 0 12px;
          height: 18px;
          background: none;
          border: 0;
          border-radius: 3px;
          vertical-align: middle;
          line-height: 18px;
          box-sizing: border-box;
          font-size: .7rem;

          &.BEFORE {
            border: 1px solid #86e177;
            line-height: 17px;
          }

          &.PENDING {
            background-color: #86e177;
            color: #fff;
          }

          &.RESOLVE {
            background-color: $gray;
            color: #fff;
          }

          &.LATE, &.OVER, &.EARLY {
            background-color: #e4a76a;
            color: #fff;
          }

          &.WRONG {
            background-color: #e66a74;
            color: #fff;
          }
        }
      }

      .time-wrap {
        line-height: 14px;
        font-size: .8rem;
      }
    }

    .btn-more-wrap {
      position: relative;
      top: 0;
      right: 0;
      margin-top: 4px;
      display: flex;
      width: 100%;
      background-color: $gray;
      // border-radius: 0;
      border-width: 0;

      button {
        flex: 1;
        padding: 0;
        line-height: 32px;
        height: 32px;
        border-bottom: 0;
        border-right: 1px solid $blue;
        border-color: #fff;
        text-align: center;
        font-size: .9rem;
        color: #fff;

        &:last-child {
          border-right: 0;
        }
      }
    }
  }
}
</style>
