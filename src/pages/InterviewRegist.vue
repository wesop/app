<template>
<q-page>
  <section class="page-wrap">
    <form>
      <q-field label="채용 모집/마감" margin-top padding-bottom>
        <q-option-group
          v-model="opened"
          type="toggle"
          color="black"
          :options="[ { label: '모집중', value: true } ]"
        />
      </q-field>

      <q-field label="매장 이름" margin-top>
        <div class="label">
          스타벅스 역삼점
        </div>
      </q-field>

      <q-field label="고용형태" required margin-top>
        <q-radio
          v-model="hireType"
          color="black"
          val="T"
          label="시급" />

        <q-radio
          v-model="hireType"
          color="black"
          val="M"
          label="월급" />
      </q-field>

      <q-field label="근무 시작일" required margin-top>
        <q-datetime
          v-model="startDate"
          hide-underline
          type="date"
          format="YYYY년 MM월 DD일"
          ok-label="설정"
          cancel-label=" "
          placeholder="근무 시작일" />
      </q-field>

      <q-field label="근무 종료일" margin-top>
        <q-datetime
          v-model="endDate"
          hide-underline
          type="date"
          format="YYYY년 MM월 DD일"
          ok-label="설정"
          cancel-label=" "
          placeholder="근무 시작일" />
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
      </q-field>

      <q-field label="급여(시급/월급)" margin-top>
        <q-input
          v-model="pay"
          hide-underline
          text-right
          suffix="원"
          type="number"
          placeholder="급여" />
      </q-field>

      <q-item-separator />

      <q-field label="점장의 말말말" margin-top>
        <q-input
          v-model="comment"
          hide-underline
          type="textarea"
          placeholder="소개말을 적어주세요" />
      </q-field>
    </form>
  </section>
</q-page>
</template>

<script>
export default {
  name: 'InterviewRegist',

  data()  {
    return {
      storeId: '',
      opened: [true],
      hireType: 'T',
      startDate: null,
      endDate: null,
      day: null,
      startTime: null,
      endTime: null,
      pay: 0,
      comment: ''
    }
  },

  created() {
    this.storeId = this.$route.params.id;

    this.setHeader({
      visible: true,
      title: '일반채용 등록',
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
  font-size 1rem

button.q-btn.btn-del
  padding 0
  min-height auto

</style>
