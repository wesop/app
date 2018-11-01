<template>
<Modal v-model="visible">
  <div padding-left padding-right>
    <q-field label="채용방식">
      <q-select
        placeholder="채용"
        v-model="interview"
        :options="interviewOptions"
        color="white"
      />
    </q-field>
    <q-field label="성별" margin-top>
      <q-select
        placeholder="성별"
        v-model="gender"
        :options="genderOptions"
        color="white"
      />
    </q-field>
    <q-field label="연령대" margin-top>
      <q-select
        placeholder="연령대"
        v-model="ages"
        :options="agesOptions"
        color="white"
      />
    </q-field>
    <q-field label="거리" margin-top>
      <q-select
        placeholder="거리"
        v-model="distance"
        :options="distanceOptions"
        color="white"
      />
    </q-field>

    <q-field label="정렬조건" margin-top>
      <q-select
        placeholder="정렬조건"
        v-model="sort"
        :options="sortOptions"
        color="white"
      />
    </q-field>
  </div>

  <div slot="footer">
    <q-btn
      @click="search"
      label="검색"
    />
    <q-btn
      @click="$emit('close')"
      label="닫기"
    />
  </div>
</Modal>
</template>

<script>
import Modal from './Modal.vue';
import { GENDER, AGES } from '../models/public';

export default {
  name: 'InterviewFilterModal',

  data () {
    return {
      interview: 0,
      interviewOptions: [
        { label: '번개/일반', value: 0 },
        { label: '번개', value: 1 },
        { label: '일반', value: 2 },
      ],

      gender: 'A',
      genderOptions: [ { label: '성별무관', value: 'A' } ],

      ages: 'A',
      agesOptions: [ { label: '연령무관', value: 'A' } ],

      distance: 10,
      distanceOptions: [
        { label: '1km', value: 1 },
        { label: '3km', value: 3 },
        { label: '5km', value: 5 },
        { label: '10km', value: 10 },
      ],

      sort: 'S',
      sortOptions: [
        { label: '샵솔지수', value: 'S' },
        { label: '거리', value: 'D' },
      ],
    }
  },

  props: {
    visible: {
      type: Boolean,
      required: true,
      default: false
    },

    filterOptions: {
      type: Object,
      required: true,
      default: () => {
        return {
          interview: 0,
          gender: 'A',
          ages: 'A',
          distance: 10,
          sort: 'S', // D(Distance), S(Shopsol Score)
        }
      }
    }
  },

  methods: {
    search()  {
      this.$emit('search', {
        interview: this.interview,
        gender: this.gender,
        ages: this.ages,
        distance: this.distance,
        sort: this.sort,
      });

      this.$emit('setFilterOptionsText', this.filterOptionsText);
      this.$emit('close');
    },
  },

  computed: {
    filterOptionsText() {
      let text = '';

      this.interviewOptions.some(option => {
        if(option.value === this.interview) {
          text += (option.label + ', ');
          return true;
        }
      });

      this.genderOptions.some(option => {
        if(option.value === this.gender) {
          text += (option.label + ', ');
          return true;
        }
      });

      this.agesOptions.some(option => {
        if(option.value === this.ages) {
          text += (option.label + ', ');
          return true;
        }
      });

      this.distanceOptions.some(option => {
        if(option.value === this.distance) {
          text += (option.label + ' | ');
          return true;
        }
      });

      this.sortOptions.some(option => {
        if(option.value === this.sort) {
          text += (option.label + ' 정렬');
          return true;
        }
      });

      return text;
    }
  },

  created() {
    Object.keys(AGES).forEach(age => {
      this.agesOptions.push({
        label: this.getLocaleText(age, 'AGES'),
        value: AGES[age]
      });
    });

    Object.keys(GENDER).forEach(gender => {
      this.genderOptions.push({
        label: this.getLocaleText(gender, 'GENDER'),
        value: GENDER[gender]
      });
    });

    this.interview = this.filterOptions.interview;
    this.gender = this.filterOptions.gender;
    this.ages = this.filterOptions.ages;
    this.distance = this.filterOptions.distance;
    this.sort = this.filterOptions.sort;

    this.$emit('setFilterOptionsText', this.filterOptionsText);
  }
}
</script>

<style lang="stylus" scoped>
.layout-padding
  padding-top 0
  padding-bottom 0

</style>

