<template>
<div class="cards-component" :style="{  maxWidth: `${deviceWidth}px` }">
  <section
    v-touch:swipe.left="() => list.length ? swipeIndex++ : void(0)"
    v-touch:swipe.right="() => list.length ? swipeIndex-- : void(0)"
    class="cards-wrap"
    :style="{
      width: `${(list.length ? list.length : 1) * deviceWidth}px`,
      transform: `translateX(${-this.deviceWidth * this.swipeIndex}px)`
    }">
    <section v-if="!list.length"
      v-scroll="scrolled"
      class="card-wrap active">
      <div class="wrapper no-list">
        <section class="card-contents-wrap">
          <div class="card-contents" text-center>
            <!-- <div class="sub-wrap">
              <div class="message-wrap">
                <div>지금 바로 구직에 참여해보세요!</div>
              </div>
              <q-btn
                @click="showAlert('준비중입니다.')"
                round
                size="24px"
                icon="flash on"
                color="paleblue" />
            </div> -->
            <div class="sub-wrap">
              <div class="message-wrap">
                <div>자신의 일터에 합류요청을 해보세요!</div>
              </div>
              <q-btn
                @click="pagePush({ name: 'StoreSearch' })"
                round
                size="24px"
                icon="add"
                color="paleblue" />
            </div>

          </div>
        </section>
      </div>
    </section>
    <section v-scroll="scrolled"
      v-if="list.length"
      v-for="(store, index) in list"
      :key="index"
      :class="'card-wrap ' + (index === swipeIndex ? 'active' : '')">
      <div class="wrapper">
        <header class="card-header-wrap">
          <div class="card-background-wrap">
            <div>
              <img v-if="store.images.length" :src="'http://api.shop-sol.com/uploads/' + store.images[0].IMAGE" alt="" />
            </div>
          </div>
          <h3>
            {{store.NAME}}
            <small v-if="store.IS_MANAGER == 1">(매니저)</small>
            <small v-if="store.TYPE == 0" class="text-paleblue">(합류대기중)</small>
          </h3>
        </header>
        <section class="card-contents-wrap">
          <div v-if="store.TYPE == 1  && store.emp.PAY_SHOW == '1'" class="card-contents">
            <h4>
              본인급여 정보<strong style="font-weight:400;" class="text">({{ store.empTotalpay.start  }}~{{ store.empTotalpay.end  }})</strong>
              <button @click="pagePush({
                  name: 'EmployeePay',
                  params: { id: store.emp.EMP_SEQ },
                  query: {
                    storeSeq: store.STORE_SEQ,
                    start: store.emp.START,
                    end: store.emp.END
                  }
                })"
                type="button" class="more">
                더보기
              </button>
            </h4>
            <div class="field">
              <div class="pay-wrap">
                <label class="label" style="font-weight:400; font-size:14px;">누적급여</label>
                <strong class="text" style="font-weight:400; font-size:14px;">{{ store.totalPay | currency }}</strong>
              </div>
              <div class="pay-wrap">
                <strong class="label" style="font-weight:400; font-size:14px;">예상급여</strong>
                 <strong class="text" style="font-weight:400; font-size:14px;">{{ store.stackpay.stackedpay | currency }}</strong>
                <!-- <strong class="text large text-paleblue">{{ getExpectedStackedPay(store.emp, store.CALCULATE_DAY) | currency }}</strong> -->
              </div>

              <div class="pay-wrap">
                <strong style="font-weight:400;font-size:14px;" class="label">주휴수당</strong>
                 <strong style="font-weight:400;font-size:14px;" class="text">{{ store.weekpay  }}</strong>
              </div>


            </div>
          </div>

         
           <div v-if="store.TYPE == 1 && store.IS_MANAGER =='1' && store.emp.OTHERPAY_SHOW =='1' " class="card-contents">
            <h4>
              매장급여 정보<strong style="font-weight:400;" class="text">({{ store.empTotalpay.start  }}~{{ store.empTotalpay.end  }})</strong>
            </h4>
            <div class="field">
               <div class="pay-wrap">
                <label style="font-weight:400; font-size:14px;" class="label">누적급여</label>
                <strong style="font-weight:400;font-size:14px;" class="text">{{ store.empTotalpay.total  }}</strong>
              </div>
              <div class="pay-wrap">
                <strong style="font-weight:400;font-size:14px;" class="label">예상급여</strong>
                 <strong style="font-weight:400;font-size:14px;" class="text">{{ store.empTotalpay.stackedpay  }}</strong>
              </div>

              <div class="pay-wrap">
                <strong style="font-weight:400;font-size:14px;" class="label">주휴수당</strong>
                 <strong style="font-weight:400;font-size:14px;" class="text">{{ store.empTotalpay.weekpay   }}</strong>
              </div>

              <!-- <div class="pay-wrap">
               
              </div> -->
            </div>
          </div>


          <div v-if="store.TYPE == 1" class="card-contents">
            <h4>
              근무일정
            </h4>
            <div>
              <Timetable :timeTable="store.emp.timeTableService.selected" />
            </div>
          </div>
          <!-- <div v-if="store.TYPE == 1 && store.emp" class="card-contents">
            <h4>
              계약 종료일
             <q-btn size="0.8rem" label="상세보기" class="more" /> 
            </h4>
            <div>
              <div class="row">
                <div class="col-12 text-em" text-right>
                  <small v-if="store.emp.CONTRACT_END">
                    근무종료
                  </small>
                  <small v-else-if="store.emp.haveContractDate">
                    D-{{ store.emp.haveContractDate }}일
                  </small>
                  <small v-else>
                    계약 종료일 미정
                  </small>
                </div>
              </div>
            </div>
          </div> -->
          <div v-if="store.IS_MANAGER == 1" class="card-contents">
            <h4>
              <q-icon name="person" color="blue" />
              근무중인 직원
               <small>({{store.workingEmpList.length}}/{{store.empsize.length}})</small>
              <button @click="pagePush({ name: 'ScheduleEmpCalendar' })"
                type="button" class="more">
                더보기
              </button>
            </h4>
            <div class="emp-list-wrap">
              <ul v-if="store.workingEmpList">
                <li @click="viewEmpDetail(store, emp)"
                  v-for="(emp, index) in store.workingEmpList"
                  :key="index">
                  <div class="image-wrap">
                    <img v-if="emp.images && emp.images.length" :src="'http://api.shop-sol.com/uploads/' + emp.images[0].IMAGE" >
                    <img v-else src="../assets/imgs/pserson.png" alt="emp" />
                  </div>
                  <div style="color:#0480ce;">
                    {{decodeURIComponent(emp.EMP_NAME)}}
                  </div>
                </li>
              </ul>
              <q-item-separator></q-item-separator>
              <ul class="not-working-wrap">
                <li @click="viewEmpDetail(store, emp)"
                  v-if="!emp.isWorking && !emp.isEnd"
                  v-for="(emp, index) in store.empList"
                  :key="index">
                  <div class="image-wrap">
                    <img v-if="emp.images && emp.images.length" :src="'http://api.shop-sol.com/uploads/' + emp.images[0].IMAGE" >
                    <img v-else src="../assets/imgs/pserson.png" alt="emp" />
                  </div>
                  <div>
                    {{decodeURIComponent(emp.EMP_NAME)}}
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div v-if="store.IS_MANAGER == 1" class="card-contents">
            <h4>
              <q-icon name="person" />
              종료예정 직원
              <button @click="pagePush({
                  name: 'EmployeeList',
                  params: { id: store.STORE_SEQ },
                  query: { type: 1,storefivetype : store.FIVETYPE }
                })"
                type="button" class="more">
                더보기
              </button>
            </h4>
            <div class="emp-list-wrap">
              <ul v-if="store.closeNearEmpList">
                <li @click="viewEmpDetail(store, emp)"
                  v-for="(emp, index) in store.closeNearEmpList.slice(0, 4)"
                  :key="index">
                  <div class="image-wrap">
                    <img v-if="emp.images && emp.images.length" :src="'http://api.shop-sol.com/uploads/' + emp.images[0].IMAGE" >
                    <img v-else src="../assets/imgs/pserson.png" alt="emp" />
                  </div>
                  <div>
                    {{decodeURIComponent(emp.EMP_NAME)}}
                  </div>
                </li>
              </ul>
              <div v-if="!store.closeNearEmpList || !store.closeNearEmpList.length" class="text-gray" text-center>
                <small style="font-size:70%;">종료예정 직원이 없습니다.</small>
              </div>
            </div>
          </div>
          <div v-if="store.IS_MANAGER == 1" class="card-contents">
            <h4>
              <q-icon name="mail" />
              합류요청 직원
              <button @click="pagePush({
                  name: 'EmployeeList',
                  params: { id: store.STORE_SEQ },
                  query: { type: 0,storefivetype : store.FIVETYPE }
                })"
                type="button" class="more">
                더보기
              </button>
            </h4>
            <div class="emp-list-wrap">
              <ul v-if="store.waitEmpList">
                <li @click="pagePush({
                    name: 'EmployeeList',
                    params: { id: store.STORE_SEQ },
                    query: { type: 0 ,storefivetype : store.FIVETYPE}
                  })"
                  v-for="(emp, index) in store.waitEmpList.slice(0, 4)"
                  :key="index">
                  <div class="image-wrap">
                    <img v-if="emp.images && emp.images.length" :src="'http://api.shop-sol.com/uploads/' + emp.images[0].IMAGE" >
                    <img v-else src="../assets/imgs/pserson.png" alt="emp" />
                  </div>
                  <div>
                    {{decodeURIComponent(emp.EMP_NAME)}}
                  </div>
                </li>
              </ul>
              <div v-if="!store.waitEmpList || !store.waitEmpList.length" class="text-gray" text-center>
                <small style="font-size:70%;">합류요청 직원이 없습니다.</small>
              </div>
            </div>
          </div>
          <div v-if="false" class="card-contents">
            <h4>
              지각, 결근자
              <!-- <q-btn size="0.8rem" label="더보기" class="more" /> -->
            </h4>
            <div class="emp-list-wrap">
              <ul>
                <li>
                  <div class="image-wrap">
                    <img src="../assets/imgs/test.png" alt="emp" />
                  </div>
                  <div>
                    사용자
                  </div>
                </li>
                <li>
                  <div class="image-wrap">
                    <img src="../assets/imgs/test.png" alt="emp" />
                  </div>
                  <div>
                    사용자
                  </div>
                </li>
                <li>
                  <div class="image-wrap">
                    <img src="../assets/imgs/test.png" alt="emp" />
                  </div>
                  <div>
                    사용자
                  </div>
                </li>
                <li>
                  <div class="image-wrap">
                    <img src="../assets/imgs/test.png" alt="emp" />
                  </div>
                  <div>
                    사용자
                  </div>
                </li>
              </ul>
            </div>

          </div>
          <div v-if="false" class="card-contents">
            <h4>
              번개면접 신청자
              <!-- <q-btn size="0.8rem" label="더보기" class="more" /> -->
            </h4>
            <div class="emp-list-wrap">
              <ul>
                <li>
                  <div class="image-wrap">
                    <img src="../assets/imgs/test.png" alt="emp" />
                  </div>
                  <div>
                    사용자
                  </div>
                </li>
                <li>
                  <div class="image-wrap">
                    <img src="../assets/imgs/test.png" alt="emp" />
                  </div>
                  <div>
                    사용자
                  </div>
                </li>
                <li>
                  <div class="image-wrap">
                    <img src="../assets/imgs/test.png" alt="emp" />
                  </div>
                  <div>
                    사용자
                  </div>
                </li>
                <li>
                  <div class="image-wrap">
                    <img src="../assets/imgs/test.png" alt="emp" />
                  </div>
                  <div>
                    사용자
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </section>
  </section>
  <section class="paging-wrap">
    <ul>
      <li
        @click="swipeIndex = index"
        v-for="(item, index) in list"
        :key="index"
        :class="index === swipeIndex ? 'active' : ''">
        {{index}}
      </li>
    </ul>
  </section>
