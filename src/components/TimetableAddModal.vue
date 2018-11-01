<template>
<Modal v-model="value"
  :content-css="{
    maxWidth: '90%',
    maxHeight: '90%',
    width: '90%',
    height: '90%'
  }">
  <div class="field" text-left>
    <div class="label">시간표 시작</div>
    <div class="text">
      <input v-show="false" v-model="timetable.start" type="text" />
      <button @click="showCalendar('start')" type="button" class="date-text">
        {{timetable.start | dateFormat('YYYY/MM/DD')}}
      </button>

      <!-- <button @click="() => { timetable.start = new Date }" class="btn-set-today">
        오늘 날짜로
      </button> -->
    </div>

    <div class="label">시간표 종료</div>
    <div class="text">
      <input v-show="false" v-model="timetable.end" type="text" />
      <button @click="showCalendar('end')" type="button" class="date-text">
        <span v-if="timetable.end">{{timetable.end | dateFormat('YYYY/MM/DD')}}</span>
        <span v-else>계속 사용</span>
      </button>

      <button @click="() => { timetable.end = null }" class="btn-end-null">
        <q-icon name="close" color="white"></q-icon>
        종료일 삭제
      </button>
    </div>
  </div>

  <div class="field" text-left>
    <div class="label">근무 일정</div>
    <div class="text">
      <button class="btn-add-sch" @click="visibleScheduleAdd = true">
        근무일정 추가
        <q-icon name="add_circle" color="paleblue" size="1.5rem" />
      </button>
    </div>
  </div>

  <div class="schedules-wrap">
    <div v-for="(sch, index) in timetable.schedules"
      v-if="sch && sch.USE_FLAG == '1'"
      :key="index"
      class="schedule-wrap">
      <div class="day-wrap">
        <select v-model="sch.DAY" readonly>
          <option :value="undefined">요일</option>
          <option :value="index" v-for="(day, index) in rendered.days" :key="day">
            {{ day | localeText('DAYS') }}
          </option>
        </select>
        <q-icon name="arrow_drop_down" size="1.5rem" color="white" />
      </div>
      <div class="time-wrap">
        <span>{{sch.ATTENDANCE_TIME}}</span>
        <span>~</span>
        <span>{{sch.WORK_OFF_TIME}}</span>
      </div>
      <button @click="removeEmpSchedule(sch, index)" type="button" class="btn-remove-schedule">
        삭제
        <q-icon name="delete" />
      </button>
      <button @click="editEmpSchedule(sch, index)" type="button" class="btn-edit-schedule">
        변경
        <q-icon name="edit" />
      </button>
    </div>
  </div>

  <div slot="footer">
    <q-btn @click="close" label="닫기" color="paleblue" />
    <q-btn v-if="!isEdit" @click="insertTimetable" label="추가" color="paleblue" />
    <q-btn v-else @click="updateTimetable" label="수정" color="paleblue" />
  </div>

  <CalendarModal v-model="visibleCalendar" @select="setDate" />

  <EmployeeScheduleAddModal v-model="visibleScheduleAdd"
    :scheduleData="selectedSch" @set="setSchedule" />
</Modal>
</template>

<script>
import moment from 'moment'
import { DAYS } from '../models/public'
import EmpSchedule from '../models/emp-schedule'
import empService from '../services/emp'
import scheduleService from '../services/schedule'

