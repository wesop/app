<template>
<q-page>
  <form>
    <q-list no-padding no-border>
      <q-item>
        <q-item-main>
          <q-field label="아이디(휴대폰번호)" class="text-blue">
            <q-input
              v-model="signupUser.MobileNo"
              readonly
              color="blue"
              type="tel"
              placeholder="휴대폰번호(숫자만)"
            />
          </q-field>
        </q-item-main>
      </q-item>

      <q-item>
        <q-item-main>
          <q-field required label="이메일" class="text-blue">
            <q-input
              v-model="signupUser.EMAIL"
              color="blue"
              autocomplete="email"
              type="email"
              placeholder="이메일" />
          </q-field>
        </q-item-main>
      </q-item>

      <q-item>
        <q-item-main>
          <q-field required label="비밀번호(영문자, 숫자 조합하여 8자 이상)" class="text-blue"></q-field>
          <q-input
            v-model="signupUser.PASSWORD"
            no-pass-toggle
            autocomplete="false"
            color="blue"
            type="password"
            placeholder="비밀번호" />
          <br />
          <q-input
            v-model="signupUser.PASSWORD_CONFIRM"
            no-pass-toggle
            autocomplete="false"
            color="blue"
            type="password"
            placeholder="비밀번호 확인" />
        </q-item-main>
      </q-item>
    </q-list>
  </form>

  <q-btn @click="signup"
    label="가입하기"
    color="paleblue"
    class="btn-signup full-width" />
</q-page>
</template>

<script>
import userService from '../services/user'
import { User } from '../models/user'
import Button from '../layouts/Button'

export default {
  name: 'SignupForm',

  data()  {
    return {
      signupUser: null,
    }
  },

  props: {
    policies: Array
  },

  methods: {
    signup()  {
      /** @type {User} */
      let signupUser = this.signupUser;

      this.$service.user.signup(signupUser)
        .then(() => {
          this.showAlert('축하드립니다!\n회원으로 등록되셨습니다 :)')
            .then(async () => {
              let user = await this.$service.user.authorize(signupUser)

              this.setUser(user);

              if(this.isOwner) {
                this.pagePush({ name: 'Main', replace: true });
              } else {
                this.pagePush({ name: 'WorkerMain', replace: true });
              }
            })
        })
        .catch(err => this.showAlert(err.message || '이미 가입된 정보입니다.'));
    },

    goMain(isOwner)  {
      let mainPageName = 'WorkerMain';

      if(isOwner) mainPageName = 'Main';

      this.pagePush({ name: mainPageName, replace: true });
    }
  },

  beforeCreate() {},
  created() {
    /** @type {User} */
    this.signupUser = new User(this.$route.query);

    this.setHeader({
      visible: true,
      title: '회원가입',
      useBackButton: true
    });

    this.setFooter({ visible: false });
  },

  beforeMount() {},
  mounted() {},

  beforeUpdate()  {},
  updated() {},

  beforeDestory() {},
  destroyed() {},
}
</script>

<style lang="stylus" scoped>
.q-layout-page
  padding-bottom 44px

.q-item
  padding 1.4em 1em 0
  font-size 1em

.btn-signup {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 57px;
}
</style>