</div>
</template>

<script>
import scheduleService from '../services/schedule'
import Emp from '../models/emp'

export default {
  name: 'WorkerCards',

  data()  {
    return {
      swipeIndex: 0,
      deviceWidth: window.innerWidth,
      today: new Date,
    }
  },

  props: {
    list: {
      type: Array,
      required: true,
      default: []
    }
  },

  methods: {
    scrolled()  {},

    /**
     * @param {Emp} emp 직원정보
     * @param {string | number} calculateDay 급여정산일
     */
    getExpectedStackedPay(emp, calculateDay) {
      return scheduleService.getExpectedStackedPay(emp, calculateDay);
    },

    /**
     * View Employee Detail
     *
     * @param {Store} store
     * @param {Emp} emp
     */
    viewEmpDetail(store, emp) {
      this.pagePush({
        name: 'EmployeeDetail',
        params: {
          id: emp.EMP_SEQ || emp.EMP_ID
        },
        query: {
          storeSeq: store.STORE_SEQ,
          emp,
          type: '1',
          storefivetype : store.FIVETYPE,
          OtherpayShow : store.OTHERPAY_SHOW,
        }
      });
    }
  },

  watch: {
    swipeIndex()  {
      if(this.swipeIndex < 0) this.swipeIndex = 0;
      if(this.swipeIndex > this.list.length - 1) this.swipeIndex = this.list.length - 1;
    }
  },

  created() {
    this.today.setHours(0, 0, 0, 0);
  },

  mounted() {
    window.addEventListener('resize', () => {
      this.deviceWidth = window.innerWidth;
    });
  }
}
</script>