export default {
  name: 'TimetableAddModal',

  data()  {
    return {
      rendered: {
        days: [],
        hours: [],
        mins: []
      },

      timetable: {
        prevStart: null,
        start: moment(new Date).format('YYYY-MM-DD'),
        end: null,
        schedules: [],
      },

      visibleScheduleAdd: false,
      selectedSch: null,
      visibleCalendar: false,
      calendarFlag: ''
    }
  },

  computed: {
    isEdit()  {
      if(this.timetableData)  return true;
      return false;
    },

    isCurrent() {
      return this.timetableData.isCurrent;
    }
  },

  model: {
    prop: 'value'
  },

  props: {
    value: {
      type: Boolean,
      default: true
    },

    emp: Object,
    timetableData: Object,
  },

  watch: {
    value() {
      if(!this.value) {
        // this.timetable.start = new Date;
        // this.timetable.end = null;
        // this.timetable.schedules = [];

        this.visibleScheduleAdd = false;
        this.selectedSch = null;
        this.visibleCalendar = false;
        this.calendarFlag = null;
      }
    },

    visibleScheduleAdd()  {
      if(!this.visibleScheduleAdd)  {
        this.selectedSch = null;
      }
    },

    timetableData() {
      if(this.timetableData)  {
        this.timetable = JSON.parse(JSON.stringify(this.timetableData));
      } else {
        this.timetable = {
          start: moment(new Date).format('YYYY-MM-DD'),
          end: null,
          schedules: []
        };
      }
    },

    'timetable.start': function(current, before) {
      this.timetable.prevStart = before;
    }
  },

  methods: {
    removeEmpSchedule(sch, index) {
      if(this.isCurrent) {
        /**
         * 현재 사용중이거나 새로 등록할 시간표에서는 아예 삭제 시킨다.
         * If timetable use in current or will be created, this schedule just only remove
         */
        this.timetable.schedules = this.timetable.schedules.slice(0, index).concat(this.timetable.schedules.slice(index + 1));
      } else {
        /**
         * 미래 시간표라면 USE_FLAG = 0으로 보내고 DB 삭제하도록 진행한다.
         * If timetable use in the future, request USE_FLAG = 0, then this schedule is removed for Database
         */
        sch.USE_FLAG = '0';
      }
    },

    editEmpSchedule(sch, index) {
      this.selectedSch = sch;
      this.visibleScheduleAdd = true;
    },

    /**
     * 직원 일정 생성
     *
     * @param {number} day
     */
    createEmpSchedule(day) {
      let sch = new EmpSchedule;

      sch.DAY = day;
      sch.EMP_SEQ = this.emp.EMP_SEQ;
      sch.START = moment(this.timetable.start).format('YYYY-MM-DD');
      sch.END = this.timetable.end ? moment(this.timetable.end).format('YYYY-MM-DD') : null;

      return sch;
    },

    /**
     * 직원 일정 설정
     *
     * @param {number[]} days
     * @param {string} startTime HH:mm
     * @param {string} endTime HH:mm
     */
    setSchedule(days, startTime, endTime) {
      if(this.selectedSch)  {
        this.selectedSch.DAY = days[0];
        this.selectedSch.ATTENDANCE_TIME = startTime;
        this.selectedSch.WORK_OFF_TIME = endTime;
        this.selectedSch = null;
      } else {
        days.forEach(day => {
          let sch = this.createEmpSchedule(day);

          sch.ATTENDANCE_TIME = startTime;
          sch.WORK_OFF_TIME = endTime;

          this.timetable.schedules[day] = sch;
        });
      }
    },

    /**
     * @param {string} flag 근무 시작/종료 구분값('start', 'end')
     */
    showCalendar(flag)  {
      this.calendarFlag = flag;
      this.visibleCalendar = true;
    },

    /**
     * @param {Date} date
     */
    setDate(date)  {
      this.timetable[this.calendarFlag] = date;
    },

    insertTimetable() {
      this.showAlert('시간표를 등록하시겠습니까?', {
        cancel: '취소',
        confirm: '확인'
      })
      .then(insert => {
        if(insert)  {
          /** @type {EmpSchedule[]} */
          let schedules = this.timetable.schedules;

          this.timetable.schedules.forEach(sch => {
            if(sch) {
              sch.START = this.timetable.start;
              sch.END = this.timetable.end || null;
            }
          });

          empService.updateSchedules(schedules)
            .then(() => {
              setTimeout(() => {
                this.showAlert('시간표를 등록했습니다.');
                this.$emit('insertComplete', this.timetable);
                this.close();
              }, 0);
            })
            .catch(err => {
              this.showAlert('시간표를 등록하는데 문제가 생겼습니다.');
            });
        }
      });
    },

    updateTimetable() {
      let message = '시간표를 수정하시겠습니까?';

      if(this.isCurrent) {
        let date = new Date;

        message = '현재 사용중인 시간표는 수정이 아니라 변경된 일정으로 새로운 시간표가 생성 됩니다.\n계속 진행하시겠습니까?';

        this.timetable.start = scheduleService.addDate({
          date: date,
          addedDate: 1,
          format: 'YYYY-MM-DD'
        });
      }

      this.showAlert(message, {
        cancel: '취소',
        confirm: '확인'
      })
      .then(update => {
        if(update)  {
          /** @type {EmpSchedule[]} */
          let schedules = this.timetable.schedules;

          this.timetable.schedules.forEach(sch => {
            if(sch) {
              sch.START = this.timetable.start;
              sch.END = this.timetable.end || null;

              if(this.isCurrent) {
                sch.EMP_SCH_SEQ = -1;
              }
            }
          });

          empService.updateSchedules(schedules)
            .then(() => {
              setTimeout(() => {
                this.showAlert('시간표를 수정했습니다.');
                if(this.isCurrent) this.$emit('insertComplete', this.timetable);
                else this.$emit('updateComplete', this.timetable);
                this.close();
              }, 0);
            })
            .catch(err => {
              this.showAlert('시간표를 수정하는데 문제가 생겼습니다.');
            });
        }
      });
    },

    close() {
      this.$emit('input', false);
    }
  },

  created() {
    Object.keys(DAYS).forEach(dayValue => {
      this.rendered.days.push(dayValue);
    });

    for(let hourValue = 0; hourValue <= 24; hourValue++)  {
      this.rendered.hours.push(hourValue);
    }

    for(let minValue = 0; minValue <= 59; minValue++)  {
      this.rendered.mins.push(minValue);
    }
  }
}
</script>

