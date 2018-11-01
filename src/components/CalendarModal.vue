<template>
<Modal v-model="value">
  <header class="calendar-header">
    <q-btn
      @click="renderCalendar(-1)"
      icon="keyboard arrow left"
      color="white"
      size="1.425rem"
      class="text-black" />

    <span>{{ calendarDate | dateFormat('YYYY년 M월') }}</span>

    <q-btn
      @click="renderCalendar(1)"
      icon="keyboard arrow right"
      color="white"
      size="1.425rem"
      class="text-black" />
  </header>

  <full-calendar
    v-if="config"
    ref="calendar"
    :config="config"
    :header="false"
    :defaultView="'month'"
    :editable="false"
    :selectable="true"
    class="calendar-wrap">
  </full-calendar>

  <div slot="footer">
    <q-btn
      @click="close()"
      label="닫기"
    />
  </div>
</Modal>
</template>

<script>
import moment from 'moment';

export default {
  name: 'CalendarModal',

  data () {
    return {
      calendar: null,
      calendarDate: null,
      config: null
    }
  },

  model: {
    prop: 'value'
  },

  props: {
    value: Boolean,
    selectedDate: {
      type: Date,
      required: false,
      default: () => new Date
    }
  },

  watch: {
    value() {
      // console.log('selectedDate: ', this.selectedDate);
    }
  },

  methods: {
    viewRender(view, element) {
      let self = this,
        $today = $(element).find('.fc-content-skeleton td[data-date].fc-today');

      this.calendar = this.$refs.calendar;
      this.calendarDate = this.calendar.fireMethod('getDate');
      // this.selectedDate = moment(this.calendarDate.toDate()).format('YYYY-MM-DD');

      let $days = $(element)
        .find('.fc-content-skeleton td[data-date]')
          .click(function()  {
            /**
             * FIXME: dayClick이 정상적으로 바인딩 되지 않아서 임시로 이 곳에 click 이벤트 바인딩
             */
            let date = $(this).data('date');

            $('.selected').removeClass('selected');
            $(`[data-date="${date}"]`).addClass('selected');

            // self.selectedDate = moment(new Date(date)).format('YYYY-MM-DD');
            self.$emit('select', moment(new Date(date)).format('YYYY-MM-DD'));
            self.close();
          });

        if($today)  {
          $today.trigger('click');
        } else {
          $days.eq(0).trigger('click');
        }
    },

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

    close() {
      this.$emit('input', false);
      this.$emit('change');
    }
  },

  created() {
    this.config = {
      locale: 'ko',
      defaultDate: this.selectedDate,
      eventLimit: true,
      showNonCurrentDates: false,
      height: 'auto',
      viewRender: this.viewRender,
    };
  }
}
</script>

<style>
</style>
