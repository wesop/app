<template>
<q-page>
  <div class="select-wrap">
    <div class="message text-blue">
      <strong>가입유형을 선택하세요!</strong>
    </div>

    <div class="row items-center">
      <div class="col-6 row">
        <div class="col-12" text-center>
          <div class="radio-wrap">
            <input v-model.number="userType" name="user-type" id="radio-0" type="radio" value="1" />
            <div class="radio-bg-wrap owner">
              <q-icon name="check" size="2.75rem" color="paleblue" />
              <label for="radio-0">
                <img v-if="userType !== 1" :src="require('../assets/imgs/owner.png')" />
                <img v-else :src="require('../assets/imgs/owner-white.png')" />
              </label>
            </div>
            <label for="radio-0">점장</label>
          </div>
        </div>
      </div>
      <div class="col-6 row">
        <div class="col-12" text-center>
          <div class="radio-wrap">
            <input v-model.number="userType" name="user-type" id="radio-1" type="radio" value="0" />
            <div class="radio-bg-wrap part-time">
              <q-icon name="check" size="2.75rem" color="paleblue" />
              <label for="radio-1">
                <img v-if="userType !== 0" :src="require('../assets/imgs/part-time.png')" />
                <img v-else :src="require('../assets/imgs/part-time-white.png')" />
              </label>
            </div>
            <label for="radio-1">직원</label>
          </div>
        </div>
      </div>
    </div>
  </div>

  <q-btn @click="next"
    :disabled="userType == null"
    label="다음"
    color="paleblue"
    class="btn-next full-width" />
</q-page>
</template>

<script>
export default {
  name: 'SignupTypeSelect',

  data()  {
    return {
      /**
       * 0(알바생), 1(점주)
       *
       * @type {number}
       */
      userType: null
    }
  },

  methods: {
    next()  {
      this.pagePush({
        name: 'SignupForm',
        query: Object.assign({
          STORE: this.userType,
        }, this.$route.query)
      });
    }
  },

  created() {
    this.setHeader({
      visible: true,
      title: '회원가입',
      useBackButton: true
    });

    this.setFooter({ visible: false });
  }
}
</script>

<style lang="stylus" scoped>
@import "../css/themes/common.variables.styl"

.select-wrap {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 1em;
  right: 1em;

  .message {
    position: absolute;
    top: 80px;
    width: 100%;
    text-align: center;
  }

  & > .row {
    height: 100%;
  }
}

.column {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;

  & > .col-6 {
    width: 100%;
    font-size: 2rem;
  }
}

.radio-wrap {
  position: relative;

  label {
    font-size: 1.2rem;
    color: $tertiary;
  }

  .radio-bg-wrap {
    position: relative;
    width: 100%;
    margin: 0 auto 10px;
    padding: 19px;
    width: 126px;
    height: 126px;
    border-radius: 50%;
    border: 4px solid #8a919c;

    .q-icon {
      position: absolute;
      top: -56px;
      left: 0;
      right: 0;
      opacity: 0;
    }

    img {
      display: block;
      margin: 0 auto;
      width: 100%;
    }
  }

  input[type="radio"] {
    display: none;

    &:checked ~ label {
      font-weight: 600;
      color: $paleblue;
    }

    &:checked ~ .radio-bg-wrap {
      background-color: $paleblue;
      border: 0px;

      .q-icon {
        opacity: 1;
      }
    }
  }
}

.btn-next {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 57px;

  &[disabled] {
    background-color: #BEC4D1 !important;
  }
}
</style>

