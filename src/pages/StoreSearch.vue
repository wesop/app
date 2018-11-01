<template>
<q-page>
  <div class="search-wrap">
    <q-input v-model="searchText"
      @focus="() => { if(searchText.length) { showResult = true; search() } }"
      @keydown.enter="search"
      hide-underline
      type="text"
      :before="[{ icon: 'search', handler: search }]"
      color="paleblue"
      class="search-input-wrap" />

    <q-list v-if="stores.length && showResult"
      class="result-wrap">
      <q-item v-for="(store, index) in stores"
        :key="index">
        <q-item-main>
          <div @click="()=> { selectStore(store, index); showStoreShortDetail(index); }">
            {{store.NAME}}
          </div>
        </q-item-main>
      </q-item>
    </q-list>
  </div>


  <div class="map-wrap">
    <button @click="setCurrentPosition" class="btn-current" type="button">
      <q-icon name="my_location" color="paleblue" />
    </button>
    <div id="map-container"></div>
  </div>

  <Modal v-model="visibleShortDetail"
    v-if="selectedIndex >= 0"
    position="bottom"
    :content-css="{minWidth: '100%'}"
    :no-backdrop-dismiss="false">
    <q-list no-border>
      <q-item>
        <q-item-main>
          <h4>
            <strong class="text-darkblue">{{stores[selectedIndex].NAME}}</strong>
            <small><strong v-if="requestStatus && !joinStatus" class="text-paleblue">(합류 대기)</strong></small>
            <small><strong v-if="joinStatus" class="text-paleblue">(합류 완료)</strong></small>
          </h4>
        </q-item-main>
      </q-item>
      <q-item-separator></q-item-separator>
      <q-item>
        <q-item-main>
          <div>{{stores[selectedIndex].ADDR1}}</div>
          <div>{{stores[selectedIndex].ADDR2}}</div>
        </q-item-main>
      </q-item>
    </q-list>

    <div slot="footer">
      <q-btn @click="requestJoin(stores[selectedIndex])"
        label="합류요청하기"
        color="paleblue" />
    </div>
  </Modal>

  <!-- assets/imgs 를 사용하기 위한 더미 이미지 엘리먼트 -->
  <img v-show="false" ref="marker" src="../assets/imgs/marker-on.png" />
  <img v-show="false" ref="myMaker" src="../assets/imgs/my-marker.png" />
</q-page>
</template>

<script>
import _ from 'underscore'
import Store from '../models/store'
import storeService from '../services/store'
import empService from '../services/emp';

