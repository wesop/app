<template>
<div class="cards-component" :style="{ maxWidth: `${deviceWidth}px` }">
  <section
    v-touch:swipe.left="() => list.length ? swipeIndex++ : void(0)"
    v-touch:swipe.right="() => list.length ? swipeIndex-- : void(0)"
    class="cards-wrap"
    :style="{
      width: `${(list.length ? list.length : 1) * deviceWidth}px`,
      transform: `translateX(${-this.deviceWidth * this.swipeIndex}px)`
    }">
    <section
      v-if="!list.length"
      v-scroll="scrolled"
      class="card-wrap active">
      <div class="wrapper"> 
        <section class="card-contents-wrap no-list"> 
          
          <div class="card-contents" text-center>
            <q-icon size="2.7rem" name="store" style="color:#9db6ca;"></q-icon>
             <div class="sub-wrap">
             <div class="message-wrap">
              <div>아직 등록된 매장이 없습니다</div>
              <div>자신의 매장을 등록해보세요!</div>
            </div>
            <q-btn
              @click="pagePush({ name: 'StoreRegister' })"
              round
              size="24px"
              icon="add"
              color="paleblue" />
          </div>

          </div>
        </section>
      </div>
    </section>
    <section
      v-scroll="scrolled"
      v-if="list.length"
      v-for="(item, index) in list"
      :key="item.STORE_SEQ"
      :class="'card-wrap ' + (index === swipeIndex ? 'active' : '')">
      <div class="wrapper">
        <header class="card-header-wrap">
          <div class="card-background-wrap">
            <div>
              <img v-if="item.images.length" :src="'http://api.shop-sol.com/uploads/' + item.images[0].IMAGE" alt="" />
            </div>
            <!-- <img src="http://image.istarbucks.co.kr//upload/store/2017/12/[9514]_20171203034244_w2u0n.jpg" alt=""> -->
            <!-- <img src="http://walkthechat.com/wp-content/uploads/2017/01/store-mng-icon-1.png" alt="store image"> -->
          </div>
          <h3>
            {{item.NAME}}
          </h3>
        </header>
        <section class="card-contents-wrap">
          <div class="card-contents">
            <h4>
              <q-icon name="person" color="blue" />
              근무중인 직원
              <small>({{item.workingEmpList.length}}/{{item.empsize.length}})</small>
              <button @click="pagePush({ name: 'ScheduleCalendar' })"
                type="button" class="more">
                더보기
              </button>
            </h4>
            <div class="emp-list-wrap">
              <ul v-if="item.workingEmpList">
                <li @click="viewEmpDetail(item, emp)"
                  v-for="(emp, index) in item.workingEmpList"
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
                <li @click="viewEmpDetail(item, emp)"
                  v-if="!emp.isWorking&& !emp.isEnd"
                  v-for="(emp, index) in item.empList"
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


          <div class="card-contents">
            <h4 class="text-blue">
              <q-icon name="monetization_on" />
              매장급여 정보 <strong style="font-weight:400;" class="text">({{ item.empTotalpay.start  }}~{{ item.empTotalpay.end  }})</strong>
               <!-- <button 
               @click="pagePush({
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
              </button> -->
            </h4>
            <div class="field">
              <div class="pay-wrap">
                <label style="font-weight:400; font-size:14px;" class="label">누적급여</label>
                <strong style="font-weight:400;font-size:14px;" class="text">{{ item.empTotalpay.total  }}</strong>
              </div>
              <div class="pay-wrap">
                <strong style="font-weight:400;font-size:14px;" class="label">예상급여</strong>
                 <strong style="font-weight:400;font-size:14px;" class="text">{{ item.empTotalpay.stackedpay  }}</strong>
              </div>
              <div class="pay-wrap">
                <strong style="font-weight:400;font-size:14px;" class="label">주휴수당</strong>
                 <strong style="font-weight:400;font-size:14px;" class="text">{{ item.empTotalpay.weekpay  }}</strong>
              </div> 
            </div>
          </div>



          <div class="card-contents">
            <h4 class="text-blue">
              <q-icon name="person" />
              종료예정 직원
              <button @click="pagePush({
                  name: 'EmployeeList',
                  params: { id: item.STORE_SEQ },
                  query: { type: 1,storefivetype : item.FIVETYPE }
                })"
                type="button" class="more">
                더보기
              </button>
            </h4>
            <div class="emp-list-wrap">
              <ul v-if="item.closeNearEmpList">
                <li @click="viewEmpDetail(item, emp)"
                  v-for="(emp, index) in item.closeNearEmpList.slice(0, 4)"
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
              <div v-if="!item.closeNearEmpList || !item.closeNearEmpList.length" class="text-gray" text-center>
                <small style="font-size:70%;">종료예정 직원이 없습니다.</small>
              </div>
            </div>
          </div>


          <div class="card-contents">
            <h4 class="text-blue">
              <q-icon name="mail" />
              합류요청 직원
              <button @click="pagePush({
                  name: 'EmployeeList',
                  params: { id: item.STORE_SEQ },
                  query: { type: 0 ,storefivetype : item.FIVETYPE}
                })"
                type="button" class="more">
                더보기
              </button>
            </h4>



            <div class="emp-list-wrap">
              <ul v-if="item.waitEmpList">
                <li @click="pagePush({
                    name: 'EmployeeList',
                    params: { id: item.STORE_SEQ },
                    query: { type: 0 ,storefivetype : item.FIVETYPE}
                  })"
                  v-for="(emp, index) in item.waitEmpList.slice(0, 4)" :key="index">
                  <div class="image-wrap">
                    <img v-if="emp.images && emp.images.length" :src="'http://api.shop-sol.com/uploads/' + emp.images[0].IMAGE" >
                    <img v-else src="../assets/imgs/pserson.png" alt="emp" />
                  </div>
                  <div>
                    {{decodeURIComponent(emp.EMP_NAME)}}
                  </div>
                </li>
              </ul>
              <div v-if="!item.waitEmpList || !item.waitEmpList.length" class="text-gray" text-center>
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
        :key="item.STORE_SEQ"
        :class="index === swipeIndex ? 'active' : ''">
        {{index}}
      </li>
    </ul>
  </section>
</div>
</template>

<script>
import Emp from '../models/emp'
import Store from '../models/store'

export default {
  name: 'OwnerCards',

  data()  {
    return {
      swipeIndex: 0,
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
          storefivetype : store.FIVETYPE
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

  mounted() {

  }
}
// // min-height 114px
//            margin-top 1em
          
</script>

<style lang="stylus" scoped>
@import "../css/themes/common.variables.styl"

$padding = 40px
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

.cards-component
  position absolute
  display flex
  top 0
  bottom 0
  left 0
  right 0
  flex-direction column
  overflow-x hidden

  .cards-wrap
    position relative
    display flex
    padding-top 18px
    flex 8
    transition all .5s ease

    .card-wrap
      position relative
      flex 1
      transform translateX(13%) scaleY(.9)
      transition all .5s ease
      overflow-y auto

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
              border-top-left-radius: 8px;
              border-top-right-radius: 8px;
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

        .card-contents-wrap
          position relative
          padding 0 .5em .5em
          height 123px

          &.no-list
            height: 100%;
            padding-top: 12.15%;
            font-weight: 600;
            color: $darkblue;

              
            .card-contents
              height 100%
              max-height 100%
              min-height 100%

              .message-wrap
                margin: 24px 0;
                line-height: 120%;

            

          .card-contents

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
                  opacity: .5;
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
</style>

