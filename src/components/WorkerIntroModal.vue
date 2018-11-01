<template>
<Modal v-model="visible">
  <div padding-left padding-right>
    <q-field label="자기소개서"></q-field>
    <div class="intro-text-wrap" v-html="lineBreakIntroText" text-left></div>
  </div>

  <div slot="footer">
    <q-btn
      @click="$emit('close')"
      label="닫기"
    />
  </div>
</Modal>
</template>

<script>
export default {
  name: 'WorkerIntroModal',

  data () {
    return {}
  },

  props: {
    introText: {
      type: String,
      required: true,
      default: ''
    },

    visible: {
      type: Boolean,
      required: true,
      default: false
    }
  },

  computed: {
    lineBreakIntroText()  {
      return this.introText.replace(/\n/gi, '<br />');
    }
  }
}
</script>

<style lang="stylus" scoped>
.intro-text-wrap
  font-size 1rem
  line-height 160%

div[slot="footer"]
  position absolute
  bottom 0
  width 100%
</style>

