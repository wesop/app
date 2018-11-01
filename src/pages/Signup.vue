<template>
<router-view
  @complete="onComplete"
  :policies="policies"
/>
</template>

<script>
import { POLICY } from '../models/public'
import { User } from '../models/user'
import Policy from '../models/policy'
import ServicePolicy from '../components/ServicePolicy.vue'
import PrivatePolicy from '../components/PrivatePolicy.vue'
import GeolocationPolicy from '../components/GeolocationPolicy.vue'
import MarketingActivePolicy from '../components/MarketingActivePolicy.vue'

export default {
  name: 'Signup',

  data()  {
    return {
      policies: []
    }
  },

  methods: {
    onComplete({ nextPageName, params })  {
      this.pagePush({
        name: nextPageName,
        query: params
      });
    }
  },

  watch: {},

  beforeCreate() {},
  created() {
    this.setHeader({
      visible: true,
      title: '회원가입',
      useBackButton: true
    });

    this.setFooter({ visible: false });

    this.policies = [
      Object.assign(new Policy({ name: POLICY.SERVICE, required: true }), { component: ServicePolicy }),
      Object.assign(new Policy({ name: POLICY.PRIVATE, required: true }), { component: PrivatePolicy }),
      Object.assign(new Policy({ name: POLICY.GEOLOCATION, required: true }), { component: GeolocationPolicy }),
      Object.assign(new Policy({ name: POLICY.MARKETING_ACTIVE, required: false }), { component: MarketingActivePolicy })
    ];
  },

  beforeMount() {},
  mounted() {},

  beforeUpdate()  {},
  updated() {},

  beforeDestory() {},
  destroyed() {},
}
</script>

<style lang="stylus">
@import "../css/themes/common.variables.styl"

.q-item
  padding 1.4em 1em 0

.btn-next
  position fixed
  bottom 0
  width 100%
</style>
