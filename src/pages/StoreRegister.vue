<template>
<q-page>
  <section class="store-image-wrap">
    <ImageSlider
      v-model="sliderIndex"
      :images="images.map(row => (row.IMAGE_SEQ ? 'http://api.shop-sol.com/uploads/' : '') + row.IMAGE)"
    />

    <q-btn
      v-if="images.length >= 1"
      @click="removeStoreImage"
      flat
      dense
      round
      icon="delete"
      color="white"
      class="btn-delete"
    />
    <q-btn
      @click="addStoreImage"
      flat
      dense
      round
      icon="add"
      color="white"
      class="btn-add"
    />
  </section>
  <form>
    <div class="field required">
      <div class="label">매장 이름</div>
      <div class="text">
        <q-input
         
          v-model="store.NAME"
          hide-underline
          type="text"
          placeholder="(예:샵솔 역삼점)" />
      </div>
    </div>

    <div class="field required">
      <div class="label">매장 기본주소 검색</div>
      <div class="text">
        <q-input
          v-model="store.ADDR1"
          @click="visiblePlaceSearchModal = true"
          hide-underline
          type="text"
          placeholder="(클릭하여 검색)" />
       
      </div>
    </div>

  <div class="field">
      <div class="label">매장 상세주소 입력</div>
      <div class="text">
        <q-input
          v-model="store.ADDR2"
          hide-underline
          type="text"
          placeholder="(예:1층 101호)" />
      </div>
    </div>

    <div class="field required">
      <div class="label">매장 전화번호</div>
      <div class="text">
        <q-input
          v-model="store.TEL"
          hide-underline
          autocomplete="tel"
          type="tel"
          placeholder="전화번호(숫자만)" />
      </div>
    </div>

    <div class="field required">
      <div class="label">급여정산일</div>
      <div class="text">
        <select v-model="store.CALCULATE_DAY">
          <option value="undefined" >(클릭하여 선택)</option> 
          <option v-for="day in [ 6, 11, 16, 21, 26, 1 ]"
            :key="day" :value="day + ''">
            매달 {{day === 1 ? '말' : day - 1}}일
          </option>
        </select>  
      </div>
         &nbsp;&nbsp; <small style="font-size:50%;">* 25일로 설정하시면 전월 26일부터 당월 25일까지의 급여가 계산됩니다.</small>
    </div>

    <!-- <div class="field required">
      <div class="label">급여지급일</div>
      <div class="text">
        <span>매월 </span>
        <input v-model="store.PAY_DAY"
          text-right
          type="number"
          max="31"
          min="1"
          maxlength="2"
          placeholder="(급여)" />
        <span>일</span>
      </div>
    </div> -->

    <div class="field required">
      <div class="label">사업장 규모</div>
      <div class="text">
        <q-radio
          v-model="store.TYPE"
          color="paleblue"
          val="0"
          checked-icon="radio_button_checked"
          unchecked-icon="radio_button_unchecked"
          label="5인 미만" />
        <q-radio
          v-model="store.TYPE"
          color="paleblue"
          val="1"
          checked-icon="radio_button_checked"
          unchecked-icon="radio_button_unchecked"
          label="5인 이상" />
      </div>
      &nbsp;&nbsp; <small style="font-size:50%;">* '5인 이상' 적용시 추가,야간,휴일수당이 적용됩니다.</small>
    </div>

    <div class="field required">
      <div class="label">사업자등록번호</div>
      <div class="text">
        <q-input 
        v-if="store.STORE_SEQ"
        readonly
          v-model="store.BN"
          hide-underline
          autocomplete="tel"
          type="tel"
          placeholder="사업자등록번호(숫자만)" />
       <q-input 
        v-if="!store.STORE_SEQ"
          v-model="store.BN"
          hide-underline
          autocomplete="tel"
          maxlength="10"
          type="tel"
          placeholder="사업자등록번호(10자리 숫자만)" />
           <small  v-if="!store.STORE_SEQ" style="font-size:50%;">* 최초 등록후 수정이 불가합니다.<br></small>
           <small  v-if="!store.STORE_SEQ" style="font-size:50%;">* 수정이 필요하시면 고객센터:070-8633-1157로  연락하세요.</small>
           <small  v-if="store.STORE_SEQ"  style="font-size:50%;">* 수정이 필요하시면 고객센터:070-8633-1157로 연락하세요.</small>
      </div>
    </div>
  </form>

  <div v-if="!store.STORE_SEQ" class="btn-area">
    <q-btn
      @click="register"
      label="등록하기"
      color="paleblue"
      class="btn-write full-width" />
  </div>

  <div v-if="store.STORE_SEQ" class="btn-area">
    <q-btn
      @click="update"
      label="수정하기"
      color="paleblue"
      class="btn-update full-width" />
    <!--
      <q-btn
        label="폐업하기"
        color="danger"
        icon="delete forever"
        class="btn-close full-width" />
    -->
  </div>

  <PlaceSearchModal
    v-if="visiblePlaceSearchModal"
    v-model="visiblePlaceSearchModal"
    @select="setPlace"
  />
