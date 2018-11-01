<template>
<div :class="'sticky-wrap ' + (open ? 'open' : '')">
  <q-page-sticky :position="position" :offset="offset">
    <div
      v-if="buttons.length"
      v-for="index in [4,3,2,1,0]"
      :key="index"
      class="float-button-wrap"
      :data-index="index">
      <div v-if="buttons[index]">
        <span>{{buttons[index].label}}</span>
        <q-btn
          @click="onFloatingButtonClick(buttons[index].click)"
          round
          :icon="buttons[index].icon"
          :color="buttons[index].color || 'em'"
          size="14px"
          class="shadow"
        />
      </div>
      <div v-if="!buttons[index]">
        <q-btn
          round
          color="transparent"
          size="14px"
          disable
        />
      </div>
    </div>
    <q-btn
      @click="onClick"
      round
      :icon="open ? 'clear' : icon"
      color="em"
      class="shadow"
    />
  </q-page-sticky>
</div>
</template>

<script>

export default {
  name: 'FloatingButton',

  data()  {
    return {
      open: false
    }
  },

  props: {
    icon: {
      type: String,
      required: true,
      default: '',
    },
    position: {
      type: String,
      default: 'bottom-right'
    },
    offset: {
      type: Array,
      default: () => [ 24, 24 ]
    },
    buttons: {
      type: Array,
      default: () => []
    }
  },

  methods: {
    onFloatingButtonClick(clickHandler) {
      this.hideBackdrop();
      clickHandler.call(this, null);
    },

    onClick() {
      if(this.buttons.length)  {
        this.showFloatingButtons();
      } else {
        this.$emit('click');
      }
    },

    showFloatingButtons() {
      if(this.open) this.open = false;
      else this.open = true;
    }
  },

  watch: {
    open()  {
      if(this.open) {
        this.showBackdrop();
      } else {
        this.hideBackdrop();
      }
    }
  },

  mounted() {

  }
}
</script>

<style lang="stylus" scoped>
@import "../css/themes/common.variables.styl"

.sticky-wrap
  user-select none
  text-align right

  .float-button-wrap
    // display none
    margin-right 3px
    margin-bottom 0
    opacity 0
    transition all .3s ease
    height 0

    span
      // display inline-block
      margin-right 6px
      font-size 0
      color #fff
      transform translateX(100%)

  for $index in (1..5)
    .float-button-wrap:nth-child({6 - $index})
      transform translateY(($index * 130)%)

  &.open
    .float-button-wrap
      // display block
      margin-bottom 20px
      height 42px
      transform translateY(0)
      opacity 1

      span
        font-size 1rem

.shadow
  box-shadow 1px 1px 6px $gray

.q-page-sticky
  z-index 2002
</style>


