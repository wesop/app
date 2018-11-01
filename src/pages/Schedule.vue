<template>
<q-page no-padding>
  <router-view />
</q-page>
</template>

<script>
export default {
  name: 'Schedule',

  data()  {
    return {

    }
  },

  watch: {

  },

  methods: {

  },

  created() {
    this.$isBack = false;
  },

  mounted() {

  },

  updated() {

  }
}
</script>

<style lang="stylus" scoped>
@import "../css/themes/common.variables.styl"

.q-tabs
  border-bottom 1px solid alpha($gray, 60%)

.q-tab.column
  width 50%
  min-height 50px
</style>

