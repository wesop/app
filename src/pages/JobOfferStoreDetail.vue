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

    <q-field label="희망 근무기간" margin-top>
      <div class="label">
        <span>{{ new Date | dateFormat('YYYY년 M월 D일') }}</span>
        ~
        <span>{{ new Date(2019, 3, 30) | dateFormat('YYYY년 M월 D일') }}</span>
      </div>
    </q-field>

    <q-field label="희망 근무일정" margin-top>
      <div class="row justify-center">
        <div class="col-2">
          <div class="label">월</div>
        </div>
        <div class="col-5">
          <div class="label">오전 00시 00분</div>
        </div>
        <div class="col-5">
          <div class="label" text-right>오후 00시 00분</div>
        </div>
      </div>
      <div class="row justify-center">
        <div class="col-2">
          <div class="label">수</div>
        </div>
        <div class="col-5">
          <div class="label">오전 00시 00분</div>
        </div>
        <div class="col-5">
          <div class="label" text-right>오후 00시 00분</div>
        </div>
      </div>
      <div class="row justify-center">
        <div class="col-2">
          <div class="label">금</div>
        </div>
        <div class="col-5">
          <div class="label">오전 00시 00분</div>
        </div>
        <div class="col-5">
          <div class="label" text-right>오후 00시 00분</div>
        </div>
      </div>
    </q-field>

    <q-field label="희망시급" margin-top>
      <div class="label">
        {{8000}}원
        <div>
          <small>* 2018년 최저시급은 <strong class="text-em">7,530원</strong> 입니다.</small>
        </div>
      </div>
    </q-field>

    <q-field label="점장의 말말말" margin-top>
      <div class="label">같이 일할 분 모십니다.</div>
      <div class="label">차분한 분 모셔요.</div>
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
  name: 'JobOfferStoreDetail',

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
      title: '채용정보',
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
