import Vue from 'vue'
import Loader from './Loader.vue'

const AppLoader = new Vue({
  el: '#app-loader',
  ...Loader,

  data() {
    return {
      visible: false,
    }
  },

  method: {
    show() { this.visible = true; },
    hide() { this.visible = false; },
    active(value) { this.visible = value; },
  }
})

export default AppLoader;
