<template>
<Modal
  v-model="value"
  :content-css="{
    width: '90%',
    minWidth: '90%',
    height: '90%',
    maxHeight: '90%',
    minHeight: '90%',
  }">
  <div class="zipcode-search-wrap" ref="searchWrap">
    <iframe src="http://api.shop-sol.com/shopsol/zipcode" frameborder="0"></iframe>
  </div>

  <q-btn
    @click="close"
    slot="footer"
    label="닫기" />
</Modal>
</template>

<script>
let onMessage;

export default {
  data () {
    return {
      zipCode: '',
      addr: ''
    }
  },

  model: {
    prop: 'value'
  },

  props: {
    value: Boolean
  },

  methods: {
    initSearchWrap()  {
      onMessage = this.onMessage;

      window.addEventListener('message', onMessage, true);
    },

    onMessage(event) {
      let message = event.data;

      if(message['wesop-zipcode'])  {
        let data = message.data;

        if(message.name === 'zipCode') {
          this.setZipCode(data.zipCode, data.addr);
        } else if(message.name === 'latLong')  {
          this.setLatLong(data.LAT, data.LONG);
        }
      }
    },

    setLatLong(LAT, LONG)  {
      this.$emit('setLatLong', LAT, LONG);

      this.close();
    },

    setZipCode(zipCode, addr)  {
      this.$emit('setZipCode', zipCode, addr);
    },

    /**
     * @returns {Promise<{ LAT: string, LONG: string }>}
     */
    getLatLong(addr)  {
      return new Promise((resolve, reject) => {
        let geocoder = new daum.maps.services.Geocoder();

        geocoder.addressSearch(addr, (result, status) => {
          if (status === daum.maps.services.Status.OK) {
            resolve({
              LAT: result[0].y,
              LONG: result[0].x
            });
          } else {
            reject(new Error('주소를 확인해 주세요'))
          }
        })
      })
    },

    close() {
      this.$emit('input', false);
      this.$emit('change');
    }
  },

  created() {
    this.initSearchWrap();
  },

  destroyed() {
    window.removeEventListener('message', onMessage, true);
  }
}
</script>

<style lang="stylus" scoped>
.zipcode-search-wrap {
  width: 100%;
  height: 100%;

  iframe {
    height: 100%;
  }
}
</style>

