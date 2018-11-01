<template>
<q-page>
  <div class="page-wrap">
    <div :class="{ 'pay-wrap': true, 'active': visibleDetail }">
      <div class="short-wrap">
        <div class="month-wrap">
          <button v-if="isShowPrevButton"
            @click="getPrevPayDatas"
            type="button" class="btn-prev">
            <q-icon name="keyboard_arrow_left" size="1.6rem" />
            이전
          </button>
          <button v-if="isShowNextButton"
            @click="getNextPayDatas"
            type="button" class="btn-next">
            다음
            <q-icon name="keyboard_arrow_right" size="1.6rem" />
          </button>
          <!-- {{selectedMonth + 1}}월 급여 정보 -->
          <div>
            {{payData.START_DAY}}~{{payData.END_DAY}}
          </div>
          <div>
            급여 정보
          </div>
        </div>
        <div class="total-pay-wrap">
          <span>실제누적 급여&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <strong class="text-yellow">{{ totalPayData.sum | currency }}</strong><br>
          <span style="font-size:80%;" >(주휴수당)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <strong style="font-size:80%;" class="text-yellow">{{ weeksum | currency }}</strong>
        </div>

        <!-- Divide -->

        <div  v-if="payData.TYPE == 0"  class="pay-type-wrap">
          <div class="pay-type">
            <label>기본급여</label>
            <strong>{{totalPayData.basic | currency}}</strong>
          </div>
          <div class="pay-type">
            <label>야간근로 수당</label>
            <strong>{{totalPayData.night | currency}}</strong>
          </div>
          <div class="pay-type">
            <label>초과근로 수당</label>
            <strong>{{totalPayData.day | currency}}</strong>
          </div>
          <div class="pay-type">
            <label>휴일근로 수당</label>
            <strong>{{0 | currency}}</strong>
          </div>
          <div class="pay-type">
            <label>지각조퇴 차감</label>
            <strong>(-) {{totalPayData.miner | currency}}</strong>
          </div>
        </div>

        <div  v-if="payData.TYPE != 2" class="btn-detail-wrap">
          <button @click="visibleDetail = !visibleDetail" type="button">
            {{!visibleDetail ? '자세히보기' : '간략하게 보기'}}
            <q-icon name="keyboard_arrow_down"
              color="white"
              :class="{ 'detail': visibleDetail }" />
          </button>
        </div>
      </div>

      <div v-if="payData.LIST.length" class="detail-wrap">
        <div v-for="(onepayData, index) in payData.LIST"
          :key="index"
          class="item-wrap">
          <div class="pay-type-wrap">
            <div class="date-wrap">
              {{onepayData.date}}
              <small class="day-wrap">
                ({{new Date(onepayData.date).getDay() | localeText('DAYS')}})
              </small>
            </div>

            <div  v-if="payData.TYPE == 0"  class="pay-type">
              <label>기본급여</label>
              <strong>{{onepayData.basic_payment | currency}}</strong>
            </div>
            <div  v-if="payData.TYPE == 0"  class="pay-type">
              <label>야간근로 수당</label>
              <strong>{{onepayData.night_payment | currency}}</strong>
            </div>
            <div v-if="payData.TYPE == 0"   class="pay-type">
              <label>초과근로 수당</label>
              <strong>{{onepayData.day_payment | currency}}</strong>
            </div>
            <div  v-if="payData.TYPE == 0"  class="pay-type">
              <label>휴일근로 수당</label>
              <strong>{{0 | currency}}</strong>
            </div>
            <div  v-if="payData.TYPE == 0"  class="pay-type">
              <label>지각조퇴 차감</label>
              <strong class="text-em">(-) {{onepayData.miner_payment | currency}}</strong>
            </div>
            <div class="pay-type">
              <label>
                <strong>합계</strong>
              </label>
              <strong class="text-paleblue">{{onepayData.payment | currency}}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</q-page>
</template>

<script>
import _ from 'underscore'
import moment from 'moment'
import empService from '../services/emp'

