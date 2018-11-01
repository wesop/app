<template>
<!-- <q-page v-show="false">
  <div class="fixed top">
    <section class="filter-sort-wrap">
      <div class="row" no-padding>
        <div class="col-10">
          <span class="text-em">{{filterOptionsText}}</span>
        </div>
        <div class="col-2">
          <q-btn
            @click="filterModalVisible = true"
            icon="search"
            class="full-width text-em"
          />
        </div>
      </div>
    </section>
  </div>

  <section class="interview-list-wrap">
    <JobOfferList
      @click="store => getRealTimeStoreDetail(store)"
      :label="'번개채용'"
      :list="realTimeStoreList" />

    <JobOfferList
      @click="store => getStoreDetail(store)"
      :label="'일반채용'"
      :list="storeList" />
  </section>

  <JobOfferFilterModal
    v-model="filterModalVisible"
    :filterOptions="filterOptions"
    @search="(options) => filterOptions = options"
    @setFilterOptionsText="(optionsText) => filterOptionsText = optionsText"
    @close="() => filterModalVisible = false"
  />

  <FloatingButton
    :icon="'add'"
    :buttons="[
      {
        icon: 'flash on',
        color: 'em',
        label: '번개면접 이력서 등록',
        click: () => {
          this.pagePush({
            name: 'ResumeRealTimeRegist',
            params: {
              mode: 'Regist'
            }
          })
        }
      },
      {
        icon: 'perm identity',
        color: 'em',
        label: '일반면접 이력서 등록',
        click: () => {
          this.pagePush({
            name: 'ResumeRegist',
            params: {
              mode: 'Regist'
            }
          })
        }
      }
    ]"
  />
</q-page> -->

<q-page >
  <!-- content -->
</q-page>


</template>

<script>
import _ from 'underscore'
import Store from '../models/store';
import JobOfferList from '../components/JobOfferList.vue';
import JobOfferFilterModal from '../components/JobOfferFilterModal.vue';

export default {
  name: 'JobOffer',

  data()  {
    return {
      storeSelect: 0,
      storeList: [],
      realTimeStoreList: [],

      filterModalVisible: false,
      filterOptions: {
        interview: 0,
        distance: 10,
        gender: 'A',
        ages: 'A',
        startTime: null,
        endTime: null,
        sort: 'P', // D(Distance), P(Payment)
      },
      filterOptionsText: '',
    }
  },

  methods: {
    getRealTimeStoreDetail(store) {
      this.pagePush({
        name: 'JobOfferRealTimeStoreDetail',
        params: {
          id: store._id
        }
      })
    },

    getStoreDetail(store) {
      this.pagePush({
        name: 'JobOfferStoreDetail',
        params: {
          id: store._id
        }
      })
    }
  },

  components: {
    JobOfferList,
    JobOfferFilterModal
  },

  created() {
    this.showAlert('준비중입니다.')
      .then(() => this.back());

    return;

    this.$isBack = false;

    this.setHeader({
      visible: true,
      title: '번개면접',
      buttons: [],
      useBackButton: false
    });

    for(let index = 0; index < _.random(0, 7); index++) {
      this.realTimeStoreList.push({
        _id: index,
        name: `Store Name Index ${index + 1}`,
        pay: _.random(76, 100) * 100,
        schedule: [ new Date(1514768400000), new Date(1514786400000) ],
        distance: _.random(50, 500) / 100,
      });
    }

    for(let index = 0; index < _.random(0, 7); index++) {
      this.storeList.push({
        _id: index,
        name: `Store Name Index ${index + 1}`,
        pay: _.random(76, 100) * 100,
        addr: '서울시 강남구 역삼동 테헤란로 201',
      });
    }
  }
}
</script>

<style lang="stylus" scoped>
@import "../css/themes/common.variables.styl"
.q-layout-page
  padding-top 80px

.store-list-wrap
  background-color #fff

  .q-select
    padding 12px
    min-height auto

.filter-sort-wrap
  background-color #fff
  border-bottom 1px solid alpha($gray, 50%)
  color $gray

  & > .row
    align-items center
    font-size .9rem

    div[class*="col"]
      &:first-child
        padding 8px 0 8px 12px
        line-height 2rem

      &:last-child
        height 80px

        button
          height 100%

.interview-list-wrap
  padding-top 1px
  box-shadow inset 0 2px 8px alpha($gray, 50%)
</style>
