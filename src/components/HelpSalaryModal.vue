<template>
<Modal v-model="value" :content-css="{ minWidth: '90%' }">
  <div class="page-wrap">
    <div v-if="title === '3대 수당'">
      <div class="field" text-left>
        <div class="label"> <br>추가근로수당이란?</div>
        <div class="text"> <br>법정근로시간 초과 및 소정근로시간 외 근무할 때 기본급에 50%를 가산하여 지급</div>
     

        <div class="label"> <br>야간근로수당이란?</div>
        <div class="text"> <br>야간근로(오후10시부터 다음 날 오전6시 사이의 근로)에 대하여 기본급에 50%를 가산하여 지급 </div>
     

        <div class="label"> <br>휴일근로수당이란?</div>
        <div class="text">
          <div> <br>법정공휴일(5월1일)에 대하여 기본급에 50%를 가산하여 지금</div>
          <!-- <small>*휴일근로수당과 연장근로수당이 중복될 경우 고용노동부 행정해석에 따라 휴일근로수당만 추가해 기본급에 150%를 지급한다(8시간 이하)</small> -->
        </div>
     </div>
    </div>

    <div v-else-if="title === '휴게시간'">
      <div class="field" text-left>
        <div class="label"><br>휴게시간이란?</div>
        <div class="text">
           <br>
          <div>[근로기준법 휴게시간]</div>
          <div>사용자는 근로시간이 4시간인 경우 30분 이상, </div>
          <div>8시간인 경우 1시간 이상의 휴게시간을</div>
           <div>근로시간 도중에 주어야 한다</div>
          <br>
          <br>
          <div>[휴게시간 선택시]</div>
          <div>- 4시간 30분 근무시 : 4시간 급여계산 인정</div>
          <div>- 9시간 근무시 : 8시간 급여계산 인정</div>
          <small>*유급 휴게시간을 진행하시는 점장님은 선택해제를 해 주세요.</small>
        </div>
      </div>
    </div>

    <div v-else>
      <div class="field" text-left>
        <div class="label"><br>주휴수당이란?</div>
        <div class="text">
           <br>
            <div>주 15시간 이상 소정의 근로시간을 개근할 경우 지급되는 유급휴일 수당</div>
        </div>
      </div>
    </div>

  </div>

  <div slot="footer">
    <q-btn @click="close" label="닫기"></q-btn>
  </div>
</Modal>
</template>

<script>
export default {
  name: 'HelpSalaryModal',

  model: {
    prop: 'value'
  },

  props: {
    value: Boolean,

    title: String
  },

  methods: {
    close() {
      this.$emit('input', false);
    }
  }
}
</script>

<style lang="stylus" scoped>
.page-wrap {
  padding-top: 0;
}
</style>
