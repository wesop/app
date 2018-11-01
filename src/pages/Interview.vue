<template>
<!-- <q-page v-show="false">
  <div class="fixed top">
    <section class="store-list-wrap">
      <q-select
        filter
        filter-placeholder="원하시는 매장을 검색하세요"
        v-model="storeSelect"
        :options="storeList.map((store, index) => {
          return {
            label: store.name,
            value: index
          }
        })"
        color="white"
      />
    </section>

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
    <InterviewWorkerList
      @click="worker => getRealTimeWorkerDetail(worker)"
      :label="'번개채용'"
      :list="realTimeWorkerList" />

    <InterviewWorkerList
      @click="worker => getWorkerDetail(worker)"
      :label="'일반채용'"
      :list="workerList" />
  </section>

  <InterviewFilterModal
    :visible="filterModalVisible"
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
        label: '번개채용 등록',
        click: () => {
          this.pagePush({
            name: 'InterviewRegistRealTime',
            params: {
              id: storeSelect
            }
          })
        }
      },
      {
        icon: 'contacts',
        color: 'em',
        label: '일반채용 등록',
        click: () => {
          this.pagePush({
            name: 'InterviewRegist',
            params: {
              id: storeSelect
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
import InterviewWorkerList from '../components/InterviewWorkerList.vue';
import InterviewFilterModal from '../components/InterviewFilterModal.vue';

export default {
  name: 'Interview',

  data()  {
    return {
      storeSelect: 0,
      storeList: [],
      realTimeWorkerList: [],
      workerList: [],

      filterModalVisible: false,
      filterOptions: {
        interview: 0,
        gender: 'A',
        ages: 'A',
        distance: 10,
        sort: 'S', // D(Distance), S(Shopsol Score)
      },
      filterOptionsText: '',
    }
  },

  methods: {
    getRealTimeWorkerDetail(worker) {
      this.pagePush({
        name: 'RealTimeWorkerDetail',
        params: {
          id: worker._id
        }
      })
    },

    getWorkerDetail(worker) {
      this.pagePush({
        name: 'WorkerDetail',
        params: {
          id: worker._id
        }
      })
    }
  },

  components: {
    InterviewWorkerList,
    InterviewFilterModal
  },

  created() {
    this.showAlert('준비중입니다.')
      .then(() => this.back());

    return;

    this.$isBack = false;

    this.setHeader({
      visible: true,
      title: '번개채용',
      buttons: [],
      useBackButton: false
    });

    this.storeList = [
      new Store({ name: '스타벅스 역삼점' }),
      new Store({ name: '스타벅스 강남점' }),
    ];

    for(let index = 0; index < _.random(0, 7); index++) {
      this.realTimeWorkerList.push({
        _id: index,
        name: `User${index + 1}`,
        age: _.random(18, 60),
        distance: _.random(50, 500) / 100,
        gender: _.random(1, 2) % 2 === 0 ? 'M' : 'F',
        score: Math.ceil(_.random(500, 1000) / 10),
      });
    }

    for(let index = 0; index < _.random(0, 7); index++) {
      this.workerList.push({
        _id: index,
        name: `User${index + 1}`,
        age: _.random(18, 60),
        area: '강남구, 연수구',
        gender: _.random(1, 2) % 2 === 0 ? 'M' : 'F',
        score: Math.ceil(_.random(500, 1000) / 10),
      });
    }
  }
}
</script>

<style lang="stylus" scoped>
@import "../css/themes/common.variables.styl"
.q-layout-page
  padding-top 94px

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

    div[class*="col"]:first-child
      padding-left: 12px;
      overflow-x: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;

.interview-list-wrap
  padding-top 1px
  box-shadow inset 0 2px 8px alpha($gray, 50%)
</style>
