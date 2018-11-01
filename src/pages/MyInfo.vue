<template>
<q-page>
  <div class="page-wrap">
    <div class="field profile-wrap">
      <div class="profile-image-wrap">
        <div class="image-wrap massive">
          <img v-if="images.length" :src="`http://api.shop-sol.com/uploads/${images[0].IMAGE}`" alt="profile" />
          <img v-else src="../assets/imgs/pserson.png" alt="profile" />
        </div>
        <button @click="editProfileImage" class="btn-camera" type="button">카메라</button>
      </div>
      <div class="name-wrap">
        {{decodeURIComponent(user.NAME)}}
      </div>
    </div>

    <div class="field">
      <div class="label">직책 및 권한</div>
      <div class="text">
        {{isOwner ? '점장' : '직원'}}
      </div>
    </div>

    <div class="field">
      <div class="label">연락처</div>
      <div class="text">{{user.MobileNo}}</div>
      </div>
<div class="field">
      <div class="label">이메일</div>
      <div class="text">{{user.EMAIL}}</div>
    </div>

    <div @click="viewPrivacy" class="field">
      <div class="label">
        약관보기
        <button type="button">
          <q-icon name="keyboard_arrow_right" />
        </button>
      </div>
    </div>

    <div @click="viewCertify" class="field">
      <div class="label">
        개인정보수정
        <button type="button">
          <q-icon name="edit" />
        </button>
      </div>
    </div>

    <div class="field">
      <div class="label">
        버전정보
        <button type="button">
          {{version}}
        </button>
      </div>
    </div>

    <div @click="logout" class="field">
      <div class="label">
        로그아웃
        <button type="button">
          <q-icon name="exit_to_app" />
        </button>
      </div>
    </div>
  </div>
</q-page>
</template>

<script>
import AppLoader from "../components/Loader";
import userService from "../services/user";

export default {
  name: "MyInfo",

  data() {
    return {
      /** @type {number} */
      sliderIndex: 0,

      images: [],

      version: null,
    };
  },

  methods: {
    viewPrivacy() {
      this.pagePush({
        name: "SignupPrivacy",
        query: {
          noSignup: true
        }
      });
    },

    viewCertify() {
      this.pagePush({
        name: "SignupCertify",
        query: {
          next: "UserUpdate"
        },
        replace: true
      });
    },

    showGallery() {
      const options = {
        quality: 50,
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
        // destinationType: Camera.DestinationType.FILE_URI,
        // destinationType: Camera.DestinationType.NATIVE_URI,
        destinationType: Camera.DestinationType.DATA_URL,
        encodingType: Camera.EncodingType.JPEG,
        mediaType: Camera.MediaType.PICTURE,
        allowEdit: true,
           targetWidth: 200,
          //스케일 이미지를 픽셀 너비. TargetHeight와 함께 사용 해야 합니다.
          // 가로 세로 비율이 일정 하 게 유지 합니다. (수)
        targetHeight:  200,
//스케일 이미지를 픽셀 단위로 높이. TargetWidth와 함께 사용 해야 합니다.
// 가로 세로 비율이 일정 하 게 유지 합니다. (수)
      };

      if(this.$data.$os === 'ios')  {
        options.destinationType = Camera.DestinationType.FILE_URI;
      }

      return new Promise((resolve, reject) => {
        navigator.camera.getPicture(resolve, reject, options);
      });
    },

    /**
     * 이미지 업로드
     *
     * @param {string} imageUri base64의 string 값
     */
    imageUpload(imageUri) {
      return userService.addProfileImage(imageUri, this.user.MEMBER_SEQ, this.$data.$os);
    },

    editProfileImage() {
      this.addProfileImage()
        .then(image => {
          if(image) {
            this.images.push(image);

            this.user.images = this.images;

            this.setUser(this.user);

            if (this.images.length > 1) {
              this.removeProfileImage(0);
            }
          }
        })
        .catch(err => {
          AppLoader.visible = false;
          this.showAlert("사진 업로드에 실패했습니다.");
        });
    },

    async addProfileImage() {
      let uploadedImage = [];

      try {
        const imageData = await this.showGallery();

        AppLoader.visible = true;

        uploadedImage = await this.imageUpload(this.$data.$os === 'ios' ? imageData : `data:image/jpeg;base64,${imageData}`);

        AppLoader.visible = false;

        return uploadedImage[0];
      } catch(err) {
        console.warn(err);
      }

      return uploadedImage[0];
    },

    removeProfileImage(index) {
      return userService
        .removeProfileImage(this.images[index].META_SEQ)
        .then(() => {
          this.images = this.images
            .slice(0, index)
            .concat(this.images.slice(index + 1));

          this.user.images = this.images;

          this.setUser(this.user);
        })
        .catch(err => this.showAlert(err.message));
    }
  },

  created() {
    this.images = this.user.images || [];

    this.$isBack = false;

    this.setHeader({
      visible: true,
      title: `내정보`,
      buttons: [],
      useBackButton: false
    });

    this.version = navigator.appInfo.version;
  }
};
</script>

<style lang="stylus" scoped>
@import '../css/themes/common.variables.styl';

.page-wrap {
  color: $darkblue;
  background-color: #fff;
}

.profile-wrap {
  .profile-image-wrap {
    position: relative;
    display: inline-block;
    width: auto;

    .image-wrap {
      position: relative;
    }

    .btn-camera {
      position: absolute;
      bottom: 6px;
      right: 0;
      width: 34px;
      height: 34px;
      background-image: url('../assets/imgs/icon_camera.png');
      background-repeat: no-repeat;
      background-position: center;
      background-size: 20px auto;
      background-color: #9bc5d7;
      border: 1px solid #fff;
      border-radius: 50%;
      text-indent: -9999px;
    }
  }

  .name-wrap {
    display: inline-block;
    margin-left: 18px;
    vertical-align: top;
    line-height: 100px;
    font-size: 1.5rem;
    font-weight: 600;
    color: $darkblue;
  }
}

.label:only-child {
  position: static;

  button {
    position: absolute;
    top: 0;
    right: 12px;
    font-size: 1rem;
    color: $darkblue;
  }
}
</style>
