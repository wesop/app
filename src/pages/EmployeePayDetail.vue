<template>
<q-page>
  <q-card>
    <q-card-title class="bg-black text-white">
      {{ today.getMonth() + 1 }}월 급여 정보
    </q-card-title>

    <q-card-separator />

    <q-card-main>
      <q-list
        v-for="payData in payDatas"
        :key="payData.date"
        margin-bottom>
        <q-list-header>
          <h4>
            <q-icon name="date_range" />
            {{payData.date}} 급여
          </h4>
        </q-list-header>
        <q-item>
          <span>기본급</span>
          <q-item-main :label="payData.payment | currency" class="text-em" text-right />
        </q-item>
        <q-item>
          <span>야간근로수당</span>
          <q-item-main :label="0 | currency" class="text-em" text-right />
        </q-item>
        <q-item>
          <span>초과근무수당</span>
          <q-item-main :label="0 | currency" class="text-em" text-right />
        </q-item>
        <q-item>
          <span>휴일근무수당</span>
          <q-item-main :label="0 | currency" class="text-em" text-right />
        </q-item>
        <q-item-separator />
        <q-item>
          <strong>합계</strong>
          <q-item-main :label="payData.payment | currency" class="text-em" text-right />
        </q-item>
      </q-list>
    </q-card-main>
  </q-card>
</q-page>
</template>

<script>
export default {
  name: 'EmployeePayDetail',

  data()  {
    return {
      employeeId: '',
      payDatas: null,
      today: new Date
    }
  },

  created() {
    this.empSeq = this.$route.params.id;
    this.payDatas = this.$route.query.payDatas;
  },

  mounted() {
    this.setHeader({
      visible: true,
      title: '급여정보',
      useBackButton: true
    });
  }
}
</script>

<style lang="stylus" scoped>
.q-layout-page
  padding-bottom 44px;

.q-item
  padding-top 0
  padding-bottom 0
  min-height 24px
  font-size .9rem

  .text-em
    font-weight 600
</style>
