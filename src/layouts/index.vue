<template>
<q-layout view="lHr lpr lFr">
  <q-layout-header v-model="header.visible">
    <q-toolbar color="blue" text-color="white">
      <!-- Header Left Button -->
      <template
        v-if="header.buttons && header.buttons.length"
        v-for="button in header.buttons">
        <q-btn
          v-if="button.position === 'left'"
          :key="button.icon"
          @click="button.click"
          :icon="button.icon"
          :color="button.color"
          :class="button.class + ' text-black'"
          :label="button.label" />
      </template>

      <!-- Back Button -->
      <q-btn
        v-if="header.useBackButton"
        @click="() => { this.back(); }"
        size="1.2rem"
        icon="keyboard arrow left" />

      <!-- Header Title -->
      <q-toolbar-title>
        <span v-if="header.title">{{header.title}}</span>
        <img v-if="!header.title" src="../assets/imgs/logo_0.png" alt="logo" class="img-logo" />
      </q-toolbar-title>

      <!-- Header Right Button -->
      <template
        v-if="header.buttons && header.buttons.length"
        v-for="button in header.buttons">
        <q-btn
          v-if="button.position === 'right'"
          :key="button.icon"
          @click="button.click"
          :icon-right="button.icon"
          :text-color="button.color"
          :class="button.class"
          :label="button.label" />
      </template>

      <!-- More Button -->
      <q-btn
        v-if="header.more && header.more.use"
        @click="() => { this.showMoreButton = !this.showMoreButton; }"
        size="1.2rem"
        icon="more horiz" />
    </q-toolbar>
    <div v-if="header.more && header.more.use && showMoreButton" class="btn-more-wrap">
      <button v-for="(button, index) in header.more.buttons"
        :key="index"
        @click="button.click"
        :class="'text-' + button.color">
        <q-icon :name="button.icon" :color="button.color" />
        {{button.label}}
      </button>
    </div>
  </q-layout-header>

  <q-page-container>
    <!-- <transition :name="transitionName"> -->
      <router-view class="child-view" />
    <!-- </transition> -->
  </q-page-container>

  <!-- <q-layout-footer v-if="currentDeviceHeight >= deviceHeight" v-model="footer.visible"> -->
  <q-layout-footer v-model="footer.visible">
    <q-toolbar color="white" text-color="blue">
      <q-tabs>
        <q-route-tab
          v-if="footer.buttons && footer.buttons.length"
          v-for="button in footer.buttons"
          :key="button.label"
          :to="button.to"
          @click="button.click">
          <!-- Use fontawesome icon -->
          <i :class="'q-icon q-tab-icon fas fa-' + button.icon"></i>

          <div class="q-tab-label">
            {{button.label}}
          </div>
        </q-route-tab>
      </q-tabs>
    </q-toolbar>
  </q-layout-footer>
</q-layout>
</template>

<script>
import { mapGetters } from 'vuex'
import Button from './Button'
import { USER_TYPE } from '../models/public'

export default {
  name: 'Layout',

  data () {
    return {
      transitionName: null,
      showMoreButton: false
    }
  },

  methods: {
    setLayout() {
      if(this.$route.path.match('Main'))  {
        /** @type {Button[]} */
        let buttons = [];

        if(this.isOwner) {
          buttons = [
            new Button({ to: '/Main', icon: 'home', label: '메인' }),
            new Button({ to: '/Main/Store', icon: 'store-alt', label: '매장관리' }),
            new Button({ to: '/Main/Schedule', icon: 'calendar-alt', label: '일정' }),
            //new Button({ to: '/Main/Interview', icon: 'bolt', label: '번개채용' }),
           // new Button({ to: '/Main/QRCheck', icon: 'bolt', label: 'QR체크' }),
            new Button({ to: '/Main/MyInfo', icon: 'user', label: '내정보' }),
          ]
        } else {
          buttons = [
            new Button({ to: '/Main/Worker', icon: 'home', label: '메인' }),
            new Button({ to: '/Main/Store', icon: 'store-alt', label: '일터관리' }),
            new Button({ to: '/Main/Schedule/EmpCalendar', icon: 'calendar-alt', label: '일정' }),
            new Button({ to: '/Main/QR', icon: 'qrcode', label: 'QR', }),
           // new Button({ to: '/Main/JobOffer', icon: 'bolt', label: '번개면접' }),
            //new Button({ to: '/Main/QRCheck', icon: 'bolt', label: 'QR쳬크' }),
            new Button({ to: '/Main/MyInfo', icon: 'user', label: '내정보' }),
          ]
        }

        this.setFooter({
          visible: true,
          buttons
        });
      }
    },
  },

  computed: {
    ...mapGetters({
      header: 'header',
      footer: 'footer',
    }),

    currentDeviceHeight() {
      return window.innerHeight;
    }
  },

  watch: {
    $route()  {
      this.setLayout();
      this.showMoreButton = false;
    },
  },

  // beforeRouteUpdate (to, from, next) {
  //   const toDepth = to.path.split('/').length
  //   const fromDepth = from.path.split('/').length
  //   this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
  //   next()
  // },

  beforeCreate() {},
  created() {},

  beforeMount() {},
  mounted() {
    this.setLayout();
  },

  beforeUpdate()  {},
  updated() {},

  beforeDestory() {},
  destroyed() {},
}
</script>

<style lang="stylus" scoped>
@import "../css/themes/common.variables.styl"

.img-logo {
  height: 26px;
}
</style>

