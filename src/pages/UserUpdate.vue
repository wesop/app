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
            label="수정하기"
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
import { User } from '../models/user'
import userService from '../services/user'

export default {
  name: 'UserUpdate',

  data()  {
    return {
      /** @type {User} */
      updatedUser: null
    }
  },

  methods: {
    update()  {
      userService.update(this.updatedUser)
        .then(() => {
          this.showAlert('회원정보를 수정하였습니다.')
            .then(() => {
              this.user.PASSWORD = this.updatedUser.PASSWORD;
              this.user.EMAIL = this.updatedUser.EMAIL;

              this.setUser(this.user);
              this.pagePush({ name: 'MyInfo', replace: true });
            });
        })
        .catch(err => this.showAlert(err.message));
    }
  },

  created() {
    this.updatedUser = new User(this.$route.query);

    this.setHeader({
      visible: true,
      title: `개인정보수정하기`,
      buttons: [],
      useBackButton: true
    });
  },
}
</script>

<style lang="stylus" scoped>
.q-item
  padding 0 .8em

  .q-item-main
    padding-top 1.2em
    padding-bottom 1.2em

  .text
    font-size 1.275rem

  .q-item-side
    .text
      padding-right .5em

  .q-btn
    padding 12px
</style>
