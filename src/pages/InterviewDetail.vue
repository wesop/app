<template>
<q-page>
  <section class="page-wrap">
    <q-field label="채용 모집/마감" margin-top padding-bottom>
      <q-option-group
        v-model="opened"
        type="toggle"
        color="black"
        :options="[ { label: '모집중', value: true } ]"
      />
    </q-field>

    <q-field label="매장 이름" margin-top>
      <div class="label">
        스타벅스 역삼점
      </div>
    </q-field>

    <q-field label="고용형태" margin-top>
      <div class="label">
        시급 / 일급 / 월급
      </div>
    </q-field>

    <q-field label="근무 시작일" margin-top>
      <div class="label">
        {{ new Date(2018, 2, 21) | dateFormat('YYYY년 MM월 DD일') }}
      </div>
    </q-field>

    <q-field label="근무 종료일" margin-top>
      <div class="label">
        {{ new Date(2018, 2, 21) | dateFormat('YYYY년 MM월 DD일') }} / --
      </div>
    </q-field>

    <q-field label="근무 일정" margin-top padding-bottom>
      <table>
        <colgroup>
          <col width="14%" />
          <col width="43%" span="2" />
        </colgroup>
        <tr>
          <td>
            <div text-center>
              월
            </div>
          </td>
          <td>
            <div text-right>
              오전 9시 30분
            </div>
          </td>
          <td>
            <div text-right>
              오후 4시 30분
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <div text-center>
              수
            </div>
          </td>
          <td>
            <div text-right>
              오전 9시 30분
            </div>
          </td>
          <td>
            <div text-right>
              오후 4시 30분
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <div text-center>
              금
            </div>
          </td>
          <td>
            <div text-right>
              오전 9시 30분
            </div>
          </td>
          <td>
            <div text-right>
              오후 4시 30분
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <div text-center>
              토
            </div>
          </td>
          <td>
            <div text-right>
              오전 9시 30분
            </div>
          </td>
          <td>
            <div text-right>
              오후 5시 30분
            </div>
          </td>
        </tr>
      </table>
    </q-field>

    <q-field label="급여(시급/일급/월급)" margin-top>
      <div class="label">
        {{ 8000 | currency }}
      </div>
    </q-field>

    <q-item-separator />

    <q-field label="점장의 말말말" margin-top margin-bottom>
      <div class="label">
        스타벅스 역삼점에서 주종 또는 월, 수, 금 함께 일 할 파트너 모집합니다.
      </div>
    </q-field>

    <q-item-separator />

    <q-field margin-top>
      <q-btn
        @click="() => {
          pagePush({
            name: 'InterviewModify',
            params: {
              id: storeId
            }
          })
        }"
        label="채용정보 수정하기"
        color="black"
        icon-right="mode edit"
        class="full-width" />
    </q-field>
  </section>
</q-page>
</template>

<script>
export default {
  name: 'InterviewDetail',

  data()  {
    return {
      storeId: '',
      opened: [ true ]
    }
  },

  created() {
    this.storeId = this.$route.params.id;

    this.$store.dispatch('layout/setHeaderTitle', {
      title: '채용정보'
    });

    // let backButton = LayoutButton.BACK_BUTTON();

    // backButton.click = this.back;

    this.$store.dispatch('layout/setHeaderButton', {
      buttons: [
        // backButton,
        // new LayoutButton({
        //   icon: 'keyboard arrow right',
        //   label: '주변 면접자',
        //   click: () => {
        //     this.pagePush({
        //       name: 'InterviewNearby',
        //       params: {
        //         id: this.storeId
        //       }
        //     })
        //   },
        //   position: 'right'
        // })
      ]
    });
  }
}
</script>

<style lang="stylus" scoped>
@import "../css/themes/common.variables.styl"

.image-wrap
  margin 0 4px

  &:first-child
    margin-left 0

.label
  margin-top -8px
  margin-bottom 12px

table
  border-collapse collapse

  tr
    td
      padding 12px 0
      border-bottom 1px solid alpha($em, 30%)

      &:first-child
        border-right 1px solid alpha($em, 30%)

    &:last-child
      td
        border-bottom 0

</style>
