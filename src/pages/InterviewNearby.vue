<template>
<q-page>
  <section class="search-wrap">
    <section class="filter-wrap">
      <q-select
        v-model="distance"
        separator
        stack-label="거리"
        :options="[
          { label: '5km', value: 5 },
          { label: '3km', value: 3 },
          { label: '1km', value: 1 },
        ]"
        placeholder="거리"
        color="em" />

      <q-select
        v-model="gender"
        separator
        stack-label="성별"
        :options="[
          { label: '무관', value: null },
          { label: '남성', value: 'M' },
          { label: '여성', value: 'F' },
        ]"
        placeholder="성별"
        color="em" />

      <q-select
        v-model="ages"
        separator
        stack-label="연령대"
        :options="[
          { label: '무관', value: null },
          { label: '20대 이하', value: '1' },
          { label: '20대', value: '2' },
          { label: '30대', value: '3' },
          { label: '40대', value: '4' },
          { label: '50대', value: '5' },
          { label: '60대 이상', value: '6' },
        ]"
        placeholder="연령대"
        color="em" />
    </section>
    <section class="filter-wrap">
      <q-select
        v-model="orderType"
        separator
        stack-label="정렬"
        :options="[
          { label: '샵솔지수', value: 'S' },
          { label: '거리', value: 'D' },
        ]"
        placeholder="샵솔지수"
        color="em" />
    </section>
  </section>

  <section class="employee-list-wrap" padding>
    <div
      v-for="employee in list"
      :key="employee.name"
      class="row justify-center">
      <div class="col-2">
        <div class="image-wrap">
          <img src="../assets/imgs/nouser.png" alt="employee" />
        </div>
      </div>
      <div class="col-8">
        <div>
          <strong>{{employee.name}}</strong>
          <span>{{employee.gender == 'M' ? '남성' : '여성'}}</span>
          <span>{{employee.age}}</span>
        </div>

        <div class="text-em">
          <small>{{employee.distance}}km</small>
          <small>{{employee.score}}점</small>
        </div>
      </div>
      <div class="col-2">
        <q-btn
          @click="pagePush({
            name: 'InterviewerDetail',
            params: { id: employee }
          })"
          icon="keyboard arrow right" />
      </div>
    </div>
  </section>
</q-page>
</template>

<script>
import _ from 'underscore'
// // import LayoutButton from '../store/layout/LayoutButton'

export default {
  name: 'InterviewNearby',

  data()  {
    return {
      storeId: '',
      distance: 5,
      gender: null,
      ages: null,
      orderType: 'S',
      list: []
    }
  },

  created() {
    this.storeId = this.$route.params.id;

    this.$store.dispatch('layout/setHeaderTitle', {
      title: '주변 면접자 목록'
    });

    // let backButton = LayoutButton.BACK_BUTTON();

    backButton.click = this.back;

    this.$store.dispatch('layout/setHeaderButton', {
      buttons: [
        backButton
      ]
    });

    for(let index = 0; index < _.random(10, 30); index++) {
      this.list.push({
        name: `User${index + 1}`,
        age: _.random(18, 60),
        distance: _.random(50, 500) / 100,
        gender: _.random(1, 2) % 2 === 0 ? 'M' : 'F',
        score: Math.ceil(_.random(500, 1000) / 10),
      });
    }
  }
}
</script>

<style lang="stylus" scoped>
@import "../css/themes/common.variables.styl"


.search-wrap
  position relative
  .filter-wrap
    display flex

    .q-select
      flex 1
      padding 8px
      min-height auto
      max-height auto
      border-left 1px solid $em
      font-size 1rem

      &:first-child
        border 0

.employee-list-wrap
  padding 8px 8px 16px

  .row
    padding 12px 0
    align-items center
    border-bottom 1px solid alpha($gray, 50%)

    & > div
      padding 0 0 0 12px
      font-size .9rem

      strong
        font-weight 600

      strong, span, small
        &:before
          content ' | '
          vertical-align middle
          font-size .7rem
          color $gray

        &:first-child
          &:before
            content ''
</style>
