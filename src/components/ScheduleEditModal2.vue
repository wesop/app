<template>
<Modal v-model="value">
  <div padding>
     <q-field style="width: 50%;float: left;" label="QR체크(출근)">
      <q-input
       v-if="schedule.UPDATED_START || schedule.START_TIME"
        v-model="schedule.UPDATED_START || schedule.START_TIME"
        readonly
        hide-underline
        type="text"
        color="black"
      />
       <q-input
        v-else
        readonly
        hide-underline
        type="text"
        color="black"
        value="미출근"
      />
    </q-field>
     <q-field style="width: 50%;" label="QR체크(퇴근)">
      <q-input
       v-if="schedule.UPDATED_END || schedule.END_TIME"
        v-model="schedule.UPDATED_END || schedule.END_TIME "
        readonly
        hide-underline
        type="text"
        color="black"
      />
       <q-input
        v-else
        readonly
        hide-underline
        type="text"
        color="black"
        value="미퇴근"
      />
    </q-field>
   
  </div>
 <br>
   <div style="text-align:center;font-size:17px;">[변경대상]</div>

  <q-item-separator></q-item-separator>
  
  <div padding>
     <q-field style="width: 50%;float: left;" label="근무일정(출근)">
      <q-input
        v-model="schedule.CHANGE_START ||schedule.START || schedule.ATTENDANCE_TIME"
        readonly
        hide-underline
        type="text"
        color="black"
      />
    </q-field>
   

    <q-field  style="width: 50%;" label="근무일정(퇴근)">
      <q-input
        v-model="schedule.CHANGE_END||schedule.END || schedule.WORK_OFF_TIME"
        readonly
        hide-underline
        type="text"
        color="black"
      />
    </q-field>
    
  </div>
  
  <div padding>
    <q-field label="변경할 일정(출근) 시간" required></q-field>
    <div class="row items-center">
      <div class="col-9">
        <q-input
          v-model="updated.start.hour"
          type="number"
          hide-underline
          text-right
          required
          min="0"
          max="23"
          maxlength="2"
          suffix="시"
          placeholder="00"
          color="black"
        />
      </div>
      <div class="col-1">:</div>
      <div class="col-2">
        <q-input
          v-model="updated.start.min"
          type="number"
          hide-underline
          text-right
          required
          min="0"
          max="59"
          maxlength="2"
          suffix="분"
          placeholder="00"
          color="black"
        />
      </div>
    </div>
  </div>
  <div padding>
    <q-field label="변경할 일정(퇴근) 시간" required></q-field>
    <div class="row items-center">
      <div class="col-9">
        <q-input
          v-model="updated.end.hour"
          type="number"
          hide-underline
          text-right
          required
          min="0"
          maxlength="2"
          max="23"
          suffix="시"
          placeholder="00"
          color="black"
        />
      </div>
      <div class="col-1">:</div>
      <div class="col-2">
        <q-input
          v-model="updated.end.min"
          type="number"
          hide-underline
          text-right
          required
          maxlength="2"
          min="0"
          max="59"
          suffix="분"
          placeholder="00"
          color="black"
        />
      </div>
    </div>
  </div>
 <q-item-separator></q-item-separator>

 <div class="field required"  style="text-align:left;">
      <div class="label">수당포함여부 선택</div>
      <div class="text" style="text-align:left;">
        &nbsp;&nbsp;<q-radio
          v-model="TYPE"
          color="paleblue"
          val="9"
          checked-icon="radio_button_checked"
          unchecked-icon="radio_button_unchecked"
          label="기본급 적용(1배)" /> 
               <br>
        &nbsp;&nbsp;<q-radio
          v-model="TYPE"
          color="paleblue"
          val="8"
          checked-icon="radio_button_checked"
          unchecked-icon="radio_button_unchecked"
          label="초과근무수당 적용(1.5배)" /> 
              <br>
       &nbsp;&nbsp;<q-radio
          v-model="TYPE"
          color="paleblue"
          val="7"
          checked-icon="radio_button_checked"
          unchecked-icon="radio_button_unchecked"
          label="야간근무수당 적용(1.5배)" />   
               <br>
       &nbsp;&nbsp;<q-radio
          v-model="TYPE"
          color="paleblue"
          val="6"
          checked-icon="radio_button_checked"
          unchecked-icon="radio_button_unchecked"
          label="초과,야간근무수당 적용(2배)" /> 
      </div>
</div>
    
  <div slot="footer">
    <q-btn
      @click="requestUpdate"
      label="근무일정 수정요청"
      class="needsclick" />

    <q-btn
      @click="cancel"
      label="취소"
      class="needsclick" />
    <!-- button end -->
  </div>
</Modal>
</template>

<script>
import moment from 'moment'
import scheduleService from '../services/schedule'

export default {
  name: 'ScheduleEditModal2',

  data () {
    return {
      TYPE:'9',
      updated: {
        start: {
          hour: null,
          min: null
        },
        end: {
          hour: null,
          min: null
        },
      }
    };
  },

  model: {
    prop: 'value',
  },

  props: {
    value: {
      type: Boolean,
      default: false,
    },

    schedule: {
      type: Object,
      default: () => { return {}; },
      required: true
    }
  },

  methods: {
    checkHourValue(value)  {
      if(typeof value === 'number' && value >= 0 && value <= 24)  return true;
      return false;
    },

    checkMinValue(value)  {
      if(typeof value === 'number' && value >= 0 && value <= 59)  return true;
      return false;
    },

    requestUpdate() {
      console.log('근무유형:',this.TYPE);
      let startHour = this.updated.start.hour,
        startMin = this.updated.start.min,
        endHour = this.updated.end.hour,
        endMin = this.updated.end.min,
        startTime = scheduleService.getHourMinToTime(startHour, startMin),
        endTime = scheduleService.getHourMinToTime(endHour, endMin);

      if(!this.checkHourValue(startHour)
        || !this.checkMinValue(startMin)
        || !this.checkHourValue(endHour)
        || !this.checkMinValue(endMin) ) {
        this.showAlert('변경할 시간을 정확히 입력해주세요.');
        return;
      }

      if(scheduleService.getDifferentTime(startTime, endTime) <= 0) {
        endTime = scheduleService.getHourMinToTime(endHour + 24, endMin);
      }

      this.$emit('requestUpdate', {
        start: startTime,
        end: endTime,
        TYPE : 1,
        STATUS :this.TYPE,
      });
         this.updated.start.hour = null;
         this.updated.start.min = null;
    //  this.updated.start.min= Number("00");
       this.updated.end.hour= null;
        this.updated.end.min= null;
   //   this.updated.end.min= Number("00");
  //this.TYPE = '9';
      this.$emit('input', false);
      this.$emit('change');
    },
     cancel(){
       this.updated.start.hour = null;
        this.updated.start.min = null;
    //  this.updated.start.min=Number("00");
       this.updated.end.hour= null;
        this.updated.end.min= null;
  //    this.updated.end.min= Number("00");
    //  this.TYPE = '9';
      this.$emit('input', false);
    }
  },

  created() {
   // this.updated.start.min=Number("00");
   //  this.updated.end.min= Number("00");
  },
}
</script>

<style>
</style>
