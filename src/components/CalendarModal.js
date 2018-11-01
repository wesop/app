import Vue from 'vue'
import Modal from './Modal.vue'
import CalendarModal from './CalendarModal.vue'

const AppCalendarModal = new Vue({
  el: '#app-calendar-modal',
  ...CalendarModal,
  data() {

  },

  methods: {

  },

  components: {
    Modal
  },
})

export default AppCalendarModal;
