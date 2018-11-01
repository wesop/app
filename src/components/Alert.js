import Vue from 'vue'
import Modal from './Modal.vue'
import Alert from './Alert.vue'
import Button from '../layouts/Button'

const AppAlert = new Vue({
  el: '#app-alert',
  ...Alert,
  data() {
    return {
      message: '',
      buttons: [],
      visible: false,
    }
  },

  methods: {
    /**
     * @param {Event} event
     * @param {Function} handler
     */
    onClick(event, handler) {
      if (typeof handler === 'function') {
        let value = handler(event);

        if(value !== false) this.hide();
      } else {
        this.hide();
      }
    },

    /**
     * @param {string} message
     * @param {Button[]} buttons
     */
    show(message, buttons = []) {
      this.message = message;
      this.buttons = buttons;
      this.visible = true;
    },

    hide() {
      this.visible = false;
    },
  },

  components: {
    Modal
  },
})

export default AppAlert;
