<template>
<q-page>
  <q-list separator no-padding>
    <q-item v-if="noSignup !== true">
      <q-item-side>
        <q-checkbox v-model="allChecked"
          @input="onClickAllChecked"
          :val="true"
          unchecked-icon="check circle"
          checked-icon="check circle"
          :color="allChecked ? 'paleblue' : 'gray'"
        />
      </q-item-side>
      <q-item-main>
        <q-btn @click="toggleAllChecked(); onClickAllChecked();"
        label="전체동의"
        text-color="blue"
        class="no-focusable" />
      </q-item-main>
      <q-item-side>
        <q-btn
          size="1.2rem"
          class="full-width no-focusable" />
      </q-item-side>
    </q-item>
    <template v-for="(policy, index) in policies">
      <q-item :key="policy.name">
        <q-item-side v-if="noSignup !== true">
          <q-checkbox v-model="policy.agreement"
            @input="onChangeAgreement"
            :val="true"
            unchecked-icon="check circle"
            checked-icon="check circle"
            :color="policy.agreement ? 'paleblue' : 'gray'"
          />
        </q-item-side>
        <q-item-main>
          <q-btn @click="openContents($event.target, policy, index)"
            :label="getLocaleText(policy.name, 'POLICY') + (noSignup == true ? '' : (policy.required ? '(필수)' : '(선택)'))"
            text-color="blue"
            class="no-focusable" />
        </q-item-main>
        <q-item-side>
          <q-btn
            @click="openContents($event.target, policy, index)"
            :icon="(opened.index === index ? 'keyboard arrow up' : 'keyboard arrow down')"
            text-color="blue"
            size="1.2rem"
            class="full-width no-focusable" />
        </q-item-side>
      </q-item>
      <q-item v-if="opened.index === index " :key="index">
        <q-item-main>
          <component :is="opened.policy.component" />
        </q-item-main>
      </q-item>
    </template>

  </q-list>

  <q-btn
    v-if="noSignup !== true"
    v-show="opened.status"
    @click="() => { agree(); onChangeAgreement(); }"
    label="동의"
    icon-right="check"
    color="paleblue"
    class="btn-agreement full-width" />

  <q-btn
    v-show="!opened.status && isRequired"
    @click="next"
    label="다음"
    color="paleblue"
    class="btn-next full-width" />
</q-page>
</template>

<script>
import ServicePolicy from '../components/ServicePolicy.vue'
import PrivatePolicy from '../components/PrivatePolicy.vue'
import GeolocationPolicy from '../components/GeolocationPolicy.vue'
import MarketingActivePolicy from '../components/MarketingActivePolicy.vue'
import { POLICY } from '../models/public'
import Policy from '../models/policy'

export default {
  name: 'SignupPrivacy',

  data()  {
    return {
      noSignup: false,
      opened: {
        policy: null,
        status: false,
        index: -1,
      },
      allChecked: false,
      policies: [],
    };
  },

  watch: {
    allChecked()  {
      if(this.allChecked) this.changeAllAgreementStatus(this.allChecked);
    }
  },

  methods: {
    /**
     * 약관 열기
     *
     * @param {HTMLElement} target
     * @param {number} index
     */
    openContents(target, policy, index)  {
      if(this.opened.status)  {
        this.opened = { policy: null, status: false, index: -1 }
      } else {
        this.opened = { policy, status: true, index }
      }
    },

    /**
     * allChecked 토글 이벤트
     */
    toggleAllChecked()  {
      this.allChecked = !this.allChecked;
    },

    /**
     * 전체동의 클릭 이벤트
     */
    onClickAllChecked()  {
      this.changeAllAgreementStatus(this.allChecked);
    },

    /**
     * 모든 약관 동의 값 변경
     *
     * @param {boolean} value
     */
    changeAllAgreementStatus(value) {
      this.policies.forEach(policy => policy.agreement = value);
    },

    /**
     * 약관 체크 변경 감지
     */
    onChangeAgreement()  {
      let checkedCount = this.policies
        .map(p => p.agreement)
        .reduce((a, b) => a + b);

      if(checkedCount === this.policies.length) this.allChecked = true;
      else this.allChecked = false;
    },

    /**
     * 동의하기 클릭 수행
     */
    agree() {
      this.opened.policy.agreement = true;

      this.opened = { policy: null, status: false, index: -1 }
    },

    /**
     * 회원가입 다음단계로 진행
     */
    next()  {
      this.pagePush({
        name: 'SignupCertify',
        query: {
          policies: this.policies,
          next: 'SignupTypeSelect'
        },
        replace: true
      });
    },
  },

  computed: {
    /**
     * 필수 약관이 모두 체크 됐는지 반환
     * @returns {boolean}
     */
    isRequired()  {
      let requiredLength = this.policies.length;

      return this.policies
        .map(p => {
          if(!p.required) requiredLength--;
          return p.agreement && p.required;
        })
        .reduce((a, b) => a + b) === requiredLength ? true : false;
    },
  },

  components: {

  },

  created() {
    StatusBar.show();

    let title = '회원가입';

    this.noSignup = this.$route.query.noSignup;

    this.policies = [
      Object.assign(new Policy({ name: POLICY.SERVICE, required: true }), { component: ServicePolicy }),
      Object.assign(new Policy({ name: POLICY.PRIVATE, required: true }), { component: PrivatePolicy }),
      Object.assign(new Policy({ name: POLICY.GEOLOCATION, required: true }), { component: GeolocationPolicy }),
      // Object.assign(new Policy({ name: POLICY.MARKETING_ACTIVE, required: false }), { component: MarketingActivePolicy })
    ];

    if(this.noSignup === true)  {
      title = '약관보기';
    } else {
      this.onChangeAgreement();

      this.setFooter({ visible: false });
    }

    this.setHeader({
      visible: true,
      title: title,
      useBackButton: true
    });
  },

  mounted() {

  }
}
</script>

<style lang="stylus" scoped>
@import "../css/themes/common.variables.styl"

.q-item
  padding 0 .75em

  .q-item-side:first-child
    font-size .9em

  .q-item-main
    margin-left 0

    .q-btn
      padding .75em 0

.btn-agreement, .btn-next {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 57px;
}
</style>

