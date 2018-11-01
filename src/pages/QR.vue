<template>
<q-page>

  <div v-if="!isQRScanMode">
    <q-btn
      @click="onScan(null, store.STORE_SEQ)"
      v-for="(store, index) in stores"
      :key="index"
      :label="store.NAME"
      color="black"
      class="full-width"
    />
    <q-btn
      @click="QRScan"
      color="em"
      label="QR코드 촬영"
      class="full-width"
    />
  </div>
  <div v-else class="scan-area-wrap" ref="$scanArea"></div>

  <div v-if="isQRScanMode" class="notification-message-wrap">
    설정에서 위치 정보를 반드시 '허용'으로 해주셔야 합니다.
     <!-- <div class="btn-login-wrap">
      <q-btn
        @click="authorize"
        color="white"
        text-color="blue"
        label="qr끄기"
        size="1.25rem"
        class="btn-login full-width" />
    </div> -->
 </div>
  
</q-page>
</template>

<script>
import geodist from 'geodist'
import Store from '../models/store'
import EmpSchedule from '../models/emp-schedule'
import StoreSchedule from '../models/store-schedule'
import storeService from '../services/store'
import empService from '../services/emp'
import managementService from '../services/management'


export default {
  name: 'QR',

  data()  {
    return {
      stores: [],
      schedules: [],
      LAT: '37.556561831457955',
      LONG: '126.97515656389007',
      isQRScanMode: false,
      today: new Date,
    }
  },

  watch: {
    isQRScanMode(value)  {
      if(value) {
        setTimeout(() => {
          /** @type {HTMLDivElement} */
          let scanAreaWrap = this.$refs.$scanArea,
            topBottomWidth = (scanAreaWrap.offsetHeight - 200) / 2,
            leftRightWidth = (scanAreaWrap.offsetWidth - 200) / 2;

          scanAreaWrap.style.borderLeftWidth = `${leftRightWidth}px`;
          scanAreaWrap.style.borderRightWidth = `${leftRightWidth}px`;
          scanAreaWrap.style.borderTopWidth = `${topBottomWidth}px`;
          scanAreaWrap.style.borderBottomWidth = `${topBottomWidth}px`;
        }, 0);
      }
    }
  },

  methods: {
    authorize() {
      this.isQRScanMode = false;
       QRScanner.destroy(function(status){
         console.log("destroy=",status);
     });
      // QRScanner.hide(function(status){
      //    console.log("hide=",status);
      // });
    },

    /**
     * 매장 목록 가져오기
     *
     * @returns {Promise<Store[]>}
     */
    getStores() {
      return storeService.list3(this.user);
    },

    onPrepare(err, status) {
      this.isQRScanMode = true;

      if(err) {
        console.warn(err);
        this.showAlert('설정에서 카메라 접근권한을 허용해주세요')
          .then(() => this.back());
      } else {
        navigator.geolocation.getCurrentPosition((position) => {
          let coords = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          };

          this.LAT = coords.latitude,
          this.LONG = coords.longitude;

          QRScanner.scan(this.onScan);
        }, (err) => {
          console.warn(err);

          this.showAlert(err.message);
          QRScanner.scan(this.onScan);
        },  {
          enableHighAccuracy: true
        });

        QRScanner.show(() => {});
      }
    },

    onScan(err, storeSeq)  {
      if(err) {
        console.warn(err);
        this.showAlert('잘못된 QR코드입니다! :(');
      } else {
            var res = storeSeq.split("-");
            if(res[1] != undefined){
               this.user.stores.some(store => {
                if(store.STORE_SEQ === res[0]) {
                       this.checklist(storeSeq,this.LAT, this.LONG);
                      return true;
                  }

              });
             
            }else{
              this.user.stores.some(store => {
                if(store.STORE_SEQ === res[0]) {
                      this.checkIn(res[0], this.LAT, this.LONG, this.today, store.EMP_SEQ);
                      return true;
                  }

              });
            }
      }
  
    },

    QRScan()  {
      QRScanner.prepare(this.onPrepare)
    },
  
  
  //===============================================================================================
    async checklist(storeSeq, LAT, LONG) {
        //체크리스트
         let { message, result } = await storeService.checklist(storeSeq, LAT, LONG);
           if(message === 'SUCCESS') {
             if(result[0] != undefined){
                   console.log('result:',result[0]);
            this.pagePush({
        name: "QRCheckList",
         params: {
             checkdata :result[0],
        },
      });
             }else{
              this.showAlert('잘못된 QR코드 입니다.', {
                confirm: '확인'
              })
             .then(() => this.QRScan());
             }

          } else {
             this.showAlert(result|| '매장 도착 후 진행해주세요.', {
                confirm: '확인'
              })
             .then(() => this.QRScan());
          }
     },


     
  //===============================================================================================
   async checkIn(storeSeq, LAT, LONG, date, empSeq) {
      let isCheckInFinish = false;
    
      storeService.getTodayCheckInFinishStoreSeqList().some(_storeSeq => {
        if(storeSeq == _storeSeq) {
          isCheckInFinish = true;
          return true;
        }
      });

      if(!isCheckInFinish) {
        try {
          let { message, WORK_OFF_TIME } = await storeService.checkIn(storeSeq, LAT, LONG, date, empSeq);

          if(message === 'WORK_ON_SUCCESS') {
            this.showAlert('정상적으로 출근 했습니다!', {
                confirm: '확인'
              })
              .then(() => this.QRhide());
          } else if(message === 'SCHEDULE_EXIST')  {
            this.showAlreadyCheckOutAlert(WORK_OFF_TIME);
          }
        } catch (error) {
          this.showAlert(error.message || '매장 도착 후 출퇴근을 진행해주세요.').then(() => this.QRScan());
        }


      }else {
        this.showAlert('퇴근하시겠습니까?', {
          cancel: '아니오',
          confirm: '퇴근하기'
        })
        .then(checkout => {
          if(checkout)  {
            this.checkOut(storeSeq, LAT, LONG, date, empSeq);
          } else {
            this.QRhide();
          }
        });
      }
    },
//====================================================================================================
    checkOut(storeSeq, LAT, LONG, date, empSeq) {
      storeService.checkIn(storeSeq, LAT, LONG, date, empSeq)
        .then(({ message, WORK_OFF_TIME }) => {
          if(message === 'WORK_OFF_SUCCESS') {
            this.showAlert('정상적으로 퇴근 했습니다!', {
                confirm: '확인'
              })
              .then(() => this.QRhide());
          } else if(message === 'SCHEDULE_EXIST')  {
            this.showAlreadyCheckOutAlert(WORK_OFF_TIME);
          }
        })
        .catch(err => {
          this.showAlert(error.message || '매장 도착 후 출퇴근을 진행해주세요.').then(() => this.QRScan());
        });
    },
//=========================================================================================================
    /**
     * 이미 퇴근했을 때 보여줄 Alert 보여주기
     *
     * @param {string} checkOutTime HH:mm:ss
     */
    showAlreadyCheckOutAlert(checkOutTime)  {
      let [ hour, min ] = checkOutTime.split(':'),
        resultMessage = `${decodeURIComponent(this.user.NAME)}님은 ${hour}시 ${min}분에 퇴근하셨습니다.`;

        this.showAlert(resultMessage).then(() => this.QRhide());
    },
//=============================================================================================================
    QRhide()  {
      QRScanner.hide(status => this.back());
    }
  },

  async mounted() {

  //============================================================================== 
  
      // let { message, result } = await storeService.checklist('321-1', '37.5563269', '126.975294');
      //    if(message === 'SUCCESS') {
      //        if(result[0] != undefined){
      //              console.log('result:',result[0]);
      //       this.pagePush({
      //   name: "QRCheckList",
      //    params: {
      //        checkdata :result[0],
      //   },
      // });
      //        }else{
      //         this.showAlert('잘못된 QR입니다.', {
      //           confirm: '확인'
      //         })
      //        }

      //     } else {
      //        this.showAlert(result|| '매장 도착 후 출퇴근을 진행해주세요.', {
      //           confirm: '확인'
      //         })
      //     }
  //==============================================================================       
    if (process.env.NODE_ENV !== 'development') {
      this.isQRScanMode = true;
      this.QRScan();
    } else {
      try {
        this.stores = await this.getStores();
      } catch (err) {
        console.warn(err.message);
      }
    }
 console.log(this.user);
    this.setHeader({
      visible: true,
      buttons: [],
      title: 'QR출퇴근',
      useBackButton: false
    });
  },

