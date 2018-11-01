<template>
<div>
  <label>
    <strong>{{label}}</strong>
  </label>
  <div v-if="list.length">
    <q-list no-padding>
      <q-item
        v-for="worker in list"
        :key="worker.name"
        no-padding>
        <div @click="$emit('click', worker)" class="row">
          <div class="col-2">
            <img src="../assets/imgs/test.png" alt="worker profile" />
          </div>
          <div class="col-10">
            <div>
              <strong>{{worker.name}}</strong>
              <span>{{worker.gender == 'M' ? '남성' : '여성'}}</span>
              <span>{{worker.age}}</span>
            </div>

            <div class="text-em">
              <small v-if="worker.area">{{worker.area}}</small>
              <small v-if="worker.distance">{{worker.distance}}km</small>
              <small>{{worker.score}}점</small>
            </div>
          </div>
        </div>
      </q-item>
      <q-item v-if="list.length >= 5" no-padding>
        <div class="row" no-padding>
          <div class="col-12" no-padding>
            <q-btn
              @click="$emit('more')"
              label="더 보기"
              color="em"
              class="full-width text-white"
            />
          </div>
        </div>
      </q-item>
    </q-list>
  </div>
  <q-list v-if="!list.length">
    <q-item>
      <div class="row justify-center">
        <div class="col-12" no-padding text-center>
          주변에 {{label}}할 인원이 없습니다 :(
        </div>
      </div>
    </q-item>
  </q-list>
</div>
</template>

<script>
export default {
  name: 'InterviewWorkerList',

  data () {
    return {}
  },

  props: {
    list: {
      type: Array,
      required: true,
      default: () => []
    },

    label: {
      type: String,
      required: true,
      default: ''
    }
  }
}
</script>

<style lang="stylus" scoped>
@import "../css/themes/common.variables.styl"

label
  display block
  margin 12px 12px 0

  strong
    font-weight 600
    font-size 1rem
    color #000

.q-list
  border 0

  .q-item
    .row
      position relative
      padding 12px 0
      width 100%
      border-top 1px solid alpha($gray, 50%)
      align-items center

      div[class*="col-"]
        padding-left 16px

        & > *
          vertical-align middle

        img
          width auto
          height auto
          max-width 50px
          max-height 50px
          border-radius 50%

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

    &:first-child
      .row
        border-top 0
</style>