<style lang="stylus" scoped>
@import "../css/themes/common.variables.styl"

$padding = 40px

.cards-component
  position absolute
  display flex
  top 0
  bottom 0
  left 0
  right 0
  flex-direction column
  overflow-x hidden
  background-color: #fff;

  .cards-wrap
    position relative
    display flex
    padding-top 18px
    flex 8
    transition all .5s ease

    .card-wrap
      flex 1
      transform translateX(13%) scaleY(.9)
      transition all .5s ease

      &.active
        transform translateX(0) scaleY(1)
        transition all .5s ease

        .wrapper
          overflow-y auto

        & + .card-wrap
          transform translateX(-13%) scaleY(.9)
          transition all .5s ease

      .wrapper
        position absolute
        left 10%
        right 10%
        top 3px
        bottom 3px
        margin 0
        width 80%
        overflow-x hidden
        overflow-y hidden
        border 1px solid alpha($gray, 40%)
        border-radius 10px
        box-shadow 0 0 6px #9a9a9a
        -webkit-overflow-scrolling touch

        .card-header-wrap
          position relative
          height 37.5%
          max-height 37.5%
          border-bottom 2px solid $paleblue

          .card-background-wrap
            display flex
            max-height 100%
            min-height 100%
            // background-color #9db6ca
            background-color #fff
            border-top-left-radius 8px
            border-top-right-radius 8px
            align-items center
            overflow hidden

            & > div
              flex 1

              img
                display block
                margin 0 auto
                width auto
                height auto
                max-width 100%
                max-height 100%
                border-top-left-radius 8px
                border-top-right-radius 8px

            &:after
              position: absolute;
              top: 0;
              width: 100%
              height: 100%;
              background: -moz-linear-gradient(0deg, rgba(0,0,0,0) 0%, rgba(102,102,102,.7) 100%);
              background: -webkit-linear-gradient(0deg, rgba(0,0,0,0) 0%, rgba(102,102,102,.7) 100%);
              background: linear-gradient(0deg, rgba(0,0,0,0) 0%, rgba(102,102,102,.7) 100%);
              border-top-left-radius 8px
              border-top-right-radius 8px
              content: '';

          h3
            position absolute
            top 0
            left 0
            right 0
            padding-left 8px
            line-height 48px
            font-size 1.275rem
            color #fff

        &.no-list
          padding: 0;
          height 100%
          font-weight: 600;
          font-size: 1.1rem;
          border: 0;
          box-shadow: none;
          color: $darkblue;

          .card-contents-wrap
            position relative
            padding .5em
            height 100%

            .card-contents {
              height: 100%;
            }

        .card-contents-wrap
          position relative
          padding .5em

          .card-contents
            clear: both;
            height 100%

            .sub-wrap
              padding-top: 54px;
              height: 49%;
              border-radius: 10px;
              box-shadow: 0 0 4px $gray;
              box-sizing: border-box;

              &:first-child
                margin-bottom: 12px;

              .message-wrap
                margin: 0 0 24px;
                line-height: 120%;

          .card-contents
            margin-top 1em
            height auto
            box-sizing border-box

            &:first-child
              margin-top 0

            h4
              position relative
              font-weight 600
              font-size .9rem
              color $blue

              .more
                font-family 'NanumSquare1'
                position absolute
                padding 0
                right 0
                bottom 0
                background none
                border 0
                font-size .8rem
                color $blue

                &:after
                  content: '>';
                  transform: scale(.5, 1.7);
                  display: inline-block;

            .emp-list-wrap
              ul
                margin-top: 0;
                -webkit-margin-after: 0;
                -webkit-margin-end: 0;
                padding-left: 0;
                width: 100%;

                li
                  display: inline-block;
                  min-width: 25%;
                  width: 25%;
                  max-width: 25%;
                  text-align: center;
                  font-size: 0.8rem;

                  .image-wrap
                    margin 0 auto 4px

              .not-working-wrap {
                .image-wrap {
                  img {
                    opacity: .5;
                  }
                }
              }

  .paging-wrap {
    flex: 1;
    max-height: 39px;
    text-align: center;

    ul {
      display: inline-block;
      margin: 13px 0 0;
      width: auto;
      height: 20px;
      -webkit-padding-start: 0;

      li {
        float: left;
        list-style-type: none;
        margin: 0 8px;
        text-indent: -9999px;
        width: 12px;
        height: 12px;
        background-color: alpha($blue, 50%);
        border: 0;
        border-radius: 50%;

        &.active {
          background-color: $blue;
        }
      }
    }
  }

