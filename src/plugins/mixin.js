import Vue from 'vue'
import { mapActions, mapGetters } from 'vuex'
import { Route } from 'vue-router'
import moment from 'moment'
import appSerivce from '../services/app'
import Button from '../layouts/Button'
import SwalButton from '../layouts/swal-button'
import CONSTANT from '../models/constant'
import * as PUBLIC from '../models/public'
import userService from '../services/user'
import AppAlert from '../components/Alert'
import { User } from '../models/user'

const TODAY = new Date
const CODE_TABLE = PUBLIC.CODE_TABLE

function getLocaleText(code, prop) {
  let locale = localStorage.getItem(CONSTANT) || 'kr', key;

  Object.keys(PUBLIC[prop]).some(k => {
    if (PUBLIC[prop][k] == code) {
      key = k;
      return true;
    }
  });

  return CODE_TABLE[prop][key || code][locale];
}

/**
 * @param {Vue} Vue
 */
export default ({ Vue }) => {
  Vue.mixin({
    data() {
      return {
        deviceWidth: window.innerWidth,
        deviceHeight: window.innerHeight,
        $isBack: null,
        $todayDay: TODAY.getDay(),
        $os: cordova.platformId.toLowerCase()
      }
    },

    watch: {

    },

    methods: {
      pagePush(location) {
        this.$isBack = false;

        if(location.replace)  {
          this.$isBack = true;

          this.popHistory();

          this.$router.replace(location);
        } else {
          this.$router.push(location);
        }
      },

      back() {
        this.popHistory();

        let history = this.$poppedHistory;

        this.$isBack = true;

        if (!history) {
          this.$router.back();
          return;
        }

        this.$router.replace({
          name: history.route.name,
          params: history.route.params,
          query: history.route.query
        });
      },

      /**
       * Alert
       *
       * @param {string} message
       * @param {{ cancel: string | boolean, confirm: SwalButton | string }} args
       */
      showAlert(message, { cancel = false, confirm = '확인' } = {}) {
        return this.$swal({
          text: message,
          buttons: { cancel, confirm },
          closeOnEsc: false,
          closeOnClickOutside: false
        });
        // return AppAlert.show(message, buttons);
      },

      hideAlert() {
        // AppAlert.hide();
      },

      showActionSheet(options, callback) {
        window.plugins.actionsheet.show(options, callback);
      },

      hideActionSheet() {
        window.plugins.actionsheet.hide();
      },

      getLocaleText(code, prop) {
        return getLocaleText(code, prop);
      },

      /**
       * @param {number} pictureSourceType : (1: Camera, 0: PhotoLibrary, 2: SavedPhotoAlbum)
       * @returns {Promise<string>} imageURI or errorMessage
       */
      getPicture(pictureSourceType) {
        let options = {
          sourceType: pictureSourceType,
          targetWidth: 400,
          targetHeight: 400,
        };

        return new Promise((resolve, reject) => {
          navigator.camera.getPicture(resolve, reject, options);
        });
      },

      showBackdrop() {
        document.body.classList.add('use-backdrop');
      },

      hideBackdrop() {
        document.body.classList.remove('use-backdrop');
      },

      ...mapActions({
        setHeader: 'setHeader',
        setFooter: 'setFooter',
        setUser: 'setUser',
        pushHistory: 'pushHistory',
        popHistory: 'popHistory',
        clearHistory: 'clearHistory',
        overwriteHistoryData: 'overwriteHistoryData',
        setBackButtonHandler: 'setBackButtonHandler',
        setBackgroundProcessor: 'setBackgroundProcessor',
        removeBackgroundProcessor: 'removeBackgroundProcessor',
      }),

      exit()  {
        navigator.app.exitApp();
      },

      logout()  {
        this.showAlert('로그아웃 하시겠습니까?', {
          cancel: '아니오',
          confirm: { text: '로그아웃', value: true }
        })
        .then(logout => {
          if(logout)  {
            appSerivce.setKeepLogin(false);
            this.$router.replace({ name: 'Login' });
            this.clearHistory();
          }
        });
      },

      /**
       * 사용자 인증 새로고침(세션 유지)
       */
      refreshAuthorization()  {
        userService.authorize(this.user)
          .then()
          .catch(err => {
            appSerivce.setKeepLogin(false);
            this.$router.replace({ name: 'Login' });
            this.clearHistory();
          });
      },

      /**
       * @param {HTMLElement} target
       */
      onLoadError(target) {
        target.remove();
      }
    },

    computed: {
      ...mapGetters({
        user: 'user',
        $histories: 'histories',
        $poppedHistory: 'poppedHistory',
        $service: 'service'
      }),

      isOwner() {
        /** @type {User} */
        let user = this.user;

        return user.STORE === PUBLIC.USER_TYPE.OWNER;
      }
    },

    filters: {
      dateFormat(date, format) {
        let momentDate = moment(date);

        return momentDate.isValid() ? momentDate.format(format) : '';
      },

      /**
       * @param {string} time HH:mm
       */
      convertOver24Hour(time, format)  {
        if(!time) return '';

        let split = time.split(':');

        if (split.length < 2) return time;

        let hour = Number(split[0]),
          min = split[1];

        if(hour >= 24)  hour -= 24;

        return `${(hour + '').padStart(2, '0')}:${min}`;
      },

      localeText(code, prop) {
        return getLocaleText(code, prop);
      }
    },

    created() {

    },

    mounted() {
      this.hideBackdrop();

      window.addEventListener('resize', () => {
        this.deviceWidth = window.innerWidth;
        this.deviceHeight = window.innerHeight;
      });
    },

    destroyed() {

    },

    beforeRouteEnter: (to, from, next) => {
      next(vm => {
        if(window.swal.getState().isOpen) {
          window.swal.close();
        }

        switch(to.name) {
          case 'Login':
          case 'Main':
          case 'WorkerMain':
            vm.setBackButtonHandler(() => {
              vm.exit();
            });
            break;
          default:
            vm.setBackButtonHandler(() => {
              vm.back();
            });
            break;
        }

        let hasHistory = (vm['overwriteHistoryData'] ? true : false) && vm['$poppedHistory'];

        if (hasHistory) {
          setTimeout(() => { vm.overwriteHistoryData(vm); }, 0);
        }
      });
    },

    /**
     * @param {Route} to
     * @param {Route} from
     * @param {Function} next
     */
    beforeRouteLeave(to, from, next)  {
      if (this.$isBack === false)  {
        this.pushHistory({ route: from, component: this });
      }

      next();
    }
  });
}
