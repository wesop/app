<template>
<q-page>
  <section class="page-wrap">
    <q-field label="프로필 사진" margin-top padding-bottom>
      <div
        v-for="image in [ 1,2 ]"
        :key="image"
        class="image-wrap large">
        <img src="../assets/imgs/test.png" alt="employee detail" />
      </div>
    </q-field>

    <q-field label="이름" margin-top>
      <div class="label">
        {{worker.name}}
      </div>
    </q-field>

    <q-field label="성별/연령대" margin-top>
      <div class="label">
        <span>{{worker.gender | localeText('GENDER')}}</span> /
        <span>{{worker.ages | localeText('AGES')}}</span>
      </div>
    </q-field>

    <q-field label="근무 가능시간" margin-top>
      <div class="label">
        <strong class="text-em">오전 10:00</strong>
        부터
        <strong class="text-em">오후 1:00</strong>
        까지
      </div>
    </q-field>

    <q-field label="매장과의 현재 거리" margin-top>
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

    <div class="label-wrap">
      <label>
        <strong>샵솔지수</strong>
        <button type="button">
          <i class="text-em material-icons">help_outline</i>

          <q-tooltip anchor="top left" self="bottom right" :offset="[-18, 0]">
            <p>샵솔지수란?</p>
            <div>
              샵솔지수는 이러해서 저렇게 나온 그런 지수입니다.
              채용에 도움이 되는 정보이니 참고해주세요! :)
            </div>
          </q-tooltip>
        </button>
      </label>

      <div class="label">
        <q-icon size="2rem" color="em" name="sentiment_very_satisfied" />
        <q-icon size="2rem" color="secondary" name="sentiment_satisfied" />
        <q-icon size="2rem" color="positive" name="sentiment_neutral" />
        <q-icon size="2rem" color="warning" name="sentiment_dissatisfied" />
        <q-icon size="2rem" color="tertiary" name="sentiment_very_dissatisfied" />
      </div>
    </div>

    <q-field label="희망시급" margin-top>
      <div class="label">
        {{8000}}원
        <div>
          <small>* 2018년 최저시급은 <strong class="text-em">7,530원</strong> 입니다.</small>
        </div>
      </div>
    </q-field>

    <q-field label="간단한 자기소개(3줄 요약)" margin-top>
      <div class="label">저는 카페 업무 경력이 많습니다.</div>
      <div class="label">저는 성실한편 입니다.</div>
      <div class="label">믿고 뽑아주세요.</div>
      <q-btn
        @click="visible = true"
        label="펼쳐보기"
        color="transparent"
        icon-right="keyboard arrow right"
        size="1rem"
        class="text-black"
        no-padding />
    </q-field>
  </section>

  <WorkerIntroModal
    @close="visible = false"
    :visible="visible"
    :introText="introText" />

  <FloatingButton
    :icon="'call'"
    @click="callToWorker"
  />
</q-page>
</template>

<script>
import { Worker } from '../models/user';
import WorkerIntroModal from '../components/WorkerIntroModal.vue';

export default {
  name: 'RealTimeWorkerDetail',

  data()  {
    return {
      workerId: null,
      worker: null,
      visible: false,
      introText: '저는 카페 업무 경력이 많습니다.\n저는 카페 업무 경력이 많습니다.\n저는 카페 업무 경력이 많습니다.\n저는 카페 업무 경력이 많습니다.\n저는 카페 업무 경력이 많습니다.\n저는 카페 업무 경력이 많습니다.\n저는 카페 업무 경력이 많습니다.\n저는 카페 업무 경력이 많습니다.\n저는 카페 업무 경력이 많습니다.\n저는 카페 업무 경력이 많습니다.\n저는 카페 업무 경력이 많습니다.\n저는 카페 업무 경력이 많습니다.\n저는 카페 업무 경력이 많습니다.\n저는 카페 업무 경력이 많습니다.\n저는 카페 업무 경력이 많습니다.\n저는 카페 업무 경력이 많습니다.\n저는 카페 업무 경력이 많습니다.\n저는 카페 업무 경력이 많습니다.\n저는 카페 업무 경력이 많습니다.\n저는 카페 업무 경력이 많습니다.\n저는 카페 업무 경력이 많습니다.\n저는 카페 업무 경력이 많습니다.\n저는 카페 업무 경력이 많습니다.\n저는 카페 업무 경력이 많습니다.\n저는 카페 업무 경력이 많습니다.\n저는 카페 업무 경력이 많습니다.\n저는 카페 업무 경력이 많습니다.\n저는 카페 업무 경력이 많습니다.\n저는 카페 업무 경력이 많습니다.\n저는 카페 업무 경력이 많습니다.\n저는 카페 업무 경력이 많습니다.\n저는 카페 업무 경력이 많습니다.\n저는 카페 업무 경력이 많습니다.\n저는 카페 업무 경력이 많습니다.\n저는 카페 업무 경력이 많습니다.\n저는 카페 업무 경력이 많습니다.\n저는 카페 업무 경력이 많습니다.\n저는 카페 업무 경력이 많습니다.\n저는 카페 업무 경력이 많습니다.\n'
    }
  },

  methods: {
    callToWorker()  {
      this.showAlert(this.worker.name + '님에게 전화하시겠습니까?', [
        {
          label: '통화',
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
    WorkerIntroModal
  },

  created() {
    this.workerId = this.$route.params.id;

    this.worker = new Worker({ name: '박보영' });

    this.setHeader({
      visible: true,
      title: '번개채용',
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
