<template>
<q-page no-padding>
  <div padding-top padding-bottom>
    <q-select
      v-model="period"
      separator
      padding-left
      padding-right
      :options="periods"
      placeholder="기간"
      color="em"
    />
  </div>

  <section class="employee-list-wrap">
    <div class="row">
      <div class="col-5">
        <strong>매장명</strong>
      </div>
      <div class="col-4">
        <strong>날짜</strong>
      </div>
      <div class="col-3">
        <strong>이상근태</strong>
      </div>
    </div>
    <div
      @click="requestModify(wrong)"
      v-if="wrongs.length"
      v-for="wrong in wrongs"
      :key="wrong._id"
      class="row justify-center">
      <div class="col-5">
        <span>{{wrong.store.name}}</span>
      </div>
      <div class="col-4">
        <span>{{new Date(wrong.date) | dateFormat('YYYY-MM-DD')}}</span>
      </div>
      <div class="col-3">
        <div class="text-em">
          <strong>{{wrong.status | localeText('WRONG_SCHEDULE_TYPE')}}</strong>
        </div>
      </div>
    </div>
    <div
      v-if="!wrongs.length"
      class="row">
      <div class="col-12" text-center no-padding>
        <div>
          <p>&nbsp;</p>
          <div>축하드립니다! 이번 주는 완벽한 근태입니다 :)</div>
          <p>&nbsp;</p>
        </div>
      </div>
    </div>
  </section>
</q-page>
</template>

<script>
import _ from 'underscore';
import { WRONG_SCHEDULE_TYPE } from '../models/public';

export default {
  name: 'WrongAttendences',

  data()  {
    return {
      wrongs: [],
      periods: [],
      period: null,
    };
  },

  methods: {
    getWrongSchedules() {
      let length = _.random(0, 10), list = [];

      for(let index = 0; index < length; index++) {
        list.push({
          _id: index,
          store: {
            name: '스타벅스 역삼점'
          },
          date: _.random(1522594800, 1522820187) * 1000,
          status: (() => {
            let n = _.random(0, 3);

            switch (n) {
              case 0: return WRONG_SCHEDULE_TYPE.LATE;
              case 1: return WRONG_SCHEDULE_TYPE.ABSENT;
              case 2: return WRONG_SCHEDULE_TYPE.EARLY;
              case 3: return WRONG_SCHEDULE_TYPE.NOT_LEAVE;
            }
          })()
        });
      }

      return list;
    },

    requestModify(wrong) {
      let status = wrong.status,
        statusName = this.getLocaleText(status, 'WRONG_SCHEDULE_TYPE');

      if(status === 'L' || status === 'A')  statusName += '을';
      else  statusName += '를';

      this.showAlert(`점장님에게 ${statusName} 정상 스케줄로 변경하도록 요청하시겠습니까?`, [
        {
          label: '요청',
          click: () => {
            this.hideAlert();

            this.showAlert(`요청이 완료됐습니다!`);
          }
        },
        {
          label: '취소',
          click: () => {
            this.hideAlert();
          }
        },
      ])
    }
  },

  created() {
    this.setHeader({
      visible: true,
      title: '이상근태목록',
    });

    this.wrongs = this.getWrongSchedules();

    this.periods = [
      { label: '오늘', value: 0 },
      { label: '이번주', value: 1 },
      { label: '이번달', value: 2 }
    ];

    this.period = this.periods[0].value;
  }
}
</script>

<style lang="stylus" scoped>
@import "../css/themes/common.variables.styl"

.employee-list-wrap
  padding 0

  .row
    padding 12px 0
    align-items center
    border-bottom 1px solid alpha($gray, 50%)

    & > div
      padding 0 0 0 12px
      font-size .9rem

      strong
        font-weight 600

</style>

