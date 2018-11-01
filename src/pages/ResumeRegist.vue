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

      <q-field label="희망 근무 시작일" required margin-top>
        <q-datetime
          v-model="startDate"
          hide-underline
          type="date"
          format="YYYY년 MM월 DD일"
          ok-label="설정"
          cancel-label=" "
          placeholder="근무 시작일" />
      </q-field>

      <q-field label="희망 근무 종료일" margin-top>
        <q-datetime
          v-model="endDate"
          hide-underline
          type="date"
          format="YYYY년 MM월 DD일"
          ok-label="설정"
          cancel-label=" "
          placeholder="근무 시작일" />
        <div margin-top>
          <small>* 미입력시 추후협의로 설정됩니다.</small>
        </div>
      </q-field>

      <q-field label="근무 일정" margin-top class="schedule-wrap">
        <q-btn
          @click="() => {}"
          margin-bottom
          label="추가"
          color="black"
          icon="add circle"
          class="full-width" />

        <div class="row justify-center" padding-top padding-bottom>
          <div class="col-1">
            <q-btn
              @click="() => {}"
              size="1em"
              color="white"
              icon="remove circle"
              class="text-em btn-del" />
          </div>
          <div class="col-2">
            <q-select
              v-model="day"
              hide-underline
              text-right
              :options="[ { label: '월', value: 1 }, { label: '화', value: 2 }, { label: '화', value: 2 } ]"
              color="white"
            />
          </div>
          <div class="col-4">
            <q-datetime
              v-model="startTime"
              hide-underline
              text-right
              type="time"
              format="HH시 mm분"
              ok-label="설정"
              cancel-label=" "
              placeholder="출근시간" />
          </div>
          <div class="col-4">
            <q-datetime
              v-model="endTime"
              hide-underline
              text-right
              type="time"
              format="HH시 mm분"
              ok-label="설정"
              cancel-label=" "
              placeholder="퇴근시간" />
          </div>
        </div>

        <div margin-top>
          <small>* 미입력시 추후협의로 설정됩니다.</small>
        </div>
      </q-field>

      <q-field label="희망 근무지역" required margin-top>
        <q-select
          v-model="area"
          multiple
          filter
          filter-placeholder="희망 근무지역 검색"
          hide-underline
          color="gray"
          :options="[
            { label: '서울 강남구', value: 'SG' },
            { label: '서울 서초구', value: 'SS' },
            { label: '안양시 동안구', value: 'A1' },
            { label: '안양시 먼안구', value: 'A2' },
          ]"
          placeholder="희망 근무지역" />
      </q-field>

      <q-field label="급여(시급/월급)" margin-top>
        <q-input
          v-model="pay"
          hide-underline
          text-right
          suffix="원"
          type="number"
          placeholder="급여" />

        <div>
          <small>* 2018년 최저시급은 <strong class="text-em">7,530원</strong> 입니다.</small>
        </div>

        <div>
          <small>* 미입력시 추후협의로 설정됩니다.</small>
        </div>
      </q-field>

      <q-item-separator />

      <q-field label="자기소개" margin-top>
        <q-input
          v-model="comment"
          hide-underline
          rows="20"
          :max-height="460"
          type="textarea"
          placeholder="소개말을 적어주세요" />
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
  name: 'InterviewRegist',

  data()  {
    return {
      mode: '',
      opened: true,
      hireType: 'T',
      startDate: null,
      endDate: null,
      day: null,
      startTime: null,
      endTime: null,
      area: [],
      pay: 0,
      comment: ''
    }
  },

  created() {
    this.mode = this.$route.params.mode;

    this.setHeader({
      visible: true,
      title: `면접 이력서 ${this.mode === 'Regist' ? '등록' : '수정'}`,
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

.schedule-wrap
  .row.justify-center
    font-size 1rem

button.q-btn.btn-del
  padding 0
  min-height auto

.row
  align-items center

</style>
