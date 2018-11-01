import App from '../App'
import router from '../router'
import store from '../store'

import FullCalendar from 'vue-full-calendar'
import Checkbox from './Checkbox'
import Modal from './Modal'
import OwnerCards from './OwnerCards'
import WorkerCards from './WorkerCards'
import CalendarModal from './CalendarModal.vue'
import FloatingButton from './FloatingButton'
import ImageSlider from './ImageSlider'
import CalendarGuideModal from './CalendarGuideModal'
import ZipCodeSearchModal from './ZipCodeSearchModal'
import PlaceSearchModal from './PlaceSearchModal'
import ProfileImage from './ProfileImage'
import TimeInputModal from './TimeInputModal'
import EmployeeScheduleAddModal from './EmployeeScheduleAddModal'
import HelpSalaryModal from './HelpSalaryModal'
import Timetable from './Timetable'
import TimetableEditModal from './TimetableEditModal'
import TimetableAddModal from './TimetableAddModal'

window.jQuery = window.$ = require('jquery')

/**
 * @param {Vue} Vue
 */
export default ({ Vue }) => {
  new Vue({
    el: '#q-app',
    router,
    store,
    ...App
  });

  Vue.component('Checkbox', Checkbox)
  Vue.component('Modal', Modal)
  Vue.component('OwnerCards', OwnerCards);
  Vue.component('WorkerCards', WorkerCards);
  Vue.component('CalendarModal', CalendarModal);
  Vue.component('FloatingButton', FloatingButton);
  Vue.component('ImageSlider', ImageSlider);
  Vue.component('CalendarGuideModal', CalendarGuideModal);
  Vue.component('ZipCodeSearchModal', ZipCodeSearchModal);
  Vue.component('PlaceSearchModal', PlaceSearchModal);
  Vue.component('ProfileImage', ProfileImage);
  Vue.component('TimeInputModal', TimeInputModal);
  Vue.component('EmployeeScheduleAddModal', EmployeeScheduleAddModal);
  Vue.component('HelpSalaryModal', HelpSalaryModal);
  Vue.component('Timetable', Timetable);
  Vue.component('TimetableEditModal', TimetableEditModal);
  Vue.component('TimetableAddModal', TimetableAddModal);

  Vue.use(FullCalendar)
}
