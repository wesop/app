<template>
<div id="q-app">
  <div class="backdrop-wrap"></div>
  <router-view />
</div>
</template>

<script>
import appService from './services/app'

export default {
  name: 'App',

  beforeCreate()  {
    document.addEventListener('backbutton', () => {
      this.$store.state.backButton.active();
    }, false);

    screen.orientation.lock('portrait')
      .then(() => {
        console.log('Successfully locked the orientation');
      }, (errMsg) => {
        console.log('Error locking the orientation :: ' + errMsg);
      });
  },

  created() {
    let self = this;

    FCMPlugin.getToken((token) => {
      appService.setDeviceToken(token);

      FCMPlugin.subscribeToTopic('PUBLIC');

      FCMPlugin.onNotification((data) => {
        if(data.wasTapped){
          //Notification was received on device tray and tapped by the user.
          console.log( data );
        }else{
          //Notification was received in foreground. Maybe the user needs to be notified.
          console.log( data );
        }

        self.showAlert(data.message);
      });
    });
  },

  mounted() {

  },

  updated() {}
}
</script>

<style>
@import '~fullcalendar/dist/fullcalendar.css';
.child-view {
  position: absolute;
  width: 100%;
  transition: all .3s cubic-bezier(.55,0,.1,1);
}
.slide-left-enter, .slide-right-leave-active {
  opacity: 0;
  -webkit-transform: translate(100%, 0);
  transform: translate(100%, 0);
}
.slide-left-leave-active, .slide-right-enter {
  opacity: 0;
  -webkit-transform: translate(-100%, 0);
  transform: translate(-100%, 0);
}
</style>