beforeDestroy(){
    //  this.isQRScanMode = false;
    // // this.visible = false;
    //  QRScanner.hide();
    //  QRScanner.destroy();
//      QRScanner.cancelScan(function(status){
//   console.log("cancelScan=",status);
// });
//   QRScanner.hide(function(status){
//   console.log("hide=",status);
// });
// QRScanner.destroy(function(status){
//   console.log("destroy=",status);
// });
    this.isQRScanMode = false;
     QRScanner.hide();
      QRScanner.destroy();

   },


   destroyed() {
  //  //android
    //    this.isQRScanMode = false;
    //  QRScanner.hide();
    //   QRScanner.destroy();

   }

  // destroyed() {
  //  //ios
  //   this.isQRScanMode = false;
  //    QRScanner.hide();
  //   QRScanner.destroy();
  // }
}
</script>

<style lang="stylus" scoped>
@import "../css/themes/common.variables.styl"
.q-layout-page {
   padding-bottom: 57px;
    background: transparent;
}


.scan-area-wrap {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: transparent;
  border-color: rgba(0,0,0,.7);
  border-style: solid;
}

.notification-message-wrap {
  position: absolute;
  top: 15%;
  left: 0;
  right: 0;
  text-align: center;
  font-size: .9rem;
  color: #fff;

}
</style>
