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

      <q-field label="시급" required margin-top>
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

      <q-field label="근무시간" required margin-top>
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
  name: 'InterviewRegistRealTime',

  data()  {
    return {
      storeId: '',
      opened: [true],
      hireType: 'T',
      startDate: null,
      endDate: null,
      day: null,
      startTime: new Date,
      endTime: new Date,
      pay: 0,
      comment: ''
    }
  },

  created() {
    this.storeId = this.$route.params.id;

    this.setHeader({
      visible: true,
      title: '번개채용 등록',
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

</style>
