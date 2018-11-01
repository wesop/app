<template>
<div
  :style="{
    maxWidth: deviceWidthPx,
    width: deviceWidthPx,
    minWidth: deviceWidthPx,
    height: heightPx
  }"
  class="profile-image-wrap">
  <div class="image-wrap">
    <img
      :src="src"
      :style="{
        transform: translateY
      }"
      ref="image"
      alt="profile image" />
  </div>
  <h3 :style="{ lineHeight: heightPx }" class="name-wrap">{{name}}</h3>
</div>
</template>

<script>
export default {
  name: 'ProfileImage',

  data () {
    return {
      _height: 0,
      translateY: null,
    }
  },

  props: {
    name: String,
    src: String,

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

  methods: {
    adjust()  {
      let imageHeight = this.$refs.image.offsetHeight;

      this.translateY = 0;

      if(imageHeight > this._height)  {
        this.translateY = (imageHeight - this._height)/-2;
      }

      this.translateY = `translateY(${this.translateY}px)`;
    }
  },

  created() {
    this._height = this.height;

    if(!this._height) {
      this._height = this.deviceWidth >> 1;
    }
  },

  mounted() {
    this.adjust();
  },
}
</script>

<style lang="stylus" scoped>
.profile-image-wrap {
  position: relative;
  background-color: #000;

  .image-wrap {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    border-radius: 0;

    img {
      display: block;
      margin: 0 auto;
      height: auto;
      width: 100%;
      vertical-align: middle;
      max-height: none;
    }

    &:after {
      position: absolute;
      top: 0;
      bottom: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0,0,0,.5);
      content: '';
    }
  }

  .name-wrap {
    position: relative;
    width: 100%;
    text-align: center;
    color: #fff;
  }
}
</style>