</q-page>
</template>

<script>
import Store from '../models/store'
import storeService from '../services/store'

export default {
  name: 'StoreRegist',

  data()  {
    return {
      /** @type {Store} */
      store: null,
      visiblePlaceSearchModal: false,

      sliderIndex: 0,
      images: []
    }
  },

  methods: {
    setPlace(placeResult)  {
      this.store.ZIPCODE = '';
      this.store.ADDR1 = placeResult.road_address_name;
      this.store.ADDR2 = '';
      this.store.LAT = placeResult.y;
      this.store.LONG = placeResult.x;
    },

    // setZipCode(zipCode, addr)  {
    //   this.store.ZIPCODE = zipCode;
    //   this.store.ADDR1 = addr;
    // },

    // setLatLong(LAT, LONG)  {
    //   this.store.LAT = LAT;
    //   this.store.LONG = LONG;
    // },
//  validatorFns: [ Validators.tel ],
    register()  {
     // store.CALCULATE_DAY
      this.showAlert('매장을 등록하시겠습니까?', {
        cancel: '취소',
        confirm: '등록'
      })
      .then(register => {
        if(register)  {
          storeService.register(this.store)
            .then(async (store) => {
              /** @type {{ IMAGE: string }[]} */
              console.log('store"',store);
             console.log('store.STORE_SEQ"',store.STORE_SEQ);
              let images = this.images;
              console.log('images"',images);
              for(let index = 0; index < images.length; index++) {
                let imageUri = images[index].IMAGE;

                try {
                  await this.imageUpload(store.STORE_SEQ, imageUri);
                } catch (err) {
                  console.warn(err.message);
                }
              }

              this.showAlert('매장이 등록됐습니다!')
                .then(() => this.back());
            })
            .catch(err => { this.showAlert(err.message); });
        }
      });
    },

    update()  {
      storeService.update(this.store)
        .then(() => {
          this.showAlert('매장정보를 수정했습니다!')
            .then(() => {
              this.pagePush({
                name: 'StoreDetail',
                params: {
                  id: this.store.STORE_SEQ,
                },
                query: {
                  images: this.images
                },
                replace: true
              });
            });
        })
        .catch(err => { this.showAlert(err.message); });
    },

    /**
     * 앨범 열기
     *
     * @returns {Promise<string>}
     */
    showGallery() {
      return new Promise((resolve, reject) => {
        let options = {
          quality: 50,
          sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
          destinationType: Camera.DestinationType.DATA_URL,
          encodingType: Camera.EncodingType.JPEG,
          mediaType: Camera.MediaType.PICTURE,
          allowEdit: true,
        //  targetWidth: 350,
          //스케일 이미지를 픽셀 너비. TargetHeight와 함께 사용 해야 합니다.
          // 가로 세로 비율이 일정 하 게 유지 합니다. (수)
       // targetHeight:  250,
//스케일 이미지를 픽셀 단위로 높이. TargetWidth와 함께 사용 해야 합니다.
// 가로 세로 비율이 일정 하 게 유지 합니다. (수)
        };

        navigator.camera.getPicture(
          data => resolve(`data:image/jpeg;base64,${data}`),
          () => reject(new Error('설정에서 사진 앨범 접근권한을 승인해주세요.')),
          options
        );
      });
    },

    /**
     * 매장 이미지 삭제
     */
    async removeStoreImage()  {
      let sliderIndex = this.sliderIndex,
        storeSeq = this.store.STORE_SEQ,
        imageSeq = this.images[sliderIndex].IMAGE_SEQ,
        result = true;

      if(imageSeq !== null && imageSeq !== undefined)  {
        // TODO: 매장에 등록된 이미지 삭제 부분
        try {
          result = await storeService.removeImage(storeSeq, imageSeq);
        } catch (err) {
          result = false;
          this.showAlert(err.message);
        }
      }

      if(result)  {
        this.images = this.images.slice(0, sliderIndex).concat(this.images.slice(sliderIndex + 1));
        this.sliderIndex--;
      }
    },

    /**
     * 매장 이미지 추가
     */
    addStoreImage()  {
      if(this.images.length >= 4) {
        this.showAlert('매장 이미지는 총 네 장까지 등록가능합니다 :)');

        return;
      }

      this.showGallery()
        .then(imageUri => {
          let storeSeq = this.store.STORE_SEQ;

          if(storeSeq.length) {
            /**
             * 등록된 매장의 이미지를 추가하는 경우
             */
            this.imageUpload(storeSeq, imageUri)
              .then(result => {
                this.images.push(result[0]);
                this.sliderIndex = this.images.length - 1;
              })
              .catch(err => this.showAlert(err.message));
          } else {
            /**
             * 매장을 등록하는 경우
             */
            this.images.push({
              IMAGE: imageUri
            });
            this.sliderIndex = this.images.length - 1;
          }
        })
        .catch(err => {
          this.showAlert(err.message);
        });
    },

    /**
     * 이미지 업로드
     *
     * @param {string} storeSeq
     * @param {string} imageUri base64 image value
     *
     * @returns {Promise<{ IMAGE_SEQ: string, IMAGE: string }[]>}
     */
    imageUpload(storeSeq = this.store.STORE_SEQ, imageUri) {
      return storeService.addImage(storeSeq, imageUri);
    }
  },

  created() {
    let storeSeq = this.$route.params.id,
      hasStoreSeq = storeSeq ? true : false;

    this.images = [];

    if(hasStoreSeq) {
      this.store = this.$route.query.store;
      this.images = this.$route.query.images;
    } else {
      this.store = new Store;
      this.store.CALCULATE_DAY = undefined;
    }

    this.setHeader({
      visible: true,
      title: `매장${hasStoreSeq ? '수정' : '등록'}`,
      useBackButton: true
    });
  },

  mounted() {}
}
</script>

<style lang="stylus" scoped>
@import "../css/themes/common.variables.styl"

.field {
  position: relative;
  margin: .7em .5em;
  padding-bottom: .5em;
  border-bottom: 1px solid alpha($gray, 50%);
  color: $darkblue;

  .label {
    position: relative;
    display: inline-block;
    margin-left: 8px;
    margin-bottom: 4px;
    font-size: .9rem;
    font-weight: 800;
  }

  .text {
    margin-left: 8px;
  }

  &:last-of-type {
    border: 0;
  }

  &.required {
    .label {
      &:after {
        position: absolute;
        top: -3px;
        right: -7px;
        color: #f00;
        content: '*';
      }
    }
  }
}

.btn-write, .btn-update
  position: fixed;
  bottom: 0;
  height: 58px;
  z-index: 5999;

.store-image-wrap
  position relative
  background #9db6ca

  .btn-edit
    position absolute
    bottom 92px
    right 12px

  .btn-delete
    position absolute
    bottom 52px
    right 12px

  .btn-add
    position absolute
    bottom 12px
    right 12px

input {
  padding: 0;
  width: 50px;
  border: 0;
  outline: none;
}

select {
  border: 0;
  background: none;
  -webkit-appearance: none;
  outline: none;
}
</style>
