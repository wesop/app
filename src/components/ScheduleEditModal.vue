<template>
<Modal v-model="value">
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
   
    <q-field   style="width: 50%;" label="근무일정(퇴근)">
      <q-input
        v-model="schedule.CHANGE_END||schedule.END || schedule.WORK_OFF_TIME"
        readonly
        hide-underline
        type="text"
        color="black"
      />
    </q-field>
</div>
<!-- <q-item-separator></q-item-separator> -->
<br>
   <div style="text-align:center;font-size:17px;">[변경대상]</div>

  <q-item-separator></q-item-separator>
  
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
  


  <div padding>
    <q-field  label="변경할 QR출근 시간" required></q-field>
    <div class="row items-center">
        <div class="col-5">
             <q-btn style="color:blue;font-size: 95%;"
      @click="changestart(schedule.CHANGE_START ||schedule.START || schedule.ATTENDANCE_TIME)"
      label="▶정상출근(클릭)"
      class="needsclick" />
    </div>

      <div class="col-4">
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
          value="00"
        />
      </div>
    </div>
  </div>
  <div padding>
    <q-field label="변경할 QR퇴근 시간" required></q-field>
    
    <div class="row items-center">
        <div  class="col-5">
             <q-btn style="color:blue;font-size: 95%;"
      @click="changeend(schedule.CHANGE_END||schedule.END || schedule.WORK_OFF_TIME)"
      label="▶정상퇴근(클릭)"
      class="needsclick" />
    </div>
      <div class="col-4">
        <q-input
          v-model="updated.end.hour"
          type="number"
          hide-underline
          text-right
          required
          maxlength="2"
          min="0"
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

  <div slot="footer">
    <q-btn
      @click="requestUpdate"
      label="출퇴근시간 수정요청"
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
  name: 'ScheduleEditModal',

  data () {
    return {
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

    changestart(value){
       var str = value.split(":");
  // this.showAlert(str[0]);
  // this.showAlert(str[1]);
     this.updated.start.hour =Number(str[0]);
      this.updated.start.min =Number(str[1]);
    },
    changeend(value){
  
  var str = value.split(":");
  // this.showAlert(str[0]);
  // this.showAlert(str[1]);
     this.updated.end.hour =Number(str[0]);
     this.updated.end.min =Number(str[1]);
    },
    requestUpdate() {
      let startHour = this.updated.start.hour,
        startMin = this.updated.start.min,
        endHour = this.updated.end.hour,
        endMin = this.updated.end.min,
        startTime = scheduleService.getHourMinToTime(startHour, startMin),
        endTime = scheduleService.getHourMinToTime(endHour, endMin);

  console.log(startHour);
    console.log(startMin);
      console.log(endHour);
        console.log(endMin);

      if(!this.checkHourValue(startHour)
        || !this.checkMinValue(startMin)
        || !this.checkHourValue(endHour)
        || !this.checkMinValue(endMin)) {
        this.showAlert('변경할 QR체크시간을 정확히 입력해주세요.');
        return;
      }

      if(scheduleService.getDifferentTime(startTime, endTime) <= 0) {
        endTime = scheduleService.getHourMinToTime(endHour + 24, endMin);
      }

      this.$emit('requestUpdate', {
        start: startTime,
        end: endTime,
         TYPE : 0
      });
      
      this.updated.start.hour = null;
        this.updated.start.min = null;
     // this.updated.start.min= Number("00");
       this.updated.end.hour= null;
      //this.updated.end.min= Number("00");
       this.updated.end.min= null;

      this.$emit('input', false);
      this.$emit('change');

      
    },
    cancel(){
       this.updated.start.hour = null;
         this.updated.start.min = null;
     // this.updated.start.min= Number("00");
       this.updated.end.hour= null;
     // this.updated.end.min= Number("00");
       this.updated.end.min= null;
      this.$emit('input', false);
    }
  },

  created() {
    //this.updated.start.min=Number("00");
   //  this.updated.end.min= Number("00");
  },

}
</script>

<style>
</style>
