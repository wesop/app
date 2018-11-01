<template>
<Modal v-model="value" :content-css="{ minWidth: '90%', maxHeight: '95%' }">
  <div class="guide-wrap" text-left>
    <div class="field">
      <div class="label">캘린더 도움말</div>

      <!-- <div class="text">
        <button class="guide-day today">{{date}}</button>
        <span>오늘</span>
      </div>

      <div class="text">
        <button class="guide-day select">{{date}}</button>
        <span>선택</span>
      </div> -->

      <div class="text">
        <button class="guide-day wrong">{{date}}</button>
        <span>결근</span>
      </div>

      <div class="text">
        <button class="guide-day late">{{date}}</button>
        <span>지각/조퇴/초과근무</span>
      </div>

      <div class="text">
        <button class="guide-day pending update">{{date}}</button>
        <span>예정 출근일 수정/추가</span>
      </div>
      
      <div class="text">
        <button class="guide-day wrong update">{{date}}</button>
        <span>출퇴근기록 수정</span>
      </div>

      
    </div>
  </div>

  <q-btn @click="close"
    slot="footer"
    label="닫기"
  />
</Modal>
</template>

<script>
export default {
  name: 'CalendarGuideModal',

  data () {
    return {
      date: (new Date).getDate()
    }
  },

  model: {
    prop: 'value',
  },

  props: {
    value: Boolean
  },

  methods: {
    close() {
      this.$emit('input', false);
      this.$emit('change');
    }
  }
}
</script>

<style lang="stylus" scoped>
@import "../css/themes/common.variables.styl"

.guide-wrap {
  font-size: 1rem;
  color: $darkblue;

  .text {
    padding: 10px 0;

    span {
      margin-left: 1em;
    }
  }
}

.guide-day {
  padding: 0;
  width: 28px;
  height: 28px;
  background-color: transparent;
  border: 0;
  border-radius: 50%;
  box-sizing: border-box;

  &.today {
    background-color: $paleblue;
    color: #fff;
  }

  &.select {
    background-color: $em;
    color: #fff;
  }

  &.wrong {
    position: relative;

    &:after {
      position: absolute;
      bottom: -2px;
      left: ((28 - 5) / 2)px
      width: 5px;
      height: 5px;
      background-color: #e66a74;
      border-radius: 50%;
      content: '';
    }
  }

  &.late {
    position: relative;

    &:after {
      position: absolute;
      bottom: -2px;
      left: ((28 - 4) / 2)px
      width: 5px;
      height: 5px;
      background-color: #e4a76a;
      border-radius: 50%;
      content: '';
    }
  }

  &.update {
    border: 1px solid #e66a74;

    &:after {
      display: none;
    }
  }

  &.pending.update {
    position: relative;
    border: 0;

    &:after {
      position: absolute;
      display: block;
      bottom: -2px;
      left: ((28 - 4) / 2)px
      width: 5px;
      height: 5px;
      background-color: $secondary;
      border-radius: 50%;
      content: '';
    }
  }

  font-size: 1em;
}
</style>