.pay-wrap {
  display: flex;
  width: 100%;
  color: $blue;

  .label {
    flex: 9;
    display: inline-block;
    width: 100%;
    text-align: right;
    vertical-align: middle;
  }

  .text {
    flex: 1;
    display: inline-block;
    min-width: 124px;
    text-align: right;
    vertical-align: middle;
    font-size: 1rem;

    &.large {
      font-size: 1.2rem;
    }
  }
}

.time-table-wrap {
  position: relative;
  margin: 0 auto;
  width: 100%;
  border-radius: 4px;

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
          margin-top: -20px;
          width: 100%;
          height: 86%;

          .progress {
            position: absolute;
            left: 20%;
            right: 20%;
            display: block;
            background-color: transparentify(#5FD0FA, #5FD0FA, .7);
            border-radius: 3px;
            border: 0;

            &.active {
              border: 1px solid alpha($gray, 50%);
            }
          }
        }
      }
    }
  }

  .guide-line-wrap {
    position: absolute;
    top: 44px;
    bottom: 4px;
    left: (12 + 30 + 6)px;
    right: 12px;

    .guide-line-top, .guide-line-bottom, .guide-line-center {
      position: absolute;
      width: 100%;
      height: 1px;
      border-bottom: 1px dashed alpha($gray, 40%);
    }

    .guide-line-top {
      top: 27%;
    }

    .guide-line-center {
      top: 46%;
      border-bottom: 1px solid alpha($gray, 40%);
    }

    .guide-line-bottom {
      bottom: 33.5%;
    }
  }

  .time-notice-wrap {
    position: absolute;
    display: none;
    width: 58px;
    height: 32px;
    background-color: rgba(0,0,0,.6);
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

</style>

