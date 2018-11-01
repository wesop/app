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
import { User } from '../models/user'
import userService from '../services/user'

export default {
  name: 'UserUpdate2',

  data()  {
    return {
        updatedUser: null,
      // NAME: '',
      // MobileNo: '',
      // EMAIL: null,
      // PASSWORD:'',
      // PASSWORD_CONFIRM:'',
    }
  },

  methods: {
    update()  {
      userService.changepwd({PASSWORD: this.updatedUser.PASSWORD,PASSWORD_CONFIRM: this.updatedUser.PASSWORD_CONFIRM, MobileNo: this.updatedUser.MobileNo,EMAIL :this.updatedUser.EMAIL})
        .then((message) => {
          console.log(message);
          if(message == 'success'){
            this.showAlert('비밀번호를 변경하였습니다. 로그인화면으로 이동합니다.')
            .then(() => {
              this.pagePush({ name: 'Login', replace: true });
            });
          }else{
            this.showAlert('정보가 정확하지않습니다.메일과 핸드폰번호를 다시 확인해주세요.')
          }
         
        })
        .catch(err => this.showAlert(err.message));
    }
  },

  created() {
     this.updatedUser = new User(this.$route.query);
    this.setHeader({
      visible: true,
      title: `비밀번호변경하기`,
      buttons: [],
      useBackButton: true
    });
    this.setFooter({
      visible: false
    });

    //this.NAME = this.$route.query.NAME;
   // this.MobileNo = this.$route.query.MobileNo;
   //this.MobileNo ='01096389008';

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
