<template>
<q-page>
  <section class="page-wrap">
    <form>
      <div class="row" padding-bottom>
        <div class="col-3">
          {{ opened ? '공개' : '비공개' }}
        </div>
        <div class="col-9" text-left>
          <q-option-group
            v-model="opened"
            type="toggle"
            color="black"
            :options="[ { label: '', value: true } ]"
          />
        </div>
      </div>

      <q-field label="근무 가능 시간" required margin-top>
        <div class="row justify-center" padding-top padding-bottom>
          <div class="col-4">
            <q-datetime
              v-model="startTime"
              hide-underline
              type="time"
              format="HH시 mm분"
              ok-label="설정"
              cancel-label=" "
              placeholder="출근시간" />
          </div>
          <div class="col-2"></div>
          <div class="col-4">
            <q-datetime
              v-model="endTime"
              hide-underline
              type="time"
              format="HH시 mm분"
              ok-label="설정"
              cancel-label=" "
              placeholder="퇴근시간" />
          </div>
          <div class="col-2"></div>
        </div>
      </q-field>

      <q-field label="희망시급" required margin-top>
        <q-input
          v-model="pay"
          hide-underline
          text-right
          color="gray"
          suffix="원"
          type="number"
          placeholder="시급" />
        <div>
          <small>* 2018년 최저시급은 <strong class="text-em">7,530원</strong> 입니다.</small>
        </div>
      </q-field>

      <q-field label="근무분야" required margin-top>
        <q-select
          v-model="categories"
          multiple
          hide-underline
          color="gray"
          :options="[
            { label: '커피', value: 'C' },
            { label: '배달', value: 'D' },
          ]"
          placeholder="근무분야" />
      </q-field>

      <q-item-separator />

      <q-field label="간단한 자기소개" margin-top margin-bottom>
        <q-input
          v-model="comment"
          hide-underline
          type="textarea"
          rows="4"
          :max-height="92"
          placeholder="소개말을 적어주세요(최대 140자)" />
      </q-field>

      <q-btn
        :label="mode === 'Regist' ? '등록' : '수정'"
        color="black"
        class="full-width"
      />
    </form>
  </section>
</q-page>
</template>

<script>
export default {
  name: 'ResumeRealTimeRegist',

  data()  {
    return {
      mode: '',
      opened: true,
      hireType: 'T',
      startDate: null,
      endDate: null,
      day: null,
      categories: [],
      startTime: new Date,
      endTime: new Date,
      pay: 0,
      comment: '',
    }
  },

  created() {
    this.mode = this.$route.params.mode;

    this.setHeader({
      visible: true,
      title: `번개면접 이력서 ${this.mode === 'Regist' ? '등록' : '수정'}`,
      buttons: [],
      useBackButton: true
    });
  }
}
</script>

<style lang="stylus" scoped>
.page-wrap
  // padding-bottom: 3em;

.q-field
  position relative

  .q-radio
    width: 47%

  .q-checkbox + button.q-btn
    position absolute
    top 0
    right 0
    padding 0
    min-height auto
    font-size .85rem

.label
  margin-top -8px
  margin-bottom 12px

small
  font-size .8rem

.schedule-wrap
  font-size 1rem

button.q-btn.btn-del
  padding 0
  min-height auto

.row
  align-items center

</style>
