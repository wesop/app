<template>
    <div style="background-color: white;">
<q-page >
  <section class="store-list-wrap">
    <div
      @click="onClickStore(store)"
      v-for="(store, index) in stores.concat(waitStores, workEndedStores)"
      :key="index"
      class="store-wrap"
      :style="{ height: `${listItemHeight}px` }">
      <div class="store-image-wrap">
        <img v-if="store.images.length" :src="'http://api.shop-sol.com/uploads/' + store.images[0].IMAGE" />
      </div>
      <div class="store-contents-wrap">
        <div>
          <div>
            <strong class="name">
              {{store.NAME}}
              <small v-if="!isOwner && store.IS_MANAGER == 1">(매니저)</small>
            </strong>
            <span v-if="!isOwner && store.isEnded">(근무종료)</span>
          </div>
          <div v-if="store.empList">
            <!-- <small> -->
              <q-icon name="person" color="white" />
              <span>{{store.empsize.length}}명 중</span>
              <strong class="text-white">{{store.workingEmpList.length}}명</strong>
              <span>근무중</span>
              <small v-if="!isOwner && store.TYPE == 0" class="text-paleblue">(합류대기중)</small>
            <!-- </small> -->
          </div>
          <div v-if="!isOwner">
            <small v-if="store.START">{{store.START | dateFormat('YYYY.MM.DD')}}</small>
            <small>~</small>
            <small v-if="store.END">{{store.END | dateFormat('YYYY.MM.DD') }}</small>
            <small v-else>{{ "계속" }}</small>
          </div>
        </div>
      </div>
    </div>
  </section>

  <Modal v-model="visibleOwnerModal"
    :no-backdrop-dismiss="false"
    :maximized="true"
    position="bottom">
    <q-list no-border style="padding-top: 0">
      <q-item no-padding>
        <q-btn
          @click="viewDetail()"
          label="매장상세"
          class="full-width"
        />
      </q-item>

      <q-item-separator></q-item-separator>

      <q-item no-padding>
        <q-btn
          @click="viewEmpList(1)"
          label="직원목록"
          class="full-width"
        />
      </q-item>

      <q-item-separator></q-item-separator>

      <q-item no-padding>
        <q-btn
          @click="viewEmpList(0)"
          label="합류요청목록"
          class="full-width"
        />
      </q-item>
    </q-list>

    <div slot="footer">
      <q-btn
        @click="activeOwnerModal(false)"
        label="닫기"
        color="paleblue"
      />
    </div>
  </Modal>
</q-page>
</div>
</template>

<script>
import moment from "moment";
import AppLoader from "../components/Loader";
import Store from "../models/store";
import Emp from "../models/emp";
import storeService from "../services/store";

