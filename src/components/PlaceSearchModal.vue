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
  <iframe v-show="false" src="http://api.shop-sol.com/shopsol/placeSearch" frameborder="0"></iframe>
  <!-- <iframe v-show="false" src="http://localhost:3000/shopsol/placeSearch" frameborder="0"></iframe> -->

  <div class="search-wrap field">
    <div class="input-wrap">
      <input v-model="keyword"   @keypress.enter="onSearchButtonClick()" type="text" placeholder="클릭후 매장명 혹은 매장주소를 입력하세요." />
    </div>
    <div class="btn-wrap">
      <button @click="onSearchButtonClick"
        type="button">
        검색
      </button>
    </div>
  </div>

  <div class="result-wrap">
    <div class="list-wrap">
      <div v-for="(placeResult, index) in placeResults"
        :key="index"
        @click="select(placeResult)"
        class="field">
        <div class="label">{{placeResult.place_name}}</div>
        <div class="text">{{placeResult.road_address_name}}</div>
        <div class="text">
          <small>{{placeResult.address_name}}</small>
        </div>
      </div>
    </div>

    <q-btn v-if="placeResults.length && page.current != Math.ceil(page.totalCount / 15)" @click="() => { this.page.current++; this.search(); }"
      label="더 보기"
      color="paleblue"
      class="full-width" />
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
      keyword: '',
      page: {
        current: 0,
        totalCount: 0
      },
      searchFrame: null,
      placeResults: [],
    }
  },

  model: {
    prop: 'value'
  },

  props: {
    value: Boolean
  },

  methods: {
    onSearchPrepare()  {
      this.searchFrame = this.$el.querySelector('iframe').contentWindow;

      onMessage = this.onMessage;

      window.addEventListener('message', onMessage, true);
    },

    onSearchButtonClick() {
      this.page.current = 0;
      this.placeResults = [];
      this.search();
    },

    /**
     * 키워드로 장소 검색
     */
    search()  {
      let keyword = this.keyword;

      if(!keyword.length) this.showAlert('검색어를 입력해주세요.');

      this.searchFrame.postMessage({
        service: 'search',
        data: {
          keyword,
          page: this.page.current
        }
      }, '*');
    },

    onMessage(e) {
      let service = e.data.service,
        res = e.data.response,
        error = e.data.error;

      if(service)  {
        if(error) {
          this.showAlert(error.message);
        } else {
          this.placeResults = (this.placeResults || []).concat(res.data);
          this.page = res.page;
        }
      }
    },

    select(place)  {
      this.$emit('select', place);
      this.close();
    },

    close() {
      this.$emit('input', false);
      this.$emit('change');
    }
  },

  mounted() {
    this.onSearchPrepare();
  },

  destroyed() {
    window.removeEventListener('message', onMessage, true);
  }
}
</script>

<style lang="stylus" scoped>
@import "../css/themes/common.variables.styl"

.search-wrap {
  $buttonWidth = 80px;

  position: relative;
  margin-bottom: .5rem;
  padding-right: $buttonWidth;

  .input-wrap {
    input {
      display: block;
      padding: 8px;
      width: 100%;
      border: 0;
      font-size: 1rem;
      outline: none;
    }
  }

  .btn-wrap {
    position: absolute;
    top: 0;
    right: 0;
    bottom: .5em;
    width: $buttonWidth;

    button {
      display: block;
      width: 100%;
      height: 100%;
      border: 0;
      background: $paleblue;
      color: #fff;
      font-size: 1rem;
      outline: none;
    }
  }
}

.result-wrap {
  padding-bottom: 60px;
  height: 100%;
  overflow: auto;
  -webkit-overflow-scrolling: touch;

  .field {
    text-align: left;

    .label {
      color: $blue;
    }
  }
}
</style>