<style lang="stylus" scoped>
@import "../css/themes/common.variables.styl"

.field {
  position: relative;
  color: $darkblue;
  border-bottom: 0;
}

input {
  padding: 0;
  border: 0;
  color: $paleblue;
  width: 60px;
  outline: none;
}

button.date-text {
  padding: .5em 0;
  width: 120px;
  text-align: left;
  // background-color: alpha($gray, 10%);
  font-size: 1rem;
}

.btn-set-today, .btn-end-null {
  margin-left: 8px;
  width: 100px;
  height: 32px;
  background-color: transparentify($blue, 90%)
  font-size: .8rem;
  color: #fff;
}

.btn-add-sch {
  width: 100%;
  height: 30px;
  text-align: right;
  font-size: 1rem;
  color: $darkblue;
}

.schedules-wrap {
  text-align: left;
  height: 300px;
  min-height: 300px;
  max-height: 300px;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;

  .schedule-wrap {
    clear: both;
    margin: 0 0 .7em;
    font-size: 1rem;

    &:last-child {
      margin-bottom: 0;
    }

    .day-wrap {
      position: relative;
      display: inline-block;
      margin-right: 5px;
      padding-right: 2px;
      width: 58px;
      height: 32px;
      background: $paleblue;
      text-align: right;
      line-height: 32px;
      border-radius: 2px;

      select {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 8px;
        right: 0;
        display: block;
        -webkit-appearance: none;
        width: 42px;
        background: none;
        border: 0;
        color: #fff;
        outline: none;
      }
    }

    .time-wrap {
      display: inline-block;
      vertical-align: middle;
      font-size: 1.1rem;
      color: $gray;
    }

    button {
      float: right;
      padding: 0 10px;
      height: 32px;
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
}

.btn-footer-group {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 57px;
}
</style>
