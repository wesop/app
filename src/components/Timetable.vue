<template>
<div ref="$timeTable"
  :class="{
    'time-table-wrap': true,
    current: timeTable.isCurrent
  }">
  <div class="guide-line-wrap">
    <div class="guide-line-00"></div>
    <div class="guide-line-06"></div>
    <div class="guide-line-12"></div>
    <div class="guide-line-18"></div>
    <div class="guide-line-24"></div>
  </div>
  <table>
    <thead>
      <tr>
        <th></th>
        <th>일</th>
        <th>월</th>
        <th>화</th>
        <th>수</th>
        <th>목</th>
        <th>금</th>
        <th>토</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>
          <div class="time">00시</div>
          <div class="time">06시</div>
          <div class="time">12시</div>
          <div class="time">18시</div>
          <div class="time">24시</div>
        </td>
        <td v-for="(daySchedules, day) in renderedEmpWeekSchedule"
          :key="day">
          <div class="progress-wrap">
            <a v-for="(daySchedule, index) in daySchedules"
              :key="index"
              @mouseover="focusProgress($event.target, daySchedule.day)"
              @mouseout="clearProgressFocus()"
              ref="$progress"
              :data-day="daySchedule.day"
              :style="{ top: daySchedule.top, height: daySchedule.height }"
              :class="{ progress: true, today: timeTable.isCurrent && daySchedule.day == $data.$todayDay }">
              &nbsp;
            </a>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  <div v-show="selectedEmpSchedule" ref="$timeNotice" class="time-notice-wrap">
    <div v-if="selectedEmpSchedule" class="day-wrap">
      {{selectedEmpSchedule.DAY | localeText('DAYS')}}
    </div>
    <div v-if="selectedEmpSchedule" class="time-wrap">
      <div>{{selectedEmpSchedule.ATTENDANCE_TIME}}~</div>
      <div>{{selectedEmpSchedule.WORK_OFF_TIME}}</div>
    </div>
  </div>
</div>
</template>

<script>
import scheduleService from '../services/schedule'
import { RenderedEmpWeekSchedule, RenderedDaySchedule } from '../models/emp-schedule'

export default {
  name: 'Timetable',

  data()  {
    return {
      selectedEmpSchedule: null,

      /**
       * like Map
       *
       * @type {RenderedEmpWeekSchedule}
       */
      renderedEmpWeekSchedule: [],
    }
  },

  props: {
    timeTable: Object
  },

  watch: {
    timeTable() {
      this.setRenderedEmpWeekSchedule();
    }
  },

  methods: {
    focusProgress(target, day) {
      this.$refs.$progress.forEach(el => {
        el.classList.remove('active');

        if(el.dataset.day == day) {
          el.className += ' active';
        }
      });

      this.selectedEmpSchedule = this.timeTable.schedules[day];

      this.showTimeNotice(target, day);
    },

    clearProgressFocus()  {
      this.$refs.$progress.forEach(el => {
        el.classList.remove('active');
      });

      this.hideTimeNotice();
    },

    showTimeNotice(target, day)  {
      let timeNotice = this.$refs.$timeNotice,
        targetRect = target.getClientRects()[0],
        timeTableRect = this.$refs.$timeTable.getClientRects()[0];

      timeNotice.className += ' active';

      if(day == 6)  {
        timeNotice.style.left = 'auto';
        timeNotice.style.right = `${timeTableRect.x}px`;
      } else {
        timeNotice.style.left = `${targetRect.x - timeTableRect.x}px`;
        timeNotice.style.right = 'auto';
      }
      timeNotice.style.top = `${targetRect.y - timeTableRect.y - 32 -2}px`;
    },

    hideTimeNotice()  {
      let timeNotice = this.$refs.$timeNotice;

      timeNotice.classList.remove('active');
    },

    timeToPercent({ hour, min }) {
      return `${((hour * 60) + min) / 1440 * 100}%`;
    },

    /**
     * 렌더될 직원 일정 정보를 설정
     */
    setRenderedEmpWeekSchedule() {
      // 0시 0분 -> 0 * 60 + 0 = 0
      // 24시 0분 -> 24 * 60 = 1440

      if(!(this.timeTable.schedules instanceof Array))  {
        return;
      }

      /** Rendered Emp Schedules Init */
      this.renderedEmpWeekSchedule = [];
      for(let day = 0; day < 7; day++)  {
        /**
         * @type {RenderedDaySchedule[]}
         */
        let renderedDayEmpSchedules = [];

        this.renderedEmpWeekSchedule.push(renderedDayEmpSchedules);
      }

      for(let day = 0; day < 7; day++)  {
        /** @type {RenderedDaySchedule[]} */
        let renderedDaySchedules = this.renderedEmpWeekSchedule[day];

        /** @type {RenderedDaySchedule[]} */
        let nextRenderedDaySchedules = this.renderedEmpWeekSchedule[(day + 1) % 7];

        if(this.timeTable.schedules[day] !== null && this.timeTable.schedules[day] !== undefined) {
          let sch = this.timeTable.schedules[day],
            attendance = scheduleService.getTimeToHourMin(sch.ATTENDANCE_TIME),
            workoff = scheduleService.getTimeToHourMin(sch.WORK_OFF_TIME),
            renderedDaySchedule = new RenderedDaySchedule;

          renderedDaySchedule.day = day;
          renderedDaySchedule.top = this.timeToPercent(attendance);

          if(attendance.hour > workoff.hour)  {
            let nextRenderedDaySchedule = new RenderedDaySchedule;

            nextRenderedDaySchedule.day = day;
            nextRenderedDaySchedule.top = '0%';
            nextRenderedDaySchedule.height = this.timeToPercent({ hour: workoff.hour - 0, min: workoff.min - 0 });

            renderedDaySchedule.height = this.timeToPercent({
              hour: 23 - attendance.hour,
              min: 59 - attendance.min,
            });

            nextRenderedDaySchedules.push(nextRenderedDaySchedule);

            this.renderedEmpWeekSchedule[(day + 1) % 7] = nextRenderedDaySchedules;
          } else {
            renderedDaySchedule.height = this.timeToPercent({
              hour: workoff.hour - attendance.hour,
              min: workoff.min - attendance.min
            });
          }

          renderedDaySchedules.push(renderedDaySchedule);

          this.renderedEmpWeekSchedule[day] = renderedDaySchedules;
        }
      }
    }
  },

  created() {
    this.setRenderedEmpWeekSchedule();
  }
}
</script>