export default {
  name: 'StoreSearch',

  data()  {
    return {
      searchText: '',
      stores: [],
      showResult: false,
      map: null,
      markers: [],
      markerImage: {},
      myMarkerImage: {},
      myMarker: null,
      mapMarker: null,

      visibleShortDetail: false,
      selectedIndex: -1,
      requestStatus: false,
      joinStatus: false,
    }
  },

  watch: {
    searchText(current, before)  {
      if(this.searchText.length >= 2) {
        this.search();
      }
    },

    visibleShortDetail(value)  {
      if(!value)  this.selectedIndex = -1;
    }
  },

  methods: {
    /**
     * 매장 검색
     */
    search()  {
      return storeService.search({ text: this.searchText })
        .then(stores => {
          this.stores = stores;

          this.showResult = true;
        })
        .catch(err => console.warn(err.message));
    },

    /**
     * 검색된 매장 선택
     *
     * @param {Store} store
     * @param {number} index
     */
    async selectStore(store, index) {
      this.searchText = '';
      this.requestStatus = false;
      this.joinStatus = false;

      let waitEmpList = await this.getWaitEmpList(store.STORE_SEQ)

      store.empList = await this.getEmpList(store.STORE_SEQ);

      store.empList.some(emp => {
        if(emp.MEMBER_SEQ == this.user.MEMBER_SEQ) {
          this.requestStatus = true;

          if(emp.TYPE == 1)  this.joinStatus = true;
          return true;
        }
      });

      waitEmpList.some(emp => {
        if(emp.MEMBER_SEQ == this.user.MEMBER_SEQ) {
          this.requestStatus = true;

          return true;
        }
      });

      this.showResult = false;

      let coords = {
        latitude: store.LAT,
        longitude: store.LONG,
      }

      this.createMarker(coords, store.NAME, 1, index);
    },

    /**
     * 매장 요약 상세정보 보기
     *
     * @param {number} index
     */
    showStoreShortDetail(index)  {
      this.selectedIndex = index;
      this.visibleShortDetail = true;
    },

    /**
     * 매장의 직원 목록 조회
     *
     * @param {string} storeSeq
     *
     * @returns {Promise<Emp[]>}
     */
    getEmpList(storeSeq)  {
      return storeService.getEmpList(storeSeq);
    },

    /**
     * 매장의 합류 요청 직원 목록 조회
     *
     * @param {string} storeSeq
     *
     * @returns {Promise<Emp[]>}
     */
    getWaitEmpList(storeSeq)  {
      return storeService.getWaitEmpList(storeSeq);
    },

    /**
     * 매장에 합류 요청
     *
     * @param {Store} store
     */
    requestJoin(store) {
      if(!this.user.images || !this.user.images.length) {
        this.showAlert('자신의 프로필 이미지를 등록해주세요!');
        return;
      }

      if(this.joinStatus) {
        this.showAlert('이미 합류된 상태입니다.');
        return;
      }

      if(this.requestStatus)  {
        this.showAlert('합류 요청 대기중입니다.');
        return;
      }

      this.showAlert('합류 요청을 하시겠습니까?', {
        cancel: '취소',
        confirm: '합류요청'
      })
      .then(join => {
        if(join)  {
          empService.requestJoin(store.STORE_SEQ)
            .then(() => {
              this.showAlert('매장에 합류 요청했습니다.')
            })
            .catch(err => this.showAlert(err.message));
        }
      });

      this.requestStatus = false;
      this.joinStatus = false;
      this.visibleShortDetail = false;
    },

    /**
     * 현재 위치 정보 가져오기
     *
     * @param {number} latitude
     * @param {number} longitude
     */
    onGetCurrentPosition({
      latitude = 37.50406100000001,
      longitude = 127.03789219999999
    })  {
      let container = document.querySelector('#map-container'),
        options = {
          center: new daum.maps.LatLng(latitude, longitude),
          level: 3
        };

      this.map = new daum.maps.Map(container, options);

      this.createMarker({ latitude, longitude }, 'MY', 0);
    },

    /**
     * @param {<{ latitude, longitude }>} 위경도
     * @param {string} name 매장이름
     * @param {number} type 마커 타입(0: 내 위치, 1: 매장 위치)
     * @param {number} index type이 1일 때만 사용
     */
    createMarker({ latitude, longitude }, name, type, index) {
      let position = this.getPosition({ latitude, longitude }),
        marker = new daum.maps.Marker({
          position,
          image: type == 1 ? this.markerImage : this.myMarkerImage
        });

      if(type == 1) {
        daum.maps.event.addListener(marker, 'click', () => {
          this.selectStore(this.stores[index], index);
          this.showStoreShortDetail(index);
        });

        this.mapMarker = marker;
      } else {
        if(this.myMarker)  this.myMarker.setMap(null);

        this.myMarker = marker;
      }

      marker.setMap(this.map);
      this.map.setCenter(position);
    },

    /**
     * 위경도 가져오기
     */
    getPosition({ latitude, longitude }) {
      return new daum.maps.LatLng(latitude, longitude);
    },

    setCurrentPosition()  {
      navigator.geolocation.getCurrentPosition((position) => {
        let coords = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        };

        this.onGetCurrentPosition(coords);
      }, (err) => {
        console.warn(err);
        console.warn(err.message);
        this.showAlert(err.message);
        this.onGetCurrentPosition({});
      }, {
        enableHighAccuracy: true
      });
    }
  },

  created() {
    this.stores = [];

    this.setHeader({
      visible: true,
      title: `${!this.isOwner ? '일터' : '매장'}검색`,
      useBackButton: true
    });
  },

  mounted() {
    this.markerImage = new daum.maps.MarkerImage(
      this.$refs.marker.getAttribute('src'),
      new daum.maps.Size(20, 30),
      { offset: new daum.maps.Point(5, 15) }
    );

    this.myMarkerImage = new daum.maps.MarkerImage(
      this.$refs.myMaker.getAttribute('src'),
      new daum.maps.Size(30, 30),
      { offset: new daum.maps.Point(7, 7) }
    );

    this.setCurrentPosition();
  }
}
</script>

<style lang="stylus" scoped>
@import "../css/themes/common.variables.styl"

.search-wrap
  position relative
  background #fff
  z-index 2

  .search-input-wrap
    border-bottom: 1px solid #7eb4cb;
    padding .5em

    input
      font-size 1rem
      color: $paleblue;

  .result-wrap
    border-bottom: 1px solid #7eb4cb;
    color: $darkblue;

.map-wrap {
  position: fixed !important;
  top: (45 + 58)px;
  bottom: 0;
  width: 100%;
  z-index: 1;

  .btn-current {
    position: absolute;
    top: 1rem;
    left: 1rem;
    padding-bottom: 1px;
    width: 44px;
    height: 44px;
    background: #fff;
    border: 1px solid $paleblue;
    border-radius: 50%;
    font-size: 1.5rem;
    z-index: 2;
  }

  #map-container {
    height: 100%;
  }
}
</style>
