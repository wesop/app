<template>
<q-page>
  <section class="page-wrap">
    <q-field label="매장 사진" margin-top padding-bottom>
      <div
        v-for="image in [ 1,2 ]"
        :key="image"
        class="image-wrap large">
        <img src="http://image.istarbucks.co.kr//upload/store/2017/12/[9514]_20171203034244_w2u0n.jpg" alt="store profile" />
      </div>
    </q-field>

    <q-field label="매장명" margin-top>
      <div class="label">
        {{store.name}}
      </div>
    </q-field>

    <q-field label="희망 성별/연령대" margin-top>
      <div class="label">
        <span>{{jobOffer.gender | localeText('GENDER')}}</span> /
        <span>{{jobOffer.ages | localeText('AGES')}}</span>
      </div>
    </q-field>

    <q-field label="희망 근무 시간" margin-top>
      <div class="label">
        <strong class="text-em">오전 10:00</strong>
        부터
        <strong class="text-em">오후 1:00</strong>
        까지
      </div>
    </q-field>

    <q-field label="현재 나와의 거리" margin-top>
      <div class="label">
        4.3km
        <q-btn
          @click="() => {}"
          icon="room"
          size=".9rem"
          text-color="em"
          no-padding />
      </div>
    </q-field>

    <q-field label="시급" margin-top>
      <div class="label">
        {{12000 | currency}}
        <div>
          <small>* 2018년 최저시급은 <strong class="text-em">7,530원</strong> 입니다.</small>
        </div>
      </div>
    </q-field>

    <q-field label="점장의 말말말" margin-top>
      <div class="label">급하게 한 분 모십니다.</div>
      <div class="label">일 잘하고 차분한 분 모셔요.</div>
      <div class="label">시급은 후하게 드리겠습니다.</div>
    </q-field>
  </section>

  <FloatingButton
    :icon="'send'"
    @click="requestInterview"
  />
</q-page>
</template>

<script>
import Store from '../models/store';

export default {
  name: 'JobOfferRealTimeStoreDetail',

  data()  {
    return {
      storeId: null,
      store: null,
      jobOffer: {
        gender: 'A',
        ages: 'A'
      }
    }
  },

  methods: {
    requestInterview()  {
      this.showAlert(this.store.name + '에 면접을 신청하시겠습니까?', [
        {
          label: '신청',
          click: () => {
            this.hideAlert();
          }
        },
        {
          label: '취소',
          click: () => {
            this.hideAlert();
          }
        }
      ])
    }
  },

  components: {

  },

  created() {
    this.storeId = this.$route.params.id;

    this.store = new Store({ name: '스타벅스 역삼점' });

    this.setHeader({
      visible: true,
      title: '번개채용정보',
      buttons: [],
      useBackButton: true
    });
  }
}
</script>

<style lang="stylus" scoped>
.image-wrap
  margin 0 4px

  &:first-child
    margin-left 0

.label
  margin-top -8px
  margin-bottom 12px

small
  font-size .8rem

</style>