export default {
  name: 'EmployeePay',

  data()  {
    return {
      storeSeq: '',
      empSeq: '',
      start: null,
      end: null,

      weeksum :'0',

      payData: {
        START_DAY: null,
        END_DAY: null,
        LIST: [],
        TYPE : '',
        realtotal :'',
        count :'',
      },
      today: new Date,
      selectedYear: null,
      selectedMonth: null,
      visibleDetail: false
    }
  },

  computed: {
    totalPayData()  {
      let total = {
        basic: 0,
        night: 0,
        day: 0,
        miner: 0,
        sum: 0
      };
console.log('this.payData:',this.payData);
      this.payData.LIST.forEach(payData => {
        total.basic += payData.basic_payment;
        total.night += payData.night_payment;
        total.day += payData.day_payment;
        total.miner += payData.miner_payment;
        total.sum += payData.payment;
      });

if(this.payData.TYPE =='2'){
  total.sum =this.payData.realtotal;
}else if(this.payData.TYPE =='1'){
  total.sum =this.payData.realtotal;
}
      return total;
    },

    startYear() {
      return this.start.getFullYear();
    },

    startMonth() {
      return this.start.getMonth();
    },

    endYear() {
      return this.end.getFullYear();
    },

    endMonth() {
      return this.end.getMonth();
    },

    currentYear()  {
      return this.today.getFullYear();
    },

    currentMonth()  {
      return this.today.getMonth();
    },

    prevYear() {
      return this.prevMonth > this.selectedMonth ? this.selectedYear - 1 : this.selectedYear;
    },

    prevMonth() {
      let month = this.selectedMonth - 1;

      return month < 0 ? 11 : month;
    },

    isShowPrevButton()  {
      if(this.prevYear >= this.startYear) {
        if(this.prevYear === this.startYear && this.prevMonth < this.startMonth) return false;
      } else {
        return false;
      }

      return true;
    },

    nextYear() {
      return this.nextMonth < this.selectedMonth ? this.selectedYear + 1 : this.selectedYear;
    },

    nextMonth() {
      let month = this.selectedMonth + 1;

      return month > 11 ? 0 : month;
    },

    isShowNextButton()  {
      if(this.nextYear <= this.currentYear) {
        if(this.nextYear === this.currentYear && this.nextMonth > this.currentMonth) return false;
      } else {
        return false;
      }

      return true;
    },
  },

  watch: {
    selectedMonth(month) {
      if(month < 0) {
        this.selectedYear--;
        this.selectedMonth = 11;
        return;
      }

      if(month > 11)  {
        this.selectedYear++;
        this.selectedMonth = 0;
        return;
      }

      this.getPayDatas(this.selectedYear, this.selectedMonth);
    }
  },

  methods: {
    /**
     * 급여 조회
     *
     * @param {Number} year 년
     * @param {Number} month 월
     */
    async getPayDatas(year, month) {
      try {
        const dateValue = new Date;

        dateValue.setFullYear(year);
        dateValue.setMonth(month);

      //  this.weeksum = await empService.getOneWeekSum(this.empSeq);

        const payData = await empService.getPayDatas(this.storeSeq, this.empSeq, dateValue);

//console.log('--------',payData);
        this.payData.LIST = Object.keys(payData.LIST).map(date => {
          payData.LIST[date].date = date;

          return payData.LIST[date];
        });
        this.payData.count  = payData.count;
        this.payData.TYPE  = payData.TYPE;
        this.payData.realtotal =  payData.realtotal;
        this.payData.START_DAY = moment(payData.START_DAY).format('MM/DD');
        this.payData.END_DAY = moment(payData.END_DAY).format('MM/DD');
        this.payData.LIST = _.sortBy(this.payData.LIST, 'date').reverse();
      } catch (err) {
        console.warn(err);
        this.payData.LIST = [];

        // this.showAlert('급여정보가 없습니다 :(');
      }
    },

    getPrevPayDatas() {
      this.selectedMonth -= 1;
    },

    getNextPayDatas() {
      this.selectedMonth += 1;
    }
  },

  created() {
    this.empSeq = this.$route.params.id;
    this.storeSeq = this.$route.query.storeSeq;
    this.start = moment(this.$route.query.start).toDate();
    this.end = moment(this.$route.query.end || '2099-01-01').toDate();

// console.log('this.empSeq:',this.empSeq);
// console.log('this.storeSeq:',this.storeSeq);
// console.log('this.start:',this.start);
// console.log('this.end:',this.end);


    this.selectedYear = this.currentYear;
    this.selectedMonth = this.currentMonth;

    this.setHeader({
      visible: true,
      title: '급여정보',
      useBackButton: true
    });
  },
}
</script>

<style lang="stylus" scoped>
@import "../css/themes/common.variables.styl"

.pay-wrap {
  border-radius: 4px;

  .pay-type-wrap {
    margin-top: 20px;
    padding-top: 20px;
    border-top: 1px solid rgba(255,255,255,.4);

    .pay-type {
      text-align: right;

      label {
        display: inline-block;
        margin-right: -6px;
        width: 110px;
        text-align: left;
        vertical-align: middle;
        font-size: .7rem;
      }

      strong {
        display: inline-block;
        width: 120px;
        font-size: .9rem;
        font-weight: 600;
      }
    }
  }

  .short-wrap {
    border-radius: 4px;
    padding: 24px 12px 6px;
    background: $paleblue;
    box-sizing: border-box;
    color: #fff;

    .month-wrap {
      position: relative;
      text-align: center;
      font-size: 1rem;
      font-weight: 600;

      .btn-prev, .btn-next {
        position: absolute;
        top: -10px;
        height: 38px;
        color: #fff;

        .q-icon {
          height: 38px;
          vertical-align: middle;
        }
      }

      .btn-prev {
        left: 0;
      }

      .btn-next {
        right: 0;
      }
    }

    .total-pay-wrap {
      margin-top: 48px;
      text-align: right;
      font-size: 1.4rem;
      font-weight: 100;

      strong {
        font-weight: 600;
      }
    }

    .btn-detail-wrap {
      margin-top: 36px;

      button {
        width: 100%;
        background: none;
        border: 0;
        font-size: .7rem;
        color: #fff;

        .q-icon {
          width: 100%;
          font-size: 1.2rem;
          transition: .5s all ease;

          &.detail {
            transition: .5s all ease;
            transform: rotateZ(-180deg);
          }
        }
      }
    }
  }

  .detail-wrap {
    display: none;
    padding: 24px 12px;
    border: 1px solid $paleblue;
    border-top: 0;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    background-color: #fff;
    color: $darkblue;

    .item-wrap {
      margin: 0 0 20px;

      .pay-type-wrap {
        margin-top: 4px;
        padding: 18px 12px 12px;
        border: 1px solid #9bc5d7;
        border-radius: 4px;

        .date-wrap {
          margin-top: -8px;
          margin-bottom: 8px;
          font-size: 1rem;
          font-weight: 600;

          .day-wrap {
            color: $em;
          }
        }

        .pay-type:last-child {
          margin-top: 12px;
          padding-top: 12px;
          border-top: 1px solid #9bc5d7;
        }
      }

      &:last-child {
        margin: 0;
      }
    }
  }

  &.active {
    .short-wrap {
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }

    .detail-wrap {
      display: block;
    }
  }
}
</style>