<style lang="stylus" scoped>
@import "../css/themes/common.variables.styl"

.time-table-wrap {
  position: relative;
  margin: 10px auto 18px;
  padding: 0 12px;
  width: 100%;
  height: 250px;
  border-radius: 2px;
  box-shadow: 0 0 4px $gray;

  table {
    height: 100%;

    thead {
      th {
        line-height: 44px;
        font-size: .8rem;
        font-weight: 600;

        &:first-child {
          width: 30px;
        }

        &:nth-child(2) {
          color: $em;
        }

        &:last-child {
          color: $paleblue;
        }
      }
    }

    tbody {
      td {
        height: 100%;

        .time {
          height: 20%;
          text-align: center;
          font-size: .6rem;
          color: $gray;
        }

        .progress-wrap {
          position: relative;
          margin-top: -25px;
          width: 100%;
          height: 158px;

          .progress {
            position: absolute;
            left: 20%;
            right: 20%;
            display: block;
            background-color: transparentify(#ee8800, #ee8800, .86);
            border-radius: 2px;
            border: 0;

            &.active {
              border: 1px solid alpha($gray, 80%);
            }
          }
        }
      }
    }
  }

  .guide-line-wrap {
    position: absolute;
    top: 44px;
    bottom: 12px;
    left: (12 + 30 + 6)px;
    right: 12px;

    div[class*="guide-line"] {
      position: absolute;
      width: 100%;
      height: 1px;
      border-bottom: 1px dashed alpha($gray, 40%);
    }

    .guide-line-00 {
      top: 13px;
    }

    .guide-line-06 {
      top: 52px;
    }

    .guide-line-12 {
      top: 91px;
      border-bottom: 1px solid alpha($gray, 40%) !important;
    }

    .guide-line-18 {
      bottom: 62px;
    }

    .guide-line-24 {
      bottom: 23px;
    }
  }

  .time-notice-wrap {
    position: absolute;
    display: none;
    width: 58px;
    height: 32px;
    background-color: rgba(0,0,0,.4);
    border-radius: 2px;
    font-size: .7rem;
    color: #fff;

    .day-wrap, .time-wrap {
      position: absolute;
    }

    .day-wrap {
      top: 2px;
      bottom: 0;
      width: 16px;
      text-align: center;
    }

    .time-wrap {
      left: 16px;
      padding-left: 2px;
      border-left: 1px solid #fff;
      line-height: 16px;
    }

    &.active {
      display: block;
    }
  }
}

.current {
  .progress-wrap {
    .progress.today {
      background-color: transparentify($paleblue, $paleblue, .86);
      animation: todayEffection 2s infinite;
    }
  }
}

@keyframes todayEffection {
  0% {
    background-color: transparentify($paleblue, $paleblue, .6);
  }

  50% {
    background-color: transparentify($paleblue, $paleblue, 1);
  }

  100% {
    background-color: transparentify($paleblue, $paleblue, .6);
  }
}
</style>
