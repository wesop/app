<template>
<div
  :style="{
    maxWidth: deviceWidthPx,
    width: deviceWidthPx,
    minWidth: deviceWidthPx,
    height: heightPx
  }"
  class="image-slide-wrap">
  <div
    v-touch:swipe.left="() => images.length ? sliderIndex++ : void(0)"
    v-touch:swipe.right="() => images.length ? sliderIndex-- : void(0)"
    :style="{
      width: `${deviceWidth*images.length}px`,
      height: heightPx,
      transform: `translateX(${-deviceWidth * sliderIndex}px)`
    }"
    class="slider">
    <div v-for="(img, index) in images"
      :key="index"
      :style="{
        width: deviceWidthPx,
        height: heightPx,
        minHeight: heightPx,
        maxHeight: heightPx
      }"
      class="wrapper">
      <div>
        <img :src="img" alt="image" />
      </div>
    </div>
  </div>

  <section v-if="images.length" class="paging-wrap">
    <ul>
      <li
        v-for="(item, index) in images"
        @click="sliderIndex = index"
        :key="item"
        :class="index === sliderIndex ? 'active' : ''">
        {{index}}
      </li>
    </ul>
  </section>
</div>
</template>

<script>
export default {
  name: 'ImageSlider',

  data()  {
    return {
      _height: 0,
      sliderIndex: 0,
    }
  },

  model: {
    prop: 'value'
  },

  props: {
    value: {
      type: Number,
      default: 0
    },

    images: {
      type: Array,
      default: () => []
    },

    height: Number
  },

  computed: {
    heightPx()  {
      return `${this._height}px`;
    },

    deviceWidthPx() {
      return `${this.deviceWidth}px`
    }
  },

  watch: {
    value() {
      this.sliderIndex = this.value;
    },

    sliderIndex()  {
      if(this.sliderIndex < 0) this.sliderIndex = this.images.length - 1;
      if(this.sliderIndex > this.images.length - 1) this.sliderIndex = 0;

      this.$emit('input', this.sliderIndex);
      this.$emit('change');
    }
  },

  created() {
    this._height = this.height;
    this.sliderIndex = this.value;

    if(!this._height) {
      this._height = this.deviceHeight * .31;
    }

    if(isNaN(this.sliderIndex) || !this.sliderIndex)  {
      this.sliderIndex = 0;
    }
  }
}
</script>

<style lang="stylus" scoped>
@import "../css/themes/common.variables.styl"

.image-slide-wrap
  position relative
  overflow hidden
  border-bottom: 1px solid #9db6ca;

  .slider
    background-color #fff
    // background-color #9db6ca
    transition all .5s ease

    .wrapper
      display inline-block
      width 100%
      overflow hidden

      & > div {
        display: flex;
        align-items: center;
        height: 100%;

        img {
          flex: 1;
          display: block;
          margin: 0 auto;
          width: auto;
          height: auto;
          max-width: 100%;
          max-height: 100%;
        }
      }


  .paging-wrap
    position absolute
    bottom 0
    width 100%
    text-align center

    ul
      display inline-block
      margin 12px 0 4px
      width auto
      height 14px
      -webkit-padding-start 0

      li
        float left
        list-style-type none
        margin 0 8px
        width 8px
        height 8px
        background-color #fff
        border 1px solid alpha(#fff, 20%)
        border-radius 50%
        text-indent -9999px
        cursor pointer

        &.active
          background-color $paleblue
</style>
