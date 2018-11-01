<template>
<q-page>
<form>
    <q-list no-padding no-border>
      <q-item>
        <q-item-main>
          <q-field label="아이디(휴대폰번호)">
            <q-input
              v-model="updatedUser.MobileNo"
              readonly
              hide-underline
              margin-bottom
              type="tel"
            />
          </q-field>
        </q-item-main>
      </q-item>

      <q-item>
        <q-item-main>
          <q-field label="이메일" required>
            <q-input
              v-model="updatedUser.EMAIL"
              hide-underline
              margin-bottom
              autocomplete="email"
              type="email"
              placeholder="이메일" />
          </q-field>
        </q-item-main>
      </q-item>

      <q-item>
        <q-item-main>
          <q-field label="비밀번호(영문자, 숫자 조합하여 10자 이상)" required></q-field>
          <q-input
            v-model="updatedUser.PASSWORD"
            hide-underline
            margin-bottom
            no-pass-toggle
            autocomplete="false"
            type="password"
            placeholder="비밀번호" />
          <q-input
            v-model="updatedUser.PASSWORD_CONFIRM"
            hide-underline
            margin-bottom
            no-pass-toggle
            autocomplete="false"
            type="password"
            placeholder="비밀번호 확인" />
        </q-item-main>
      </q-item>

      <q-item-separator></q-item-separator>

      <q-item>
        <q-item-main>
          <q-btn
            @click="update"
            label="변경하기"
            color="black"
            type="button"
            class="btn-signup full-width" />
        </q-item-main>
      </q-item>
    </q-list>
  </form>
</q-page>
</template>

<script>
import userService from '../services/user'

export default {
  name: 'Find',

  data()  {
    return {
      NAME: '',
      MobileNo: '',
      EMAIL: null,
    }
  },

  methods: {
    find()  {
      userService.find({ NAME: this.NAME, MobileNo: this.MobileNo })
        .then(user => {
          this.showAlert(`${this.MobileNo}로 초기화된 비밀번호를 전송하였습니다.\n\n확인버튼을 누르시면 로그인 화면으로 돌아갑니다.`)
            .then(() => this.pagePush({ name: 'Login', replace: true }));
        })
        .catch(err => {
          this.showAlert(`존재하지 않는 사용자입니다.\n\n로그인 화면으로 돌아갑니다.`)
            .then(() => this.pagePush({ name: 'Login', replace: true }));
        });
    }
  },

  beforeCreate() {},
  created() {
    this.setHeader({
      visible: true,
      title: '비밀번호변경하기',
      useBackButton: true
    });

    this.setFooter({
      visible: false
    });

    this.NAME = this.$route.query.NAME;
    this.MobileNo = this.$route.query.MobileNo;

    this.find();
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
.q-item
  font-size 1.2em
</style>

