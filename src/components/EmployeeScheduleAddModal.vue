<template>
<Modal v-model="value" :content-css="{ minWidth: '90%', maxHeight: '95%' }">
  <div class="field">
    <div class="label">요일선택</div>
  </div>
  <div class="field">
    <div class="text">
      <div v-for="(dayName, index) in rendered.days"
        :key="index"
        class="btn-day">
        <input v-model="settedDays"
          v-show="false"
          :id="'day-' + dayName"
          :value="index"
          name="settedDays"
          type="checkbox"
          :disabled="scheduleData ? 'disabled' : false" />
        <label :for="'day-' + dayName">{{dayName | localeText('DAYS')}}</label>
      </div>
    </div>

    <div class="label">시간선택</div>
  </div>

  <div class="field">
    <div class="text">
      <div class="time-select-wrap" text-center>
        <select v-model="start.hour" class="hour">
          <option :value="null">시</option>
          <option v-for="hourValue in rendered.hours"
            :key="hourValue"
            :value="hourValue">
            {{('' + hourValue).padStart(2, 0)}}
          </option>
        </select>
        <span>:</span>
        <select v-model="start.min">
          <option :value="null">분</option>
          <option v-for="minValue in rendered.mins"
            :key="minValue"
            :value="minValue">
            {{('' + minValue).padStart(2, 0)}}
          </option>
        </select>
        <span>~</span>
        <select v-model="end.hour" class="hour">
          <option :value="null">시</option>
          <option v-for="hourValue in rendered.hours"
            :key="hourValue"
            :value="hourValue">
            {{('' + hourValue).padStart(2, 0)}}
          </option>
        </select>
        <span>:</span>
        <select v-model="end.min">
          <option :value="null">분</option>
          <option v-for="minValue in rendered.mins"
            :key="minValue"
            :value="minValue">
            {{('' + minValue).padStart(2, 0)}}
          </option>
        </select>
      </div>
    </div>
  </div>

  <q-btn
    @click="close"
    slot="footer"
    label="취소"
    color="paleblue"
  />
  <q-btn
    @click="setSchedule"
    slot="footer"
    :label="scheduleData ? '변경' : '추가'"
    color="paleblue"
  />
</Modal>
</template>

<script>
import { DAYS } from '../models/public'
import scheduleService from '../services/schedule'

export default {
  name: 'EmployeeScheduleAddModal',

  model: {
    prop: 'value'
  },

  props: {
    value: Boolean,

    scheduleData: Object
  },

  data () {
    return {
      settedDays: [],

      rendered: {
        days: [],
        hours: [],
        mins: []
      },

      start: {
        hour: 9,
        min: 0
      },

      end: {
        hour: 18,
        min: 0
      }
    }
  },

  watch: {
    value() {
      if(!this.value) {
        this.start = {
          hour: 9,
          min: 0
        };

        this.end = {
          hour: 18,
          min: 0
        };

        this.settedDays = [];
      } else {
        if(this.scheduleData) {
          this.start = scheduleService.getTimeToHourMin(this.scheduleData.ATTENDANCE_TIME);
          this.end = scheduleService.getTimeToHourMin(this.scheduleData.WORK_OFF_TIME);

          if(!isNaN(this.scheduleData.DAY))  {
            this.settedDays = [ parseInt(this.scheduleData.DAY) ];
          } else {
            this.settedDays = [];
          }
        }
      }
    }
  },

  methods: {
    setSchedule() {
      let settedDays = this.settedDays,
        startHour = this.start.hour,
        startMin = this.start.min,
        endHour = this.end.hour,
        endMin = this.end.min,
        startTime = scheduleService.getHourMinToTime(startHour, startMin),
        endTime = scheduleService.getHourMinToTime(endHour, endMin);

      if(!settedDays.length)  {
        setTimeout(() => { this.showAlert('요일을 선택해주세요.'); }, 0);
        return;
      }

      if(!this.checkHourValue(startHour)
        || !this.checkMinValue(startMin)
        || !this.checkHourValue(endHour)
        || !this.checkMinValue(endMin)) {
        setTimeout(() => { this.showAlert('출/퇴근 시간을 확인해주세요.'); }, 0);
        return;
      }

      if(scheduleService.getDifferentTime(startTime, endTime) <= 0) {
        endTime = scheduleService.getHourMinToTime(endHour, endMin);
      }

      this.$emit('set', settedDays, startTime, endTime);

      setTimeout(() => { this.close(); }, 0);
    },

    close() {
      this.$emit('input', false);
      this.$emit('change');
    },

    checkHourValue(value)  {
      if(typeof value === 'number' && value >= 0 && value <= 24)  return true;
      return false;
    },

    checkMinValue(value)  {
      if(typeof value === 'number' && value >= 0 && value <= 59)  return true;
      return false;
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

    // if(this.scheduleData) {
    //   this.start = scheduleService.getTimeToHourMin(this.scheduleData.ATTENDANCE_TIME);
    //   this.end = scheduleService.getTimeToHourMin(this.scheduleData.WORK_OFF_TIME);

    //   if(!isNaN(this.scheduleData.DAY))  {
    //     this.settedDays = [ parseInt(this.scheduleData.DAY) ];
    //   } else {
    //     this.settedDays = [];
    //   }
    // }
  }
}
</script>

<style lang="stylus" scoped>
@import "../css/themes/common.variables.styl"

.field {
  color: $darkblue;
}

.btn-day {
  display: inline-block;
  margin: 0 0 0 11px;
  padding: 0;
  width: 34px;
  height: 34px;
  text-align: center;

  label {
    display: block;
    background: none;
    border: 1px solid #afcfde;
    border-radius: 50%;
    line-height: 33px;
  }

  input[type="checkbox"]:checked {
    &+label {
      background-color: $paleblue;
      border-color: $paleblue;
      color: #fff;
    }
  }

  &:first-child {
    margin-left: 0;
    color: $em;
  }

  &:last-child {
    margin-right: 0;
    color: $paleblue;
  }
}

.time-select-wrap {
  font-size: 1.5rem;
  color: $gray;

  select {
    border: 0;
    background: none;
    font-family: 'NanumSquare';
    appearance: none;
    outline: none;
    color: $gray;

    option {
      color: $gray;
    }
  }
}
</style>