export default {
  name: "Store",

  data() {
    return {
      moreButtons: [],
      selectedStore: null,
      visibleOwnerModal: false,
      stores: [],
      waitStores: [],
      workEndedStores: []
    };
  },

  computed: {
    listItemHeight() {
      let screenHeight = this.deviceHeight - 86 * 2;
      let itemMinHeight = 180;
      let divideNumber = Math.round(screenHeight / itemMinHeight);
      let height = screenHeight / divideNumber;

      return height;
    }
  },

  methods: {
    initStoresData() {
      AppLoader.visible = true;

      this.getStores()
        .then(stores => stores)
        .then(stores => this.getStoresData(stores))
        .then(() => (AppLoader.visible = false))
        .catch(err => {
          AppLoader.visible = false;
          this.showAlert(err.message);
        });
    },

    /**
     * 매장 목록 가져오기
     *
     * @returns {Promise<Store[]>}
     */
    getStores() {
      return storeService.list(this.user);
    },

    /**
     * 매장 이미지 가져오기
     *
     * @param {string} storeSeq
     *
     * @returns {Promise<{ IMAGE, IMAGE_SEQ }[]>}
     */
    getStoreImages(storeSeq) {
      return storeService.getStoreImages(storeSeq);
    },

    /**
     * @param {string} storeSeq
     */
    getStoreEmpList(storeSeq) {
      return storeService.getEmpList(storeSeq);
    },
  getEmpSize(storeSeq)  {
      return storeService.getEmpSize(storeSeq);
    },
    /**
     * 현재 근무중인 직원 조회
     *
     * @param {string} storeSeq
     *
     * @returns {Promise<{ EMP_ID: string, EMP_NAME: string }[]>}
     */
    getWorkingEmpList(storeSeq) {
      return storeService.getWorkingEmpList(storeSeq);
    },

    /**
     * @param {Store[]} stores
     */
    async getStoresData(stores) {
      let workingStores = [],
        workEndedStores = [],
        waitStores = [];

      for (let index = 0; index < stores.length; index++) {
        let store = stores[index];
     console.log('',store);
        try {
          // store.images = await this.getStoreImages(store.STORE_SEQ);
          store.empList = await this.getStoreEmpList(store.STORE_SEQ);
          store.workingEmpList = await this.getWorkingEmpList(store.STORE_SEQ);

          store.empsize = await this.getEmpSize(store.STORE_SEQ) || [];

          store.empList.some(emp => {
             console.log('emp:',emp);
            if (emp.EMP_SEQ == store.EMP_SEQ) {
              store.START = emp.START;
              store.END = emp.END;
              store.PAY = emp.PAY;
              store.PAY_DAY = emp.PAY_DAY;
              store.PAY_TYPE = emp.PAY_TYPE;
              store.PAY_SHOW = emp.PAY_SHOW;
              return true;
            }
          });

          if (store.END) {
            if (moment(store.END).toDate() > new Date())  {
              workingStores.push(store);
            } else {
              store.isEnded = true;
              workEndedStores.push(store);
            }
          } else {
            if (store.TYPE == 0) waitStores.push(store);
            else workingStores.push(store);
          }
        } catch (err) {
          store.images = [];
          store.empList = [];
          store.workingEmpList = [];

          console.warn(err.message);
          this.showAlert(err.message);
        }
      }

      workingStores.sort((a, b) => b.START - a.START);

      this.stores = workingStores;
      this.waitStores = waitStores;
      this.workEndedStores = workEndedStores;
    },

    /**
     * @param {Store} store
     */
    onClickStore(store) {
       console.log('S',store);
      if (store.TYPE == 0) {
        this.showAlert("합류 대기중입니다.");
        return;
      }
// var today = new Date();

// var endDate = new Date(store.END); 
// endDate.setDate(endDate.getDate() + 1);

// if ( endDate<today) {
//    this.showAlert("근무종료된 매장입니다");
//     return;
// }
       

    
      this.selectedStore = store;

      if (this.isOwner || store.IS_MANAGER == 1) {
        this.activeOwnerModal(true);
      } else {
        this.viewDetail();
      }
    },

    /**
     * 매장 상세정보 화면 이동
     */
    viewDetail() {
      console.log('select:',this.selectedStore);
      let empSeq = this.selectedStore.EMP_SEQ,
        start = this.selectedStore.START,
        end = this.selectedStore.END,
        pay = this.selectedStore.PAY,
        isManager = this.selectedStore.IS_MANAGER,
        payDay = this.selectedStore.PAY_DAY,
        payType = this.selectedStore.PAY_TYPE,
         payShow = this.selectedStore.PAY_SHOW;

      this.activeOwnerModal(false);
      this.pagePush({
        name: "StoreDetail",
        params: {
          id: this.selectedStore.STORE_SEQ
        },
        query: {
          images: this.selectedStore.images,
          empSeq,
          start,
          end,
          pay,
          isManager,
          payDay,
          payType,
          payShow,
        }
      });
    },

    /**
     * 직원 목록 화면 이동
     *
     * @param {number} type 합류 여부 플래그(0: 요청대기목록, 1: 매장직원목록)
     */
    viewEmpList(type) {
      console.log('S',this.selectedStore);
      this.activeOwnerModal(false);
      this.pagePush({
        name: "EmployeeList",
        params: {
          id: this.selectedStore.STORE_SEQ
        },
        query: {
          storefivetype :this.selectedStore.FIVETYPE,
          type: type,
          PayShow :this.selectedStore.PAY_SHOW,
          OtherpayShow :this.selectedStore.OTHERPAY_SHOW,
          isManager : this.selectedStore.IS_MANAGER
        }
      });
    },

    /** @param {boolean} activeStatus */
    activeOwnerModal(activeStatus) {
      this.visibleOwnerModal = activeStatus;
    }
  },

  created() {
    this.$isBack = false;

    if (this.isOwner) {
      this.moreButtons = [
        {
          icon: "add",
          label: "매장추가",
          click: () => {
            this.pagePush({ name: "StoreRegister" });
          }
        }
      ];
    } else {
      this.moreButtons = [
        {
          icon: "add",
          label: "일터추가",
          click: () => {
            this.pagePush({ name: "StoreSearch" });
          }
        }
      ];
    }

    this.setHeader({
      visible: true,
      title: `${!this.isOwner ? "나의 일터" : "매장"}목록`,
      useBackButton: false,
      more: {
        use: true,
        buttons: this.moreButtons
      }
    });

    this.initStoresData();
  },

  mounted() {}
};
</script>

<style lang="stylus" scoped>
@import '../css/themes/common.variables.styl';

.store-list-wrap {
  padding: 20px 12px;
  background  : #fff;
  
  .store-wrap {
    position: relative;
    display: inline-block;
    margin-bottom: 12px;
    width: 100%;
    height: 33.33%;
    box-sizing: border-box;
    border-radius: 4px;
    box-shadow: 0 0 3px $gray;

    &:last-child {
      margin-bottom: 0;
    }

    .store-image-wrap {
      position: absolute;
      width: 100%;
      height: 100%;
      // background-color #9db6ca
      background-color: #fff;
      border-radius: 4px;
      overflow: hidden;

      img {
        display: block;
        margin: 0 auto;
        width: auto;
        height: auto;
        min-width: 100%;
        max-width: 100%;
        // max-height: 100%;
      }
    }

    .store-contents-wrap {
      position: relative;
      display: flex;
      padding: 14px 12px;
      width: 100%;
      height: 100%;
      background: -moz-linear-gradient(0deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.6) 50%);
      background: -webkit-linear-gradient(0deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.6) 50%);
      background: linear-gradient(0deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.6) 50%);
      border-radius: 4px;
      box-sizing: border-box;
      font-size: 0.9rem;
      color: #fff;

      .name {
        margin-bottom: 12px;
      }

      &:hover {
        background: rgba(0, 0, 0, 0.4);
      }

      & > div {
        flex: 1;

        strong {
          font-weight: 600;
        }
      }
    }
  }
}
</style>

